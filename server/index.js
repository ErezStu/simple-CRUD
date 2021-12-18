const express = require("express");
const mongoose = require("mongoose");
const List = require("./models/List");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(
  "mongodb+srv://erez:process.env.MONGO_PASSWORD@crud.rltvh.mongodb.net/list?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
  }
);

app.post("/insert", async (req, res) => {
  const productName = req.body.productName;
  const amount = req.body.amount;

  const list = new List({
    productName,
    amount,
  });

  try {
    await list.save();
    res.send("HELOOOOO");
  } catch (error) {
    console.log(error);
  }
});

app.get("/read", async (req, res) => {
  List.find({}, (err, result) => {
    if (err) {
      res.send.status(500).json("error");
    }
    res.send(result);
  });
});

app.put("/update", async (req, res) => {
  const productName = req.body.productName;
  const id = req.body.id;

  try {
    await List.findById(id, (error, updatedName) => {
      updatedName.productName = productName;
      updatedName.save();
      res.send("Updated");
    });
  } catch (error) {
    console.log(error);
  }
});

app.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;

  await List.findByIdAndRemove(id).exec();
  res.send("deleted");
});

app.listen(3001, () => console.log("connect to the server"));
