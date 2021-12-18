const mongoose = require("mongoose");

const listSchema = new mongoose.Schema({
  productName: { type: String, required: true },
  amount: { type: Number, require: true },
});

const List = mongoose.model("list", listSchema);

module.exports = List;
