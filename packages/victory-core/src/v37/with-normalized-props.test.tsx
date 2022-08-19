import { VictoryCommonProps } from "victory-core";
import { withNormalizedProps } from "victory-core/lib/v37/with-normalized-props";
import PropTypes from "prop-types";
import React from "react";

it("withNormalizedProps", () => {
  type MyProps = VictoryCommonProps & { foo: "FOO"; bar: "BAR"; baz?: "BAZ" };
  const MyCompRaw = (props: MyProps) => {
    return (
      <span>
        {[
          props.foo.toUpperCase(),
          props.bar.toUpperCase(),
          // @ts-expect-error "baz is possibly undefined"
          props.baz.toUpperCase(),
        ].join("\n")}
      </span>
    );
  };
  const MyComp = withNormalizedProps(
    {
      displayName: "MyComp",
      defaultProps: { bar: "BAR" },
    },
    MyCompRaw,
  );

  MyComp.propTypes = {
    bar: PropTypes.oneOf(["BAR" as const]).isRequired,
    baz: PropTypes.oneOf(["BAZ" as const]),
    foo: PropTypes.oneOf(["FOO" as const]).isRequired,
  };

  <MyComp foo="FOO" />;
  <MyComp foo="FOO" bar="BAR" />;
  <MyComp foo="FOO" baz="BAZ" />;

  // All should error:
  // @ts-expect-error Invalid props
  <MyComp />;
  // @ts-expect-error Invalid props
  <MyComp foo="INVALID" />;
  // @ts-expect-error Invalid props
  <MyComp foo={5} />;
  // @ts-expect-error Invalid props
  <MyComp foo="FOO" bar="INVALID" />;
  // @ts-expect-error Invalid props
  <MyComp foo="FOO" bar={5} />;
  // @ts-expect-error Invalid props
  <MyComp foo="FOO" baz="INVALID" />;
  // @ts-expect-error Invalid props
  <MyComp foo="FOO" baz={5} />;
});
