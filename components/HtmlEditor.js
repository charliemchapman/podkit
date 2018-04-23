import React from 'react';
import ReactDOM from 'react-dom';
import { EditorState, convertToRaw, convertFromHTML, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';

export default class EpisodeEditor extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            editorState: this.getEditorState(props.value)
        }

        this.onEditorStateChange = this.onEditorStateChange.bind(this);
        this.onSave = this.onSave.bind(this);
    }

    componentWillReceiveProps(nextProps){
        // if (nextProps.value !== this.props.value){
        //     this.setState({editorState: this.getEditorState(nextProps.value)})
        // }
    }

    getEditorState(value){
        const contentBlock = convertFromHTML(value);
        if (contentBlock){
            const contentState = ContentState.createFromBlockArray(contentBlock);
            const editorState = EditorState.createWithContent(contentState);
            return editorState;
        }
        return EditorState.createEmpty();
    }

    onEditorStateChange(editorState) {
        this.setState({ editorState });
    };

    onSave() {
        const { editorState } = this.state;
        var rawHtml = draftToHtml(convertToRaw(editorState.getCurrentContent()));
        this.props.onSave(rawHtml);
    }

    render(){
        return (
            <div className="html-editor">
                <Editor 
                    editorState={this.state.editorState}
                    onEditorStateChange={this.onEditorStateChange}
                    wrapperClassName="html-editor__wrapper"
                    toolbarClassName="html-editor__toolbar"
                    editorClassName="html-editor__editWindow"
                    toolbar={{
                        options: ['inline', 'blockType'],
                        inline: {
                        options: ['bold', 'italic', 'underline'],
                        bold: { className: 'bordered-option-classname' },
                        italic: { className: 'bordered-option-classname' },
                        underline: { className: 'bordered-option-classname' }
                        },
                    }}
                />
                <button onClick={this.onSave}>SAVE</button>
            </div>
        );
    }
}