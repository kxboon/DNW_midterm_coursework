
const express = require("express");
const router = express.Router();
const {body, validationResult} = require('express-validator');

router.get('/login', (req, res) => {
    res.render('login');
});

router.post('/login',
    //express-validator middleware to validate the input
    [
        body('username').trim().notEmpty().withMessage('Username is required'),
        body('password').notEmpty().withMessage('Password is required')
    ],
    async (req, res, next) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            // If there are validation errors, render the login page with error messages
            return res.render('/login', { error: errors.array() });
        }

        const { username, password } = req.body;
        // Check if the user exists in the database
        // Dummy check – replace with actual DB check
        if (username === 'Simon Star' && password === 'hashedpassword1') {
            req.session.organizer = { username };
            return res.redirect('/organizer/home');
        } else {
            return res.render('/login', {
                error: 'Invalid credentials'
            });
        }
        
    }
)

router.get('/register', (req, res) => {
    res.render('register');
});

// Export the router object so index.js can access it
module.exports = router;