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

export default function CustomizedToggler(props) {
    const [activeModifier, setMod] =React.useState([]); 
    const handleChange = (ev, val) => {
        props.updateModifier(val);
    };
  const classes = useStyles();

  return (
    <Grid container justify="center" alignItems="center">
      <Paper elevation={0} className={classes.paper}>
        <StyledToggleButtonGroup
          size="small"
          value={activeModifier}
          onChange={handleChange}
          aria-label="text alignment"
        >
          <ToggleButton value="A" aria-label="Human Necessities">
            <img src={props.modifier.includes("A")?"/res/classicon/A_.png":"/res/classicon/A.png"} height="25" alt="" />
          </ToggleButton>
          <ToggleButton value="B" aria-label="Operations and Transporting">
            <img src={props.modifier.includes("B")?"/res/classicon/B_.png":"/res/classicon/B.png"} height="25" alt="" />
          </ToggleButton>
          <ToggleButton value="C" aria-label="Chemistry and Metallurgy">
            <img src={props.modifier.includes("C")?"/res/classicon/C_.png":"/res/classicon/C.png"} height="25" alt="" />
          </ToggleButton>
          <ToggleButton value="D" aria-label="Textiles and Paper" >
            <img src={props.modifier.includes("D")?"/res/classicon/D_.png":"/res/classicon/D.png"} width="25" alt="" />
          </ToggleButton>
          <ToggleButton value="E" aria-label="Fixed Construction">
            <img src={props.modifier.includes("E")?"/res/classicon/E_.png":"/res/classicon/E.png"} height="25" alt="" />
          </ToggleButton>
          <ToggleButton value="F" aria-label="Mechanical Engineering">
            <img src={props.modifier.includes("F")?"/res/classicon/F_.png":"/res/classicon/F.png"} height="25" alt="" />
          </ToggleButton>
          <ToggleButton value="G" aria-label="Physics">
            <img src={props.modifier.includes("G")?"/res/classicon/G_.png":"/res/classicon/G.png"} height="25" alt="" />
          </ToggleButton>
          <ToggleButton value="H" aria-label="Electricity">
            <img src={props.modifier.includes("H")?"/res/classicon/H_.png":"/res/classicon/H.png"} height="25" alt="" />
          </ToggleButton>
        </StyledToggleButtonGroup>
      </Paper>
    </Grid>
  );
}
