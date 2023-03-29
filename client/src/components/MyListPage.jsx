import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";

function MyListPage() {
  const [caughtPokemonNames, setCaughtPokemonNames] = useState([]);
  const [caughtPokemonDetails, setCaughtPokemonDetails] = useState([]);
  const [releasePokemon, setReleasePokemon] = useState(false);

  useEffect(() => {
    // Get the names of all caught Pokemon
    axios.get("http://localhost:9000/caught-pokemons").then((response) => {
      const reversedNames = response.data.caughtPokemonNames.reverse();
      setCaughtPokemonNames(reversedNames);
    });
  }, [releasePokemon]);

  useEffect(() => {
    const promises = caughtPokemonNames.map((name) =>
      axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`)
    );
    Promise.all(promises).then((responses) => {
      setCaughtPokemonDetails(responses.map((response) => response.data));
    });
  }, [caughtPokemonNames]);

  //unfinished code
  const handleEditClick = (name) => {
    console.log(name);
    axios
      .put(`http://localhost:9000/caught-pokemon/${name}`)
      .then((response) => {
        const updatedName = response.data.message.split("to ")[1];
        setCaughtPokemonNames((prevNames) =>
          prevNames.map((n) => (n === name ? updatedName : n))
        );
      });
  };

  const handleRelease = (name) => {
    console.log(name);
    axios
      .post("http://localhost:9000/release-pokemon", {
        pokemon: name,
      })
      .then((response) => {
        console.log(response.data);
        if (response.data.success) {
          const success = window.confirm(response.data.message);
          if (success) {
            setReleasePokemon(!releasePokemon); // Toggle the state to re-fetch the list
          }
        } else {
          const tryAgain = window.confirm(response.data.message);
          if (tryAgain) {
          }
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <Container className="mt-4">
      <Navbar />
      <Row className="justify-content-md-center">
        {caughtPokemonDetails.map((pokemon) => (
          <Col md="4" className="mb-4" key={pokemon.id}>
            <Card>
              <Card.Img
                variant="top"
                src={pokemon.sprites.front_default}
                alt={pokemon.name}
              />
              <Card.Body>
                <div className="text-center">
                  <Card.Title>{pokemon.name}</Card.Title>
                  <Button
                    style={{ marginRight: "10px" }}
                    onClick={() => handleEditClick(pokemon.name)}
                  >
                    Edit Name
                  </Button>
                  <Button
                    style={{ backgroundColor: "red" }}
                    onClick={() => handleRelease(pokemon.name)}
                  >
                    Ralease
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default MyListPage;
