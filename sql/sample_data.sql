-- Sample data inserts
INSERT INTO users (name,email) VALUES ('Demo','demo@example.com');
INSERT INTO devices (user_id, name, type) VALUES (1, 'Thermostat', 'temperature');
INSERT INTO devices (user_id, name, type) VALUES (1, 'Smart Light', 'lighting');
INSERT INTO billing (user_id, amount, status) VALUES (1, 19.99, 'unpaid');
INSERT INTO notifications (user_id, message) VALUES (1, 'Welcome to Luna Smart Home!');
