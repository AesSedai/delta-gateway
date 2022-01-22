import CssBaseline from "@mui/material/CssBaseline"
import {
    // unstable_createMuiStrictModeTheme as createMuiTheme,
    createTheme,
    ThemeProvider
} from "@mui/material/styles"
import ReactDOM from "react-dom"
import App from "./App"
import "./index.scss"
import * as serviceWorker from "./serviceWorker"

const darkTheme = createTheme({
    palette: {
        mode: "dark"
    }
})

ReactDOM.render(
    // <StrictMode>
    <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <App />
    </ThemeProvider>,
    // </StrictMode>,
    document.getElementById("root")
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
