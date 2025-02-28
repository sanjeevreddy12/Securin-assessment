import { PrismaClient } from "@prisma/client";
import axios from "axios";

const prisma = new PrismaClient();
const API_BASE_URL = "https://services.nvd.nist.gov/rest/json/cves/2.0";
const apiKey= "0a198cac-e14b-4acc-8263-da4c92dccc5c"  

export const fetchAndStoreCVE = async () => {
  try {
    let startIndex = 0;
    const resultsPerPage = 100;
    let totalResults = 1;

    while (startIndex < totalResults) {
      const response = await axios.get(
        `${API_BASE_URL}?startIndex=${startIndex}&resultsPerPage=${resultsPerPage}`
      );

      const cves = response.data.vulnerabilities || [];
      console.log(cves);
      totalResults = response.data.totalResults || 0;

      for (const cveData of cves) {
        const cve = cveData.cve;

      
        const cvss =
         
          cve.metrics?.cvssMetricV2?.cvssData?.cvssData || {};

        
        const exploitabilityScore =
          cvss.exploitabilityScore !== undefined ? cvss.exploitabilityScore : null;
        const impactScore =
          cvss.impactScore !== undefined ? cvss.impactScore : null;

        
        const cpes = [];
        if (cve.configurations?.nodes) {
          for (const node of cve.configurations.nodes) {
            if (node.cpeMatch) {
              for (const cpe of node.cpeMatch) {
                cpes.push({
                  criteria: cpe.criteria || "",
                  matchCriteriaId: cpe.matchCriteriaId || "",
                  vulnerable: cpe.vulnerable || false,
                });
              }
            }
          }
        }

        await prisma.cVE.upsert({
          where: { id: cve.id },
          update: {
            sourceIdentifier: cve.sourceIdentifier,
            published: cve.published ? new Date(cve.published) : null,
            lastModified: cve.lastModified ? new Date(cve.lastModified) : null,
            vulnStatus: cve.vulnStatus,
            description: cve.descriptions?.[0]?.value || "",
            severity: cvss.baseSeverity || "UNKNOWN",
            vectorString: cvss.vectorString || "",
            accessVector: cvss.accessVector || "",
            accessComplexity: cvss.accessComplexity || "",
            authentication: cvss.authentication || "",
            confidentialityImpact: cvss.confidentialityImpact || "",
            integrityImpact: cvss.integrityImpact || "",
            availabilityImpact: cvss.availabilityImpact || "",
           
            metrics: cve.metrics || {},  // Added metrics field
          },
          create: {
            id: cve.id,
            sourceIdentifier: cve.sourceIdentifier,
            published: cve.published ? new Date(cve.published) : null,
            lastModified: cve.lastModified ? new Date(cve.lastModified) : null,
            vulnStatus: cve.vulnStatus,
            description: cve.descriptions?.[0]?.value || "",
            severity: cvss.baseSeverity || "UNKNOWN",
            vectorString: cvss.vectorString || "",
            accessVector: cvss.accessVector || "",
            accessComplexity: cvss.accessComplexity || "",
            authentication: cvss.authentication || "",
            confidentialityImpact: cvss.confidentialityImpact || "",
            integrityImpact: cvss.integrityImpact || "",
            availabilityImpact: cvss.availabilityImpact || "",
           
            metrics: cve.metrics || {},  // Added metrics field
            cpes: {
              create: cpes.map((cpe) => ({
                cveId: cve.id,
                criteria: cpe.criteria,
                matchCriteriaId: cpe.matchCriteriaId,
                vulnerable: cpe.vulnerable,
              })),
            },
          },
        });
        
        
      }

      startIndex += resultsPerPage;
    }
  } catch (error) {
    console.error("Error fetching CVE data:", error);
  }
};


