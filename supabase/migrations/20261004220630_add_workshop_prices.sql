CREATE TABLE "public"."workshop_prices" (
  "id"                uuid                     NOT NULL DEFAULT gen_random_uuid(),
  "workshop_type"     text                     NOT NULL,
  "type_note"         text,
  "material"          text                     NOT NULL,
  "detail"            text,
  "price"             numeric(10,2)            NOT NULL,
  "is_starting_price" boolean                  NOT NULL DEFAULT false,
  "price_note"        text,
  "display_order"     integer                  NOT NULL DEFAULT 0,
  "created_at"        timestamp with time zone NOT NULL DEFAULT timezone('utc'::text, now()),
  "updated_at"        timestamp with time zone NOT NULL DEFAULT timezone('utc'::text, now()),
  CONSTRAINT "workshop_prices_pkey" PRIMARY KEY (id),
  CONSTRAINT "workshop_prices_price_check" CHECK (price >= 0)
);

ALTER TABLE "public"."workshop_prices"
  ENABLE ROW LEVEL SECURITY;

CREATE INDEX idx_workshop_prices_display_order ON public.workshop_prices USING btree (display_order);

CREATE TRIGGER update_workshop_prices_updated_at
  BEFORE UPDATE ON public.workshop_prices
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE POLICY "Allow public read access to workshop prices" ON "public"."workshop_prices"
  FOR SELECT
  TO PUBLIC
  USING (true);

CREATE POLICY "Allow authenticated users full access to workshop prices" ON "public"."workshop_prices"
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

INSERT INTO "public"."workshop_prices"
  ("workshop_type", "type_note", "material", "detail", "price", "is_starting_price", "price_note", "display_order")
VALUES
  ('Cross Making', NULL, 'Copper / Brass', NULL, 7800, false, NULL, 10),
  ('Cross Making', NULL, 'Silver', NULL, 12600, false, NULL, 20),
  ('Ring Making', NULL, 'Copper / Brass', NULL, 7500, false, NULL, 30),
  ('Ring Making', NULL, 'Silver', NULL, 12300, false, NULL, 40),
  ('Gemstone Setting', '(Amethyst, Amazonite, Agate, Jasper)', 'Copper / Brass', '(with gemstone)', 8000, true, 'The price increases depending on the stone type', 50),
  ('Gemstone Setting', '(Amethyst, Amazonite, Agate, Jasper)', 'Silver', '(with gemstone)', 10300, true, 'The price increases depending on the stone type', 60);
