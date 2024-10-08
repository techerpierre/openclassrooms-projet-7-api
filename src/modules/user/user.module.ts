import { PrismaClient } from "@prisma/client";
import { Module } from "../../common/types/module.type";
import { Router } from "express";
import { UserRepository } from "./user.module";
import { UserService } from "./user.module";
import { UserController } from "./controllers/user.controller";
import { PasswordService } from "../password/password.module";
import { AuhtorizationRepository, AuthorizationService } from "../authorization/authorization.module";
import { FileRepository, FileService } from "../file/file.module";

export { User } from "./entities/user.entity";
export { UserRepository } from "./repository/user.repository";
export { UserService } from "./services/user.service";

export class UserModule implements Module {

    private readonly userRepository: UserRepository;
    private readonly userService: UserService;
    private readonly passwordService: PasswordService;
    private readonly authorizationService: AuthorizationService;
    private readonly fileRepository: FileRepository;
    private readonly fileService: FileService;
    private readonly userController: UserController;

    constructor(prisma: PrismaClient) {

        this.userRepository = new UserRepository(prisma);
        this.userService = new UserService(this.userRepository);
        this.passwordService = new PasswordService();
        this.authorizationService = new AuthorizationService(new AuhtorizationRepository(prisma));
        this.fileRepository = new FileRepository();
        this.fileService = new FileService(this.fileRepository);
        this.userController = new UserController(
            this.userService,
            this.passwordService,
            this.authorizationService,
            this.fileService,
        );

    }

    getRouter(): Router {
        return this.userController.router;
    }
    
}