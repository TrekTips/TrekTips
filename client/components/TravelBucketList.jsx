import React, { useState } from 'react';
import CityDetails from './CityDetails';
import { BrowserRouter as Link, Router, Routes, Route } from 'react-router-dom';

const TravelBucketList = () => {
  const [newCity, setNewCity] = useState('');
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState(null);
  

  // Add City To List
  const handleAddCity = () => {
    // if no city is entered, don't do anything
    if (newCity.trim() !== '') { 
      setCities((prevCities) => [...prevCities, { name: newCity, id: Date.now() }]);
      setNewCity(''); // reset text box to empty after we add city
    }
  };

  // Delete City From List
  const handleDeleteCity = (cityId) => {
    setCities((prevCities) => prevCities.filter((city) => city.id !== cityId));
    if (selectedCity && selectedCity.id === cityId) {
      setSelectedCity(null);
    }
  };

  // Click City Name to Go To City Details View
  const handleCityClick = (city) => {
    setSelectedCity(city);
  };

  
  const handleDetailsClose = () => {
    setSelectedCity(null);
  };

  return (
    <div className="travel-bucket-list">
      <div>
        <button onClick={handleAddCity}>Add City</button>
        <textarea
          placeholder="Enter city name"
          value={newCity}
          onChange={(e) => setNewCity(e.target.value)}
        />
      </div>
      <div className="city-list">
        <h3>Cities:</h3>
        <ul>
          {cities.map((city) => (
            <li key={city.id}>
              <button onClick={() => handleCityClick(city)}>{city.name}</button>
              <button onClick={() => handleDeleteCity(city.id)}>remove</button>
            </li>
          ))}
        </ul>
      </div>
      {selectedCity && (
        <CityDetails city={selectedCity} onClose={handleDetailsClose} />
      )}
    </div>
  );
};

export default TravelBucketList;
