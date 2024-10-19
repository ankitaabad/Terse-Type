import { config, Mapper, onOptional } from "../type";

export const onOptionalArk: onOptional = (key) => {
  return {
    key: `${key}?`
  };
};
export const arkMapper: Mapper = {
  "b": "'boolean'",
  "n": "'number'",
  "s": "'string'",
  "na": "'number[]'",
  "sa": "'string[]'",
  "ba": "'boolean[]'",
  "": "'string'",
  "{": "{",
  "}": "}"
};
export const arkConfig: config = {
  mapper: arkMapper,
  onEnum: (enumStrings) => {
    return enumStrings.map((x) => `'${x}'`).join("");
  },
  onOptional: (key) => {
    return { key: `${key}?` };
  }
};
