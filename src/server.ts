import { app } from "./app";

const PORT = Number(process.env.PORT);

app.listen(PORT, "0.0.0.0", () => {
  console.log("server is runnig on port " + PORT);
});
