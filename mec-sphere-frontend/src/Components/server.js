const express = require('express');
const bodyParser = require('body-parser');
const { run } = require('./Chatbot/chatter');

const app = express();
const port = 3000; // You can choose any available port

// Middleware to parse JSON bodies
app.use(bodyParser.json());

app.post('/query', async (req, res) => {
    try {
        const { query } = req.body;

        // Execute the run function with the received query
        const answer=await run(query);
        
        // Send a success response
        res.send(answer);
        console.log(answer)
    } catch (error) {
        // Send an error response if an error occurs
        console.error("An error occurred:", error);
        res.status(500).send('An error occurred during execution.');
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
