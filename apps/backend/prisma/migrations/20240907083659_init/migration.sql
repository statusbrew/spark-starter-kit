-- AlterTable
CREATE SEQUENCE mentaltext_textid_seq;
ALTER TABLE "Mentaltext" ALTER COLUMN "textid" SET DEFAULT nextval('mentaltext_textid_seq');
ALTER SEQUENCE mentaltext_textid_seq OWNED BY "Mentaltext"."textid";
