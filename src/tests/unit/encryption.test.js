const { encrypt, decrypt } = require("../../utils/encryption");

describe("Encryption Utils", () => {
  const samplePhone = "+254700000001";

  it("should encrypt and decrypt phone number correctly", () => {
    const encrypted = encrypt(samplePhone);
    const decrypted = decrypt(encrypted);

    expect(decrypted).toBe(samplePhone);
  });

  it("should handle null values", () => {
    expect(encrypt(null)).toBeNull();
    expect(decrypt(null)).toBeNull();
  });

  it("should handle empty strings", () => {
    expect(encrypt("")).toBeNull();
    expect(decrypt("")).toBeNull();
  });
});
