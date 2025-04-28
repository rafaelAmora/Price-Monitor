import { Request, Response, NextFunction } from "express";
import z from "zod";
import { prisma } from "../db/prisma";
import { hash } from "bcrypt";

class UserController {
  async create(request: Request, response: Response, next: NextFunction) {
    const bodySchema = z.object({
      name: z.string().min(3),
      email: z.string().email(),
      password: z.string().min(6),
    });

    const { name, password, email } = bodySchema.parse(request.body);
    const passwordHashed = await hash(password, 8);

    await prisma.user.create({
      data: {
        email,
        name,
        password: passwordHashed,
      },
    });

    response.status(201).json()
  }
}

export {UserController}