import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CVEList from "./components/CVEList"
import CVEDetail from "./components/CVEDetail";

function App() {
  return (
    
    <Router>
      <Routes>
        <Route path="/cves/list" element={<CVEList />} />
        <Route path="/cve/:id" element={<CVEDetail />} />
      </Routes>
    </Router>
    
  );
}

export default App;
