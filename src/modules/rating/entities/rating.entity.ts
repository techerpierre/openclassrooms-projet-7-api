import { Accomodation } from "../../accomodation/accomodation.module";
import { User } from "../../user/user.module";

export class Rating {

    id: string;
    value: number;
    userId: string;
    user?: User;
    accomodationId: string;
    accomodation?: Accomodation;

    constructor(d: any) {

        this.id = d.id;
        this.value = d.value;
        this.userId = d.userId;
        this.user = d.user && new User(d.user);
        this.accomodationId = d.accomodationId;
        this.accomodation = d.accomodation && new Accomodation(d.accomodation);

    }

}