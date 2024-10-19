export type Mapper = {
  "b": string;
  "n": string;
  "s": string;
  "a": string
  "na": string;
  "sa": string;
  "ba": string;
  "": string;
  "{": string;
  "}": string;
  "[]"?: string;
};

export type onEnum = (enumStrings: string[]) => string;
export type onOptional = (key: string) => {
  key?: string;
  joiner?: string;
  appendWith?: string;
};
export type config = { mapper: Mapper; onEnum: onEnum; onOptional: onOptional };

