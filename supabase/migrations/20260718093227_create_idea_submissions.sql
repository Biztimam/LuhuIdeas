/*
# Create idea_submissions table (single-tenant, no auth)

1. Purpose
- Stores ideas submitted by visitors through the "Share your idea" form on the LUHU IDEAS marketing site.
- This is a public, no-sign-in form, so the table is single-tenant: anyone (anon + authenticated) can read submissions and submit new ones.

2. New Tables
- `idea_submissions`
  - `id`            (uuid, primary key, defaults to gen_random_uuid())
  - `name`          (text, not null) - submitter's name
  - `email`         (text, not null) - submitter's contact email
  - `title`         (text, not null) - short title of the idea
  - `category`      (text, not null) - friction point category (e.g. Home, Work, Travel, Health, Money)
  - `description`   (text, not null) - detailed description of the everyday friction point
  - `status`        (text, not null, default 'submitted') - lifecycle: submitted | under review | in exploration
  - `created_at`    (timestamptz, default now())

3. Indexes
- `idea_submissions_created_at_idx` on `created_at DESC` to power the "recent ideas" feed efficiently.

4. Security
- Enable RLS on `idea_submissions`.
- The data is intentionally public/shared (a no-auth marketing site showing community ideas), so all four CRUD policies use `TO anon, authenticated`:
  - SELECT: anyone can read all submissions (true).
  - INSERT: anyone can insert a new submission (true).
  - UPDATE/DELETE: NOT granted to anon (no policy) so submissions are effectively append-only from the public client, preventing random visitors from editing or deleting others' ideas.
*/
CREATE TABLE IF NOT EXISTS idea_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  title text NOT NULL,
  category text NOT NULL,
  description text NOT NULL,
  status text NOT NULL DEFAULT 'submitted',
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idea_submissions_created_at_idx
  ON idea_submissions (created_at DESC);

ALTER TABLE idea_submissions ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_idea_submissions" ON idea_submissions;
CREATE POLICY "anon_select_idea_submissions"
ON idea_submissions FOR SELECT
TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_idea_submissions" ON idea_submissions;
CREATE POLICY "anon_insert_idea_submissions"
ON idea_submissions FOR INSERT
TO anon, authenticated WITH CHECK (true);