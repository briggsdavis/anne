SET local check_function_bodies = off;

CREATE TABLE "public"."jewelry_images" (
  "id"               uuid                     NOT NULL DEFAULT extensions.uuid_generate_v4(),
  "jewelry_piece_id" uuid,
  "image_url"        text                     NOT NULL,
  "alt_text"         text                     NOT NULL,
  "is_primary"       boolean                  NOT NULL DEFAULT false,
  "display_order"    integer                  NOT NULL DEFAULT 0,
  "created_at"       timestamp with time zone NOT NULL DEFAULT timezone('utc'::text, now()),
  CONSTRAINT "jewelry_images_pkey" PRIMARY KEY (id)
);

ALTER TABLE "public"."jewelry_images"
  ENABLE ROW LEVEL SECURITY;

CREATE TABLE "public"."jewelry_pieces" (
  "id"          uuid                     NOT NULL DEFAULT extensions.uuid_generate_v4(),
  "title"       text                     NOT NULL,
  "description" text                     NOT NULL,
  "price"       numeric(10,2)            NOT NULL,
  "category"    text                     NOT NULL,
  "materials"   text[]                   NOT NULL DEFAULT '{}'::text[],
  "is_sold"     boolean                  NOT NULL DEFAULT false,
  "is_featured" boolean                  NOT NULL DEFAULT false,
  "admin_notes" text,
  "created_at"  timestamp with time zone NOT NULL DEFAULT timezone('utc'::text, now()),
  "updated_at"  timestamp with time zone NOT NULL DEFAULT timezone('utc'::text, now()),
  "gender"      character varying(6),
  CONSTRAINT "jewelry_pieces_gender_check" CHECK (((gender)::text = ANY (ARRAY[('male'::character varying)::text, ('female'::character varying)::text]))),
  CONSTRAINT "jewelry_pieces_pkey" PRIMARY KEY (id)
);

ALTER TABLE "public"."jewelry_pieces"
  ENABLE ROW LEVEL SECURITY;

CREATE TABLE "public"."ring_sizes" (
  "id"               uuid                     NOT NULL DEFAULT gen_random_uuid(),
  "jewelry_piece_id" uuid,
  "size"             numeric(3,1)             NOT NULL,
  "created_at"       timestamp with time zone DEFAULT now(),
  CONSTRAINT "ring_sizes_pkey" PRIMARY KEY (id)
);

ALTER TABLE "public"."ring_sizes"
  ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.update_updated_at_column()
  RETURNS TRIGGER
  LANGUAGE plpgsql
  AS $function$
BEGIN
    NEW.updated_at = TIMEZONE('utc'::text, NOW());
    RETURN NEW;
END;
$function$;

ALTER TABLE "public"."jewelry_images"
  ADD CONSTRAINT "jewelry_images_jewelry_piece_id_fkey" FOREIGN KEY (jewelry_piece_id) REFERENCES public.jewelry_pieces(id) ON DELETE CASCADE;

ALTER TABLE "public"."ring_sizes"
  ADD CONSTRAINT "ring_sizes_jewelry_piece_id_fkey" FOREIGN KEY (jewelry_piece_id) REFERENCES public.jewelry_pieces(id) ON DELETE CASCADE;

CREATE INDEX idx_jewelry_images_is_primary ON public.jewelry_images USING btree (is_primary);

CREATE INDEX idx_jewelry_images_jewelry_piece_id ON public.jewelry_images USING btree (jewelry_piece_id);

CREATE INDEX idx_jewelry_pieces_category ON public.jewelry_pieces USING btree (category);

CREATE INDEX idx_jewelry_pieces_created_at ON public.jewelry_pieces USING btree (created_at);

CREATE INDEX idx_jewelry_pieces_gender ON public.jewelry_pieces USING btree (gender);

CREATE INDEX idx_jewelry_pieces_is_featured ON public.jewelry_pieces USING btree (is_featured);

CREATE INDEX idx_jewelry_pieces_is_sold ON public.jewelry_pieces USING btree (is_sold);

