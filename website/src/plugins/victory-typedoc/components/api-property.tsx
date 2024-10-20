import React from "react";

type ApiPropertyProps = {
  defaultValue?: string;
  required?: boolean;
  tsType: string;
};

export function ApiProperty(props: ApiPropertyProps) {
  const { defaultValue, required, tsType } = props;
  return (
    <>
      <div className="flex flex-row gap-2 mb-4 align-middle font-mono">
        {required && (
          <span className="inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10">
            required
          </span>
        )}
        {defaultValue && (
          <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
            default: {defaultValue}
          </span>
        )}
        <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
          type: {tsType}
        </span>
      </div>
    </>
  );
}
