const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

class userModel {
  static async isUsernameTaken(username, userId) {
    try {
      const user = await prisma.user.findUnique({
        where: { username },
      });
      return Boolean(user && user.id !== userId);
    } catch (error) {
      console.error("Error checking username uniqueness:", error);
      throw new Error("Database error checking username");
    }
  }

  static async updateUserUsername(userId, username) {
    try {
      const updatedUser = await prisma.user.update({
        where: { id: userId },
        data: { username, hasSetUsername: true },
      });
      return updatedUser;
    } catch (error) {
      throw new Error(error.message);
    }
  }
  static async findPaymentInfoByUserId(userId) {
    return prisma.paymentInfo.findFirst({
      where: { userId },
    });
  }

  static async findPaymentInfoById(paymentInfoId) {
    return prisma.paymentInfo.findUnique({
      where: {
        id: parseInt(paymentInfoId, 10),
      },
    });
  }

  static async createPaymentInfo(
    userId,
    paymentMethod,
    accountHolder,
    accountNumber
  ) {
    return prisma.paymentInfo.create({
      data: {
        userId,
        paymentMethod,
        accountHolder,
        accountNumber,
      },
    });
  }

  static async updatePaymentInfo(
    paymentInfoId,
    paymentMethod,
    accountHolder,
    accountNumber
  ) {
    return prisma.paymentInfo.update({
      where: { id: paymentInfoId },
      data: {
        paymentMethod,
        accountHolder,
        accountNumber,
      },
    });
  }
}

module.exports = userModel;
