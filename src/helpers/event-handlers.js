import { uniqueId } from "lodash";

export const attachId = (func) => {
  return (...args) => ({
    mutations: func(...args),
    id: uniqueId("throttledEvent")
  });
};
