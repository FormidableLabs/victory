import { TextSizeStyleInterface } from "./types";

export function approximateTextSize(
  text: string,
  style?: TextSizeStyleInterface
): { width: number; height: number };

export function convertLengthToPixels(length: string, fontSize: number): number;
