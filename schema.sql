DROP TABLE IF EXISTS events;
CREATE TABLE events (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  memo TEXT,
  options TEXT NOT NULL,
  poll_config TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

DROP TABLE IF EXISTS attendees;
CREATE TABLE attendees (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  event_id TEXT NOT NULL,
  token TEXT NOT NULL,
  name TEXT NOT NULL,
  answers TEXT NOT NULL,
  poll_answers TEXT,
  comment TEXT,
  FOREIGN KEY (event_id) REFERENCES events(id)
);
