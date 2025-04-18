import { z } from "zod";

export const addOrderSchema = z.object({
    group_uuid: z.string().min(1, { message: "缺少開團ID" }),
    name: z.string().min(1, { message: "訂購人為必填" }),
    item_name: z.string().min(1, { message: "品項為必填" }),
    quantity: z.number().min(1, { message: "數量最少為1" }),
    price: z.number().min(1, { message: "價錢不得小於1" }),
    note: z
        .string()
        .min(1, { message: "『甜度』、『冰塊』與『尺寸』為必填" })
        .refine(
            (val) =>
                val.includes("甜度:") &&
                val.includes("冰塊:") &&
                val.includes("尺寸:"),
            {
                message: "『甜度』、『冰塊』與『尺寸』為必填",
            }
        ),
});
