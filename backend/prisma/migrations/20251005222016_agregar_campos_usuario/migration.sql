/*
  Warnings:

  - A unique constraint covering the columns `[ci]` on the table `Usuario` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `ci` to the `Usuario` table without a default value. This is not possible if the table is not empty.
  - Added the required column `edad` to the `Usuario` table without a default value. This is not possible if the table is not empty.
  - Added the required column `generoId` to the `Usuario` table without a default value. This is not possible if the table is not empty.
  - Added the required column `paisId` to the `Usuario` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Usuario" ADD COLUMN     "ci" TEXT NOT NULL,
ADD COLUMN     "edad" INTEGER NOT NULL,
ADD COLUMN     "generoId" INTEGER NOT NULL,
ADD COLUMN     "paisId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "public"."Pais" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,

    CONSTRAINT "Pais_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Genero" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,

    CONSTRAINT "Genero_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Pais_nombre_key" ON "public"."Pais"("nombre");

-- CreateIndex
CREATE UNIQUE INDEX "Genero_nombre_key" ON "public"."Genero"("nombre");

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_ci_key" ON "public"."Usuario"("ci");

-- AddForeignKey
ALTER TABLE "public"."Usuario" ADD CONSTRAINT "Usuario_paisId_fkey" FOREIGN KEY ("paisId") REFERENCES "public"."Pais"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Usuario" ADD CONSTRAINT "Usuario_generoId_fkey" FOREIGN KEY ("generoId") REFERENCES "public"."Genero"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
