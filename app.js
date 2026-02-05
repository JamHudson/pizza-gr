// Import the express module
import express from 'express'

// Create an express app
const app = express();

// Set the PORT
const PORT = 3000;

// Enable static file serving
app.use(express.static('public'));

// "Middleware" that allows express to read
// form data and store it in req.body

app.use(express.urlencoded({ extended: true }));

// Create a temporary array to store orders
const orders = [];

// Define default "route".
/* req = request; res = response */
app.get(`/`, (req, res) => {
    res.sendFile(`${import.meta.dirname}/views/home.html`)
});

app.get(`/contact`, (req, res) => {
    res.sendFile(`${import.meta.dirname}/views/contact.html`)
});

app.get(`/thank-you`, (req, res) => {
    res.sendFile(`${import.meta.dirname}/views/confirmation.html`)
});

app.get(`/admin`, (req, res) => {
    res.send(orders);
    // res.sendFile(`${import.meta.dirname}`)
});

app.post(`/submit-order`, (req, res) => {
    const order = {
        fname: req.body.fname,
        lname: req.body.lname,
        email: req.body.email,
        method: req.body.method,
        toppings: req.body.toppings || "none",
        size: req.body.size,
        comment: req.body.comment,
        timestamp: new Date()
    };

    orders.push(order);

    res.sendFile(`${import.meta.dirname}/views/confirmation.html`)
});


// Start the server and listen on the specified PORT
app.listen(PORT, () => {
    console.log(`Server is running at
        http://localhost:${PORT}`);
});