-- Row Level Security Policies for ConnectSync

-- Profiles policies
CREATE POLICY "profiles_select_own" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "profiles_insert_own" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "profiles_update_own" ON public.profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "profiles_delete_own" ON public.profiles FOR DELETE USING (auth.uid() = id);

-- Bio pages policies
CREATE POLICY "bio_pages_select_own" ON public.bio_pages FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "bio_pages_select_published" ON public.bio_pages FOR SELECT USING (is_published = true);
CREATE POLICY "bio_pages_insert_own" ON public.bio_pages FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "bio_pages_update_own" ON public.bio_pages FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "bio_pages_delete_own" ON public.bio_pages FOR DELETE USING (auth.uid() = user_id);

-- Bio links policies
CREATE POLICY "bio_links_select_via_page" ON public.bio_links FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM public.bio_pages 
    WHERE bio_pages.id = bio_links.bio_page_id 
    AND (bio_pages.user_id = auth.uid() OR bio_pages.is_published = true)
  )
);
CREATE POLICY "bio_links_insert_own" ON public.bio_links FOR INSERT WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.bio_pages 
    WHERE bio_pages.id = bio_links.bio_page_id 
    AND bio_pages.user_id = auth.uid()
  )
);
CREATE POLICY "bio_links_update_own" ON public.bio_links FOR UPDATE USING (
  EXISTS (
    SELECT 1 FROM public.bio_pages 
    WHERE bio_pages.id = bio_links.bio_page_id 
    AND bio_pages.user_id = auth.uid()
  )
);
CREATE POLICY "bio_links_delete_own" ON public.bio_links FOR DELETE USING (
  EXISTS (
    SELECT 1 FROM public.bio_pages 
    WHERE bio_pages.id = bio_links.bio_page_id 
    AND bio_pages.user_id = auth.uid()
  )
);

-- AI summaries policies
CREATE POLICY "ai_summaries_select_own" ON public.ai_summaries FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "ai_summaries_insert_own" ON public.ai_summaries FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "ai_summaries_update_own" ON public.ai_summaries FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "ai_summaries_delete_own" ON public.ai_summaries FOR DELETE USING (auth.uid() = user_id);

-- Subscriptions policies
CREATE POLICY "subscriptions_select_own" ON public.subscriptions FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "subscriptions_insert_own" ON public.subscriptions FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "subscriptions_update_own" ON public.subscriptions FOR UPDATE USING (auth.uid() = user_id);

-- Analytics policies
CREATE POLICY "analytics_select_own" ON public.link_analytics FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "analytics_insert_public" ON public.link_analytics FOR INSERT WITH CHECK (true); -- Allow public inserts for tracking
