import React from "react";
import LabelOutlinedIcon from '@material-ui/icons/LabelOutlined';
import Chip from '@material-ui/core/Chip';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(0.5),
    },
  },
}));

function TagsBar({tags}) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <LabelOutlinedIcon color="action"/>
      {tags.map((tag, i) => {
        //Normally, index as key is bad but labels have no functionality
        return <Chip label={tag} key={i} 
                  variant="outlined" color="primary" size="small"
                />
      })}
    </div>
  );
}

export default TagsBar;