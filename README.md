# Terse-Type

- A terse language to generate types and validators.
- Currently supports `typescript types`, `Zod`
- Useful for your CLI inputs and macros.

### Usage

```ts
import { terseType, zodConfig } from "terse-type";
console.log(
  terseType(
    "{ name,budget:n,description:o,isActive:b,tasks:{title,priority:e_low_medium_high}ao}",
    zodConfig
  )
);
```

**Generated output assigned to ProductZod.**

```ts
const ProductZod = z.object({
  name: z.string(),
  budget: z.number(),
  description: z.string().optional(),
  isActive: z.boolean(),
  tasks: z
    .object({ title: z.string(), priority: z.enum(["LOW", "MEDIUM", "HIGH"]) })
    .array()
    .optional()
});
```

---

```ts
import { terseType, typescriptConfig } from "terse-type";
console.log(
  terseType(
    "{ name,budget:n,description:o,isActive:b,tasks:{title,priority:e_low_medium_high}ao}",
    typescriptConfig
  )
);
```

**Generated output assigned to ProductType.**

```ts
type ProductType = {
  name: string;
  budget: number;
  description?: string;
  isActive: boolean;
  tasks?: { title: string; priority: "LOW" | "MEDIUM" | "HIGH" }[];
};
```
___

**Another Example**
`input : {a,b:nao,c:sao,d:sa,e:no,f:bao,g:bo,h:ba,i:o,j:e_one_two_three}`

**Zod** 
```ts
const zodResult = z.object({
  a: z.string(),
  b: z.number().array().optional(),
  c: z.string().array().optional(),
  d: z.string().array(),
  e: z.number().optional(),
  f: z.boolean().array().optional(),
  g: z.boolean().optional(),
  h: z.boolean().array(),
  i: z.string().optional(),
  j: z.enum(["ONE", "TWO", "THREE"])
});
```

**Typescript**

```ts
type typeResult = {
  a: string;
  b?: number[];
  c?: string[];
  d: string[];
  e?: number;
  f?: boolean[];
  g?: boolean;
  h: boolean[];
  i?: string;
  j: "ONE" | "TWO" | "THREE";
};
```