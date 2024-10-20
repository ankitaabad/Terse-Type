import { config, Mapper, onOptional } from "../type.js";
export const zodMapper: Mapper = {
  "b": "z.boolean()",
  "n": "z.number()",
  "s": "z.string()",
  "a": ".array()",
  "na": "z.number().array()",
  "sa": "z.string().array()",
  "ba": "z.boolean().array()",
  "{": "z.object({",
  "}": "})",
  "[]": ".array()",
  "": "z.string()"
};

export const onOptionalZod: onOptional = () => {
  return {
    appendWith: ".optional()"
  };
};

export const zodConfig: config = {
  mapper: zodMapper,
  onEnum: (enumStrings: string[]) => {
    return "z.enum([" + enumStrings.map((x) => `"${x}"`).join(",") + "])";
  },
  onOptional: onOptionalZod
};
