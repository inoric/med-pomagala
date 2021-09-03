-- AlterTable
ALTER TABLE "Returns" ALTER COLUMN "returnedAt" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Users" ADD COLUMN     "deleted" BOOLEAN NOT NULL DEFAULT false;
