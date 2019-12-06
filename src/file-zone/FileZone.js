import React, {Component} from 'react';
import './FileZone.css';
import getMockText from "../text.service";
import {getSynonymous} from './../utils'

class FileZone extends Component {
    state = {
        text: '',
        selectedText: '',
        synonymousList: []
    }

    componentDidMount = () => {
        getMockText().then((result) => {
            this.setState(() => ({
                text: result
            }))
        });
    };
    // to have ability style text after selecting it
    componentDidUpdate = (prevProps, prevState) => {
        if (
            prevProps.bold !== this.props.bold ||
            prevProps.italic !== this.props.italic ||
            prevProps.underline !== this.props.underline
        ) {
            this.replaceString()
        }
    };

    checkStyles = () => {
        const {bold, italic, underline} = this.props;
        let itemClass = '';
        if (bold) {
            itemClass = 'bold'
        }
        if (italic) {
            itemClass += ' italic'
        }
        if (underline) {
            itemClass += ' underline'
        }
        return itemClass
    };

    formatString = selObj => `<span class='${this.checkStyles()}'>${selObj}</span>`;

    // formatting text string, with adding necessary styles
    replaceString = () => {
        const selObj = this.state.selectedText,
            fullRegexp = new RegExp('<\s*span[^>]*>' + selObj + '<\s*/\s*span>', 'g'),
            emptyRegexp = new RegExp(selObj, 'g'),
            regexp = this.state.text.match(fullRegexp) ? fullRegexp : emptyRegexp,
            string = this.state.text.replace(regexp, this.formatString(selObj));

        this.setState((prevstate) => ({
            text: selObj !== '' ? string : prevstate.text
        }));
    };
    // replace synonymous
    replaceSynonymous = (elem) => {
        const selObj = this.state.selectedText,
            emptyRegexp = new RegExp(selObj, 'g'),
            string = this.state.text.replace(emptyRegexp, elem);

        this.setState((prevstate) => ({
            text: selObj !== '' ? string : prevstate.text,
            synonymousList: []
        }));
    };

    mouseUp = () => {
        const selectedText = window.getSelection().toString();

        this.setState((prevstate) => ({
            selectedText: selectedText,
            synonymousList: []
        }), () => {
            this.replaceString(false)
            this.synonymous()
        });
    };
    //  get Synonymous list for each word
    synonymous = async () => {
        const data = await getSynonymous(this.state.selectedText)
        data && data.forEach((elem, index) => {
            if (index < 5) {
                this.setState(() => ({
                    synonymousList: [...this.state.synonymousList, elem.word]
                }))
            }
        })
    };

    handleClick = (elem) => {
        this.replaceSynonymous(elem)
    };

    render() {
        return (
            <div id="file-zone">
                <div id="file">
                    <div className="content" onMouseUp={this.mouseUp}
                         dangerouslySetInnerHTML={{__html: this.state.text}}></div>
                    <div className='formatted-list'>
                        <h1>Synonymous list, click to replace</h1>
                        {this.state.synonymousList.length === 0 && <h3>Empty synonymous list</h3>}
                        {this.state.synonymousList.map((elem) => {
                            return <p key={elem} onClick={this.handleClick.bind(null, elem)}>{elem}</p>
                        })}
                    </div>
                </div>
            </div>
        );
    }
}

export default FileZone;
