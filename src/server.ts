import express from "express";
import router from "./router";
import morgan from "morgan";
import { protect } from "./modules/auth";
import cors from "cors";
import { createNewUser, signin } from "./controllers/users";
const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



app.get("/", (req, res, next) => {
  // res.status(200);
  // res.json({ message: "Hello from express" });
  setTimeout(() => {
    next(new Error("Hello. Something went wrong"));
  }, 1000);
});

app.use("/api", protect, router);

app.post("/user", createNewUser);
app.post("/signin", signin);

app.use((err, req, res, next) => {
  if (err.type === "auth") {
    res.status(401).json({ message: "unauthorized" });
  } else if (err.type === "input") {
    res.status(400).json({ message: "invalid input" });
  }
});

export default app;
