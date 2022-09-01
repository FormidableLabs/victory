import React from "react";
import { render, RenderResult } from "@testing-library/react";
import { makeNestableInferred, NestableParent } from "./nestable-component";

describe("makeNestable", () => {
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
  const ExampleComponent = makeNestableInferred<ExampleProps>()(
    {
      normalizeProps: {
        TITLE: (props) => props.title.toUpperCase(),
        overridableProp: (props) =>
          ({ one: 1, two: 2, three: 3 }[props.overridableProp] || 0),
      },
      aggregateProps: {
        titles: (myProps, allProps) =>
          (allProps as Array<ExampleProps>)
            .map((props) => props.title)
            .filter(Boolean),
        TITLES: (myProps, allProps) =>
          (allProps as Array<typeof myProps>)
            .map((props) => props.TITLE)
            .filter(Boolean),
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
          <pre>{`TITLES: ${props.TITLES.join(", ")}`}</pre>
          <>{children}</>
        </fieldset>
      );
    },
  );

  describe("rendering the component alone", () => {
    afterEach(() => {
      jest.restoreAllMocks();
    });

    it("fails when the <NestedParent> is missing", () => {
      jest.spyOn(console, "error").mockImplementation(() => void 0);
      expect(() => {
        render(<ExampleComponent />);
      }).toThrowErrorMatchingInlineSnapshot(
        `"[NestableComponent] Did not find a NestableParent"`,
      );
    });

    it("props are defaulted, normalized, and aggregated", () => {
      render(<ExampleComponent />, { wrapper: NestableParent });
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
        { wrapper: NestableParent },
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
      const result = render(<ExampleComponent />, { wrapper: NestableParent });
      expect(result.container).toMatchInlineSnapshot(`
        <div>
          <fieldset>
            <legend>
              default title
            </legend>
            <pre>
              TITLES: DEFAULT TITLE
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
        { wrapper: NestableParent },
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
              TITLES: PARENT, CHILD 1, GRANDCHILD 1, GRANDCHILD 2, CHILD 2
            </pre>
            <fieldset>
              <legend>
                Child 1
              </legend>
              <pre>
                TITLES: PARENT, CHILD 1, GRANDCHILD 1, GRANDCHILD 2, CHILD 2
              </pre>
              <fieldset>
                <legend>
                  Grandchild 1
                </legend>
                <pre>
                  TITLES: PARENT, CHILD 1, GRANDCHILD 1, GRANDCHILD 2, CHILD 2
                </pre>
              </fieldset>
              <fieldset>
                <legend>
                  Grandchild 2
                </legend>
                <pre>
                  TITLES: PARENT, CHILD 1, GRANDCHILD 1, GRANDCHILD 2, CHILD 2
                </pre>
              </fieldset>
            </fieldset>
            <fieldset>
              <legend>
                Child 2
              </legend>
              <pre>
                TITLES: PARENT, CHILD 1, GRANDCHILD 1, GRANDCHILD 2, CHILD 2
              </pre>
            </fieldset>
          </fieldset>
        </div>
      `);
    });
  });

  describe("mixed nested components", () => {
    type SecondProps = {
      title?: string;
      value: number;
    };
    const spyRender = jest.fn();
    const SecondComponent = makeNestableInferred<SecondProps>()(
      {
        displayName: "SecondComponent",
        propTypes: {},
        defaultProps: {
          value: 0,
        },
        normalizeProps: {
          TITLE: (props) => props.title?.toLowerCase(),
        },
        aggregateProps: {
          valueSum: (myProps, allProps, memo) => {
            return (allProps as Array<SecondProps>).reduce(
              (sum, props) => (props.value ? sum + props.value : sum),
              0,
            );
          },
        },
      },
      (props) => {
        spyRender(props);
        return (
          <fieldset>
            {props.title}
            {`Sum of all values: ${props.valueSum}`}
          </fieldset>
        );
      },
    );

    it("should render nested in other components", () => {
      const SimpleWrapper = ({ children }) => <span>{children}</span>;
      const { container } = render(
        <NestableParent>
          <section>
            <SimpleWrapper>
              <SecondComponent value={99} />
            </SimpleWrapper>
          </section>
        </NestableParent>,
      );
      expect(container).toMatchInlineSnapshot(`
        <div>
          <section>
            <span>
              <fieldset>
                Sum of all values: 99
              </fieldset>
            </span>
          </section>
        </div>
      `);
    });

    it("should aggregate all components regardless of nesting", () => {
      const { container } = render(
        <NestableParent>
          <section>
            <SecondComponent value={10} />
          </section>
          <SecondComponent value={10} />
          <div>
            <span>
              <SecondComponent value={10} />
            </span>
          </div>
        </NestableParent>,
      );
      expect(container).toMatchInlineSnapshot(`
        <div>
          <section>
            <fieldset>
              Sum of all values: 30
            </fieldset>
          </section>
          <fieldset>
            Sum of all values: 30
          </fieldset>
          <div>
            <span>
              <fieldset>
                Sum of all values: 30
              </fieldset>
            </span>
          </div>
        </div>
      `);
    });

    it("mixed nestable components should all participate in aggregation", () => {
      const { container } = render(
        <NestableParent>
          <ExampleComponent title={"Example 1"} />
          <SecondComponent title={"Second 1"} value={10} />
          <ExampleComponent title={"Example 2"} />
          <SecondComponent value={10} />
        </NestableParent>,
      );
      expect(container).toMatchInlineSnapshot(`
        <div>
          <fieldset>
            <legend>
              Example 1
            </legend>
            <pre>
              TITLES: EXAMPLE 1, second 1, EXAMPLE 2
            </pre>
          </fieldset>
          <fieldset>
            Second 1
            Sum of all values: 20
          </fieldset>
          <fieldset>
            <legend>
              Example 2
            </legend>
            <pre>
              TITLES: EXAMPLE 1, second 1, EXAMPLE 2
            </pre>
          </fieldset>
          <fieldset>
            Sum of all values: 20
          </fieldset>
        </div>
      `);
    });
  });

  describe("aggregates can memoize data", () => {
    type ExampleDataProps = ExampleProps & { data: number[] };
    const calculateDomainFromAllProps = jest.fn(
      (allProps: Array<ExampleDataProps>) => {
        const min = Math.min(...allProps.map((p) => Math.min(...p.data)));
        const max = Math.max(...allProps.map((p) => Math.max(...p.data)));
        return [min, max] as const;
      },
    );
    const identity = jest.fn((val: number) => val);

    let lastProps: any;
    const MemoTest = makeNestableInferred<ExampleDataProps>()(
      {
        ...ExampleComponent.componentConfig,
        defaultProps: {
          ...ExampleComponent.componentConfig.defaultProps,
          data: [0],
        },
        normalizeProps: {},
        aggregateProps: {
          domain: (myProps, allProps, memo) => {
            const res = memo(calculateDomainFromAllProps)(
              allProps as ExampleDataProps[],
            );
            return res;
          },
          numberOfElements: (myProps, allProps, memo) => {
            function typeChecks() {
              // @ts-expect-error "Expected 1 arguments"
              memo(identity)();
              // @ts-expect-error "Expected 1 arguments"
              memo(identity)(5, 5);
              // @ts-expect-error "'string' is not assignable to 'number'"
              memo(identity)("string");
              // @ts-expect-error "'number' is not assignable to 'string'"
              const val: string = memo(identity)(5);
            }

            return memo(identity)(allProps.length);
          },
        },
      },
      ({ children, ...props }) => {
        lastProps = props;
        return <div>{children}</div>;
      },
    );

    let result: RenderResult;
    const renderElements = () => (
      <MemoTest title="Parent" data={[1, 2, 3]}>
        <MemoTest title="Child 1" data={[4, 5, 6]} />
        <MemoTest title="Child 2" data={[7, 8, 9]} />
      </MemoTest>
    );
    beforeEach(() => {
      result = render(renderElements(), { wrapper: NestableParent });
    });

    it("all components should share their memoized data", () => {
      expect(lastProps.domain).toEqual([1, 9]);
      expect(calculateDomainFromAllProps).toHaveBeenCalledTimes(1);

      expect(lastProps.numberOfElements).toEqual(3);
      expect(identity).toHaveBeenCalledTimes(1);
    });

    it("rerendering will use a new memo cache", () => {
      result.rerender(renderElements());
      expect(lastProps.domain).toEqual([1, 9]);
      expect(calculateDomainFromAllProps).toHaveBeenCalledTimes(2);

      expect(lastProps.numberOfElements).toEqual(3);
      expect(identity).toHaveBeenCalledTimes(2);
    });
  });
});
