import express from "express";
const app = express();
import dotenv from "dotenv";
dotenv.config();
import cookieParser from "cookie-parser";
import "express-async-errors";
import helmet from "helmet";
import xss from "xss-clean";
import mongoSanitize from "express-mongo-sanitize";
import { dirname } from "path";
import { fileURLToPath } from "url";
import path from "path";
import connectDB from "./Db/connectDb.mjs";
import adminRoute from "./route/adminRoute.mjs";
import uploadRoute from "./route/uploadRoute.mjs"
//* middleware imports
import notFoundMiddleware from "./middlewares/not-found.mjs";
import errorHandlerMiddleware from "./middlewares/error-handler.mjs";
import auth from "./middlewares/auth.mjs";
import passport from "passport";
import session from "express-session";


const PORT = process.env.PORT || 3000;
const uri = process.env.MONGO_URI;
const __dirname = dirname(fileURLToPath(import.meta.url));

app.use(express.json({ limit: "50mb" }));
app.use(helmet());
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        "img-src": ["'self'", "https: data:"],
      },
    },
  })
);
app.use(xss());
app.use(mongoSanitize());
app.use(express.urlencoded({ extended: false, limit: "50mb" }));
app.use(express.static(path.resolve(__dirname, "../client/dist")));
app.use(cookieParser());
app.use(
  session({
    secret: "keyboard_+cat",
    resave: true,
    saveUninitialized: true,
  })
);


//* api routes

app.use("/api/admin", adminRoute);
app.use("/api/admin", uploadRoute);


// // //* HTTP GET Request
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/dist", "index.html"));
  res.send("Home");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Max-Age", "1800");
  res.setHeader("Access-Control-Allow-Headers", "content-type");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "PUT, POST, GET, DELETE, PATCH, OPTIONS"
  );
});

//* Middlewares
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const start = async () => {
  try {
    await connectDB(uri);
    console.log("connected to Db....");
    app.listen(PORT, () =>
      console.log(`server is listening on port http://localhost:${PORT}`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
