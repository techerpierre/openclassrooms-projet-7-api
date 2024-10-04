import { PrismaClient } from "@prisma/client";
import { Authorization } from "../authorization.module";

export class AuhtorizationRepository {

    constructor(private readonly prisma: PrismaClient) {}

    async findOne(id: string): Promise<Authorization | null> {

        const authorization = await this.prisma.authorizations.findUnique({
            where: { id },
        });

        return authorization? new Authorization(authorization) : null;

    }

}