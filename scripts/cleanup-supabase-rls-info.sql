-- ==========================================
-- Supabase RLS Linter Clean-up Script
-- ==========================================
-- This script adds explicit policies to tables that currently 
-- have RLS enabled but no policies defined. 
-- This will resolve the "RLS Enabled No Policy" INFO messages.

-- For tables that should remain strictly private (Internal/Prisma only):
-- We add an "Explicit Deny" policy or a "Service Role Only" policy.

-- Internal System Tables (Deny All API access)
CREATE POLICY "Internal Only: accounts" ON "accounts" FOR ALL USING (false);
CREATE POLICY "Internal Only: sessions" ON "sessions" FOR ALL USING (false);
CREATE POLICY "Internal Only: users" ON "users" FOR ALL USING (false);
CREATE POLICY "Internal Only: verification_tokens" ON "verification_tokens" FOR ALL USING (false);
CREATE POLICY "Internal Only: audit_logs" ON "audit_logs" FOR ALL USING (false);
CREATE POLICY "Internal Only: webhook_events" ON "webhook_events" FOR ALL USING (false);

-- Analytics & Tracking Tables (Deny All API access)
CREATE POLICY "Internal Only: affiliate_clicks" ON "affiliate_clicks" FOR ALL USING (false);
CREATE POLICY "Internal Only: email_captures" ON "email_captures" FOR ALL USING (false);
CREATE POLICY "Internal Only: stack_metrics" ON "stack_metrics" FOR ALL USING (false);
CREATE POLICY "Internal Only: stack_views" ON "stack_views" FOR ALL USING (false);
CREATE POLICY "Internal Only: stack_adoptions" ON "stack_adoptions" FOR ALL USING (false);

-- Submission & Sponsorship Tables (Deny All API access)
CREATE POLICY "Internal Only: submissions" ON "submissions" FOR ALL USING (false);
CREATE POLICY "Internal Only: sponsorships" ON "sponsorships" FOR ALL USING (false);

-- User Interaction Tables (Can be changed to auth.uid() if using Supabase Auth)
-- For now, we remain restrictive to maintain the current logic.
CREATE POLICY "Internal Only: favorites" ON "favorites" FOR ALL USING (false);
CREATE POLICY "Internal Only: community_stack_likes" ON "community_stack_likes" FOR ALL USING (false);
CREATE POLICY "Internal Only: user_saved_stacks" ON "user_saved_stacks" FOR ALL USING (false);

-- ==========================================
-- END OF SCRIPT
-- ==========================================
