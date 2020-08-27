import React, {Component} from 'react';
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import {CardContent} from "@material-ui/core";
import NoImg from "../img/NoImg.png";
import withStyles from "@material-ui/core/styles/withStyles";

const styles = ({ styles }) => ({
    ...styles
})

class ScreamSkeleton extends Component {
    render() {
        const { classes } = this.props;

        return Array.from({ length: 3 }).map((_, i) => (
          <Card className={classes.card} key={i}>
              <CardMedia className={classes.cover} image={NoImg}/>
              <CardContent className={classes.cardContent}>
                  <div className={classes.handle}/>
                  <div className={classes.date}/>
                  <div className={classes.fullLine}/>
                  <div className={classes.fullLine}/>
                  <div className={classes.halfLine}/>
              </CardContent>
          </Card>
        ))

    }
}

export default  withStyles(styles)(ScreamSkeleton);