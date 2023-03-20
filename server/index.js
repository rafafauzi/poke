import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";

/* CONFIGURATION */
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

/* OBJECT */
const caughtPokemons = {};
/* ROUTES */
app.post("/catch-pokemon", (req, res) => {
  const { pokemon } = req.body;

  // Generate a random number between 0 and 1
  if (caughtPokemons[pokemon]) {
    res.json({
      success: false,
      message: `You have already caught ${pokemon}!`,
    });
  } else {
    // Generate a random number between 0 and 1
    const probability = Math.random();

    if (probability >= 0.5) {
      // Add the caught Pokemon name to the caughtPokemons object
      caughtPokemons[pokemon] = true;
      console.log(caughtPokemons);
      res.json({ success: true, message: `You caught ${pokemon}!` });
    } else {
      res.json({ success: false, message: `You failed to catch ${pokemon}!` });
    }
  }
});

app.get("/caught-pokemons", (req, res) => {
  const caughtPokemonNames = Object.keys(caughtPokemons);
  res.json({ caughtPokemonNames });
});

app.put("/caught-pokemon/:name", (req, res) => {
  const { name } = req.params;
  const { newName } = req.body;
  console.log(name);
  if (!caughtPokemons[name]) {
    res
      .status(404)
      .json({ success: false, message: `Pokemon ${name} not found` });
  } else {
    caughtPokemons[newName] = true;
    delete caughtPokemons[name];
    res.json({ success: true, message: `Renamed ${name} to ${newName}` });
  }
});

const PORT = process.env.PORT || 9000;

try {
  app.listen(PORT, () => {
    console.log(`Server run on Port: ${PORT}`);
  });
} catch (error) {
  console.error(`Failed to start server: ${error}`);
}
