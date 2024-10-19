# Terse-Type

---

- A terse language to generate types and validators.
- Currently supports `typescript types`, `Zod` and `arktype`

### Usage
```ts
import { terseType, zodConfig } from "terse-type";
console.log(
  terseType("{product:{id:n,name,price,inStock:b, storeName:so}", zodConfig)
);
```

### Output

Zod:

```ts
const x = z.object({
  product: z.object({
    id: z.number(),
    name: z.string(),
    price: z.string(),
    inStock: z.boolean(),
    storeName: z.string().optional()
  })
});
```
___

Type:

```ts
type x = {
 product: {
   id: number;
   name: string;
   price: string;
   inStock: boolean;
   storeName?: string;
 };
}
```

