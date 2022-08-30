import React from "react";
import { render, RenderResult } from "@testing-library/react";
import { createVictoryComponent } from "./create-victory-component";

describe("createVictoryComponent", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const propsSpy = jest.fn();
  function lastRenderedProps() {
    return propsSpy.mock.calls.at(-1)[0];
  }

  type ExampleProps = React.PropsWithChildren<{
    title: string;
    optionalProp?: boolean;
    overridableProp: "one" | "two" | "three";
  }>;
  const ExampleComponent = createVictoryComponent<ExampleProps>()(
    {
      displayName: "ExampleComponent",
      propTypes: {},
      defaultProps: {
        title: "default title",
        overridableProp: "two",
      },
      normalizeProps: {
        TITLE: (props) => props.title.toUpperCase(),
        overridableProp: (props) =>
          ({ one: 1, two: 2, three: 3 }[props.overridableProp] || 0),
      },
      aggregateProps: {
        titles: (myProps, allProps) =>
          (allProps as Array<ExampleProps>).map((props) => props.title),
        TITLES: (myProps, allProps) =>
          (allProps as Array<{ TITLE: string }>).map((props) => props.TITLE),
      },
    },
    ({ children, ...props }) => {
      propsSpy(props);

      /* eslint-disable @typescript-eslint/no-unused-vars */

      // Do some type-safety checks:

      // These props are passed-through:
      const title: string = props.title;
      const optionalProp: boolean = props.optionalProp!;
      // This prop is normalized / derived:
      const TITLE: string = props.TITLE;
      // This prop is normalized / overridden with a new type:
      const overridableProp: number = props.overridableProp;
      // These props are aggregates:
      const titles: string[] = props.titles;
      const TITLES: string[] = props.TITLES;

      // These types should not be valid:
      // @ts-expect-error INVALID
      const INVALID = props.INVALID;
      // @ts-expect-error Type 'string' is not assignable to 'number'
      const INVALID_TYPE: number = props.title;
      // @ts-expect-error Type 'number' is not assignable to 'string'
      const INVALID_TYPE2: string = props.overridableProp;

      return (
        <fieldset>
          <legend>{props.title}</legend>
          <pre>{props.TITLES}</pre>
          <>{children}</>
        </fieldset>
      );
    },
  );

  describe("rendering the component alone", () => {
    it("props are defaulted, normalized, and aggregated", () => {
      render(<ExampleComponent />);
      expect(lastRenderedProps()).toMatchInlineSnapshot(`
        Object {
          "TITLE": "DEFAULT TITLE",
          "TITLES": Array [
            "DEFAULT TITLE",
          ],
          "overridableProp": 2,
          "title": "default title",
          "titles": Array [
            "default title",
          ],
        }
      `);
    });

    it("passed props are normalized and aggregated", () => {
      render(
        <ExampleComponent
          title="my title"
          optionalProp
          overridableProp="three"
        />,
      );
      expect(lastRenderedProps()).toMatchInlineSnapshot(`
        Object {
          "TITLE": "MY TITLE",
          "TITLES": Array [
            "MY TITLE",
          ],
          "optionalProp": true,
          "overridableProp": 3,
          "title": "my title",
          "titles": Array [
            "my title",
          ],
        }
      `);
    });

    it("element is rendered correctly", () => {
      const result = render(<ExampleComponent />);
      expect(result.container).toMatchInlineSnapshot(`
        <div>
          <fieldset>
            <legend>
              default title
            </legend>
            <pre>
              DEFAULT TITLE
            </pre>
          </fieldset>
        </div>
      `);
    });
  });
  describe("rendering nested components", () => {
    let result: RenderResult;
    beforeEach(() => {
      result = render(
        <ExampleComponent title="Parent">
          <ExampleComponent title="Child 1">
            <ExampleComponent title="Grandchild 1" />
            <ExampleComponent title="Grandchild 2" />
          </ExampleComponent>
          <ExampleComponent title="Child 2" />
        </ExampleComponent>,
      );
    });

    it("data is aggregated for all components", () => {
      expect(lastRenderedProps()).toMatchInlineSnapshot(`
        Object {
          "TITLE": "CHILD 2",
          "TITLES": Array [
            "PARENT",
            "CHILD 1",
            "GRANDCHILD 1",
            "GRANDCHILD 2",
            "CHILD 2",
          ],
          "overridableProp": 2,
          "title": "Child 2",
          "titles": Array [
            "Parent",
            "Child 1",
            "Grandchild 1",
            "Grandchild 2",
            "Child 2",
          ],
        }
      `);
    });

    it("aggregate data can be rendered", () => {
      expect(result.container).toMatchInlineSnapshot(`
        <div>
          <fieldset>
            <legend>
              Parent
            </legend>
            <pre>
              PARENT
              CHILD 1
              GRANDCHILD 1
              GRANDCHILD 2
              CHILD 2
            </pre>
            <fieldset>
              <legend>
                Child 1
              </legend>
              <pre>
                PARENT
                CHILD 1
                GRANDCHILD 1
                GRANDCHILD 2
                CHILD 2
              </pre>
              <fieldset>
                <legend>
                  Grandchild 1
                </legend>
                <pre>
                  PARENT
                  CHILD 1
                  GRANDCHILD 1
                  GRANDCHILD 2
                  CHILD 2
                </pre>
              </fieldset>
              <fieldset>
                <legend>
                  Grandchild 2
                </legend>
                <pre>
                  PARENT
                  CHILD 1
                  GRANDCHILD 1
                  GRANDCHILD 2
                  CHILD 2
                </pre>
              </fieldset>
            </fieldset>
            <fieldset>
              <legend>
                Child 2
              </legend>
              <pre>
                PARENT
                CHILD 1
                GRANDCHILD 1
                GRANDCHILD 2
                CHILD 2
              </pre>
            </fieldset>
          </fieldset>
        </div>
      `);
    });
  });
});
