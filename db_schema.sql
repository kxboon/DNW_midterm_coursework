
-- This makes sure that foreign_key constraints are observed and that errors will be thrown for violations
PRAGMA foreign_keys=ON;

BEGIN TRANSACTION;

-- Create your tables with SQL commands here (watch out for slight syntactical differences with SQLite vs MySQL)

--organizers table
CREATE TABLE IF NOT EXISTS organizers(
    organizer_id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    site_name TEXT DEFAULT 'My Event Site',
    site_description TEXT DEFAULT 'Welcome to my event site',
)

--events table
CREATE TABLE IF NOT EXISTS events(
    event_id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT,
    date TEXT NOT NULL,
    location TEXT NOT NULL,
    state TEXT Default 'planning',
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    published_at TEXT,
    organizer_id INTEGER NOT NULL,
    FOREIGN KEY (organizer_id) REFERENCES organizers(organizer_id) ON DELETE CASCADE
);

--Ticket table
CREATE TABLE IF NOT EXISTS tickets(
    ticket_id INTEGER PRIMARY KEY AUTOINCREMENT,
    event_id INTEGER NOT NULL,
    type TEXT NOT NULL,
    quantity INTEGER NOT NULL,
    price REAL NOT NULL,
    FOREIGN KEY (event_id) REFERENCES events(event_id) ON DELETE CASCADE
);

-- Insert default data (if necessary here)

-- Set up three users
INSERT INTO organizers (name, email, password, site_name, site_description) VALUES
('Simon Star', 'simon@example.com', 'hashedpassword1', 'Simon Events', 'Awesome yoga events'),
('Dianne Dean', 'dianne@example.com', 'hashedpassword2', 'Dianne Yoga', 'Yoga classes for all ages'),
('Harry Hilbert', 'harry@example.com', 'hashedpassword3', 'Harry\'s Events', 'Fun and engaging events');

COMMIT;

