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
