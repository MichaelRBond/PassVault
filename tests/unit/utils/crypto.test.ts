import {generatePassword} from "../../../src/utils/crypto";

describe("generate Password", () => {

  const capitals = true;
  const lowercase = true;
  const numbers = true;
  const symbols = true;
  const more_symbols = true; // tslint:disable-line

  it("generates a password of the correct length with no options", () => {
    const len = length();
    const password = generatePassword(len);
    expect(password.length).toEqual(len);
  });

  it("generates a password of the correct length with only capitals", () => {
    const len = length();
    const password = generatePassword(len, {capitals});
    expect(password.length).toEqual(len);
    expect(/^[A-Z]+$/.test(password)).toBeTruthy();
  });

  it("generates a password of the correct length with only lowercase", () => {
    const len = length();
    const password = generatePassword(len, {lowercase});
    expect(password.length).toEqual(len);
    expect(/^[a-z]+$/.test(password)).toBeTruthy();
  });

  it("generates a password of the correct length with only numbers", () => {
    const len = length();
    const password = generatePassword(len, {numbers});
    expect(password.length).toEqual(len);
    expect(/^[0-9]+$/.test(password)).toBeTruthy();
  });

  it("generates a password of the correct length with only symbols", () => {
    const len = length();
    const password = generatePassword(len, {symbols});
    expect(password.length).toEqual(len);
    expect(/^[!@#$%&]+$/.test(password)).toBeTruthy();
  });

  it("generates a password of the correct length with only more symbols", () => {
    const len = length();
    const password = generatePassword(len, {more_symbols});
    expect(password.length).toEqual(len);
    expect(/^[\^*()\-_=+\/.,><{}\[\]~\|]+$/.test(password)).toBeTruthy();
  });

  it("generates a password using multiple options and at least 1 of each option is in password", () => {
    const password = generatePassword(5, {capitals, lowercase, symbols});
    expect(password.length).toEqual(5);
    expect(/[A-Z]/.test(password)).toBeTruthy();
    expect(/[a-z]/.test(password)).toBeTruthy();
    expect(/[!@#$%&]/.test(password)).toBeTruthy();
  });

  it("generates a password with length less than number of options selected", () => {
    const password = generatePassword(2, {capitals, lowercase, numbers, symbols});
    expect(password.length).toEqual(2);
  });

});

function length(): number {
  return Math.floor(Math.random() * 5) + 8;
}
