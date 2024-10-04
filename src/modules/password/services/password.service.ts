import * as bcrypt from "bcrypt";

export class PasswordService {

    hash(plainPassword: string): string {

        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(plainPassword, salt);

        return hashedPassword;

    }

    compare(plainPassword: string, hash: string): boolean {
        return bcrypt.compareSync(plainPassword, hash);
    }

    hasFormat(password: string): boolean {
        const format = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,}$/;
        return format.test(password);
    }

}