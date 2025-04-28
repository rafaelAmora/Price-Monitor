import { amazonSearch } from "./amazon";

export async function findUrl(url: string) {
  if (url.includes("amazon.com.br")) return await amazonSearch(url);
  throw new Error("Site não suportado.");
}
