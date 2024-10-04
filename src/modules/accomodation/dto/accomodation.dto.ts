export interface CreateAccomodation {
    title: string;
    cover: string;
    pictures: string[];
    description: string;
    ownerId: string;
    location: string;
    equipments: string[];
    tags: string[];
}

export interface UpdateAccomodation {
    title: string;
    cover: string;
    pictures: string[];
    description: string;
    location: string;
    equipments: string[];
    tags: string[];
}
