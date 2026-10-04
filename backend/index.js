import express from "express";
import cors from "cors";
import AthleteRoutes from "./routes/AthleteRoute.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(AthleteRoutes);

app.listen(5000, () => console.log('Serveur Backend démarré sur le port 5000...'));