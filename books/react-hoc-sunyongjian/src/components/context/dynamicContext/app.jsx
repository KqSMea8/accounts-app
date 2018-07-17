import React, { Component } from 'react';
import { ThemeContext, themes } from "./theme-context";
// import ThemedButton from './themed-button';
import ThemeTogglerButton from './theme-toggler-button'

function Toolbar(props) {
    return (
        <ThemedButton onClick={props.changeTheme}>
            Change Theme
        </ThemedButton>
    )
}

export default class App extends Component {
    constructor(props) {
        super(props);

        this.toggleTheme = () => {
            this.setState(state => ({
                theme: state.theme === themes.dark ? themes.light : themes.dark
            }))
        }

        this.state = {
            theme: themes.light,
            toggleTheme: this.toggleTheme
        }
    }

    render() {
        return (
            <div>
                <ThemeContext.Provider value={this.state}>
                    {/* <Toolbar changeTheme={this.toggleTheme} /> */}
                    <Content />
                </ThemeContext.Provider>
                {/* <div>
                    <ThemedButton>普通按钮</ThemedButton>
                </div> */}
            </div>
        )
    }
}

function Content() {
    return (
        <div>
            <ThemeTogglerButton />
        </div>
    )
}