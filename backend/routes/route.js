const express = require("express");
const { PrismaClient } = require("@prisma/client");
const { fetchAndStoreCVE } = require("../controllers/cveController");

const router = express.Router();
const prisma = new PrismaClient();

router.get("/", async (req, res) => {
  try {
    const { 
      page = 1, 
      limit = 10, 
      year, 
      severity, 
      lastModifiedDays, 
      search, 
      sortBy = "published", 
      order = "desc" 
    } = req.query;

    const where = {};

    if (year) where.published = { startsWith: year };
    if (severity) where.severity = { equals: severity };
    if (lastModifiedDays) {
      const date = new Date();
      date.setDate(date.getDate() - parseInt(lastModifiedDays));
      where.lastModified = { gte: date };
    }
    if (search) where.description = { contains: search, mode: "insensitive" };

    const totalRecords = await prisma.cVE.count({ where });

    const validOrder = order.toLowerCase() === "asc" ? "asc" : "desc";
    const validSortFields = ["published", "lastModified"];
    const orderBy = validSortFields.includes(sortBy) ? { [sortBy]: validOrder } : { published: "desc" };

    const cves = await prisma.cVE.findMany({
      where,
      skip: (page - 1) * parseInt(limit),
      take: parseInt(limit),
      orderBy,
    });

    res.json({ data: cves, totalRecords, page: parseInt(page), limit: parseInt(limit) });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch CVE data" });
  }
});

router.get("/cve/:id", async (req, res) => {
  try {
    const cve = await prisma.cVE.findUnique({ where: { id: req.params.id } });
    res.json(cve || { error: "CVE not found" });
  } catch (error) {
    res.status(500).json({ error: "Error retrieving CVE" });
  }
});

router.get("/store" ,fetchAndStoreCVE);

module.exports = router;
