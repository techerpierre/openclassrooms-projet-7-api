import { Request, Response, Router } from "express";
import { UserService } from "../../user/user.module";
import { PasswordService } from "../../password/password.module";
import { JwtService } from "../../jwt/jwt.module";
import { BadRequestException, NotFoundException, UnauthorizedException } from "../../../common/exceptions/http.exception";
import { AuthorizationService } from "../../authorization/authorization.module";

export class AuthenticationController {

    public router: Router;

    constructor(
        private readonly userService: UserService,
        private readonly passwordService: PasswordService,
        private readonly jwtService: JwtService,
        private readonly authorizationService: AuthorizationService,
    ) {

        this.router = Router();
        this.registerRoutes();

    }

    registerRoutes() {
        this.router.post("/register", this.register.bind(this))
    }

    async register(req: Request, res: Response) {

        const { email, password } = req.body;

        if (!email || !password)
            throw new BadRequestException("Email and password is required.");

        if (!this.passwordService.hasFormat(password))
            throw new BadRequestException("Bad password format.");

        const hashedPassword = this.passwordService.hash(password);

        if (await this.userService.findByEmail(email))
            throw new BadRequestException("This user is already exist.");

        if (! await this.authorizationService.findOne("CLIENT"))
            throw new Error("CLIENT authorization is not specified.");

        const user = await this.userService.create({ email, password: hashedPassword, authorizationsId: "CLIENT" });

        res.json({ data: user });

    }

    async authenticate(req: Request, res: Response) {

        const { email, password } = req.body;

        if (!email || !password)
            throw new BadRequestException("Email and password is required.");

        const user = await this.userService.findByEmail(email);

        if (!user)
            throw new NotFoundException("This user is not exist.");

        if (!this.passwordService.compare(password, user.password))
            throw new UnauthorizedException("Incorrect password");

        const token = this.jwtService.sign({ id: user.id });

        res.json({ token });

    }

}