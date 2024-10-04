export namespace Include {

    export function create(vals: string[]): any {

        const include = vals.reduce((acc: any, curr: string) => {
            acc[curr] = true;
            return acc;
        }, {});

        return include;

    }

}