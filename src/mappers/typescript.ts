import { config, Mapper, onOptional } from "../type.js";

export const onOptionalType: onOptional = () => {
  return {
    joiner: "?:"
  };
};

export const typeMapper: Mapper = {
  "b": "boolean",
  "n": "number",
  "s": "string",
  "a": "[]",
  "na": "number[]",
  "sa": "string[]",
  "ba": "boolean[]",
  "[]": "[]",
  "": "string",
  "{": "{",
  "}": "}"
};
export const typescriptConfig: config = {
  mapper: typeMapper,
  onEnum: (enumStrings) => {
    return enumStrings.map((x) => `'${x}'`).join("|");
  },
  onOptional: onOptionalType,
  name: "typescript"
};
