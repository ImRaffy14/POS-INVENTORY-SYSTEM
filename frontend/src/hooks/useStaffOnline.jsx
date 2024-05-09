import { useContext } from "react";
import { OnlineStaffContext } from "../context/OnlineStaffContext";

export const UseOnlineStaffContext = () => {
    const context = useContext(OnlineStaffContext)

    if(!context){
        throw Error ('useUserContext must be used inside an useContextProvider')
    }

    return context
}