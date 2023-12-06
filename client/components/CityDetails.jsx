import React, { useState, useEffect } from 'react';
import styles from '../src/styles/CityDetails.module.css';

const CityDetails = ({ city, onClose }) => {
  const [thingsToDo, setThingsToDo] = useState([]);
  const [newThing, setNewThing] = useState('');
  const [showAddThingBox, setShowAddThingBox] = useState(false);

  // Update thingsToDo when the city prop changes
  useEffect(() => {
    setThingsToDo([]); // Reset thingsToDo when a new city is selected
  }, [city]);

  const handleAddThing = () => {
    if (newThing.trim() !== '') {
      setThingsToDo(prevThings => [...prevThings, newThing]);
      setNewThing('');
    }
  };

  const handleRemoveThing = index => {
    setThingsToDo(prevThings => prevThings.filter((_, i) => i !== index));
  };

  const handleGetRecommendations = async () => {
    try {
      // Replace 'your-openai-api-key' with your actual OpenAI API key
      const apiKey = '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';
      const response = await fetch(
        'https://api.openai.com/v1/engines/davinci/completions',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${apiKey}`,
          },
          body: JSON.stringify({
            // The responses to these prompts are potentially unhinged as this is an un-tuned request, tread carefully.
            prompt: `I can't wait to go to ${city.name} and see wonderful attractions such as`,
            max_tokens: 25, // Adjust the max_tokens parameter based on your requirements
          }),
        },
      );

      if (response.ok) {
        const data = await response.json();
        // Extract the generated text from the OpenAI response and add it to thingsToDo
        console.log(data);
        setThingsToDo(prevThings => [...prevThings, data.choices[0].text]);
      } else {
        console.error('Error fetching recommendations:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching recommendations:', error);
    }
  };

  const handleToggleAddThingBox = () => {
    setShowAddThingBox(prev => !prev);
  };

  return (
    <div className={styles.CityDetails}>
      <div className='header'>
        <h2>{city.name}</h2>
        <button onClick={onClose}>X</button>
      </div>
      <div className='things-to-do'>
        <h3>Things to Do:</h3>
        <ul>
          {thingsToDo.map((thing, index) => (
            <li key={index}>
              {thing}
              <button
                className={styles.cityRemove}
                onClick={() => handleRemoveThing(index)}>
                Remove
              </button>
            </li>
          ))}
        </ul>
        <button onClick={handleToggleAddThingBox}>Add Thing</button>
        {showAddThingBox && (
          <div>
            <textarea
              placeholder='Enter a new thing to do'
              value={newThing}
              onChange={e => setNewThing(e.target.value)}
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
