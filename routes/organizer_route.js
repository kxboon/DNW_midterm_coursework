// routes/organizer_route.js

const express = require('express');
const router = express.Router();

// Organizer Home Page
router.get('/home', (req, res) => {
    if (!req.session.organizer) {
        // If not logged in, redirect to login
        return res.redirect('/auth/login');
    }

    res.render('organizer_home', {
        username: req.session.organizer.username
    });
});

module.exports = router;
