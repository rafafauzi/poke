import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

function DetailPage() {
  const { id } = useParams();
  const [pokemon, setPokemon] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${id}?include=moves`)
      .then((response) => {
        setPokemon(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  if (!pokemon) {
    return <div>Loading...</div>;
  }

  function catchPokemon() {
    axios
      .post("http://localhost:9000/catch-pokemon", {
        pokemon: pokemon.name,
      })
      .then((response) => {
        console.log(response.data);

        if (response.data.success) {
          const succes = window.confirm(response.data.message);
          if (succes) {
            navigate("/mylistpage");
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
  }

  return (
    <Container className="mt-4">
      <Navbar />
      <Row className="justify-content-md-center mb-3">
        <Col md="4">
          <Card>
            <Card.Img
              variant="top"
              src={pokemon.sprites.front_default}
              alt={pokemon.name}
            />
            <Card.Body>
              <div className="text-center">
                <Card.Title>{pokemon.name}</Card.Title>
              </div>
              <div className="d-grid gap-2 mb-3">
                <Button variant="primary" size="lg" onClick={catchPokemon}>
                  CATCH THIS LITTLE WEIRD LOOKING ANIMAL
                </Button>
              </div>
              <Card.Text>
                <strong>Type:</strong>{" "}
                {pokemon.types.map((type) => type.type.name).join(", ")}
                <br />
                <strong>Height:</strong> {pokemon.height}
                <br />
                <strong>Weight:</strong> {pokemon.weight}
                <br />
                <strong>Abilities:</strong>{" "}
                {pokemon.abilities
                  .map((ability) => ability.ability.name)
                  .join(", ")}
                <br />
                <strong>Moves:</strong>{" "}
                {pokemon.moves.map((move) => move.move.name).join(", ")}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default DetailPage;
