import React from 'react';
import ReactDOM from 'react-dom';
import LabelInput from './LabelInput';

function getEpisodeForm() {
    return (
        <div className="feed-settings">
            <LabelInput label="Title"/>
            <LabelInput label="Link"/>
            <LabelInput label="Language"/>
            <LabelInput label="Copyright"/>
            <LabelInput label="Subtitle"/>
            <LabelInput label="Author"/>
            <LabelInput label="Summary"/>
            <LabelInput label="Owner Name"/>
            <LabelInput label="Owner Email"/>
            <LabelInput label="Image Url"/>
            <LabelInput label="Category"/>
        </div>
    );
}

class EpisodeEditor extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            isOpen: false
        }
    }

    render() {
        const { isOpen } = this.state;
        const toggle = ()=>this.setState({isOpen: !isOpen});
        const arrowClass = isOpen ? 'arrow-down' : 'arrow-right';
        const title = this.props.episodeXml.title[0];

        let feedSection;
        if (isOpen){
            feedSection = getEpisodeForm();
        }

        return (
            <section>
                <div className="section-header" onClick={toggle}>
                    <div className={arrowClass}/>
                    <span>{title}</span>
                </div>
                { feedSection }
            </section>
        );
    }
}

export default EpisodeEditor;