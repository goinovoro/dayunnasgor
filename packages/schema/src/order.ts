import { z } from "zod";

export const OrderStatus = z.enum(["RECEIVED", "PREPPING", "STAGED", "READY"]);
export type OrderStatus = z.infer<typeof OrderStatus>;

export const OrderItemModifier = z.object({
  id: z.string(),
  name: z.string(),
});
export type OrderItemModifier = z.infer<typeof OrderItemModifier>;

export const OrderItem = z.object({
  id: z.string(),
  name: z.string(),
  quantity: z.number().int().positive(),
  modifiers: z.array(OrderItemModifier).optional(),
});
export type OrderItem = z.infer<typeof OrderItem>;

export const OrderSchema = z.object({
  id: z.string(),
  tableNumber: z.string().min(1, "Table number is required"),
  status: OrderStatus,
  items: z.array(OrderItem).min(1, "Order must have at least one item"),
});
export type Order = z.infer<typeof OrderSchema>;

// Mock data examples
export const mockItems = [
  {
    id: "item_1",
    name: "Skipjack Tuna Rice Bowl",
    quantity: 1,
    modifiers: [
      { id: "mod_1", name: "[MOD: EXTRA SPICY]" },
      { id: "mod_2", name: "[MOD: NO ONION]" }
    ]
  },
  {
    id: "item_2",
    name: "Wagyu Beef Skewers",
    quantity: 2,
    modifiers: []
  }
];
