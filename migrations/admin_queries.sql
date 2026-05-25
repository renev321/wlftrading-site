-- Add a new active student
INSERT INTO students (email, name, status, course_access, expires_at, notes)
VALUES ('student@gmail.com', 'Student Name', 'active', 1, NULL, 'Manual payment confirmed');

-- Deactivate a student
UPDATE students
SET status = 'inactive',
    updated_at = CURRENT_TIMESTAMP
WHERE lower(email) = lower('student@gmail.com');

-- Reactivate a student
UPDATE students
SET status = 'active',
    course_access = 1,
    updated_at = CURRENT_TIMESTAMP
WHERE lower(email) = lower('student@gmail.com');

-- Give access until a specific date
UPDATE students
SET status = 'active',
    course_access = 1,
    expires_at = '2026-12-31',
    updated_at = CURRENT_TIMESTAMP
WHERE lower(email) = lower('student@gmail.com');

-- See all students
SELECT student_id, email, name, status, course_access, expires_at, created_at
FROM students
ORDER BY created_at DESC;
