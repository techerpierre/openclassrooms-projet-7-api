export namespace stdout {

    export function success(...m: string[]) {
        process.stdout.write("[+] -> " + m.join("") + "\n");
    }

    export function error(...m: string[]) {
        process.stdout.write("[!] -> " + m.join("") + "\n");
    }

}