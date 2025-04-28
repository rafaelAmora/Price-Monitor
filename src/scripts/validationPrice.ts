import { nullable } from "zod";
import { prisma } from "../db/prisma";
import { AppError } from "../utils/AppError";
import { findUrl } from "./priceMonitor";
import { sendEmail } from "./sendEmail";
import { differenceInHours } from "date-fns";

export async function validationPrice() {
  try {
    // Busca todos os produtos no banco de dados
    const productsUsers = await prisma.product.findMany();

    console.log("Iniciando validação de preços...");

    // Atualizar preços de forma paralela usando Promise.all
    await Promise.all(
      productsUsers.map(async (product) => {
        const { valor, imageUrl } = await findUrl(product.url); // Busca o preço atualizado pela URL

        const user = await prisma.user.findFirst({
          where: {
            id: product.usuarioId,
          },
        });

        if (!user) {
          throw new AppError("user not foun", 401);
        }
        let horas: number;

        if (product.ultimoEmail) {
          horas = differenceInHours(new Date(), product.ultimoEmail);
        } else {
          horas = 0; // ou qualquer valor padrão que você deseje usar quando `ultimoEmail` for null
        }

        if (
          (product.precoAtual !== null &&
            product.precoDesejado > product.precoAtual) &&
          product.ultimoEmail === null ||
          horas > 5
        ) {
          sendEmail(
            product.precoAtual!,
            product.precoDesejado,
            user.name,
            user.email,
            product.urlImage,
            product.id
          );
        }

        await prisma.product.update({
          data: {
            precoAtual: valor,
            urlImage: imageUrl,
          },
          where: {
            id: product.id,
          },
        });
      })
    );

    console.log("Validação de preços concluída com sucesso!");
  } catch (error) {
    console.error("Erro durante a validação de preços:", error);
  }
}
