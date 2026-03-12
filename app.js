// Import the express module
import express from 'express';
import mysql2 from 'mysql2';
import dotenv from 'dotenv';
import { validateForm } from './validation.js';

// Configure environment variables
dotenv.config();
// Create an express app
const app = express();

// Set the PORT
const PORT = 3000;

// Set view engine
app.set('view engine', 'ejs');

// Middleware

// Enable static file serving
app.use(express.static('public'));
// Allows express to read form data and store it in req.body
app.use(express.urlencoded({ extended: true }));

// Create a pool of database connections;
const pool = mysql2.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
}).promise();

// Database test route
app.get('/db-test', async (req, res) => {
    try {
        const pizza_orders = await pool.query('SELECT * FROM orders');
        res.send(pizza_orders[0]);
    } catch (err) {
        console.error('Database error: ', err);
    }
});

// Define default "route".
/* req = request; res = response */
app.get(`/`, (req, res) => {
    res.render('home');
});

app.get(`/contact`, (req, res) => {
    res.render('contact');
});

app.get(`/admin`, async (req, res) => {
    let sql = 'SELECT * FROM orders ORDER BY timestamp DESC';
    const orders = await pool.query(sql);
    res.render('admin', { orders: orders[0] });
    // res.sendFile(`${import.meta.dirname}`)
});

app.post(`/submit-order`, async (req, res) => {
    const order = {
        fname: req.body.fname,
        lname: req.body.lname,
        email: req.body.email,
        method: req.body.method,
        toppings: req.body.toppings || "none",
        size: req.body.size,
        comment: req.body.comment,
        timestamp: new Date()
    }
    // Validate data
    const { isValid, errors } = validateForm(order);
    if (!isValid) {
        res.render('home', { errors });
        return;
    }
    // Create an array of order data
    const params = [
        req.body.fname,
        req.body.lname,
        req.body.email,
        req.body.method, // req.body.method,
        Array.isArray(req.body.toppings) ? req.body.toppings.join(", ") : "none",
        req.body.size
    ]

    console.log(params[3]);
    // Insert a new order into the database
    const sql = `INSERT INTO orders (fname, lname, email, method, toppings, size) VALUES (?, ?, ?, ?, ?, ?)`;

    const result = await pool.execute(sql, params);

    res.render('confirmation', { order });
});


// Start the server and listen on the specified PORT
app.listen(PORT, () => {
    console.log(`Server is running at
        http://localhost:${PORT}`)
});