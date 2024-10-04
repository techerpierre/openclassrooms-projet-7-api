import Express from "express";
import { stdout } from "./common/helpers/log.helper";
import { config } from "dotenv";
import { ExceptionMiddleware } from "./middlewares/exception.middleware";

function main() {
    config();
    const app = Express();
    app.use(Express.json());

    app.use(ExceptionMiddleware as any);

    const port = process.env.PORT ? Number(process.env.PORT) : 8080;

    app.listen(port, () => {
        stdout.success("api is running on http://localhost:", port.toString());
    });
}

main();
