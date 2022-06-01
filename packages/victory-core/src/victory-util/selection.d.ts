import * as React from "react";
import { DomainPropType, ScalePropType, SVGCoordinateType } from "./types";

export function getParentSVG(evt: React.SyntheticEvent): string;

export function getSVGEventCoordinates(
  evt: React.SyntheticEvent,
  svg?: SVGElement
): SVGCoordinateType;

export function getDomainCoordinates(
  props: any,
  domain?: DomainPropType
): DomainPropType;

export function getDataCoordinates(
  props: any,
  scale: ScalePropType,
  x: number,
  y: number
): SVGCoordinateType;

export function getBounds(props: any): SVGCoordinateType;
