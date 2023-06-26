import { env } from "utility/config";
import { CryptoJSAesJson } from "./cryptojs-aes-format";

export function encryptPassword(req_pass) {
  // encrypt value
  const valueToEncrypt = req_pass; // this could also be object/array/whatever
  const key = env.PASS_ENCRYPT_KEY;
  const encrypted = CryptoJSAesJson.encrypt(valueToEncrypt, key);
  // let decrypted = CryptoJSAesJson.decrypt(encrypted, key);
  return encrypted;
}
