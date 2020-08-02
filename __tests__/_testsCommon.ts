export function getRandomString(length?: number, allowDigits = true): string {
    // The allowed characters should not include symbols that are file-safe.
    let allowedCharacters = 'ABCDEFGHIJKMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    if (allowDigits) allowedCharacters += '012456789';

    let randomString = '';

    // If the length is faulty - this means that a string with random length should be returned.
    if (!length) length = getRandomNumber(10, 50);

    for (let i = 0; i < length; i++) randomString += allowedCharacters[getRandomNumber(0, allowedCharacters.length)];

    return randomString;
}

export function getRandomNumber(minValue = 0, maxValue = 1000): number {
    return Math.floor(Math.random() * (maxValue - minValue)) + minValue;
}

export function getRandomFloat(minValue = 0, maxValue = 1000): number {
    return Math.random() * (maxValue - minValue) + minValue;
}

export function getRandomProbability(perCent = 50): boolean {
    return getRandomNumber(0, 100) < perCent;
}

export const emptyStrings = [null, '', undefined, '     ', '\t\t\t', '\r\r\r', '\n\n\n', ' \t\r\n'];
