declare var window: any;

export interface PasswordGenerationOptions {
    symbols?: boolean;
    more_symbols?: boolean;
}

export default function generatePassword(length: number, options?: PasswordGenerationOptions): string {
    let chars = 'abcdefghijklmnopqrstuvwxyz';
    chars = chars + chars.toUpperCase();
    chars = chars + '1234567890';

    if(options && options.symbols) {
        chars = chars + '!@#$%&';
    }

    if(options && options.more_symbols) {
        chars = chars + '^*()-_=+/.,><{}[]~|';
    }

    let password = "";

    const values = new Uint16Array(length);
    let crypto = window.crypto || window.msCrypto;
    crypto.getRandomValues(values);
    values.forEach((value) => {
        password = password + chars[Math.floor((value / 0xffff) * chars.length)];
    });

    return password;
}
