
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const routes = require("./routes/airdrop");

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api", routes);

const PORT = process.env.PORT || 3050;
app.listen(PORT, () => console.log(`✅ Backend listening on port ${PORT}`));
