-- CreateTable
CREATE TABLE "products" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "nome" TEXT,
    "preco_desejado" DOUBLE PRECISION NOT NULL,
    "preco_atual" DOUBLE PRECISION,
    "atualizadoEm" TIMESTAMP(3),
    "user_id" TEXT NOT NULL,

    CONSTRAINT "products_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "products_id_key" ON "products"("id");
