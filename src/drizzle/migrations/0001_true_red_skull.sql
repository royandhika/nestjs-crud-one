ALTER TABLE "user_profiles" DROP CONSTRAINT "user_profiles_userId_unique";--> statement-breakpoint
ALTER TABLE "user_profiles" ALTER COLUMN "user_id" DROP NOT NULL;