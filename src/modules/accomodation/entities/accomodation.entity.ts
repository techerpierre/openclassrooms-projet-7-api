import { Rating } from "../../rating/rating.module";
import { User } from "../../user/user.module";

export class Accomodation {
    
    id: string;
    title: string;
    cover: string;
    pictures: string[];
    description: string;
    ownerId: string;
    owner?: User;
    ratings?: Rating[];
    location: string;
    equipments: string[];
    tags: string[];

    constructor(d: any) {
        this.id = d.id;
        this.title = d.title;
        this.cover = d.cover;
        this.pictures = d.pictures;
        this.description = d.description;
        this.ownerId = d.ownerId;
        this.owner = d.owner && new User(d.owner);
        this.ratings = d.ratings && d.ratings.map(Rating);
        this.location = d.location;
        this.equipments = d.equipments;
        this.tags = d.tags;
    }

}