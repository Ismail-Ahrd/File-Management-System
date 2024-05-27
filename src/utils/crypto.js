import CryptoJS from 'crypto-js';

const secretKey = "my-secret-key";

const base64UrlEncode = (str) => {
    return str.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
};

const base64UrlDecode = (str) => {
    let base64 = str.replace(/-/g, '+').replace(/_/g, '/');
    while (base64.length % 4) {
        base64 += '=';
    }
    return base64;
};

// Encryption function
export const encrypt = (text) => {
    const ciphertext = CryptoJS.AES.encrypt(text, secretKey).toString();
    const encodedCiphertext = base64UrlEncode(ciphertext);
    return encodedCiphertext;
};

// Decryption function
export const decrypt = (encodedCiphertext) => {
    const ciphertext = base64UrlDecode(encodedCiphertext);
    const bytes = CryptoJS.AES.decrypt(ciphertext, secretKey);
    const originalText = bytes.toString(CryptoJS.enc.Utf8);
    return originalText;
};

// Example usage
 // You should use a more secure key in practice
/* const originalText = "Hello, World!";
const encryptedText = encrypt(originalText, secretKey);
const decryptedText = decrypt(encryptedText, secretKey);

console.log("Original Text:", originalText);
console.log("Encrypted Text:", encryptedText);
console.log("Decrypted Text:", decryptedText); */
