import { Request, Response, NextFunction } from "express";
import z, { number } from "zod";
import { prisma } from "../db/prisma";
import { AppError } from "../utils/AppError";

class ProductController {
  async create(request: Request, response: Response, next: NextFunction) {
    const bodySchema = z.object({
      url: z.string().url(),
      nome: z.string(),
      precoDesejado: z.number().min(2),
      precoAtual: z.number().optional(),
      usuarioId: z.string(),
    });

    const { url, nome, precoDesejado, precoAtual, usuarioId } =
      bodySchema.parse(request.body);

    const user = await prisma.user.findUnique({
      where: {
        id: usuarioId,
      },
    });

    if (!user) {
      throw new AppError("user not found", 401);
    }

    await prisma.product.create({
      data: {
        precoDesejado,
        url,
        nome,
        usuarioId,
        precoAtual,
      },
    });

    response.status(201).json();
  }
}

export { ProductController };
