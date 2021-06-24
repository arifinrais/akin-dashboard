import React from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";
import Paper from "@material-ui/core/Paper";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
  paper: {
    display: "flex",
    border: `1px ${theme.palette.divider}`,
    flexWrap: "wrap"
  },
  divider: {
    margin: theme.spacing(1, 0.5)
  }
}));

const StyledToggleButtonGroup = withStyles((theme) => ({
  grouped: {
    margin: theme.spacing(0.5),
    border: "none",
    "&:not(:first-child)": {
      borderRadius: theme.shape.borderRadius
    },
    "&:first-child": {
      borderRadius: theme.shape.borderRadius
    }
  }
}))(ToggleButtonGroup);

export default function CustomizedDividers() {
  const [alignment, setAlignment] = React.useState("left");
  const [formats, setFormats] = React.useState(() => ["italic"]);

  const handleFormat = (event, newFormats) => {
    setFormats(newFormats);
  };

  const handleAlignment = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  const classes = useStyles();

  return (
    <Grid container justify="center" alignItems="center">
      <Paper elevation={0} className={classes.paper}>
        <StyledToggleButtonGroup
          size="small"
          value={alignment}
          onChange={handleAlignment}
          aria-label="text alignment"
        >
          <ToggleButton value="left" aria-label="left aligned">
            <img src="/res/classicon/A.png" height="25" alt="" />
          </ToggleButton>
          <ToggleButton value="center" aria-label="centered">
            <img src="/res/classicon/B.png" height="25" alt="" />
          </ToggleButton>
          <ToggleButton value="right" aria-label="right aligned">
            <img src="/res/classicon/C.png" height="25" alt="" />
          </ToggleButton>
          <ToggleButton value="justify" aria-label="justified" >
            <img src="/res/classicon/D.png" width="25" alt="" />
          </ToggleButton>
          <ToggleButton value="bold" aria-label="bold">
            <img src="/res/classicon/E.png" height="25" alt="" />
          </ToggleButton>
          <ToggleButton value="italic" aria-label="italic">
            <img src="/res/classicon/F.png" height="25" alt="" />
          </ToggleButton>
          <ToggleButton value="underlined" aria-label="underlined">
            <img src="/res/classicon/G.png" height="25" alt="" />
          </ToggleButton>
          <ToggleButton value="color" aria-label="color">
            <img src="/res/classicon/H.png" height="25" alt="" />
          </ToggleButton>
        </StyledToggleButtonGroup>
      </Paper>
    </Grid>
  );
}
