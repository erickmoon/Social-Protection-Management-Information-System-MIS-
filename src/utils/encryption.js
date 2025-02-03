const CryptoJS = require("crypto-js");

const encrypt = (text) => {
  if (!text) return null;
  return CryptoJS.AES.encrypt(text, process.env.ENCRYPTION_KEY).toString();
};

const decrypt = (encryptedText) => {
  if (!encryptedText) return null;
  try {
    const bytes = CryptoJS.AES.decrypt(
      encryptedText,
      process.env.ENCRYPTION_KEY
    );
    return bytes.toString(CryptoJS.enc.Utf8);
  } catch (error) {
    console.error("Decryption error:", error);
    return null;
  }
};

module.exports = {
  encrypt,
  decrypt
};
