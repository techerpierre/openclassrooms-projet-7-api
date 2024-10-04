import { JwtPayloads } from "../jwt.module";
import jwt from "jsonwebtoken";

export class JwtService {

    sign(payloads: JwtPayloads): string {

        const secret = process.env.JWT_SECRET
        if (!secret)
            throw new Error("Jwt secret missing");

        const token = jwt.sign(payloads, secret, { expiresIn: "7d" });

        return token;
    
    }

    verify(token: string): JwtPayloads | null {

        const secret = process.env.JWT_SECRET
        if (!secret)
            throw new Error("Jwt secret missing");
        
        try {
            const payloads = jwt.verify(token, secret) as JwtPayloads;
        
            return {
                id: payloads.id,
            }
        } catch {
            return null;
        }


    }

}