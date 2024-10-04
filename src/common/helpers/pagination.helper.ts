import { clamp } from "./clamp.helper";

export namespace Pagination {

    export function paginate(page: number, count: number, pageSize = 30) {

        const pageNumber = Math.floor(count / pageSize);
        const clampedPage = clamp(page, 0, pageNumber);

        const skip = pageSize * pageNumber;

        return { skip, take: pageSize };

    }

}