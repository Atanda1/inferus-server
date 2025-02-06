/*
  Warnings:

  - The values [PENDING] on the enum `UPDATE_STATUSES` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `description` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `image` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `Product` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[id,belongsToId]` on the table `Product` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `body` to the `Update` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Update` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "UPDATE_STATUSES_new" AS ENUM ('IN_PROGRESS', 'SHIPPED', 'DEPRECATED');
ALTER TABLE "Update" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "Update" ALTER COLUMN "status" TYPE "UPDATE_STATUSES_new" USING ("status"::text::"UPDATE_STATUSES_new");
ALTER TYPE "UPDATE_STATUSES" RENAME TO "UPDATE_STATUSES_old";
ALTER TYPE "UPDATE_STATUSES_new" RENAME TO "UPDATE_STATUSES";
DROP TYPE "UPDATE_STATUSES_old";
ALTER TABLE "Update" ALTER COLUMN "status" SET DEFAULT 'IN_PROGRESS';
COMMIT;

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "description",
DROP COLUMN "image",
DROP COLUMN "price";

-- AlterTable
ALTER TABLE "Update" ADD COLUMN     "body" TEXT NOT NULL,
ADD COLUMN     "title" TEXT NOT NULL,
ALTER COLUMN "status" SET DEFAULT 'IN_PROGRESS';

-- CreateIndex
CREATE UNIQUE INDEX "Product_id_belongsToId_key" ON "Product"("id", "belongsToId");
