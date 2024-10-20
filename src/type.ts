export type Mapper = {
  "b": string;
  "n": string;
  "s": string;
  "a": string;
  "na": string;
  "sa": string;
  "ba": string;
  "": string;
  "{": string;
  "}": string;
  "[]"?: string;
};
//todo: do we really need "" in mapper?

export type onEnum = (enumStrings: string[]) => string;
export type onOptional = (key: string) => {
  key?: string;
  joiner?: string;
  appendWith?: string;
};
export type config = {
  mapper: Mapper;
  onEnum: onEnum;
  onOptional: onOptional;
  name?: string;
};
