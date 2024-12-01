import AES from "crypto-js/aes";
import Utf8 from "crypto-js/enc-utf8";
import Base64 from "crypto-js/enc-base64";
import { hash } from "@kadena/cryptography-utils";
import * as bip39 from "bip39";

export const generateMnemonic = () => {
  return bip39.generateMnemonic(256);
};

export const encrypt = (message: string, secret: string): string => {
  const encJson = AES.encrypt(JSON.stringify(message), hash(secret)).toString();
  return Base64.stringify(Utf8.parse(encJson));
};

export const decrypt = (message: string, secret: string): string => {
  const decData = Base64.parse(message).toString(Utf8);
  return JSON.parse(AES.decrypt(decData, hash(secret)).toString(Utf8));
};

export class StoredPasswordHash {
  constructor(password: string) {
    this.salt = makeRandomAlphaNumeric(32);
    this.hashed = hash(this.salt + password);
  }
  salt: string;
  hashed: string;
}

function makeRandomAlphaNumeric(length: number) {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}

export function comparePasswordToHash(
  password: string,
  storedPasswordHash: StoredPasswordHash
): boolean {
  if (storedPasswordHash.hashed === hash(storedPasswordHash.salt + password)) {
    return true;
  } else {
    return false;
  }
}

export const encryptSRP = (SRP: string[], password: string): string[] => {
  const encryptedSRP: string[] = [];
  SRP.map((item) => encryptedSRP.push(encrypt(item, password)));
  return encryptedSRP;
};

export const decryptSRP = (
  encryptedSRP: string[],
  password: string
): string[] => {
  const decryptedSRP: string[] = [];
  encryptedSRP.map((item) => {
    decryptedSRP.push(decrypt(item, password));
  });
  return decryptedSRP;
};
