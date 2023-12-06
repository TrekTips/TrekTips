import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import TravelBucketList from './TravelBucketList';
import CityDetails from './CityDetails';
import '../src/styles.css';


function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Routes>
          <Route path="/" element={<TravelBucketList />} />
          <Route path="/cities/:cityId" element={<CityDetails />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;