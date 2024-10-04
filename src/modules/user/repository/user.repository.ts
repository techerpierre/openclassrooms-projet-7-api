import { PrismaClient } from "@prisma/client";
import { CreateUser, UpdateUser } from "../dto/user.dto";
import { User } from "../user.module";
import { Include } from "../../../common/helpers/include.helpers";

export class UserRepository {

    constructor(private readonly prisma: PrismaClient) {}

    async create(data: CreateUser): Promise<User> {

        const user = await this.prisma.user.create({
            data: {
                email: data.password,
                password: data.password,
                authorizationsId: data.authorizationsId,
            },
        });

        return new User(user);

    }

    async update(id: string, data: UpdateUser): Promise<User> {

        const user = await this.prisma.user.update({
            where: { id },
            data: {
                email: data.email,
                password: data.password,
                firstname: data.firstname,
                lastname: data.lastname,
                picture: data.picture,
                status: data.status as any,
            },
        });

        return new User(user);

    }

    async findOne(id: string, includes: string[]): Promise<User> {

        const user = await this.prisma.user.findUnique({
            where: { id },
            include: Include.create(includes),
        });

        return new User(user);

    }

}