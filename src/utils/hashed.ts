import * as bcrypt from 'bcrypt';

export async function hashed(password) {
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(password, salt);
    return hash
}