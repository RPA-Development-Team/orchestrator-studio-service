-- AlterTable
CREATE SEQUENCE useraccount_id_seq;
ALTER TABLE "UserAccount" ALTER COLUMN "id" SET DEFAULT nextval('useraccount_id_seq');
ALTER SEQUENCE useraccount_id_seq OWNED BY "UserAccount"."id";
