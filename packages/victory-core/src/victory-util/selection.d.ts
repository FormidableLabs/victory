import * as React from "react";
import { DomainPropType, ScalePropType } from "../types/prop-types";

export function getParentSVG(evt: React.SyntheticEvent): string;

export type SVGCoordinateType = { x: number; y: number };

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
