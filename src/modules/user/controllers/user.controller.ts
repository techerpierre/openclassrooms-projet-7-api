import { Request, Response, Router } from "express";
import { PasswordService } from "../../password/password.module";
import { UserService } from "../user.module";
import { BadRequestException, NotFoundException } from "../../../common/exceptions/http.exception";
import { SafeConverter } from "../../../common/helpers/safe-converter";
import { AuthorizationService } from "../../authorization/authorization.module";

export class UserController {

    public router: Router;

    constructor(
        private readonly userService: UserService,
        private readonly passwordService: PasswordService,
        private readonly authorizationService: AuthorizationService,
    ) {
        this.router = Router();
        this.registerRoutes();
    }

    private registerRoutes() {

        this.router.patch("/:id", this.update.bind(this));
        this.router.get("/:id", this.findOne.bind(this));

    }

    private async update(req: Request, res: Response) {

        if (req.body.password) {
            if (!this.passwordService.hasFormat(req.body.password))
                throw new BadRequestException("Bad password format.");
            req.body.password = this.passwordService.hash(req.body.password);
        }

        if (req.body.status && await this.authorizationService.findOne(req.body.status)) {
            req.body.authorizationsId = req.body.status;
        } else {
            delete req.body.status;
            delete req.body.authorizationsId;
        }

        if (await this.userService.findByEmail(req.body.email))
            throw new BadRequestException("This user is allready exist.");

        const user = await this.userService.update(req.params.id, req.body);

        delete (user as any).password;

        res.json({ data: user });
    }

    private async findOne(req: Request, res: Response) {

        const includes = SafeConverter.toStringArray(req.query.includes) ?? [];

        const user = await this.userService.findOne(req.params.id, includes);

        if (!user)
            throw new NotFoundException("This user is not found.");

        delete (user as any).password;

        res.json({ data: user });

    }

}