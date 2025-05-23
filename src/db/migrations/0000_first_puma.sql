-- Custom SQL migration file, put your code below! --
CREATE TABLE tasks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    done INTEGER DEFAULT 0 NOT NULL, -- SQLite stores booleans as 0 or 1
    created_at TEXT DEFAULT (CURRENT_TIMESTAMP) NOT NULL,
    updated_at TEXT DEFAULT (CURRENT_TIMESTAMP)
);

CREATE TRIGGER update_tasks_updated_at
AFTER UPDATE OF name, done -- List all columns that, if updated, should trigger updatedAt change
ON tasks
FOR EACH ROW
WHEN NEW.updated_at IS OLD.updated_at -- Condition to only update if updatedAt wasn't explicitly set
BEGIN
  UPDATE tasks
  SET updated_at = CURRENT_TIMESTAMP
  WHERE id = NEW.id;
END;