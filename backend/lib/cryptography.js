import crypto from "crypto";

const encryptSymmetric = (key, plaintext) => {
    const iv = crypto.randomBytes(12).toString("base64");
    const cipher = crypto.createCipheriv("aes-256-gcm", Buffer.from(key, 'base64'),
        Buffer.from(iv, 'base64'));
    let cipherText = cipher.update(plaintext, "utf8", "base64")
    cipherText += cipher.final("base64");
    const authTag = cipher.getAuthTag().toString("base64")

    return { cipherText, authTag, iv:iv.toString("base64") }
}


const decryptSymmetric = (key, cypherText, iv, tag) => {
    const decipher = crypto.createDecipheriv("aes-256-gcm", Buffer.from(key, 'base64'),
        Buffer.from(iv, 'base64'));

    decipher.setAuthTag(Buffer.from(tag, 'base64'));
    let plainText = decipher.update(cypherText,"base64", "utf8")
    plainText+= decipher.final("utf8")

    return plainText
}

const encryptEncryptionKey = (encryptionKey) => {
    const serverSecret = process.env.REK_SECRET;
    const iv = crypto.randomBytes(12);

    const cipher = crypto.createCipheriv("aes-256-gcm", Buffer.from(serverSecret, "base64"), iv);
    let encrypted = Buffer.concat([cipher.update(encryptionKey, "utf8"), cipher.final()]);
    const authTag = cipher.getAuthTag();

    return {
        encryptedEncryptionKey: encrypted.toString("base64"),
        iv: iv.toString("base64"),
        authTag: authTag.toString("base64"),
    };
};

const decryptEncryptionKey = (encryptedEncryptionKey, iv, authTag) => {
    const serverSecret = Buffer.from(process.env.REK_SECRET, "base64");

    const decipher = crypto.createDecipheriv("aes-256-gcm", Buffer.from(serverSecret, "base64"), Buffer.from(iv, "base64"));
    decipher.setAuthTag(Buffer.from(authTag, "base64"));

    let decrypted = Buffer.concat([
        decipher.update(Buffer.from(encryptedEncryptionKey, "base64")),
        decipher.final(),
    ]);

    return decrypted.toString("utf8"); 
};

export {
    encryptSymmetric,
    decryptSymmetric,
    encryptEncryptionKey,
    decryptEncryptionKey
}