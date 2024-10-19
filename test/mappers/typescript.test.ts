import { describe, expect, test } from "vitest";
import { typescriptConfig } from "../../src/mappers/typescript.js";
import { terseType } from "../../src/index.js";
import { zodConfig } from "../../src/mappers/zod.js";

describe("typescript types", () => {
  test("simple object", () => {
    const result = terseType("name,city,number:n", typescriptConfig);
    expect(result).toMatchInlineSnapshot(
      `"name : string,city : string,number : number,"`
    );
  });
  test("nested object", () => {
    const result = terseType("{address.{city.so,postal.nao}}", zodConfig);
    expect(result).toMatchInlineSnapshot(
      `"z.object({ address : z.object({ city : z.string().optional(),postal : z.number().array().optional(), }), })"`
    );
  });
  test("nested object", () => {
    const result = terseType("{address.{city.so,postal.nao}}", typescriptConfig);
    expect(result).toMatchInlineSnapshot(`"{ address : { city ?: string,postal ?: number[], }, }"`);
  });
  test("simple object", () => {
    const result = terseType("name,city.o,", zodConfig);
    expect(result).toMatchInlineSnapshot(`"name : z.string(),city : z.string().optional(), : z.string(),"`);
  });
  test("simple object", () => {
    const result = terseType("name,city.o,", typescriptConfig);
    expect(result).toMatchInlineSnapshot(`"name : string,city ?: string, : string,"`);
  });
  test("weird", () => {
    const result = terseType("address.{country.{city.village.so}}", typescriptConfig);
    expect(result).toMatchInlineSnapshot(`"address : {country : string,,"`);
  });
});
