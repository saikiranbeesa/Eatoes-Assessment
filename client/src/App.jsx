import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { MenuManagement } from './pages/MenuManagement';
import { OrdersDashboard } from './pages/OrdersDashboard';
import { Analytics } from './pages/Analytics';
import './App.css';

function App() {
  return (
    <Router>
      <div className="flex flex-col h-screen">
        <Navbar />
        <div className="flex flex-1 overflow-hidden">
          <Sidebar />
          <Routes>
            <Route path="/" element={<MenuManagement />} />
            <Route path="/orders" element={<OrdersDashboard />} />
            <Route path="/analytics" element={<Analytics />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
