import express from "express";
import cors from "cors";
import * as dotenv from "dotenv";
import listEndpoints from "express-list-endpoints";
import routes from "./src/routes/index";
import routeLogger from "./src/shared/routesLogger";
import { printEndpoints } from "./src/shared/endpointsFormat"; 

const app = express();
dotenv.config({ path: __dirname + "/.env.development" });
const port = process.env.PORT || 3000;
const hostname = process.env.API_HOST || "localhost";
const hostnameFormated = "http://" + hostname;
// const stage = process.env.STAGE || "dev";
// const initialPath = stage === "dev" ? "/" + stage + "/" : "/";
const is_local = process.env.IS_LOCAL;

const allowedOrigins = [
  "*",
  "https://energizou.vercel.app",
  "http://localhost:3000",
  "http://localhost:3001",
];
// app.options('*', cors()) /
app.use(cors({
  origin: function(origin, callback){
    if(!origin) return callback(null, true);
    if(allowedOrigins.indexOf(origin) === -1){
      var msg =
        "The CORS policy for this site does not " +
        "allow access from the specified Origin." +
        origin;
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  }
}));

app.use(express.json());
app.use(routeLogger);
app.use("/", routes);
if (is_local) {
  const endpoints = listEndpoints(app);
  printEndpoints(endpoints, `${hostnameFormated}:${port}`);
}

// app.use(
//   cors({
//     origin: function (origin, callback) {
//       if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
//         console.log("Origin True");
//         callback(null, true);
//       } else {
//         console.log("Origin False");
//         callback(new Error("Acesso não permitido por CORS"));
//       }
//     },
//   })
// );
app.listen(port, () => {
  console.log(`\nServidor rodando com sucesso ${hostnameFormated}:${port}`);
});
