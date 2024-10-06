import { Request, Response, Router } from "express";
import { FileService } from "../services/file.service";
import { BadRequestException, NotFoundException } from "../../../common/exceptions/http.exception";
import { Readable } from "stream";

export class FileController {

    public router: Router;

    constructor(private readonly fileService: FileService) {
        this.router = Router();
        this.registerRoutes();
    }

    registerRoutes() {
        this.router.get("/", this.read.bind(this));
    }

    async read(req: Request, res: Response) {
        if (!req.query.internal_path || typeof req.query.internal_path !== "string")
            throw new BadRequestException("The \"internal_path\" query is not specified or has bad format.");
        const file = await this.fileService.read(req.query.internal_path);
        if (!file)
            throw new NotFoundException("This file is not found.");

        const stream = new Readable();

        switch(true) {
            case req.query.internal_path.endsWith(".png"):
                res.setHeader("Content-Type", "image/png");
                break;
        }

        stream.push(file);
        stream.push(null);

        stream.pipe(res);
    }

}