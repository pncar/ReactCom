import {createContext} from "react";
import {LocalSettingsType} from "../ts/types.tsx";
type ContextValue = {
    localSettings: LocalSettingsType | null;
};
type Ctx = {
    children?: React.ReactNode,
    props: {localSettings:LocalSettingsType|null}
};
const UserContext = createContext<ContextValue|null>(null);
const UserProvider: React.FC<Ctx> = ({children, props}) => {
    const {localSettings} = props;

    return(
        <UserContext.Provider value={{localSettings}}>
            {children}
        </UserContext.Provider>
    )
}
export {UserContext,UserProvider}