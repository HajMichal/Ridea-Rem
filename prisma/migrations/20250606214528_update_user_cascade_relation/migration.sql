-- Simple Migration: Update User creator relationship to CASCADE
BEGIN;

-- Drop the existing foreign key constraint (assuming default Prisma naming)
ALTER TABLE "User" DROP CONSTRAINT IF EXISTS "User_creatorId_fkey";

-- Add the new constraint with CASCADE
ALTER TABLE "User" 
ADD CONSTRAINT "User_creatorId_fkey" 
FOREIGN KEY ("creatorId") 
REFERENCES "User"("id") 
ON DELETE CASCADE 
ON UPDATE CASCADE;

COMMIT;