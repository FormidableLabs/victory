import * as React from "react";

export type ContainerType =
  | "brush"
  | "cursor"
  | "selection"
  | "voronoi"
  | "zoom";
export function createContainer<V, W>(
  c1: ContainerType,
  c2: ContainerType,
): React.ComponentType<V & W>;

export function combineContainerMixins(mixins: any, Container: any): any;

export const makeCreateContainerFunction: (
  mixinMap: any,
  Container: any,
) => (behaviorA: any, behaviorB: any) => any;
