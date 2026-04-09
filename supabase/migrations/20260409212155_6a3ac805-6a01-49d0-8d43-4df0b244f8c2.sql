
-- Create site_content table for editable content
CREATE TABLE public.site_content (
  id TEXT NOT NULL PRIMARY KEY,
  content TEXT NOT NULL DEFAULT '',
  image_url TEXT,
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.site_content ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read site content"
  ON public.site_content FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can update site content"
  ON public.site_content FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can insert site content"
  ON public.site_content FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Create site_visits table for analytics
CREATE TABLE public.site_visits (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  visitor_ip TEXT NOT NULL DEFAULT '',
  city TEXT,
  country TEXT,
  referrer TEXT,
  page TEXT NOT NULL DEFAULT '/',
  user_agent TEXT NOT NULL DEFAULT '',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.site_visits ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert visits"
  ON public.site_visits FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can read visits"
  ON public.site_visits FOR SELECT
  TO authenticated
  USING (true);

-- Create storage bucket for site images
INSERT INTO storage.buckets (id, name, public)
VALUES ('site-images', 'site-images', true);

CREATE POLICY "Anyone can view site images"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'site-images');

CREATE POLICY "Authenticated users can upload site images"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'site-images');

CREATE POLICY "Authenticated users can update site images"
  ON storage.objects FOR UPDATE
  TO authenticated
  USING (bucket_id = 'site-images');

CREATE POLICY "Authenticated users can delete site images"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (bucket_id = 'site-images');

-- Seed default content
INSERT INTO public.site_content (id, content) VALUES
  ('hero_title', 'Офтальмолог для всей семьи — с первых дней жизни'),
  ('hero_description', 'Помогаю видеть мир чётко — с первых дней жизни и на долгие годы. Бережная диагностика, доказательный подход и искренняя забота о каждом пациенте.'),
  ('about_text', 'Меня зовут Шавалеева Алина Рустемовна. Я — врач-офтальмолог, принимаю пациентов всех возрастов, включая новорождённых. Работаю в Москве и специализируюсь на детской и взрослой офтальмологии.'),
  ('about_text_2', 'Для меня важно не просто поставить диагноз, а объяснить каждому пациенту и родителю, что происходит, почему и какие шаги предпринять. Я придерживаюсь принципов доказательной медицины и постоянно повышаю квалификацию.'),
  ('manifesto_quote', 'Я верю, что хорошее зрение — это не роскошь, а право каждого. Моя задача — помочь вам видеть мир ясно, будь вам 3 месяца или 70 лет.');
