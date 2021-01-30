import { createContext, useContext, useState } from 'react';

export const UserContext = createContext();

export const UserProvider = (props) => {
    const [user, setUser] = useState(undefined)

    return <UserContext.Provider {...props} value={{ user, setUser }} />
}

export const useUserContext = () => {
    return useContext(UserContext)
}