const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
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

const JWKS = createRemoteJWKSet(
  new URL(`${process.env.CLIENT_URL}/api/auth/jwks`)
);


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

    req.user = payload;

    next();
  } catch (error) {
    return res.status(403).json({ message: "Forbidden" });
  }
};


async function run() {
  try {
    const db = client.db("docAppoint");
    const bookingCollection = db.collection("bookings");

    app.get("/booking", verifyToken, async (req, res) => {
      const result = await bookingCollection.find().toArray();
      res.send(result);
    });

    app.get("/booking/my-bookings", verifyToken, async (req, res) => {
      try {
        const userEmail = req.user?.email;

        if (!userEmail) {
          return res
            .status(400)
            .send({ message: "User email not found in token" });
        }

        const result = await bookingCollection
          .find({ userEmail }) // 🔥 FILTER HERE
          .toArray();

        res.send(result);
      } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Server error" });
      }
    });

    app.post("/booking", verifyToken, async (req, res) => {
      try {
        const bookingData = req.body;

        const userEmail = req.user?.email;

        const finalBooking = {
          ...bookingData,
          userEmail, 
        };

        const result = await bookingCollection.insertOne(finalBooking);

        res.send(result);
      } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Create failed" });
      }
    });

    app.patch("/booking/:id", verifyToken, async (req, res) => {
      try {
        const id = req.params.id;
        const updatedData = req.body;

        const result = await bookingCollection.updateOne(
          { _id: new ObjectId(id) },
          { $set: updatedData }
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

    app.delete("/booking/:id", verifyToken, async (req, res) => {
      try {
        const id = req.params.id;

        const result = await bookingCollection.deleteOne({
          _id: new ObjectId(id),
        });

        res.send(result);
      } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Delete failed" });
      }
    });

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