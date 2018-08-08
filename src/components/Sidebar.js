import React from 'react';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import { withStyles } from 'material-ui/styles';
// import ArtTrackIcon from '@material-ui/icons/ArtTrack';

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
                <ListItem button onClick={onFeedSettingsClick} className={selectedClass}>
                    {/* <ListItemIcon><ArtTrackIcon/></ListItemIcon> */}
                    <ListItemText primary="Feed Settings" />
                </ListItem>);

            episodeButtons = jsonFeed.episodes.map((episode, index)=>{
                const onEpisodeClick = ()=> onSelectionChanged(index);
                const selectedClass = selectedEpisodeIndex === index ? 'sidebar__episode--selected' : '';
                return (
                    <ListItem button onClick={onEpisodeClick} className={selectedClass}>
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