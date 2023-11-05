import jwt from "jsonwebtoken"

export const sign = (payload) => jwt.sign(payload, "hamburger")

export const verify = (token) => jwt.verify(token, "hamburger")
