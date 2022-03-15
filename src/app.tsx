import React from "react";
import "./app.css";
import {Spinner} from "react-bootstrap";
import {playerData} from "./api"
import {ModalWindow} from "./components/modal";
import {FieldWinner} from "./components/field";
import {Table} from "./components/table";
import {changingPlayerPoints, sortingPlayers} from "./utils";
import {ListResponse} from "./types/list";
import {PlayerData} from "./types/players";

const startPlayerData = {name: '', points: 0, age: '', city: '', place: 0}

const App: React.FC = () => {
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
    const toggleOpenModal = (e: boolean) => {
        setIsOpen(e);
    }

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

export default App;
