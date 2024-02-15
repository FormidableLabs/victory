import { Selection, Data, Helpers, Datum } from "victory-core";
import { defaults, throttle } from "lodash";
import React from "react";

const ON_MOUSE_MOVE_THROTTLE_MS = 16;

class SelectionHelpersClass {
  getDimension(props) {
    const { horizontal, selectionDimension } = props;
    if (!horizontal || !selectionDimension) {
      return selectionDimension;
    }
    return selectionDimension === "x" ? "y" : "x";
  }

  getDatasets(props) {
    if (props.data) {
      return [{ data: props.data }];
    }

    const getData = (childProps) => {
      const data = Data.getData(childProps);
      return Array.isArray(data) && data.length > 0 ? data : undefined;
    };

    const iteratee = (child, childName, parent) => {
      const blacklist = props.selectionBlacklist || [];
      let childElement;
      if (!Data.isDataComponent(child) || blacklist.includes(childName)) {
        return null;
      } else if (child.type && Helpers.isFunction(child.type.getData)) {
        childElement = parent ? React.cloneElement(child, parent.props) : child;
        const childData =
          childElement.props && childElement.type.getData(childElement.props);
        return childData ? { childName, data: childData } : null;
      }
      const childData = getData(childElement.props);
      return childData ? { childName, data: childData } : null;
    };
    return Helpers.reduceChildren(
      React.Children.toArray(props.children),
      iteratee,
      props,
    );
  }

  filterDatasets(props, datasets) {
    const filtered = datasets.reduce((memo, dataset) => {
      const selectedData = this.getSelectedData(props, dataset.data);
      return selectedData
        ? memo.concat({
            childName: dataset.childName,
            eventKey: selectedData.eventKey,
            data: selectedData.data,
          })
        : memo;
    }, []);
    return filtered.length ? filtered : null;
  }

  getSelectedData(props, dataset) {
    const { x1, y1, x2, y2 } = props;
    const withinBounds = (d) => {
      const scaledPoint = Helpers.scalePoint(props, d);
      return (
        scaledPoint.x >= Math.min(x1, x2) &&
        scaledPoint.x <= Math.max(x1, x2) &&
        scaledPoint.y >= Math.min(y1, y2) &&
        scaledPoint.y <= Math.max(y1, y2)
      );
    };
    const eventKey: number[] = [];
    const data: Datum[] = [];
    let count = 0;
    for (let index = 0, len = dataset.length; index < len; index++) {
      const datum = dataset[index];
      if (withinBounds(datum)) {
        data[count] = datum;
        eventKey[count] = datum.eventKey === undefined ? index : datum.eventKey;
        count++;
      }
    }
    return count > 0 ? { eventKey, data } : null;
  }

  onMouseDown = (evt, targetProps) => {
    evt.preventDefault();
    const { activateSelectedData, allowSelection, polar, selectedData } =
      targetProps;
    if (!allowSelection) {
      return {};
    }
    const dimension = this.getDimension(targetProps);
    const parentSVG = targetProps.parentSVG || Selection.getParentSVG(evt);
    const { x, y } = Selection.getSVGEventCoordinates(evt, parentSVG);
    const x1 =
      polar || dimension !== "y"
        ? x
        : Selection.getDomainCoordinates(targetProps).x[0];
    const y1 =
      polar || dimension !== "x"
        ? y
        : Selection.getDomainCoordinates(targetProps).y[0];
    const x2 =
      polar || dimension !== "y"
        ? x
        : Selection.getDomainCoordinates(targetProps).x[1];
    const y2 =
      polar || dimension !== "x"
        ? y
        : Selection.getDomainCoordinates(targetProps).y[1];

    const mutatedProps = { x1, y1, select: true, x2, y2, parentSVG };
    if (selectedData && Helpers.isFunction(targetProps.onSelectionCleared)) {
      targetProps.onSelectionCleared(defaults({}, mutatedProps, targetProps));
    }
    const parentMutation = [{ target: "parent", mutation: () => mutatedProps }];
    const dataMutation =
      selectedData && activateSelectedData
        ? selectedData.map((d) => {
            return {
              childName: d.childName,
              eventKey: d.eventKey,
              target: "data",
              mutation: () => null,
            };
          })
        : [];

    return parentMutation.concat(...dataMutation);
  };

  private handleMouseMove = (evt, targetProps) => {
    const { allowSelection, select, polar } = targetProps;
    const dimension = this.getDimension(targetProps);
    if (!allowSelection || !select) {
      return null;
    }
    const parentSVG = targetProps.parentSVG || Selection.getParentSVG(evt);
    const { x, y } = Selection.getSVGEventCoordinates(evt, parentSVG);
    const x2 =
      polar || dimension !== "y"
        ? x
        : Selection.getDomainCoordinates(targetProps).x[1];
    const y2 =
      polar || dimension !== "x"
        ? y
        : Selection.getDomainCoordinates(targetProps).y[1];
    return {
      target: "parent",
      mutation: () => {
        return { x2, y2, parentSVG };
      },
    };
  };

  onMouseMove = throttle(this.handleMouseMove, ON_MOUSE_MOVE_THROTTLE_MS, {
    leading: true,
    trailing: false,
  });

  onMouseUp = (evt, targetProps) => {
    const { activateSelectedData, allowSelection, x2, y2 } = targetProps;
    if (!allowSelection) {
      return null;
    }
    if (!x2 || !y2) {
      return [
        {
          target: "parent",
          mutation: () => {
            return { select: false, x1: null, x2: null, y1: null, y2: null };
          },
        },
      ];
    }
    const datasets = this.getDatasets(targetProps);
    const bounds = Selection.getBounds(targetProps);
    const selectedData = this.filterDatasets(targetProps, datasets);
    const mutatedProps = {
      selectedData,
      datasets,
      select: false,
      x1: null,
      x2: null,
      y1: null,
      y2: null,
    };
    const callbackMutation =
      selectedData && Helpers.isFunction(targetProps.onSelection)
        ? targetProps.onSelection(
            selectedData,
            bounds,
            defaults({}, mutatedProps, targetProps),
          )
        : {};
    const parentMutation = [
      {
        target: "parent",
        mutation: () => mutatedProps,
      },
    ];

    const dataMutation =
      selectedData && activateSelectedData
        ? selectedData.map((d) => {
            return {
              childName: d.childName,
              eventKey: d.eventKey,
              target: "data",
              mutation: () => {
                return Object.assign({ active: true }, callbackMutation);
              },
            };
          })
        : [];

    return parentMutation.concat(dataMutation);
  };
}

export const SelectionHelpers = new SelectionHelpersClass();
