import React, { useState } from 'react';

const CityDetails = ({ city, onClose }) => {
  const [thingsToDo, setThingsToDo] = useState([]);
  const [newThing, setNewThing] = useState('');
  const [showAddThingBox, setShowAddThingBox] = useState(false);

  const handleAddThing = () => {
    if (newThing.trim() !== '') {
      setThingsToDo((prevThings) => [...prevThings, newThing]);
      setNewThing('');
    }
  };

  const handleRemoveThing = (index) => {
    setThingsToDo((prevThings) => prevThings.filter((_, i) => i !== index));
  };

  const handleGetRecommendations = async () => {
    // Fetch data from your API (replace the URL with your actual API endpoint)
    // const response = await fetch('https://api.example.com/recommendations');
    // const data = await response.json();
    const data = ["dai", "ia", "chich"]
    // Assuming the API response is an array of recommendations
    setThingsToDo((prevThings) => [...prevThings, ...data]);
  };

  const handleToggleAddThingBox = () => {
    setShowAddThingBox((prev) => !prev);
  };

  return (
    <div className="city-details">
      <div className="header">
        <h2>{city.name}</h2>
        <button onClick={onClose}>X</button>
      </div>
      <div className="things-to-do">
        <h3>Things to Do:</h3>
        <ul>
          {thingsToDo.map((thing, index) => (
            <li key={index}>
                {thing}
                <button onClick={() => handleRemoveThing(index)}>Remove</button>
            </li>
          ))}
        </ul>
        <button onClick={handleToggleAddThingBox}>Add Thing</button>
        {showAddThingBox && (
          <div>
            <textarea
              placeholder="Enter a new thing to do"
              value={newThing}
              onChange={(e) => setNewThing(e.target.value)}
            />
            <button onClick={handleAddThing}>Add</button>
          </div>
        )}
        <button onClick={handleGetRecommendations}>Get Recommendations</button>
      </div>
    </div>
  );
};

export default CityDetails;
