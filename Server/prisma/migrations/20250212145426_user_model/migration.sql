-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "firstname" VARCHAR(255) NOT NULL DEFAULT '',
    "lastname" VARCHAR(255) DEFAULT '',
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "socketId" VARCHAR(255),

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
