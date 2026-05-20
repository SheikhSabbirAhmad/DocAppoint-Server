const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

const {
  MongoClient,
  ServerApiVersion,
  ObjectId,
} = require("mongodb");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.MONGODB_URI;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    await client.connect();

    const db = client.db("docAppoint");
    const bookingCollection = db.collection("bookings");


    // GET
    app.get("/booking", async (req, res) => {
      const result = await bookingCollection.find().toArray();
      res.send(result);
    });

    // POST
    app.post("/booking", async (req, res) => {
      const bookingData = req.body;

      const result = await bookingCollection.insertOne(
        bookingData
      );

      res.send(result);
    });

    // PATCH
    app.patch("/booking/:id", async (req, res) => {
      try {
        const id = req.params.id;

        const updatedData = req.body;

        const result = await bookingCollection.updateOne(
          { _id: new ObjectId(id) },
          {
            $set: updatedData,
          }
        );

        res.send(result);
      } catch (error) {
        console.log(error);

        res.status(500).send({
          success: false,
          message: "Update failed",
        });
      }
    });


run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Server Running");
});

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});