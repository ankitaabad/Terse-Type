import { arkConfig } from "./mappers/ark.js";
import { typescriptConfig } from "./mappers/typescript.js";
import { zodConfig } from "./mappers/zod.js";
import { config } from "./type.js";
const splitOutsideChar = (input: string, character = ":") => {
  let parts = [];
  let current = "";
  let braceCount = 0;

  for (let char of input) {
    if (char === "{") {
      braceCount++;
    } else if (char === "}") {
      braceCount--;
    }

    if (char === character && braceCount === 0) {
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

const objectTypeSplit = (input: string, mapperConfig: config) => {
  const suffix = input.slice(input.lastIndexOf("}") + 1);
  const insideBracket = input.slice(
    input.indexOf("{") + 1,
    input.lastIndexOf("}")
  );
  ({ insideBracket });
  let toAppend = "";
  if (suffix.includes("a")) {
    toAppend += mapperConfig.mapper["[]"];
  }
  // add check for typescript config
  if (suffix.includes("o") && mapperConfig.name !== "typescript") {
    // not for typescript types
    toAppend += mapperConfig.onOptional("").appendWith;
  }
  return {
    suffix,
    insideBracket,
    toAppend,
    joiner: mapperConfig.onOptional("").joiner ?? ":"
  };
};
function terseType(input: string, mapperConfig: config): string {
  if (input === "" || input === "[]") {
    return input;
  }
  const { mapper, onEnum, onOptional } = mapperConfig;

  input = input.trim();

  if (input.startsWith("{")) {
    const { insideBracket, toAppend } = objectTypeSplit(input, mapperConfig);

    return `${mapper["{"]} ${terseType(insideBracket, mapperConfig)} ${
      mapper["}"]
    }${toAppend}`;
  }
  const tokens = splitOutsideChar(input, ",")
    .map((x) => x.trim())
    .filter((x) => x !== "");
  let result = "";

  for (const item of tokens) {
    let [key, type] = splitOutsideChar(item).map((x) => x.trim());
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
    if (type?.startsWith("{")) {
      const { insideBracket, toAppend } = objectTypeSplit(type, mapperConfig);
      //todo: do we really need toAppend and appendWith both
      result += `${key} ${joiner} ${mapper["{"]} ${terseType(
        insideBracket,
        mapperConfig
      )}${mapper["}"]}${toAppend}${appendWith} ,`;
      continue;
    }
    let enumType: string[] = [];
    let enumTypeAppend: string | undefined;
    if (type?.startsWith("e")) {
      enumType = type.split("_")?.slice(1);
      enumTypeAppend = onEnum(enumType.map((x) => x.toUpperCase()));
    }
    // if (type?.includes("{")) {
    //   result += `${key} ${joiner} ${terseType(
    //     type,
    //     mapperConfig
    //   )}${appendWith},`;
    // } else {
    // }
    type mapperkey = keyof typeof mapper;
    result += `${key} ${joiner} ${
      enumTypeAppend ?? mapper[(type ?? "s") as mapperkey]
    }${appendWith},`;
    // result += appendWith
  }
  return result;
}
// console.log(
//   terseType(
//     "{ name,budget:n,description:o,isActive:b,tasks:{title,priority:e_low_medium_high}ao}",
//     zodConfig
//   )
// );
export { terseType, zodConfig, typescriptConfig, arkConfig };

//todo: commonjs support


