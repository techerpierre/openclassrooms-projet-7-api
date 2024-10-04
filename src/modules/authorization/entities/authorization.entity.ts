import { User } from "../../user/user.module";

export class Authorization {
    
    id: string;
    listAccomodation: boolean;
    createAccomodation: boolean;
    deleteAccomodation: boolean;
    findAccomodation: boolean;
    searchAccomodation: boolean;
    users?: User[];

    constructor(d: any) {

        this.id = d.id;
        this.listAccomodation = d.listAccomodation;
        this.createAccomodation = d.createAccomodation;
        this.deleteAccomodation = d.deleteAccomodation;
        this.findAccomodation = d.findAccomodation;
        this.searchAccomodation = d.searchAccomodation;
        this.users = d.users && d.users.map(User);

    }
    
}