import React from 'react';
import './ControlPanel.css';

const ControlPanel = ({onBold, onItalic, onUnderLine, bold, italic, underline}) => {

    return (
        <div id="control-panel">
            <div id="format-actions">
                <button className={`format-action ${bold && 'clicked'}`} onClick={onBold} type="button">
                    <b>B</b></button>
                <button className={`format-action ${italic && 'clicked'}`} onClick={onItalic}
                        type="button"><i>I</i></button>
                <button className={`format-action ${underline && 'clicked'}`} onClick={onUnderLine}
                        type="button"><u>U</u></button>
            </div>
        </div>
    );
}

export default ControlPanel;
