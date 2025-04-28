import axios from "axios";
import * as cheerio from "cheerio";
import { AppError } from "../../utils/AppError";

interface ReturnUrlPrice {
  valor: number | null;
  imageUrl: string | undefined | null;
}

export async function amazonSearch(url: string): Promise<ReturnUrlPrice> {
  try {
    const { data } = await axios.get(url, {
      headers: {
        "User-Agent": "Mozilla/5.0",
      },
    });

    const $ = cheerio.load(data); // pego todo o html e coloco no $

    const priceText = $(".a-price .a-offscreen").first().text().trim(); // pegando os conteudos das tags atraves de id ou classes
    const imageUrl = $("#imgTagWrapperId #landingImage").attr("src");
    if (!priceText) {
      throw new Error("Preço não encontrado");
    }

    const valor = parseFloat(
      priceText.replace(/[^\d,]/g, "").replace(",", ".")
    );
    return { valor, imageUrl };
  } catch (error) {
    throw new AppError("Erro ao buscar o preço ou informações na Amazon.");
  }
}
