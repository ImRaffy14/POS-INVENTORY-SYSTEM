import { createContext, useReducer } from "react";

export const OnlineStaffContext = createContext();

export const OnlineStaffContextProvider = ({ children }) => {

    const StaffOnlineReducer = (state, action) => {
        switch(action.type){
            case 'GET_STAFF':
                return{
                    staffOnline: action.payload
                }
            default:
                return state
                
        }
    }


    const [state, dispatch] = useReducer(StaffOnlineReducer, {
        staffOnline: null
    })

    return (
        <OnlineStaffContext.Provider value={{...state, dispatch }}>
            {children}
        </OnlineStaffContext.Provider>
    );
};
