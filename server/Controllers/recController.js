const express = require('express');
const app = express();
const port = 3000; // or any port you prefer

recController = {};

// Your API key from OpenAI
const apiKey = 'YOUR_OPENAI_API_KEY';

// Your OpenAI GPT API endpoint
const apiUrl = 'https://api.openai.com/v1/engines/davinci-codex/completions';

// Handling requests

recController.getRecs = async function (req, res,next) {
  const userInput = req.body.userInput; // whatever the front end calls their stuff in their request

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        prompt: userInput,
        max_tokens: 50,
      }),
    });

    const responseData = await response.json(); // Extract JSON data from the response
    const aiResponse = responseData.choices[0].text.trim();
    res.json({ aiResponse });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

//grab entire rec obj from api, parse it down to as string.
//put that string into the database
//send the string back to the front end w/ status 200
recController.getRecs = async function () {
  try {
    //pull ALL RECS FROM DB
  } catch (err) {
    console.log(err);
  }
};

module.exports = recController;
