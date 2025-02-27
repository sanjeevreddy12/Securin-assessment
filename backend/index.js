const express = require("express");
const { PrismaClient } = require("@prisma/client");
const cors = require("cors")
const cron = require("node-cron");
const cveRoutes = require("./routes/route");
const fetchAndStoreCVE = require("./controllers/cveController").fetchAndStoreCVE;
require("dotenv").config();

const app = express();
const prisma = new PrismaClient();
app.use(cors());

app.use(express.json());
app.use("/api/cves", cveRoutes);




cron.schedule("0 * * * *", fetchAndStoreCVE);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
