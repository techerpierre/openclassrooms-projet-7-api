-- CreateEnum
CREATE TYPE "UserStatus" AS ENUM ('DEFAULT', 'OWNER');

-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('CLIENT', 'ADMIN');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "firstname" TEXT,
    "lastname" TEXT,
    "picture" TEXT,
    "status" "UserStatus" NOT NULL DEFAULT 'DEFAULT',
    "role" "UserRole" NOT NULL DEFAULT 'CLIENT',
    "authorizationsId" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Accomodation" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "cover" TEXT NOT NULL,
    "pictures" TEXT[],
    "description" TEXT NOT NULL,
    "ownerId" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "equipements" TEXT[],
    "tags" TEXT[],

    CONSTRAINT "Accomodation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Authorizations" (
    "id" TEXT NOT NULL,
    "listAccomodation" BOOLEAN NOT NULL DEFAULT false,
    "createAccomodation" BOOLEAN NOT NULL DEFAULT false,
    "deleteAccomodation" BOOLEAN NOT NULL DEFAULT false,
    "findAccomodation" BOOLEAN NOT NULL DEFAULT false,
    "searchAccomodation" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Authorizations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Rating" (
    "id" TEXT NOT NULL,
    "value" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,
    "accomodationId" TEXT NOT NULL,

    CONSTRAINT "Rating_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tag" (
    "id" TEXT NOT NULL,
    "value" TEXT NOT NULL,

    CONSTRAINT "Tag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Equipments" (
    "id" TEXT NOT NULL,
    "value" TEXT NOT NULL,

    CONSTRAINT "Equipments_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_authorizationsId_fkey" FOREIGN KEY ("authorizationsId") REFERENCES "Authorizations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Accomodation" ADD CONSTRAINT "Accomodation_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rating" ADD CONSTRAINT "Rating_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rating" ADD CONSTRAINT "Rating_accomodationId_fkey" FOREIGN KEY ("accomodationId") REFERENCES "Accomodation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
