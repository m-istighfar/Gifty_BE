const splitBillsModel = require("../models/splitbillsModel");
const { successResponse, errorResponse } = require("../utils/response");

exports.postResult = async (req, res) => {
  const { price, tax, deliveryFee, discount, itemId, pollId } = req.body;

  try {
    // Simultaneously fetch item price and account number
    const [item, paymentInfo] = await Promise.all([
      prisma.item.findUnique({ where: { id: itemId } }),
      prisma.paymentInfo.findUnique({ where: { userId: req.user.id } })
    ]);

    if (!item || !paymentInfo) {
      return errorResponse(res, "Item or PaymentInfo not found", 404);
    }

    // Post values into the Result table
    await splitBillsModel.postResult(
      item.price,
      paymentInfo.accountNumber,
      tax,
      deliveryFee,
      discount,
      itemId,
      pollId,
      collaborators
    );

    return successResponse(res, "Result posted successfully");
  } catch (error) {
    console.error("Error posting result:", error);
    return errorResponse(res, "Server error posting result", 500);
  }
};
