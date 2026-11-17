-- Partial Unique Indexes for Soft Delete Support (WHERE deleted_at IS NULL)
CREATE UNIQUE INDEX users_email_active_idx ON users (email) WHERE deleted_at IS NULL;
CREATE UNIQUE INDEX learning_modules_code_active_idx ON learning_modules (code) WHERE deleted_at IS NULL;
CREATE UNIQUE INDEX learning_modules_slug_active_idx ON learning_modules (slug) WHERE deleted_at IS NULL;
