import { PasswordService } from "../../password/password.module";
import { CreateUser, UpdateUser } from "../dto/user.dto";
import { User, UserRepository } from "../user.module";

export class UserService {
    
    constructor(
        private readonly userRepository: UserRepository,
    ) {}

    async create(data: CreateUser): Promise<User | null> {
        return this.userRepository.create(data);
    }

    async update(id: string, data: UpdateUser): Promise<User> {
        return this.userRepository.update(id, data);
    }

    async findOne(id: string, includes: string[]): Promise<User> {
        return this.userRepository.findOne(id, includes);
    }

    async findByEmail(email: string): Promise<User> {
        return this.userRepository.findByEmail(email);
    }

}