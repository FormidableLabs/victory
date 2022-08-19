import { VictoryCommonProps } from "../victory-util/common-props";
import { withNormalizedProps } from "./with-normalized-props";
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
  <MyComp />;
  <MyComp foo="INVALID" />;
  <MyComp foo={5} />;
  <MyComp foo="FOO" bar="INVALID" />;
  <MyComp foo="FOO" bar={5} />;
  <MyComp foo="FOO" baz="INVALID" />;
  <MyComp foo="FOO" baz={5} />;
});
