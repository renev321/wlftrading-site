-- WLF Trading Academy - D1 students table

CREATE TABLE IF NOT EXISTS students (
  student_id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT NOT NULL UNIQUE,
  name TEXT,
  status TEXT NOT NULL DEFAULT 'active',
  course_access INTEGER NOT NULL DEFAULT 1,
  expires_at TEXT,
  notes TEXT,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_students_email ON students (email);
CREATE INDEX IF NOT EXISTS idx_students_status ON students (status);

-- Example student.
-- Replace this email with yours before running if needed.
INSERT OR IGNORE INTO students (
  email,
  name,
  status,
  course_access,
  expires_at,
  notes
) VALUES (
  'renev321@gmail.com',
  'Rene',
  'active',
  1,
  NULL,
  'Owner / test account'
);
