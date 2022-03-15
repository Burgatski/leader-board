import {ListResponse} from "../types/list";

export const changingPlayerPoints = (listOfPlayers: ListResponse[]) => listOfPlayers.map((player: ListResponse) => ({
        ...player,
        points: Math.floor(Math.random() * (100 - 1 + 1) + 1)
    })
)