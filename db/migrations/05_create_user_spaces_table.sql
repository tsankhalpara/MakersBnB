CREATE TABLE user_spaces (
  user_id INTEGER,
  space_id INTEGER,
  FOREIGN KEY (user_id) REFERENCES users (id),
  FOREIGN KEY (space_id) REFERENCES spaces (id) ON DELETE CASCADE
)
