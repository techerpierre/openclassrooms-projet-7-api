import sharp from "sharp";
import fs from "fs";
import Path from "path";

export class FileRepository {

    async write(path: string, buffer: Buffer): Promise<void> {

        const completePath = Path.join(process.cwd(), process.env.FILE_UPLOAD_PATH || "/data", path);

        fs.mkdirSync(completePath.split("/").pop() || "/", { recursive: true });

        fs.writeFile(completePath, buffer, (err) => {
            if (err) throw err;
        });

    }

    async read(path: string): Promise<Buffer | null> {

        const completePath = Path.join(process.cwd(), process.env.FILE_UPLOAD_PATH || "/data", path);
        try {
            return fs.readFileSync(completePath);
        } catch {
            return null;
        }

    }

    async formatImg(buffer: Buffer, w: number, h: number) {

        const resizedBuffer = await sharp(buffer).resize(w, h).png().toBuffer();
        return resizedBuffer;

    }

}