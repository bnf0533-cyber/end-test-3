import bcrypt from "bcrypt";

export async function hashPassword(pass) {
    const hash = await bcrypt.hash(pass, 10);
    return hash;
}
export async function comparePassword(pass, hashPass) {
    const compare = await bcrypt.compare(pass, hashPass);
    return compare;
}
