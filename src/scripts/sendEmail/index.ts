import nodemailer from "nodemailer";
import { prisma } from "../../db/prisma";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.USER_EMAIL,
    pass: process.env.USER_PASSWORD,
  },
});


// async..await is not allowed in global scope, must use a wrapper
export async function sendEmail(
  precoAtual: number,
  precoDesejado: number,
  user: string,
  email: string,
  urlImage: string | null,
  id: string
) {
  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: '"Minecraft Notifier" <seuemail@gmail.com>',
    to: email,
    subject: "🌍 Sua jornada Minecraft começou!",
    html: `
       <div style="font-family: Arial, sans-serif; background-color: #f4f6f8; padding: 20px; border-radius: 10px; text-align: center;">
  <h2 style="color: #2e7d32;">📢 Atenção, ${user}!</h2>
  <p style="font-size: 16px; color: #333;">
    O produto que você está acompanhando agora está com preço abaixo do desejado!
  </p>
  <p style="font-size: 14px; color: #555;">
    <strong>Preço Atual:</strong> R$ ${precoAtual.toFixed(2)} <br>
    <strong>Preço Desejado:</strong> R$ ${precoDesejado.toFixed(2)}
  </p>
  <img src="https://cdn-icons-png.flaticon.com/512/879/879757.png" 
       alt="Oferta de preço" 
       style="width: 150px; display: block; margin: 20px auto; border-radius: 8px;" />
 <img src= ${urlImage}
       alt="imagem do produto" 
       style="width: 250px; display: block; margin: 20px auto; border-radius: 8px;" />
  <p style="font-size: 14px; color: #555;">
    Não perca essa oportunidade! 🚀
  </p>
</div>
      `,
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>

  await prisma.product.update({
    data: {
      ultimoEmail: new Date(),
    },
    where: {
      id,
    },
  });
}
