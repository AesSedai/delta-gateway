import { FC } from "react"
import { MainPage } from "./pages/MainPage"
import { WithApollo } from "./providers/WithApollo"

const App: FC = () => {
    return (
        <WithApollo>
            <MainPage />
        </WithApollo>
    )
}

export default App
