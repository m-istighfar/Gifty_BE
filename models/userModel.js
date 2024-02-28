const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

class UserModel {
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

module.exports = UserModel;
