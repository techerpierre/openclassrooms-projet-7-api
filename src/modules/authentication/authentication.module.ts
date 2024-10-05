import { PrismaClient } from "@prisma/client";
import { Module } from "../../common/types/module.type";
import { Router } from "express";
import { UserRepository, UserService } from "../user/user.module";
import { PasswordService } from "../password/password.module";
import { JwtService } from "../jwt/jwt.module";
import { AuthenticationController } from "./authentication.module";
import { AuhtorizationRepository, AuthorizationService } from "../authorization/authorization.module";

export { AuthenticationController } from "./controller/authentication.controller";

export class AuthenticationModule implements Module {

    private readonly userRepository: UserRepository;
    private readonly userService: UserService;
    private readonly passwordService: PasswordService;
    private readonly jwtService: JwtService;
    private readonly authorizationrepository: AuhtorizationRepository;
    private readonly authorizationService: AuthorizationService;
    private readonly authenticationController: AuthenticationController;

    constructor(prisma: PrismaClient) {

        this.userRepository = new UserRepository(prisma);
        this.userService = new UserService(this.userRepository);
        this.passwordService = new PasswordService();
        this.jwtService = new JwtService();
        this.authorizationrepository = new AuhtorizationRepository(prisma);
        this.authorizationService = new AuthorizationService(this.authorizationrepository);
        this.authenticationController = new AuthenticationController(
            this.userService,
            this.passwordService,
            this.jwtService,
            this.authorizationService,
        );

    }

    getRouter(): Router {
        return this.authenticationController.router;
    }

}