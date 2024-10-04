import { WithCount } from "../../../common/types/count.type";
import { Accomodation, AccomodationRepository } from "../accomodation.module";
import { CreateAccomodation, UpdateAccomodation } from "../dto/accomodation.dto";

export class AccomodationService {

    constructor(private readonly accomodationRepository: AccomodationRepository) {}

    async create(data: CreateAccomodation): Promise<Accomodation> {
        return this.accomodationRepository.create(data);
    }

    async update(id: string, data: UpdateAccomodation): Promise<Accomodation | null> {
        if (!await this.accomodationRepository.findOne(id, []))
            return null;
        return this.accomodationRepository.update(id, data);
    }

    async list(page: number, includes: string[]): Promise<WithCount<Accomodation[]>> {
        return this.accomodationRepository.list(page, includes);
    }

    async findOne(id: string, includes: string[]): Promise<Accomodation | null> {
        return this.accomodationRepository.findOne(id, includes);
    }

    async remove(id: string): Promise<boolean> {
        if (!await this.accomodationRepository.findOne(id, []))
            return false;
        await this.accomodationRepository.remove(id);
        return true;
    }

}