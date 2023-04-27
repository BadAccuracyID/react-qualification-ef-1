import {gql} from "@apollo/client";

export const GET_ALL_PLAYERS = gql`
    query players($pageNumber: Int, $limit: Int) {
        players(pageNumber: $pageNumber, limit: $limit) {
            players {
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
        }
    }
`
