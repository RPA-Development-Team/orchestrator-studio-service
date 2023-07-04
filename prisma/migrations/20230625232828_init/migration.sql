-- AlterTable
CREATE SEQUENCE package_id_seq;
ALTER TABLE "Package" ALTER COLUMN "id" SET DEFAULT nextval('package_id_seq');
ALTER SEQUENCE package_id_seq OWNED BY "Package"."id";