CREATE INDEX idx_ring_sizes_jewelry_piece_id ON public.ring_sizes USING btree (jewelry_piece_id);

CREATE INDEX idx_ring_sizes_size ON public.ring_sizes USING btree (size);

CREATE TRIGGER update_jewelry_pieces_updated_at
  BEFORE UPDATE ON public.jewelry_pieces
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE POLICY "Allow authenticated users full access to jewelry images" ON "public"."jewelry_images"
  FOR ALL
  TO PUBLIC
  USING ((auth.role() = 'authenticated'::text));

CREATE POLICY "Allow public read access to jewelry images" ON "public"."jewelry_images"
  FOR SELECT
  TO PUBLIC
  USING (true);

CREATE POLICY "Allow authenticated users full access to jewelry pieces" ON "public"."jewelry_pieces"
  FOR ALL
  TO PUBLIC
  USING ((auth.role() = 'authenticated'::text));

CREATE POLICY "Allow public read access to jewelry pieces" ON "public"."jewelry_pieces"
  FOR SELECT
  TO PUBLIC
  USING (true);

CREATE POLICY "Allow authenticated users to delete jewelry images" ON "storage"."objects"
  FOR DELETE
  TO PUBLIC
  USING (((bucket_id = 'jewelry-images'::text) AND (auth.role() = 'authenticated'::text)));

CREATE POLICY "Allow authenticated users to update jewelry images" ON "storage"."objects"
  FOR UPDATE
  TO PUBLIC
  USING (((bucket_id = 'jewelry-images'::text) AND (auth.role() = 'authenticated'::text)));

CREATE POLICY "Allow authenticated users to upload jewelry images" ON "storage"."objects"
  FOR INSERT
  TO PUBLIC
  WITH CHECK (((bucket_id = 'jewelry-images'::text) AND (auth.role() = 'authenticated'::text)));

CREATE POLICY "Allow public access to jewelry images" ON "storage"."objects"
  FOR SELECT
  TO PUBLIC
  USING ((bucket_id = 'jewelry-images'::text));

COMMENT ON COLUMN "public"."jewelry_pieces"."gender" IS 'Target gender for the jewelry piece - either male or female';

GRANT EXECUTE ON FUNCTION "public"."update_updated_at_column"() TO PUBLIC, "anon", "authenticated";

REVOKE ALL ON FUNCTION "public"."update_updated_at_column"() FROM "postgres";

GRANT EXECUTE ON FUNCTION "public"."update_updated_at_column"() TO "postgres";

GRANT EXECUTE ON FUNCTION "public"."update_updated_at_column"() TO "service_role";

GRANT DELETE, INSERT, MAINTAIN, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON TABLE "public"."jewelry_images" TO "anon", "authenticated";

REVOKE ALL ON TABLE "public"."jewelry_images" FROM "postgres";

GRANT DELETE, INSERT, MAINTAIN, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON TABLE "public"."jewelry_images" TO "postgres";

GRANT DELETE, INSERT, MAINTAIN, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON TABLE "public"."jewelry_images" TO "service_role";

GRANT DELETE, INSERT, MAINTAIN, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON TABLE "public"."jewelry_pieces" TO "anon", "authenticated";

REVOKE ALL ON TABLE "public"."jewelry_pieces" FROM "postgres";

GRANT DELETE, INSERT, MAINTAIN, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON TABLE "public"."jewelry_pieces" TO "postgres";

GRANT DELETE, INSERT, MAINTAIN, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON TABLE "public"."jewelry_pieces" TO "service_role";

GRANT DELETE, INSERT, MAINTAIN, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON TABLE "public"."ring_sizes" TO "anon", "authenticated";

REVOKE ALL ON TABLE "public"."ring_sizes" FROM "postgres";

GRANT DELETE, INSERT, MAINTAIN, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON TABLE "public"."ring_sizes" TO "postgres";

GRANT DELETE, INSERT, MAINTAIN, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON TABLE "public"."ring_sizes" TO "service_role";

