import React from 'react';
import ReactDOM from 'react-dom';
import EpisodeEditor from './EpisodeEditor';
import FeedEditor from './FeedEditor';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import Drawer from 'material-ui/Drawer';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import { withStyles } from 'material-ui/styles';
import ArtTrackIcon from '@material-ui/icons/ArtTrack';
import MicIcon from '@material-ui/icons/Mic';

const drawerWidth = 240;

const styles = theme => ({
  drawerPaper: {
    position: 'relative',
    width: drawerWidth,
  }
});

class Editor extends React.Component {
    render() {
        const { selectedEpisodeIndex, onSelectionChanged, jsonFeed, classes } = this.props;

        let feedSettingsButton;
        let episodeButtons;

        if (jsonFeed){
            const onFeedSettingsClick = ()=> onSelectionChanged(-1);
            const selectedClass = selectedEpisodeIndex === -1 ? 'sidebar__episode--selected' : '';
            feedSettingsButton = (
                <ListItem button onClick={onFeedSettingsClick}>
                    <ListItemIcon><ArtTrackIcon/></ListItemIcon>
                    <ListItemText primary="Feed Settings" />
                </ListItem>);

            episodeButtons = jsonFeed.episodes.map((episode, index)=>{
                const onEpisodeClick = ()=> onSelectionChanged(index);
                const selectedClass = selectedEpisodeIndex === index ? 'sidebar__episode--selected' : '';
                return (
                    <ListItem button onClick={onEpisodeClick}>
                        <ListItemText primary={episode.title} />
                    </ListItem>
                );
            });
        }

        return (
            <div className="app-sidebar">
                <List component="nav" dense={true}>
                    { feedSettingsButton }
                    <Divider />
                    { episodeButtons }
                </List>
            </div>
        );
    }
}

export default withStyles(styles)(Editor);