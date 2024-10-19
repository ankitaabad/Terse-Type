import { arkConfig } from "./mappers/ark.js";
import { typescriptConfig } from "./mappers/typescript.js";
import { zodConfig } from "./mappers/zod.js";
import { config } from "./type.js";
const splitOutsideBraces = (input) => {
  let parts = [];
  let current = "";
  let braceCount = 0;

  for (let char of input) {
    if (char === "{") {
      braceCount++;
    } else if (char === "}") {
      braceCount--;
    }

    if (char === ":" && braceCount === 0) {
      parts.push(current);
      current = "";
    } else {
      current += char;
    }
  }
  // Add the last segment
  if (current) {
    parts.push(current);
  }

  return parts;
};
/**
 * terse-type
 * @param input  takes the terse string as input
 * @param mapperConfig  zodConfig, arkConfig or typescriptConfig
 * @returns 
 */
function terseType(input: string, mapperConfig: config) :string{
  if (input === "" || input === "[]") {
    return input;
  }
  const { mapper, onEnum, onOptional } = mapperConfig;

  input = input.trim();

  if (input.startsWith("{")) {
    return `${mapper["{"]} ${terseType(input.slice(1, -1), mapperConfig)} ${
      mapper["}"]
    }`;
  }
  const commaRegex = /,(?![^{}]*\})/g;
  const dotRegex = /\.(?![^{}]*\})/g;
  const tokens = input
    .split(commaRegex)
    .map((x) => x.trim())
    .filter((x) => x !== "");
  let result = "";

  for (const item of tokens) {
    let [key, type] = splitOutsideBraces(item).map((x) => x.trim());
    let joiner = ":",
      appendWith = "";

    if (type?.endsWith("o")) {
      let obj = onOptional(key);
      key = obj.key || key;
      joiner = obj.joiner || ":";
      appendWith = obj.appendWith || "";
      type = type.slice(0, -1);
    }
    if (type?.endsWith("a")) {
      appendWith = mapper["a"] + appendWith;
      type = type.slice(0, -1);
    }
    let enumType = undefined;
    let _;
    if (type?.startsWith("e")) {
      [_, ...enumType] = type.split("_");
      enumType = onEnum(enumType.map((x) => x.toUpperCase()));
    }
    if (type?.includes("{")) {
      result += `${key} ${joiner} ${terseType(type, mapperConfig)}${appendWith},`;
    } else {
      result += `${key} ${joiner} ${mapper[type ?? "s"]}${appendWith},`;
    }
    // result += appendWith
  }
  return result;
}

export { terseType, zodConfig, typescriptConfig, arkConfig };
