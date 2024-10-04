import { PrismaClient } from "@prisma/client";
import { CreateAccomodation, UpdateAccomodation } from "../dto/accomodation.dto";
import { Accomodation } from "../accomodation.module";
import { Pagination } from "../../../common/helpers/pagination.helper";
import { WithCount } from "../../../common/types/count.type";
import { Include } from "../../../common/helpers/include.helpers";

export class AccomodationRepository {

    constructor(private readonly prisma: PrismaClient) {}

    async create(data: CreateAccomodation): Promise<Accomodation> {

        const accomodation = await this.prisma.accomodation.create({
            data: {
                title: data.title,
                cover: data.cover,
                pictures: data.pictures,
                description: data.description,
                ownerId: data.ownerId,
                location: data.location,
                equipements: data.equipments,
                tags: data.tags,
            },
        });

        return new Accomodation(accomodation);

    }

    async update(id: string, data: UpdateAccomodation): Promise<Accomodation> {

        const accomodation = await this.prisma.accomodation.update({
            where: { id },
            data: {
                title: data.title,
                cover: data.cover,
                pictures: data.pictures,
                description: data.description,
                location: data.location,
                equipements: data.equipments,
                tags: data.tags,
            },
        });

        return new Accomodation(accomodation);

    }

    async list(page: number, includes: string[]): Promise<WithCount<Accomodation[]>> {

        const count = await this.prisma.accomodation.count();
        const { skip, take } = Pagination.paginate(page, count);

        const accomodations = await this.prisma.accomodation.findMany({
            skip,
            take,
            include: Include.create(includes),
        });

        return { data: this.mapAccomodation(accomodations), count };

    }

    async findOne(id: string, includes: string[]): Promise<Accomodation | null> {

        const accomodation = await this.prisma.accomodation.findUnique({
            where: { id },
            include: Include.create(includes),
        });

        return accomodation ? new Accomodation(accomodation) : null;

    }

    async remove(id: string): Promise<void> {

        await this.prisma.accomodation.delete({
            where: { id },
        });

    }

    mapAccomodation(accomodations: any) {
        return accomodations.map((el: any) => new Accomodation(el));
    }

}