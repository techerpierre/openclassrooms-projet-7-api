import { FileRepository } from "../repositories/file.repository";

export class FileService {

    constructor(private readonly fileRepository: FileRepository) {}

    async write(path: string, buffer: Buffer): Promise<void> {
        return this.fileRepository.write(path, buffer)
    }

    async read(path: string): Promise<Buffer | null> {
        return this.fileRepository.read(path);
    }

    async formatImg(buffer: Buffer, w: number, h: number): Promise<Buffer> {
        return this.fileRepository.formatImg(buffer, w, h);
    }

}