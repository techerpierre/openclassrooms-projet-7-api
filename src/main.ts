import Express from "express";
import { stdout } from "./common/helpers/log.helper";
import { config } from "dotenv";
import { ExceptionMiddleware } from "./middlewares/exception.middleware";
import { AccomodationModule } from "./modules/accomodation/accomodation.module";
import { PrismaClient } from "@prisma/client";
import "express-async-errors";
import { UserModule } from "./modules/user/user.module";
import { AuthenticationModule } from "./modules/authentication/authentication.module";

function main() {
    config();
    const app = Express();
    app.use(Express.json());

    const prisma = new PrismaClient();
    const accomodationModule = new AccomodationModule(prisma);
    const userModule = new UserModule(prisma);
    const authenticationModule = new AuthenticationModule(prisma);

    app.use("/accomodations", accomodationModule.getRouter());
    app.use("/users", userModule.getRouter());
    app.use("/auth", authenticationModule.getRouter());
    app.use(ExceptionMiddleware as any);

    const port = process.env.PORT ? Number(process.env.PORT) : 8080;

    app.listen(port, () => {
        stdout.success("api is running on http://localhost:", port.toString());
    });
}

main();
