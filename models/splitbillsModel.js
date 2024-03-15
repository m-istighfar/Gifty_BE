const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

class SplitBillsModel {
  static async postResult(price, accountNumber, tax, deliveryFee, discount, itemId, pollId, collaborators) {
    const totalPrice = price + tax + deliveryFee - discount;
    const amountToPay = totalPrice / collaborators.length;

    return prisma.result.create({
      data: {
        price,
        accountNumber,
        tax,
        deliveryFee,
        discount,
        totalPrice,
        itemId,
        pollId,
        collaboratorId: { set: collaborators },
        amountToPay
      },
    });
  }
}

module.exports = SplitBillsModel;
