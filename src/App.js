import React, {Component} from 'react';
import './App.css';
import ControlPanel from "./control-panel/ControlPanel";
import FileZone from "./file-zone/FileZone";

class App extends Component {
    state = {
        bold: false,
        italic: false,
        underline: false,
    };

    onBold = () => {
        this.setState((prevState) => ({
            bold: !prevState.bold
        }))
    };

    onItalic = () => {
        this.setState((prevState) => ({
            italic: !prevState.italic
        }))
    };

    onUnderLine = () => {
        this.setState((prevState) => ({
            underline: !prevState.underline
        }))
    };

    render() {
        const {bold, italic, underline} = this.state
        return (
            <div className="App">
                <header>
                    <span>Simple Text Editor</span>
                </header>
                <main>
                    <ControlPanel
                        onBold={this.onBold}
                        bold={bold}
                        onItalic={this.onItalic}
                        italic={italic}
                        onUnderLine={this.onUnderLine}
                        underline={underline}
                    />
                    <FileZone
                        bold={bold}
                        italic={italic}
                        underline={underline}
                    />
                </main>
            </div>
        );
    }
}

export default App;
