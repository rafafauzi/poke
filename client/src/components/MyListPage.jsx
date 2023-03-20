import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";

function MyListPage() {
  const [caughtPokemonNames, setCaughtPokemonNames] = useState([]);
  const [caughtPokemonDetails, setCaughtPokemonDetails] = useState([]);

  useEffect(() => {
    // Get the names of all caught Pokemon
    axios.get("http://localhost:9000/caught-pokemons").then((response) => {
      const reversedNames = response.data.caughtPokemonNames.reverse();
      setCaughtPokemonNames(reversedNames);
    });
  }, []);

  useEffect(() => {
    const promises = caughtPokemonNames.map((name) =>
      axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`)
    );
    Promise.all(promises).then((responses) => {
      setCaughtPokemonDetails(responses.map((response) => response.data));
    });
  }, [caughtPokemonNames]);

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
                  <Button onClick={() => handleEditClick(pokemon.name)}>
                    Edit Name
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
