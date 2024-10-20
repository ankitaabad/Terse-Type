import { config, Mapper, onOptional } from "../type.js";

export const onOptionalArk: onOptional = (key) => {
  return {
    key: `${key}?`
  };
};
//todo: ark might not work with arrays
export const arkMapper: Mapper = {
  "b": "'boolean'",
  "n": "'number'",
  "s": "'string'",
  "a": "[]",
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
