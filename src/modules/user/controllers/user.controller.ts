import { Request, Response, Router } from "express";
import { PasswordService } from "../../password/password.module";
import { UserService } from "../user.module";
import { BadRequestException, NotFoundException } from "../../../common/exceptions/http.exception";
import { SafeConverter } from "../../../common/helpers/safe-converter";
import { AuthorizationService } from "../../authorization/authorization.module";
import Multer from "multer";
import { FileService } from "../../file/file.module";
import { randomString } from "../../../common/helpers/random-string";

export class UserController {

    public router: Router;

    constructor(
        private readonly userService: UserService,
        private readonly passwordService: PasswordService,
        private readonly authorizationService: AuthorizationService,
        private readonly fileService: FileService,
    ) {
        this.router = Router();
        this.registerRoutes();
    }

    private registerRoutes() {

        const uploads = Multer({ storage: Multer.memoryStorage() });

        this.router.patch("/:id", uploads.single("picture"), this.update.bind(this));
        this.router.get("/:id", this.findOne.bind(this));

    }

    private async update(req: Request, res: Response) {

        const user = await this.userService.findOne(req.params.id, []);

        if (!user)
            throw new NotFoundException("This user is not found.");

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

        if (req.body.email && await this.userService.findByEmail(req.body.email))
            throw new BadRequestException("This user is allready exist.");
        
        const picture = req.file;
        if(picture) {
            const imgBuffer = await this.fileService.formatImg(picture.buffer, 400, 400);
            const imgInternalPath = `/profile/${user.id}/${randomString()}.png`;
            await this.fileService.write(imgInternalPath, imgBuffer);
            console.log(imgInternalPath);
            req.body.picture = imgInternalPath;
        }

        const updatedUser = await this.userService.update(req.params.id, req.body);

        delete (updatedUser as any).password;

        res.json({ data: updatedUser });
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