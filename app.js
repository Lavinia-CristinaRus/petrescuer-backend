import express from "express";
import User from "./routers/User.js";
import cookieParser from "cookie-parser";
import session from "express-session";
import fileUpload from "express-fileupload";
import cors from "cors";

export const app = express();

app.set('trust proxy', 1);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({
  secret:'blablabla',
  resave:true,
  saveUninitialized:false,
  cookie:{maxAge: 20000 * 60, sameSite: 'none', secure: false}
}));
app.use(
  fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 },
    useTempFiles: true,
  })
);
app.use(cors({
  origin: '*',
  credentials: true, 
  methods: ['POST', 'PUT', 'GET', 'OPTIONS', 'HEAD', 'DELETE'],
  exposedHeaders: ["set-cookie"]
}));

app.use("/api/v1", User);

app.get("/", (req, res) => {
  res.send("Server is working");
});
