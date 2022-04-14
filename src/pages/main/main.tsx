import React from "react";
import {ListResponse} from "../../types/list";
import {playerData} from "../../api";
import {PlayerData} from "../../types/players";
import {changingPlayerPoints, sortingPlayers} from "../../utils";
import {Spinner} from "react-bootstrap";
import {FieldWinner} from "../../components/field";
import {Table} from "../../components/table";
import {ModalWindow} from "../../components/modal";

const startPlayerData = {name: '', points: 0, age: '', city: '', place: 0}

export const MainPage: React.FC = () => {
    const [players, setPlayers] = React.useState<Array<ListResponse>>(playerData);
    const [isOpen, setIsOpen] = React.useState<boolean>(false);
    const [currentPlayer, setCurrentPlayer] = React.useState<PlayerData>(startPlayerData);

    React.useEffect(() => {
        const newInterval = setInterval(() => {
            setPlayers(changingPlayerPoints(players))
        }, 5000)

        return (() => {
            clearInterval(newInterval);
        })
    },[players])

    const listOfPlayers: Array<PlayerData> = sortingPlayers(players);
    const handleModalView = (player: PlayerData) => {
        setIsOpen(true);
        setCurrentPlayer(player);
    }
    const toggleOpenModal = React.useCallback((e: boolean) => {
        setIsOpen(e);
    },[])

    if (!listOfPlayers) {
        return <Spinner animation="grow"/>
    }

    return (
        <div className="App">
            <header>
                <FieldWinner firstPlace={listOfPlayers[0]}/>
            </header>
            <main className="main">
                <Table listPlayers={listOfPlayers} handleClickRow={handleModalView}/>
                {isOpen && <ModalWindow handleCloseModal={toggleOpenModal} player={currentPlayer} isOpen={isOpen}/>}
            </main>
        </div>
    );
}