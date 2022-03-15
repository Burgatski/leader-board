import {ListResponse} from "../types/list";

export const sortingPlayers = (listOfPlayers: ListResponse[]) => listOfPlayers
    .reduce((sorted: ListResponse[], el: ListResponse) => {
        let index = 0
        while (index < sorted.length && el.points < sorted[index].points) index++
        sorted.splice(index, 0, el)
        return sorted
    }, [])
    .map((player: ListResponse, index: number) => ({...player, place: ++index}))