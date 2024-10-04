export namespace SafeConverter {

    export function toNumber(el: any): number | null {
        try {
            return Number(el);
        } catch {
            return null;
        }
    }
    
    export function toStringArray(array: any): string[] | null {

        if (Array.isArray(array)) {
            return array.map(el => el.toString? el.toString() : "");
        } else {
            return null;
        }

    }

}