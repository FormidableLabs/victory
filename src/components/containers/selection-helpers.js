import { Selection, Data } from "victory-core";
import { assign, throttle, isFunction, omit, defaults, keys } from "lodash";
import React from "react";

const Helpers = {
  getDatasets(props) {
    if (props.data) {
      return [{data: props.data}];
    }
    const getData = (children, childIndex, parent) => {
      return children.reduce((memo, child, index) => {
        if (child.type && child.type.role === "axis") {
          return memo;
        } else if (child.props && child.props.children) {
          const nestedChildren = React.Children.toArray(child.props.children);
          const nestedDatasets = getData(nestedChildren, index, child);
          memo = memo.concat(nestedDatasets);
        } else if (child.type && isFunction(child.type.getData)) {
          child = parent ? React.cloneElement(child, parent.props) : child;
          const childData = child.props && child.type.getData(child.props);
          if (childData) {
            const key = childIndex ? `${childIndex}-${index}` : index;
            const childName = child.props.name || key;
            memo = memo.concat([{childName, data: childData}]);
          }
        }
        return memo;
      }, []);
    };
    return getData(React.Children.toArray(props.children));
  },

  // getDatasets(props) { // eslint-disable-line max-statements
  //   if (props.data) {
  //     return [{data: props.data}];
  //   }
  //   const getData = (childProps) => {
  //     const data = Data.getData(childProps);
  //     return Array.isArray(data) && data.length > 0 ? data : undefined;
  //   };

  //   // Reverse the child array to maintain correct order when looping over
  //   // children starting from the end of the array.
  //   const children = React.Children.toArray(props.children).reverse();
  //   let childrenLength = children.length;
  //   const dataArr = [];
  //   let dataArrLength = 0;
  //   let childIndex = 0;
  //   while (childrenLength > 0) {
  //     const child = children[--childrenLength];
  //     const childName = child.props.name || childIndex;
  //     if (child.type && child.type.role === "axis") {
  //       childIndex++;
  //     } else if (child.props && child.props.children) {
  //       const newChildren = React.Children.toArray(child.props.children).reverse();
  //       const newChildrenLength = newChildren.length;
  //       childIndex++;
  //       for (let index = 0; index < newChildrenLength; index++) {
  //         const newChild = newChildren[index];
  //         const proxiedProps = defaults({}, newChild.props, omit(child.props, "children"));
  //         children[childrenLength++] = React.cloneElement(newChild, proxiedProps);
  //       }
  //     } else if (child.type && isFunction(child.type.getData)) {
  //       dataArr[dataArrLength++] = {childName, data: child.type.getData(child.props)};
  //       childIndex++;

  //     } else {
  //       dataArr[dataArrLength++] = {childName, data: getData(child.props)};
  //       childIndex++;

  //     }
  //   }
  //   return dataArr;
  // },

  filterDatasets(datasets, bounds) {
    const filtered = datasets.reduce((memo, dataset) => {
      const selectedData = this.getSelectedData(dataset.data, bounds);
      memo = selectedData ?
        memo.concat({
          childName: dataset.childName, eventKey: selectedData.eventKey, data: selectedData.data
        }) :
        memo;
      return memo;
    }, []);
    return filtered.length ? filtered : null;
  },

  getSelectedData(dataset, bounds) {
    const {x, y} = bounds;
    const withinBounds = (d) => {
      return d._x >= x[0] && d._x <= x[1] && d._y >= y[0] && d._y <= y[1];
    };
    const eventKey = [];
    const data = [];
    let count = 0;
    for (let index = 0, len = dataset.length; index < len; index++) {
      const datum = dataset[index];
      if (withinBounds(datum)) {
        data[count] = datum;
        eventKey[count] = datum.eventKey === undefined ? index : datum.eventKey;
        count++;
      }
    }
    return count > 0 ? {eventKey, data} : null;
  },

  onMouseDown(evt, targetProps) {
    evt.preventDefault();
    const { dimension, scale } = targetProps;
    const datasets = targetProps.datasets || [];
    const {x, y} = Selection.getSVGEventCoordinates(evt);
    const x1 = dimension !== "y" ? x : Selection.getDomainCoordinates(scale).x[0];
    const y1 = dimension !== "x" ? y : Selection.getDomainCoordinates(scale).y[0];
    const x2 = dimension !== "y" ? x : Selection.getDomainCoordinates(scale).x[1];
    const y2 = dimension !== "x" ? y : Selection.getDomainCoordinates(scale).y[1];
    if (isFunction(targetProps.onSelectionCleared)) {
      targetProps.onSelectionCleared();
    }
    return [
      {
        target: "parent",
        mutation: () => {
          return {x1, y1, select: true, x2, y2};
        }
      }, {
        target: "data",
        childName: targetProps.children || datasets.length ? "all" : undefined,
        eventKey: "all",
        mutation: () => null
      }
    ];
  },

  onMouseMove(evt, targetProps) {
    const {dimension, scale, select} = targetProps;
    if (!select) {
      return {};
    } else {
      const {x, y} = Selection.getSVGEventCoordinates(evt);
      const x2 = dimension !== "y" ? x : Selection.getDomainCoordinates(scale).x[1];
      const y2 = dimension !== "x" ? y : Selection.getDomainCoordinates(scale).y[1];
      return {
        target: "parent",
        mutation: () => {
          return { x2, y2 };
        }
      };
    }
  },

  onMouseUp(evt, targetProps) {
    const {x2, y2} = targetProps;
    if (!x2 || !y2) {
      return [{
        target: "parent",
        mutation: () => {
          return { select: false, x1: null, x2: null, y1: null, y2: null };
        }
      }];
    }
    const datasets = this.getDatasets(targetProps);
    const bounds = Selection.getBounds(targetProps);
    const selectedData = this.filterDatasets(datasets, bounds);
    const callbackMutation = selectedData && isFunction(targetProps.onSelection) ?
      targetProps.onSelection(selectedData, bounds) : {};

    const parentMutation = [{
      target: "parent",
      mutation: () => {
        return { datasets, select: false, x1: null, x2: null, y1: null, y2: null };
      }
    }];

    const dataMutation = selectedData ?
      selectedData.map((d) => {
        return {
          childName: d.childName, eventKey: d.eventKey, target: "data",
          mutation: () => {
            return assign({active: true}, callbackMutation);
          }
        };
      }) : [];

    return parentMutation.concat(dataMutation);
  }
};

export default {
  onMouseDown: Helpers.onMouseDown.bind(Helpers),
  onMouseUp: Helpers.onMouseUp.bind(Helpers),
  onMouseMove: throttle(Helpers.onMouseMove.bind(Helpers), 16, {leading: true})
};
