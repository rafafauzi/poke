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

//catch-pokemon route
app.post("/catch-pokemon", (req, res) => {
  const { pokemon } = req.body;

  if (caughtPokemons[pokemon]) {
    res.json({
      success: false,
      message: `You have already caught ${pokemon}!`,
    });
  } else {
    const probability = Math.random();

    if (probability >= 0.5) {
      caughtPokemons[pokemon] = true;
      console.log(caughtPokemons);
      res.json({ success: true, message: `You caught ${pokemon}!` });
    } else {
      res.json({ success: false, message: `You failed to catch ${pokemon}!` });
    }
  }
});

//get-caught-pokemons route
app.get("/caught-pokemons", (req, res) => {
  const caughtPokemonNames = Object.keys(caughtPokemons);
  res.json({ caughtPokemonNames });
});

// app.put("/caught-pokemon/:name", (req, res) => {
//   const { name } = req.params;
//   const { newName } = req.body;
//   console.log(name);
//   if (!caughtPokemons[name]) {
//     res
//       .status(404)
//       .json({ success: false, message: `Pokemon ${name} not found` });
//   } else {
//     caughtPokemons[newName] = true;
//     delete caughtPokemons[name];
//     res.json({ success: true, message: `Renamed ${name} to ${newName}` });
//   }
// });

app.post("/release-pokemon", (req, res) => {
  const { pokemon } = req.body;

  const releaseNumber = Math.floor(Math.random() * 100);

  let isPrime = true;
  for (let i = 2; i < releaseNumber; i++) {
    if (releaseNumber % i === 0) {
      isPrime = false;
      break;
    }
  }
  if (isPrime) {
    delete caughtPokemons[pokemon];
    console.log(caughtPokemons);
    res.json({
      success: true,
      message: `${pokemon} has been released. The release number ${releaseNumber} is prime.`,
    });
  } else {
    res.json({
      success: false,
      message: `${pokemon} release has failed. The release number ${releaseNumber} is not prime.`,
    });
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
