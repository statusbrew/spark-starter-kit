-- CreateTable
CREATE TABLE "Doc" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "qualification" TEXT NOT NULL,

    CONSTRAINT "Doc_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Mentaltext" (
    "textid" INTEGER NOT NULL,
    "docid" INTEGER NOT NULL,
    "text" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Doc_email_key" ON "Doc"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Mentaltext_textid_key" ON "Mentaltext"("textid");

-- AddForeignKey
ALTER TABLE "Mentaltext" ADD CONSTRAINT "Mentaltext_docid_fkey" FOREIGN KEY ("docid") REFERENCES "Doc"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
