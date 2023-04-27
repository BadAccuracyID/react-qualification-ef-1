import {gql} from "@apollo/client";

export const GET_ALL_PLAYERS = gql`
    query players {
        id
        name
        stats {
            wins
            losses
            kills
            deaths
            assists
            money
        }
    }
`
