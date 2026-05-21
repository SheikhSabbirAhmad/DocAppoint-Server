const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

const {
  MongoClient,
  ServerApiVersion,
  ObjectId,
} = require("mongodb");
const { createRemoteJWKSet, jwtVerify } = require("jose-cjs");

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

const JWKS = createRemoteJWKSet(new URL(`${process.env.CLIENT_URL}/api/auth/jwks`));

const verifyToken = async (req, res, next) => {
  const authHeader = req?.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const token = authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const { payload } = await jwtVerify(token, JWKS);
    console.log(payload);
    next();
  } catch (error) {
    return res.status(403).json({ message: "Forbidden" });
  }
};

async function run() {
  try {
    // await client.connect();

    const db = client.db("docAppoint");
    const bookingCollection = db.collection("bookings");


    // GET
    app.get("/booking", verifyToken, async (req, res) => {
      const result = await bookingCollection.find().toArray();
      res.send(result);
    });

    // POST
    app.post("/booking", verifyToken, async (req, res) => {
      const bookingData = req.body;

      const result = await bookingCollection.insertOne(
        bookingData
      );

      res.send(result);
    });

    // PATCH
    app.patch("/booking/:id", verifyToken, async (req, res) => {
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

    // DELETE
    app.delete("/booking/:id", verifyToken, async (req, res) => {
      const id = req.params.id;

      const result = await bookingCollection.deleteOne({
        _id: new ObjectId(id),
      });

      res.send(result);
    });

    // await client.db("admin").command({ ping: 1 });

    console.log("MongoDB Connected");
  } finally {
  }
}


run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Server Running");
});

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});