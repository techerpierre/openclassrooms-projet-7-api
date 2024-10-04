import { Request, Response, Router } from "express";
import { AccomodationService } from "../accomodation.module";
import { SafeConverter } from "../../../common/helpers/safe-converter";
import { BadRequestException, NotFoundException } from "../../../common/exceptions/http.exception";

export class AccomodationController {
    public router: Router;
    
    constructor(private readonly accomodationService: AccomodationService) {
        this.router = Router();
        this.registerRoutes();
    }

    registerRoutes() {
        this.router.post("/", this.create.bind(this));
        this.router.patch("/:id", this.update.bind(this));
        this.router.get("/", this.list.bind(this));
        this.router.get("/:id", this.findOne.bind(this));
        this.router.delete("/:id", this.remove.bind(this));
    }

    private async create(req: Request, res: Response) {

        const accomodation = await this.accomodationService.create(req.body);
        res.json({ data: accomodation });

    }

    private async update(req: Request, res: Response) {

        const accomodation = await this.accomodationService.update(req.params.id, req.body);
        if (!accomodation)
            throw new NotFoundException();

        res.json({ data: accomodation });

    }

    private async list(req: Request, res: Response) {

        if (!req.query.page)
            throw new BadRequestException("Page query is missing.");
        const page = SafeConverter.toNumber(req.query.page);
        if (page === null)
            throw new BadRequestException("Unable to convert page query in string.");

        const includes = SafeConverter.toStringArray(req.query.includes) ?? [];

        const data = await this.accomodationService.list(page, includes);

        res.json(data);

    }

    private async findOne(req: Request, res: Response) {

        const includes = SafeConverter.toStringArray(req.query.includes) ?? [];

        const accomodation = await this.accomodationService.findOne(req.params.id, includes);
        if (!accomodation)
            throw new NotFoundException();

        res.json({ data: accomodation });

    }

    private async remove(req: Request, res: Response) {
        
        const ok = await this.accomodationService.remove(req.params.id);
        if (!ok)
            throw new NotFoundException();

        res.json({ message: "success" });

    }

}