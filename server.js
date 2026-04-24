const express = require("express");
const app = express();

const cors = require("cors");
app.use(cors());

const connectDB = require("./config/db");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);

const voteRoutes = require("./routes/voteRoutes");
app.use("/api", voteRoutes);

const adminRoutes = require("./routes/adminRoutes");
app.use("/api/admin", adminRoutes);

connectDB();

app.get("/", (req, res) => {
    res.send("Voting Portal API Running");
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});
