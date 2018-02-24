import * as crypto from "crypto";
import { isBlank } from "./helpers";

const CHARS_LOWERCASE = "abcdefghijklmnopqrstuvwxyz";
const CHARS_CAPITALS = CHARS_LOWERCASE.toUpperCase();
const CHARS_NUMBERS = "1234567890";
const CHARS_SYMBOLS = "!@#$%&";
const CHARS_MORE_SYMBOLS = "^*()-_=+/.,><{}[]~|";

export interface PasswordGenerationOptions {
    numbers?: boolean;
    capitals?: boolean;
    lowercase?: boolean;
    symbols?: boolean;
    more_symbols?: boolean;
}

export function generatePassword(length: number, options?: PasswordGenerationOptions): string {
  let chars = "";
  if (!options || numTruthyOptions(options) === 0) {
    chars = chars + CHARS_LOWERCASE + CHARS_CAPITALS + CHARS_NUMBERS + CHARS_SYMBOLS + CHARS_MORE_SYMBOLS;
  } else {
    chars = chars + (options.capitals ? CHARS_CAPITALS : "");
    chars = chars + (options.lowercase ? CHARS_LOWERCASE : "");
    chars = chars + (options.numbers ? CHARS_NUMBERS : "");
    chars = chars + (options.symbols ? CHARS_SYMBOLS : "");
    chars = chars + (options.more_symbols ? CHARS_MORE_SYMBOLS : "");
  }

  let password = "";
  while (isBlank(password)) {
    for (let i = 0; i < length; i++) {
      password = password + chars[crypto.randomBytes(1)[0] % chars.length];
    }
    if (!verifyPassword(password, options)) {
      password = "";
    }
  }

  return password;
}

function verifyPassword(password: string, options: PasswordGenerationOptions): boolean {
  const regexCapitals = new RegExp(`[${CHARS_CAPITALS}]`);
  const regexLowercase = new RegExp(`[${CHARS_LOWERCASE}]`);
  const regexNumbers = new RegExp(`[${CHARS_NUMBERS}]`);
  const regexSymbols = new RegExp(`[${CHARS_SYMBOLS}]`);
  const regexMoreSymbols = new RegExp(`[${CHARS_MORE_SYMBOLS}]`);

  if (!options || password.length < numTruthyOptions(options)) {
    return true;
  }

  if (options.capitals && ! regexCapitals.test(password)) {
    return false;
  }
  if (options.lowercase && ! regexLowercase.test(password)) {
    return false;
  }
  if (options.numbers && ! regexNumbers.test(password)) {
    return false;
  }
  if (options.symbols && ! regexSymbols.test(password)) {
    return false;
  }
  if (options.more_symbols && ! regexMoreSymbols.test(password)) {
    return false;
  }
  return true;
}

function numTruthyOptions(options: PasswordGenerationOptions): number {
  let count = 0;
  Object.keys(options).forEach((key: keyof PasswordGenerationOptions) => {
    if (options[key]) {
      count++;
    }
  });
  return count;
}
