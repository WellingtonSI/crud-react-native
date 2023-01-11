import React, { createContext, useReducer} from "react";
import users from '../data/users'

const initialState = { users }
const UsersContext = createContext({})

const actions ={
    //a função sempre precisa retornar um novo estado
    createUser(state, action){
        const user = action.payload
        user.id =  Math.random()
        return {
            ...state,
            users: [...state.users, user],
        }
    },
    updateUser(state,action){
        const updated = action.payload
        return {
            ...state,
            users: state.users.map( u => u.id === updated.id ? updated : u)
        }
    },
    deleteUser(state, action){
        const user = action.payload //(playload são os dados enviados para a mudança do estado)
        return {
            ...state,    //(para casos de mais de um estado na aplica, precisa passar todos os dados caso contrário vão deixar de existir)
            users: state.users.filter( u => u.id !== user.id)
        }
    }
}

export const UsersProvider = props => {

    //função que realiza a mudança do estado (no Redux)
    function reducer(state, action){
        const fn = actions[action.type]
        return fn ? fn(state, action) : state
    }

    //dispatch é uma função obrigatória para o funcionamento do Redux
    const [state, dispatch] = useReducer(reducer, initialState)
    return (
        //o Provider proverá os dados para toda aplicação, visto que ele engloba toda ela (props.children é toda aplicação)
        <UsersContext.Provider value={{ state, dispatch }}>
            {props.children}
        </UsersContext.Provider>
    )
}

export default UsersContext

