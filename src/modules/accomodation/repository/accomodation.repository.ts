import { PrismaClient } from "@prisma/client";

export class AccomodationRepository {

    constructor(private readonly prisma: PrismaClient) {}

}