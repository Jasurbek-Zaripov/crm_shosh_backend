import bcrypt from 'bcrypt'

export async function compare(password,hash){
    const isMatch= await bcrypt.compare(password, hash);
    return isMatch
}