import { NormalizedCacheObject } from "@apollo/client"
import { CachePersistor } from "apollo3-cache-persist"
import { createContext, ReactNode, useContext } from "react"

interface PersistanceContextType {
    persistor: CachePersistor<NormalizedCacheObject> | undefined
}

const PersistanceContext = createContext<PersistanceContextType | null>(null)

interface PersistanceProviderProps extends PersistanceContextType {
    children?: ReactNode
}

export const PersistanceProvider = (props: PersistanceProviderProps): JSX.Element => {
    const { persistor, children, ...other } = props

    return <PersistanceContext.Provider value={{ persistor }}>{children}</PersistanceContext.Provider>
}

export const usePersistor = (): PersistanceContextType | null => useContext(PersistanceContext)
