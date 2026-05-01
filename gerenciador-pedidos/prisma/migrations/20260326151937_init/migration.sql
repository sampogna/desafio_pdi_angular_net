-- CreateTable
CREATE TABLE "Product" (
    "id" SERIAL NOT NULL,
    "productName" TEXT NOT NULL,
    "quantity" TEXT,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);
