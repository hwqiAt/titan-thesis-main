import express from "express";
import usersRouter from "./routes/users";

const app = express();
app.use(express.json());
app.use("/users", usersRouter);

const PORT = 3000;
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
