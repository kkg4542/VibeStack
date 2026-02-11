-- ==========================================
-- Supabase RLS Security Fix Script
-- ==========================================
-- This script enables Row Level Security (RLS) on all tables
-- to resolve security errors and hide sensitive columns from the API.

-- 1. Enable RLS on all tables
ALTER TABLE "tools" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "stacks" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "stack_tools" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "blog_posts" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "accounts" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "sessions" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "users" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "verification_tokens" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "reviews" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "favorites" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "affiliate_clicks" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "email_captures" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "submissions" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "webhook_events" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "sponsorships" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "testimonials" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "stack_metrics" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "community_stacks" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "content" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "stack_adoptions" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "community_stack_likes" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "user_saved_stacks" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "stack_views" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "audit_logs" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "community_stacks" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "_CommunityStackToTool" ENABLE ROW LEVEL SECURITY;

-- 2. Define Public Access Policies (Read-Only)
-- These allow anyone to view public content via the API.

CREATE POLICY "Public Read: tools" ON "tools" FOR SELECT USING (true);
CREATE POLICY "Public Read: stacks" ON "stacks" FOR SELECT USING (true);
CREATE POLICY "Public Read: stack_tools" ON "stack_tools" FOR SELECT USING (true);
CREATE POLICY "Public Read: blog_posts" ON "blog_posts" FOR SELECT USING (true);
CREATE POLICY "Public Read: testimonials" ON "testimonials" FOR SELECT USING (true);
CREATE POLICY "Public Read: content" ON "content" FOR SELECT USING (true);
CREATE POLICY "Public Read: community_stacks" ON "community_stacks" FOR SELECT USING (true);
CREATE POLICY "Public Read: reviews" ON "reviews" FOR SELECT USING (true);
CREATE POLICY "_CommunityStackToTool" ON "_CommunityStackToTool" FOR SELECT USING (true);

-- 3. Define User-Specific Policies
-- Note: These assume Supabase Auth is integrated. 
-- If Prisma handles auth entirely, you may choose to leave these tables 
-- with RLS enabled but NO policies, which denies external API access.

-- For now, we will leave internal/sensitive tables with NO policies.
-- This effectively Resolves:
-- - RLS Disabled in Public (Error)
-- - Sensitive Columns Exposed (Error)
-- because Postgres default for RLS with no policies is "deny all" for non-owners.
-- Prisma (Direct Connection) will still have full access.

-- Tables that will be SECURED (No API Access):
-- - accounts
-- - sessions
-- - users
-- - verification_tokens
-- - audit_logs
-- - webhook_events
-- - email_captures
-- - submissions
-- - affiliate_clicks
-- - sponsorships
-- - stack_metrics
-- - stack_views
-- - stack_adoptions

-- 4. Verify Policy (Optional)
-- To allow users to see their own favorites if they use Supabase Client:
-- CREATE POLICY "Users can view own favorites" ON "favorites" FOR SELECT USING (auth.uid()::text = user_id);

-- ==========================================
-- END OF SCRIPT
-- ==========================================
