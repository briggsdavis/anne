-- Convert stored prices from Ethiopian birr to US dollars.
-- Rate: 1 USD = 162.39070908 ETB. Rounded to the nearest $0.05.
-- Original birr values are saved in supabase/backups/prices-etb-2026-10-04.json.

UPDATE "public"."jewelry_pieces"
  SET price = round(price / 162.39070908 * 20) / 20;

UPDATE "public"."workshop_prices"
  SET price = round(price / 162.39070908 * 20) / 20;
