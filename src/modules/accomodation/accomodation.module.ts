import { PrismaClient } from "@prisma/client";
import { AccomodationRepository } from "./accomodation.module";
import { AccomodationService } from "./accomodation.module";
import { AccomodationController } from "./accomodation.module";
import { Module } from "../../common/types/module.type";

export { Accomodation } from "./entities/accomodation.entity";
export { AccomodationRepository } from "./repository/accomodation.repository";
export { AccomodationService } from "./services/accomodation.service";
export { AccomodationController } from "./controllers/accomodation.controller";

export class AccomodationModule implements Module {

    private readonly accomodationRepository: AccomodationRepository;
    private readonly accomodationService: AccomodationService;
    private readonly accomodationController: AccomodationController;

    constructor(prisma: PrismaClient) {

        this.accomodationRepository = new AccomodationRepository(prisma);
        this.accomodationService = new AccomodationService(this.accomodationRepository);
        this.accomodationController = new AccomodationController(this.accomodationService);

    }

    getRouter() {
        return this.accomodationController.router;
    }

}
