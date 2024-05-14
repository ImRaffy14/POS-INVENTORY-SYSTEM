import { createContext, useReducer } from "react";

export const userContext = createContext()

export const UserContextProvider = ({ children }) => {

    const userReducer = (state, action) => {
        switch(action.type){
            case 'GET_USER':
                return{
                    users: action.payload
                }
            case 'CREATE_USER':
                return{
                    users: [action.payload, ...state.users,]
                }
            case 'DELETE_USER':
                return{
                    users: state.users.filter((u) => u._id !== action.payload._id)
                }
            default:
                return{
                    state
                }
        }

    }

    const [state, dispatch] = useReducer(userReducer, {
        users: null
    })

    return(
        <userContext.Provider value={{...state, dispatch}}>
            { children }
        </userContext.Provider>
    )
}