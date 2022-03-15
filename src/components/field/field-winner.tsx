import React from "react";
import logo from "../../../src/logo.svg";
import {Col, Container, Row} from "react-bootstrap";
import {PlayerData} from "../../types/players";

interface PlayerDataProps {
    firstPlace: PlayerData
}

export const FieldWinner: React.FC<PlayerDataProps> = ({firstPlace}) => {
    return (
        <Container fluid='sm'>
            <Row>
                <Col sm={2}>
                    <img src={logo} className="App-logo" alt="logo"/>
                </Col>
                <Col sm={8}>
                    <Row>1st Place:</Row>
                    <Row>{firstPlace.name}</Row>
                    <Row>{firstPlace.points}</Row>
                </Col>
            </Row>
        </Container>
    )
};