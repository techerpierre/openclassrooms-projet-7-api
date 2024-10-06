import { Router } from "express";
import { Module } from "../../common/types/module.type";
import { FileController } from "./controllers/file.controller";
import { FileRepository } from "./repositories/file.repository";
import { FileService } from "./services/file.service";

export { FileRepository } from "./repositories/file.repository";
export { FileService } from "./services/file.service";
export { FileController } from "./controllers/file.controller";

export class FileModule implements Module {

    private readonly fileRepository: FileRepository;
    private readonly fileService: FileService;
    private readonly fileController: FileController;

    constructor() {

        this.fileRepository = new FileRepository();
        this.fileService = new FileService(this.fileRepository);
        this.fileController = new FileController(this.fileService);

    }

    getRouter(): Router {
        return this.fileController.router;
    }

}