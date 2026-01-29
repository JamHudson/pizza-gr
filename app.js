// Import the express module
import express from 'express'

// Create an express app
const app = express();

// Set the PORT
const PORT = 3000;

// Enable static file serving
app.use(express.static('public'));

// Define default "route".
/* req = request; res = response */
app.get(`/`, (req,res) => {
    res.sendFile(`${import.meta.dirname}/views/home.html`)
});

// Start the server and listen on the specified PORT
app.listen(PORT, () => {
    console.log(`Server is running at
        http://localhost:${PORT}`);
});