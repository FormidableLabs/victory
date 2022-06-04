export interface TextSizeStyleInterface {
  angle?: number;
  characterConstant?: string;
  fontFamily?: string;
  fontSize?: number | string;
  letterSpacing?: string;
  lineHeight?: number;
}

export function approximateTextSize(
  text: string,
  style?: TextSizeStyleInterface
): { width: number; height: number };

export function convertLengthToPixels(length: string, fontSize: number): number;
