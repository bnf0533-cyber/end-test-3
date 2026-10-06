import z, { email } from "zod";

const usersSchema = z.object({
    username: z.string(),
    password: z.string(),
    email: z.email(),
    role: z.enum(["arena_user", "general_user", "admin"]),
    assignedArena: z.enum(["North", "South", "Center", "All"]),
});

export function checkSchema(data) {
    const res = usersSchema.safeParse(data);
    return res;
}
