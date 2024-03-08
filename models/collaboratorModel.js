const crypto = require("crypto");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

class collabModel {
  static async findWishlistById(wishlistId) {
    return prisma.wishlist.findUnique({
      where: {
        id: parseInt(wishlistId),
      },
    });
  }

  static async findUserByUsername(username) {
    return prisma.user.findUnique({
      where: { username: username },
    });
  }

  static async findUserByUserId(userId) {
    return prisma.user.findUnique({
      where: { id: parseInt(userId) },
    });
  }

  static async createCollab(wishlistId, collabId) {
    return prisma.collaborator.create({
      data: {
        wishlistId: parseInt(wishlistId),
        userId: parseInt(collabId),
      },
    });
  }

  static async generateLink(wishlistId) {
    const key = Buffer.from("mywishlistnumber", "utf8");
    const iv = crypto.randomBytes(12);
    const cipher = crypto.createCipheriv("aes-128-gcm", key, iv);

    var encryptedData = cipher.update(wishlistId, "utf8", "hex");
    encryptedData += cipher.final("hex");

    return {
      encryptedData: encryptedData,
      iv: iv.toString("hex"),
    };
  }

  static async decodeLink(encryptedData, iv) {
    const key = "mywishlistnumber";
    const ivBuffer = Buffer.from(iv, "hex");
    const decipher = crypto.createDecipheriv("aes-128-gcm", key, ivBuffer);

    var decryptedData = decipher.update(encryptedData, "hex", "utf8");
    decryptedData += decipher.final("utf8");
    return decryptedData;
  }
}

module.exports = collabModel;
