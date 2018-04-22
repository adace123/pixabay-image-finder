import * as React from "react";
import GridList, { GridListTile, GridListTileBar } from "material-ui/GridList";
import { withStyles } from "material-ui/styles";
import IconButton from "material-ui/IconButton";
import ZoomInIcon from "@material-ui/icons/ZoomIn";
import Button from "material-ui/Button";
import Dialog, { DialogActions } from "material-ui/Dialog";

const styles = theme => ({
  root: {
    margin: theme.spacing.unit,
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper
  },
  gridList: {
    margin: theme.spacing.unit
  },
  icon: {
    color: "rgba(255, 255, 255, 0.54)"
  },
  dialogImage: {
    padding: theme.spacing.unit * 2
  }
});

class PhotoGrid extends React.Component {
  state = {
    searchText: "",
    selected: 0,
    showing: false
  };

  handleClose() {
    this.setState({ showing: false });
  }

  handleOpen(i: number) {
    this.setState({ selected: i, showing: true });
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <GridList cols={3} cellHeight={220} className={classes.gridList}>
          {this.props.photos.map((image, i) => (
            <GridListTile key={i}>
              <img src={image.largeImageURL} />
              <GridListTileBar
                title={image.tags}
                subtitle={
                  <span>
                    by <strong>{image.user}</strong>
                  </span>
                }
                actionIcon={
                  <IconButton className={classes.icon}>
                    <ZoomInIcon
                      onClick={this.handleOpen.bind(this, i)}
                      style={{ color: "white" }}
                    />
                  </IconButton>
                }
              />
              <Dialog open={this.state.showing && this.state.selected === i}>
                <img src={image.webformatURL} className={classes.dialogImage} />
                <DialogActions>
                  <Button onClick={this.handleClose.bind(this)} color="primary">
                    CLOSE
                  </Button>
                </DialogActions>
              </Dialog>
            </GridListTile>
          ))}
        </GridList>
      </div>
    );
  }
}

export default withStyles(styles)(PhotoGrid);
