import { describe, expect, test } from "vitest";
import { typescriptConfig } from "../../src/mappers/typescript.js";
import { terseType } from "../../src/index.js";
import { zodConfig } from "../../src/mappers/zod.js";

describe("typescript types", () => {
  test("simple object", () => {
    const result = terseType("{username,email,age:n,hobbies:{name,frequency}ao,isActive:b,roles:sa", zodConfig);
    expect(result).toMatchInlineSnapshot(
      );
  });
  test("nested object", () => {
    const result = terseType("{address:{city:so,postal:nao}}o", zodConfig);
    expect(result).toMatchInlineSnapshot(
      `"z.object({ address : z.object({ city : z.string().optional(),postal : z.number().array().optional(), }), })"`
    );
  });
  test.only("nested object", () => {
    const result = terseType(
      "{address:{city:so,postal:nao}o}",
      typescriptConfig
    );
    expect(result).toMatchInlineSnapshot(
      `"{ address ?: { city ?: string,postal ?: number[],} , }"`
    );
  });
  test("simple object", () => {
    const result = terseType("name,city:o,", zodConfig);
    expect(result).toMatchInlineSnapshot(
      `"name : z.string(),city : z.string().optional(),"`
    );
  });
  test("simple object", () => {
    const result = terseType("{name,address:{city}a}", typescriptConfig);
    expect(result).toMatchInlineSnapshot(
      `"{ name : string,address : { city : string,}[] , }"`
    );
  });
  test("weird", () => {
    const result = terseType(
      "address:o{country:o{city:o{village:so}}}",
      typescriptConfig
    );
    expect(result).toMatchInlineSnapshot(`"address : undefined,"`);
  });
  test("object", () => {
    const result = terseType("{name}", zodConfig);
    expect(result).toMatchInlineSnapshot(`
      "z.object({ name : z.string(), })"
    `);
  });
});
