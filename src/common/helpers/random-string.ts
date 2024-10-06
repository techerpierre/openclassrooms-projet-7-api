export function randomString(): string {
    const firstPart = Date.now().toString(36);
    const secondPart = Math.random().toString(36).substring(2, 6);
    return `${firstPart}-${secondPart}`;
}