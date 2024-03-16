const { PrismaClient } = require("@prisma/client");
const faker = require("faker");
const bcrypt = require("bcrypt");

const prisma = new PrismaClient();

const main = async () => {
  const numberOfUsers = 5;
  const password = "123456";
  const hashedPassword = await bcrypt.hash(password, 10);

  for (let i = 0; i < numberOfUsers; i++) {
    const user = await prisma.user.create({
      data: {
        email: faker.internet.email(),
        username: faker.internet.userName(),
        hasSetUsername: faker.datatype.boolean(),
        name: faker.name.findName(),
        password: hashedPassword,
        profileImage: faker.image.avatar(),
      },
    });

    for (let j = 0; j < 2; j++) {
      await prisma.paymentInfo.create({
        data: {
          paymentMethod: faker.finance.transactionType(),
          accountHolder: user.name,
          accountNumber: faker.finance.account(),
          userId: user.id,
        },
      });
    }

    for (let k = 0; k < 5; k++) {
      const wishlist = await prisma.wishlist.create({
        data: {
          title: faker.commerce.productName(),
          description: faker.lorem.sentence(),
          type: faker.random.arrayElement(["PERSONAL", "COLLABORATIVE"]),
          userId: user.id,
        },
      });

      for (let l = 0; l < 10; l++) {
        await prisma.item.create({
          data: {
            name: faker.commerce.productName(),
            details: faker.commerce.productDescription(),
            price: parseFloat(faker.commerce.price()),
            link: faker.internet.url(),
            wishlistId: wishlist.id,
          },
        });
      }

      await prisma.collaborator.create({
        data: {
          wishlistId: wishlist.id,
          userId: user.id,
        },
      });
    }
  }
};

main()
  .then(async () => {
    console.log("Seeding finished.");
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
