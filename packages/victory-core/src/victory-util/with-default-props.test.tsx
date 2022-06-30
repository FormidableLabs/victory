import React from "react";
import { withDefaultProps } from "./with-default-props";

describe("withDefaultProps", () => {
  type MyProps = {
    foo: "FOO";
    bar: "BAR";
    baz?: "BAZ";
  };
  const MyComponentRaw = (props: MyProps) => {
    return (
      <span>
        {props.foo.toUpperCase() +
          props.bar.toUpperCase() +
          // @ts-expect-error "Object is possibly 'undefined'"
          props.baz.toUpperCase()}
      </span>
    );
  };

  it("should return original function with defaultProps", () => {
    const MyComponent = withDefaultProps({ bar: "BAR" }, MyComponentRaw);
    expect(MyComponent).toBe(MyComponentRaw);
    expect(MyComponent.defaultProps).toEqual({ bar: "BAR" });
  });

  it("should make defaulted props optional", () => {
    const MyComponent = withDefaultProps({ bar: "BAR" }, MyComponentRaw);

    // These types should be valid:
    <MyComponent foo="FOO" />;
    <MyComponent foo="FOO" bar="BAR" />;
    <MyComponent foo="FOO" bar="BAR" baz="BAZ" />;

    // These types should be invalid:
    // @ts-expect-error "Property 'foo' is missing
    <MyComponent />;
    // @ts-expect-error "Property 'invalid' does not exist"
    <MyComponent foo="FOO" invalid="invalid" />;
    // @ts-expect-error "Type 'invalid' is not assignable to 'FOO'"
    <MyComponent foo="invalid" />;
    // @ts-expect-error "Type 'invalid' is not assignable to 'BAR'"
    <MyComponent foo="FOO" bar="invalid" />;
    // @ts-expect-error "Type 'number' is not assignable to 'BAR'"
    <MyComponent foo="FOO" bar={5} />;
  });

  it("should not allow invalid defaults", () => {
    // @ts-expect-error "Type 'INVALID' not assignable to 'FOO'"
    withDefaultProps({ foo: "INVALID" }, MyComponentRaw);
    // @ts-expect-error "Type 'INVALID' not assignable to 'BAR'"
    withDefaultProps({ bar: "INVALID" }, MyComponentRaw);
    // @ts-expect-error "Object literal may only specify known properties"
    withDefaultProps({ invalid: "INVALID" }, MyComponentRaw);
  });
});
