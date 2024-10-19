# Terse-Type

---

- A terse language to generate types and validators.
- Currently supports `typescript types`, `Zod` and `arktype`

### Input: `{product:{id:n,name,price,inStock:b, storeName:so}`

### Output

Type:

```js
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

Zod:

```js
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
