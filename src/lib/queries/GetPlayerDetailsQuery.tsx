import {gql} from "@apollo/client";

export const GET_PLAYER_DETAILS_BY_NAME = gql`
    query playerByName($name: String!) {
        playerByName(name: $name) {
            id
            name
            motto
            avatar
            instagram
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
`

export const GET_PLAYER_DETAILS_BY_ID = gql`
    query playerById($id: ID!) {
        playerById(id: $id) {
            id
            name
            motto
            avatar
            instagram
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
`
