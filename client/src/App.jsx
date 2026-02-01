import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { MenuManagement } from './pages/MenuManagement';
import { OrdersDashboard } from './pages/OrdersDashboard';
import { Analytics } from './pages/Analytics';
import './App.css';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const closeSidebar = () => setIsSidebarOpen(false);

  return (
    <Router>
      <div className="flex flex-col h-screen">
        <Navbar onToggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
        <div className="flex flex-1 overflow-hidden">
          <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />
          <div className="flex-1 overflow-auto w-full md:w-auto">
            <Routes>
              <Route path="/" element={<MenuManagement />} />
              <Route path="/orders" element={<OrdersDashboard />} />
              <Route path="/analytics" element={<Analytics />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
