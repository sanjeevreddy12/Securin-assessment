import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const CVEList = () => {
  const [cves, setCves] = useState([]);
  const [totalRecords, setTotalRecords] = useState(0);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [sortBy, setSortBy] = useState("published");
  const [order, setOrder] = useState("desc");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/cves?page=${page}&limit=${limit}&sortBy=${sortBy}&order=${order}`
        );
        setCves(response.data.data);
        setTotalRecords(response.data.totalRecords || 0);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };
    fetchData();
  }, [page, limit, sortBy, order]); // Now it listens for changes in sorting

  const toggleSort = (column) => {
    setSortBy(column);
    setOrder((prevOrder) => (sortBy === column && prevOrder === "desc" ? "asc" : "desc"));
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-center mb-4">CVE LIST</h2>
      <p className="mb-2 font-medium">Total Records: {totalRecords}</p>

      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">CVE ID</th>
              <th className="border p-2">IDENTIFIER</th>
              <th
                className="border p-2 cursor-pointer"
                onClick={() => toggleSort("published")}
              >
                PUBLISHED DATE {sortBy === "published" ? (order === "asc" ? "▲" : "▼") : ""}
              </th>
              <th
                className="border p-2 cursor-pointer"
                onClick={() => toggleSort("lastModified")}
              >
                LAST MODIFIED DATE {sortBy === "lastModified" ? (order === "asc" ? "▲" : "▼") : ""}
              </th>
              <th className="border p-2">STATUS</th>
            </tr>
          </thead>
          <tbody>
            {cves.length > 0 ? (
              cves.map((cve) => (
                <tr key={cve.id} className="text-center">
                  <td className="border p-2">
                    <Link to={`/cve/${cve.id}`} className="text-blue-500 underline">
                      {cve.id}
                    </Link>
                  </td>
                  <td className="border p-2">{cve.sourceIdentifier}</td>
                  <td className="border p-2">{new Date(cve.published).toLocaleDateString()}</td>
                  <td className="border p-2">{new Date(cve.lastModified).toLocaleDateString()}</td>
                  <td className="border p-2">{cve.vulnStatus}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center p-4">No data available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination & Results Per Page */}
      <div className="flex justify-between items-center mt-4">
        <div>
          <label>Results per page: </label>
          <select
            value={limit}
            onChange={(e) => setLimit(Number(e.target.value))}
            className="border p-1"
          >
            {[10, 20, 50].map((size) => (
              <option key={size} value={size}>{size}</option>
            ))}
          </select>
        </div>
        <div>
          <button
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={page === 1}
            className="px-3 py-1 border mx-1"
          >
            ◀
          </button>
          <span>{page}</span>
          <button
            onClick={() => setPage((prev) => prev + 1)}
            className="px-3 py-1 border mx-1"
          >
            ▶
          </button>
        </div>
      </div>
    </div>
  );
};

export default CVEList;
