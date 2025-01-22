import express from "express";
import router from "./router";
import morgan from "morgan";
import { protect } from "./modules/auth";
const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => { 
  req.shhh_secret = "doggy";
  res.status(200)
  next()
})

app.get("/", (req, res) => {
  res.status(200);
  res.json({ message: "Hello from express" });
});

app.use("/api", protect, router);

export default app;
