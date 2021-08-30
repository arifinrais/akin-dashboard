import React from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";
import Paper from "@material-ui/core/Paper";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import Grid from "@material-ui/core/Grid";
import Tooltip from '@material-ui/core/Tooltip';
import files from '../../../server/providers/resourceProvider';

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
      {
          props.focus=="reg"? 
        <StyledToggleButtonGroup
          size="small"
          value={activeModifier}
          onChange={handleChange}
          aria-label="text alignment"
        >
          <Tooltip title={files.PatentCode["A"]}>
            <ToggleButton value="A" aria-label="Human Necessities">
              <img src={props.modifier.includes("A")?"/res/classicon/A_.png":"/res/classicon/A.png"} height="25" alt="" />
            </ToggleButton>
          </Tooltip>
          <Tooltip title={files.PatentCode["B"]}>
            <ToggleButton value="B" aria-label="Operations and Transporting">
              <img src={props.modifier.includes("B")?"/res/classicon/B_.png":"/res/classicon/B.png"} height="25" alt="" />
            </ToggleButton>
          </Tooltip>
          <Tooltip title={files.PatentCode["C"]}>
            <ToggleButton value="C" aria-label="Chemistry and Metallurgy">
              <img src={props.modifier.includes("C")?"/res/classicon/C_.png":"/res/classicon/C.png"} height="25" alt="" />
            </ToggleButton>
          </Tooltip>
          <Tooltip title={files.PatentCode["D"]}>
            <ToggleButton value="D" aria-label="Textiles and Paper" >
              <img src={props.modifier.includes("D")?"/res/classicon/D_.png":"/res/classicon/D.png"} width="25" alt="" />
            </ToggleButton>
          </Tooltip>
          <Tooltip title={files.PatentCode["E"]}>
            <ToggleButton value="E" aria-label="Fixed Construction">
              <img src={props.modifier.includes("E")?"/res/classicon/E_.png":"/res/classicon/E.png"} height="25" alt="" />
            </ToggleButton>
          </Tooltip>
          <Tooltip title={files.PatentCode["F"]}>
            <ToggleButton value="F" aria-label="Mechanical Engineering">
              <img src={props.modifier.includes("F")?"/res/classicon/F_.png":"/res/classicon/F.png"} height="25" alt="" />
            </ToggleButton>
          </Tooltip>
          <Tooltip title={files.PatentCode["G"]}>
            <ToggleButton value="G" aria-label="Physics">
              <img src={props.modifier.includes("G")?"/res/classicon/G_.png":"/res/classicon/G.png"} height="25" alt="" />
            </ToggleButton>
          </Tooltip>
          <Tooltip title={files.PatentCode["H"]}>
            <ToggleButton value="H" aria-label="Electricity">
              <img src={props.modifier.includes("H")?"/res/classicon/H_.png":"/res/classicon/H.png"} height="25" alt="" />
            </ToggleButton>
          </Tooltip>
        </StyledToggleButtonGroup>:
        <StyledToggleButtonGroup
        size="small"
        value={activeModifier}
        onChange={handleChange}
        aria-label="text alignment"
        >
          <Tooltip title={files.IslandCode["0"]}>
            <ToggleButton value="0" aria-label="Sumatera">
              <img src={props.modifier.includes("0")?"/res/isldicon/0_.png":"/res/isldicon/0.png"} height="25" alt="" />
            </ToggleButton>
          </Tooltip>
          <Tooltip title={files.IslandCode["1"]}>
            <ToggleButton value="1" aria-label="Jawa">
              <img src={props.modifier.includes("1")?"/res/isldicon/1_.png":"/res/isldicon/1.png"} height="25" alt="" />
            </ToggleButton>
          </Tooltip>
          <Tooltip title={files.IslandCode["2"]}>
            <ToggleButton value="2" aria-label="Nusa Tenggara">
              <img src={props.modifier.includes("2")?"/res/isldicon/2_.png":"/res/isldicon/2.png"} height="25" alt="" />
            </ToggleButton>
          </Tooltip>
          <Tooltip title={files.IslandCode["3"]}>
            <ToggleButton value="3" aria-label="Kalimantan">
              <img src={props.modifier.includes("3")?"/res/isldicon/3_.png":"/res/isldicon/3.png"} height="25" alt="" />
            </ToggleButton>
          </Tooltip>
          <Tooltip title={files.IslandCode["4"]}>
            <ToggleButton value="4" aria-label="Sulawesi">
              <img src={props.modifier.includes("4")?"/res/isldicon/4_.png":"/res/isldicon/4.png"} height="25" alt="" />
            </ToggleButton>
          </Tooltip>
          <Tooltip title={files.IslandCode["5"]}>
            <ToggleButton value="5" aria-label="Maluku">
              <img src={props.modifier.includes("5")?"/res/isldicon/5_.png":"/res/isldicon/5.png"} height="25" alt="" />
            </ToggleButton>
          </Tooltip>
          <Tooltip title={files.IslandCode["6"]}>
            <ToggleButton value="6" aria-label="Papua">
              <img src={props.modifier.includes("6")?"/res/isldicon/6_.png":"/res/isldicon/6.png"} height="25" alt="" />
            </ToggleButton>
          </Tooltip>

        </StyledToggleButtonGroup>
        }
      </Paper>
    </Grid>
  );
}
