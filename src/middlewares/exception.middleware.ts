import { Response, NextFunction } from "express";
import { HTTPException } from "../common/exceptions/http.exception";
import { stdout } from "../common/helpers/log.helper";

export function ExceptionMiddleware(err: any, req: Request, res: Response, next: NextFunction) {

    if (err) {
        
        if (err instanceof HTTPException) {
            res.status(err.status).json({ error: err.message });
        } else {
            stdout.error("An unandled error occured.");
            console.log(err);
            res.status(500).json({ error: "Internal no handled error" });
        }
    } else {
        next();
    }

}