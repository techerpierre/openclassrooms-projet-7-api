import { AuhtorizationRepository, Authorization } from "../authorization.module";

export class AuthorizationService {

    constructor(private readonly authorizationRepository: AuhtorizationRepository) {}

    async findOne(id: string): Promise<Authorization | null> {
        return this.authorizationRepository.findOne(id);
    }

}