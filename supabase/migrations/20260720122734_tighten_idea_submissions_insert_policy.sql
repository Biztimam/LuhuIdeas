/*
# Tighten INSERT policy on idea_submissions

## Context
The previous INSERT policy `anon_insert_idea_submissions` used
`WITH CHECK (true)`, which is flagged by Supabase security lints as
"RLS Policy Always True / unrestricted access" because it places no
constraint on the row being inserted. The table is single-tenant
(no auth, no user_id) and is intentionally writable by the public
anon key, so the policy must still allow inserts — but it should
actually validate the payload shape instead of accepting anything.

## Changes
1. Drop the old `anon_insert_idea_submissions` policy.
2. Recreate it with a `WITH CHECK` that enforces:
   - name, email, title, description are non-empty text
   - email matches a basic email pattern
   - category is one of the six fixed values used by the form
     ('Home & Living', 'Work & Focus', 'Travel & Transit',
      'Health & Wellness', 'Money & Admin', 'Something else')
   - status, if provided, is the default 'submitted'
     (the column default already enforces this, but the check
     makes the intent explicit and blocks overrides)

## Security
- RLS remains enabled on the table.
- SELECT policy (anon, authenticated, USING true) is unchanged —
  submissions are intentionally public/shared in the feed.
- INSERT is no longer "always true": malformed or out-of-range
  payloads are rejected at the database boundary even though the
  app has no sign-in screen.
- No UPDATE / DELETE policy exists, so anon/authenticated still
  cannot mutate or remove rows (matching the original design).

## Notes
1. The app uses the anon key for all reads/writes; this policy is
   scoped to `TO anon, authenticated` so the public form keeps working.
2. The category whitelist mirrors `CATEGORIES` in src/lib/content.ts;
   keep the two in sync if the category list changes.
*/

DROP POLICY IF EXISTS "anon_insert_idea_submissions" ON public.idea_submissions;

CREATE POLICY "anon_insert_idea_submissions"
ON public.idea_submissions FOR INSERT
TO anon, authenticated
WITH CHECK (
  COALESCE(length(btrim(name)), 0) > 0
  AND COALESCE(length(btrim(email)), 0) > 0
  AND COALESCE(length(btrim(title)), 0) > 0
  AND COALESCE(length(btrim(description)), 0) > 0
  AND btrim(email) ~ '^[^@\s]+@[^@\s]+\.[^@\s]+$'
  AND category IN (
    'Home & Living',
    'Work & Focus',
    'Travel & Transit',
    'Health & Wellness',
    'Money & Admin',
    'Something else'
  )
  AND (status IS NULL OR status = 'submitted')
);