import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const CVEDetails = () => {
  const { id } = useParams();
  const [cve, setCve] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCVE = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/cves/cve/${id}`);
        setCve(response.data);
      } catch (error) {
        setError("Failed to load CVE details");
      } finally {
        setLoading(false);
      }
    };
    fetchCVE();
  }, [id]);

  if (loading) return <div className="text-center p-6">Loading...</div>;
  if (error) return <div className="text-center p-6 text-red-500">{error}</div>;
  console.log(cve);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold">{cve.id}</h2>
      <p className="mt-2 text-lg"><strong>Description:</strong> {cve.description}</p>
      
      <div className="mt-6 border p-4 rounded shadow-lg">
        <h3 className="text-xl font-semibold">CVSS V2 Metrics:</h3>
        <p><strong>Severity:</strong> <span className="text-red-600">{cve.metrics?.cvssMetricV2?.[0]?.baseSeverity}</span></p>
        <p><strong>Score:</strong> <span className="text-red-600">7.2</span></p>
        <p><strong>Vector String:</strong> {cve.metrics?.cvssMetricV2?.[0]?.cvssData?.vectorString || "N/A"}</p>

        <table className="w-full mt-4 border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">Access Vector</th>
              <th className="border p-2">Access Complexity</th>
              <th className="border p-2">Authentication</th>
              <th className="border p-2">Confidentiality Impact</th>
              <th className="border p-2">Integrity Impact</th>
              <th className="border p-2">Availability Impact</th>
            </tr>
          </thead>
          <tbody>
            <tr className="text-center">
              <td className="border p-2">{cve.metrics?.cvssMetricV2?.[0]?.cvssData?.vectorString || "N/A"}</td>
              <td className="border p-2">{cve.metrics?.cvssMetricV2?.[0]?.cvssData?.accessComplexity || "N/A"}</td>
              <td className="border p-2">{cve.metrics?.cvssMetricV2?.[0]?.cvssData?.authentication || "N/A"}</td>
              <td className="border p-2">{cve.metrics?.cvssMetricV2?.[0]?.cvssData?.confidentialityImpact || "N/A"}</td>
              <td className="border p-2">{cve.metrics?.cvssMetricV2?.[0]?.cvssData?.integrityImpact || "N/A"}</td>
              <td className="border p-2">{cve.metrics?.cvssMetricV2?.[0]?.cvssData?.availabilityImpact || "N/A"}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="mt-6">
        <h3 className="text-xl font-semibold">Scores:</h3>
        <p><strong>Exploitability Score:</strong> {cve.metrics?.cvssMetricV2?.[0]?.exploitabilityScore || "N/A"}</p>
        <p><strong>Impact Score:</strong> {cve.metrics?.cvssMetricV2?.[0]?.impactScore || "N/A"}</p>
      </div>

      <div className="mt-6">
        <h3 className="text-xl font-semibold">CPE:</h3>
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">Criteria</th>
              <th className="border p-2">Match Criteria ID</th>
              <th className="border p-2">Vulnerable</th>
            </tr>
          </thead>
          <tbody>
            {cve.cpes?.map((cpe, index) => (
              <tr key={index} className="text-center">
                <td className="border p-2">{cpe.criteria}</td>
                <td className="border p-2">{cpe.matchCriteriaId}</td>
                <td className="border p-2">{cpe.vulnerable ? "Yes" : "No"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CVEDetails;
