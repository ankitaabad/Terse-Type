import { describe, expect, test } from "vitest";
import { terseType, zodConfig, typescriptConfig } from "../src/index.js";
// import {zodConfig} from "..//src/index.js"
const configMap = {
  "zod": zodConfig,
  "typescript": typescriptConfig
} as const;
describe("terse Types", () => {
  //input : {a,b:nao,c:sao,d:sa,e:no,f:bao,g:bo,h:ba,i:o,j:e_one_two_three}
  test.each([
    [
      "zod",
      'z.object({ a : z.string(),b : z.number().array().optional(),c : z.string().array().optional(),d : z.string().array(),e : z.number().optional(),f : z.boolean().array().optional(),g : z.boolean().optional(),h : z.boolean().array(),i : z.string().optional(),j : z.enum(["ONE","TWO","THREE"]), })'
    ],
    [
      "typescript",
      '{ a : string,b ?: number[],c ?: string[],d : string[],e ?: number,f ?: boolean[],g ?: boolean,h : boolean[],i ?: string,j : "ONE"|"TWO"|"THREE", }'
    ]
  ])("Simple Object : %s", (config, output) => {
    expect(
      terseType(
        "{a,b:nao,c:sao,d:sa,e:no,f:bao,g:bo,h:ba,i:o,j:e_one_two_three}",
        configMap[config]
      )
    ).toBe(output);
  });
  //input : "{ name,budget:n,description:o,isActive:b,tasks:{title,priority:e_low_medium_high}ao}"
  test.each([
    [
      "zod",
      'z.object({ name : z.string(),budget : z.number(),description : z.string().optional(),isActive : z.boolean(),tasks : z.object({ title : z.string(),priority : z.enum(["LOW","MEDIUM","HIGH"]),}).array().optional() , })'
    ],
    [
      "typescript",
      '{ name : string,budget : number,description ?: string,isActive : boolean,tasks ?: { title : string,priority : "LOW"|"MEDIUM"|"HIGH",}[] , }'
    ]
  ])("Nested Object : %s", (config, output) => {
    expect(
      terseType(
        "{ name,budget:n,description:o,isActive:b,tasks:{title,priority:e_low_medium_high}ao}",
        configMap[config]
      )
    ).toBe(output);
  });
});
