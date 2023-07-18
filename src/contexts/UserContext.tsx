import { PropsWithChildren, useContext, createContext } from "react";
import UserTable from "./UserTable";

const UserContext = createContext(new UserTable);

export default function UserProvider(props:PropsWithChildren){

    const dao = new UserTable();

    return<>
        <UserContext.Provider value={dao}>
            {props.children}
        </UserContext.Provider>
    </>
}

export function useDao(){
    return useContext(UserContext);
}

