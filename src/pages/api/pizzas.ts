import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient, Prisma } from "@prisma/client";

// Haha, seriously
declare global {
  interface BigInt {
    toJSON(): string;
  }
}
BigInt.prototype.toJSON = function () {
  return String(this);
};

export interface ApiPizzeResponse {
  data: Prisma.PromiseReturnType<typeof getPizze>;
}

async function getPizze() {
  const prisma = new PrismaClient();

  const data = await prisma.pizzas_and_toppings.findMany({
    include: {
      pizzas: true,
      toppings: true,
    },
  });

  return data;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiPizzeResponse>
) {
  const pizze = await getPizze();

  res.status(200).json({ data: pizze });
}
