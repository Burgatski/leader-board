import React from "react"
import {Col, Container, Row} from "react-bootstrap";
import {useListAnimation} from "../../hooks";
import {PlayerData} from "../../types/players";
import {Delta} from "../../types/animation";

interface TableProps {
    listPlayers: PlayerData[],
    handleClickRow: (item: PlayerData) => void
}

export const Table: React.FC<TableProps> = React.memo(({listPlayers, handleClickRow}) => {
    const listRef = React.createRef<HTMLUListElement>();

    useListAnimation({
        root: listRef,
        invert,
        play,
    });
    const handleClick = React.useCallback((player) => {
        handleClickRow(player)
    },[handleClickRow])

    return (
        <Container>
            <Row>
                <Col>Place</Col>
                <Col>Name</Col>
                <Col>Points</Col>
            </Row>
            <main ref={listRef}>
                {listPlayers.map((player: PlayerData) => {
                    return (
                        <Row data-key={player.name} className='table-row' key={`${player.name}${player.points}`}
                             onClick={() => handleClick(player)}>
                            <Col>{player.place}</Col>
                            <Col>{player.name}</Col>
                            <Col>{player.points}</Col>
                        </Row>
                    )})}
            </main>
        </Container>
    )
})

const invert = (delta: Delta, elem: HTMLElement) => {
    elem.style.transform = `translate(${delta.left}px, ${delta.top}px)`;
    elem.style.transition = `transform 0s`;
};

const play = (elem: HTMLElement) => {
    elem.style.transform = ``;
    elem.style.transition = `transform 500ms ease`;
};