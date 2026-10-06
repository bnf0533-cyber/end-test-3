import z from "zod";

const alertSchema = z.object({
    displayName: z.string(),
    description: z.string(),
    priority: z.enum(["Low", "Medium", "High", "Critical"]),
    arena: z.enum(["North", "South", "Center"]),
    status: z.enum(["Active", "Handled"]),
    lon: z.number().min(-180).max(180),
    lat: z.number().min(-90).max(90),
});

const updateAlertSchema = alertSchema.partial();

export function checkUpdateSchema(data) {
    const res = updateAlertSchema.safeParse(data);
    return res;
}

export function checkSchema(data) {
    const res = alertSchema.safeParse(data);
    return res;
}
