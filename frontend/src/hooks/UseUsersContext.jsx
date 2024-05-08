import { useContext } from "react";
import { userContext } from "../context/UserContext";

export const UseUsersContext = () => {
    const context = useContext(userContext)

    if(!context){
        throw Error ('useUserContext must be used inside an useContextProvider')
    }

    return context
}