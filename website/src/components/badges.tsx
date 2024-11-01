/* eslint-disable react/no-multi-comp */
import React from "react";

export function Badges({ children }) {
  return <div className="flex flex-wrap gap-2 mb-5">{children}</div>;
}

export function Badge({ children, className }) {
  return (
    <span
      className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-mono ring-1 ring-inset ${className}`}
    >
      {children}
    </span>
  );
}

export function TypeBadge({ value }) {
  return (
    <Badge className="bg-blue-50 text-blue-700 ring-blue-700/10">
      type: {value}
    </Badge>
  );
}

export function OverriddenBadge() {
  return (
    <Badge className="bg-gray-50 text-gray-600 ring-gray-500/10">
      overridden
    </Badge>
  );
}

export function RequiredBadge() {
  return (
    <Badge className="bg-red-50 text-red-700 ring-red-600/10">Required</Badge>
  );
}

export function DefaultsBadge({ value }) {
  return (
    <Badge className="bg-green-50 text-green-700 ring-green-600/20">
      default: {value}
    </Badge>
  );
}
