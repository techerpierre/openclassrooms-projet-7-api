import { Rating } from "../../rating/rating.module";
import { Accomodation } from "../../accomodation/accomodation.module";
import { Authorization } from "../../authorization/authorization.module";

export class User {

    id: string;
    email: string;
    firstname?: string;
    lastname?: string;
    picture?: string;
    status: string;
    role: string;
    accomodations?: Accomodation[];
    ratings?: Rating[];
    authorizationsId: string;
    authorizations: Authorization;

    constructor(d: any) {
        this.id = d.id;
        this.email = d.email;
        this.firstname = d.firstname;
        this.lastname = d.lastname;
        this.picture = d.picture;
        this.status = d.status;
        this.role = d.role;
        this.accomodations = d.accomodations && d.accomodations.map(Accomodation);
        this.ratings = d.ratings && d.ratings.map(Rating);
        this.authorizationsId = d.authorizationsId;
        this.authorizations = d.authorizations && new Authorization(d.authorizations);
    }

}