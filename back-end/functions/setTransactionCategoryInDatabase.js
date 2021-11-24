const UserModel = require("../model/user");
const ObjectId = require("mongoose").Types.ObjectId;

// Function to update transaction category in database
// Mongoose quickstart: https://mongoosejs.com/docs/index.html
const setTransactionCategoryInDatabase = async (
  transaction_id,
  newCategory,
  user_id
) => {
  //find user
  const user = await UserModel.findById(user_id);

  // try to find a transactionInstance on the user's transactions array
  transaction = user.transactions.find(
    (transaction) => transaction.transaction_id == transaction_id
  );

  // if it exists, change it
  if (transaction) {
    await UserModel.updateOne(
      { _id: user_id },
      { $set: { "transactions.$[tx].category": newCategory } },
      { arrayFilters: [{ "tx.transaction_id": transaction_id }] }
    );
  } else {
    // add it to the user's transactions array
    await UserModel.updateOne(
      { _id: user_id },
      {
        $push: {
          transactions: {
            transaction_id,
            category: newCategory,
          },
        },
      }
    );
  }
};

module.exports = setTransactionCategoryInDatabase;
