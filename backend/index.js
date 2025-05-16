const express = require("express");
const mainRouter = require("./routes/index");
const cors = require("cors");

const app = express();

// Initialize middleware
app.use(cors());
app.use(express.json());

// Define routes
const router = express.Router();

// Add your routes here
router.get("/", (req, res) => {
  res.json({ message: "API is working" });
});

// Use the router
app.use("/api", router);
app.use("/api/v1", mainRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});