import React from "react";
import PropTypes from "prop-types";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Slider from "@material-ui/core/Slider";
import Typography from "@material-ui/core/Typography";
import Tooltip from "@material-ui/core/Tooltip";

const useStyles = makeStyles((theme) => ({
  root: {
    width: 600 + theme.spacing(3) * 2
  },
  margin: {
    height: theme.spacing(3)
  }
}));

function ValueLabelComponent(props) {
  const { children, open, value } = props;

  return (
    <Tooltip open={open} enterTouchDelay={0} placement="top" title={value}>
      {children}
    </Tooltip>
  );
}

ValueLabelComponent.propTypes = {
  children: PropTypes.element.isRequired,
  open: PropTypes.bool.isRequired,
  value: PropTypes.number.isRequired
};

const iOSBoxShadow =
  "0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.13),0 0 0 1px rgba(0,0,0,0.02)";

const marks = [{
    value: 2000,
    label: '2000'
  },
  {
    value: 2001
  },
  {
    value: 2002,
    label: '2002'
  },
  {
    value: 2003
  },
  {
    value: 2004,
    label: '2004'
  },
  {
    value: 2005
  },
  {
    value: 2006,
    label: '2006'
  },
  {
    value: 2007
  },
  {
    value: 2008,
    label: '2008'
  },
  {
    value: 2009
  },
  {
    value: 2010,
    label: '2010'
  },
  {
    value: 2011
  },
  {
    value: 2012,
    label: '2012'
  },
  {
    value: 2013
  },
  {
    value: 2014,
    label: '2014'
  },
  {
    value: 2015
  },
  {
    value: 2016,
    label: '2016'
  },
  {
    value: 2017
  },
  {
    value: 2018,
    label: '2018'
  }];

const IOSSlider = withStyles({
  root: {
    color: "#dcdcdc",
    height: 2,
    padding: "15px 0"
  },
  thumb: {
    height: 28,
    width: 28,
    backgroundColor: "#fff",
    boxShadow: iOSBoxShadow,
    marginTop: -14,
    marginLeft: -14,
    "&:focus, &:hover, &$active": {
      boxShadow:
        "0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.3),0 0 0 1px rgba(0,0,0,0.02)",
      // Reset on touch devices, it doesn't add specificity
      "@media (hover: none)": {
        boxShadow: iOSBoxShadow
      }
    }
  },
  active: {},
  valueLabel: {
    left: "calc(-50% + 12px)",
    top: -22,
    "& *": {
      background: "transparent",
      color: "#000"
    }
  },
  track: {
    height: 2
  },
  rail: {
    height: 5,
    opacity: 0.5,
    backgroundColor: "#bfbfbf"
  },
  mark: {
    backgroundColor: "#bfbfbf",
    height: 8,
    width: 1,
    marginTop: -3
  },
  markActive: {
    opacity: 1,
    backgroundColor: "currentColor"
  }
})(Slider);

const PrettoSlider = withStyles({
  root: {
    color: "#dcdcdc",
    height: 8
  },
  thumb: {
    height: 24,
    width: 24,
    backgroundColor: "#fff",
    border: "2px solid currentColor",
    marginTop: -8,
    marginLeft: -12,
    "&:focus, &:hover, &$active": {
      boxShadow: "inherit"
    }
  },
  active: {},
  valueLabel: {
    left: "calc(-50% + 4px)"
  },
  track: {
    height: 8,
    borderRadius: 4
  },
  rail: {
    height: 3,
    opacity:1,
    borderRadius: 3,
    color: "d8d8d8"
  }
})(Slider);

const AirbnbSlider = withStyles({
  root: {
    color: "#dcdcdc",
    height: 3,
    padding: "8px 0"
  },
  thumb: {
    height: 10,
    width: 10,
    backgroundColor: "#fff",
    border: "1px solid currentColor",
    marginTop: -3,
    marginLeft: -3,
    boxShadow: "#ebebeb 0 2px 2px",
    "&:focus, &:hover, &$active": {
      boxShadow: "#ccc 0 2px 3px 1px"
    },
    "& .bar": {
      // display: inline-block !important;
      height: 9,
      width: 1,
      backgroundColor: "currentColor",
      marginLeft: 1,
      marginRight: 1
    }
  },
  active: {},
  track: {
    height: 8,
    borderRadius: 3
  },
  rail: {
    height:3,
    opacity: 1,
    borderRadius: 3
  }
})(Slider);

function valuetext(value) {
    return `${value}`;
  }

export default function CustomizedSlider() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography gutterBottom>iOS</Typography>
      <IOSSlider
        aria-label="ios slider"
        defaultValue={60}
        marks={marks}
        valueLabelDisplay="on"
      />
      <div className={classes.margin} />
      <Typography gutterBottom>pretto.fr</Typography>
      <PrettoSlider
        valueLabelDisplay="on"
        aria-label="pretto slider"
        aria-labelledby="discrete-slider"
        marks
        step={1}
        min={2000}
        max={2018}
        defaultValue={2018}
      />
      <div className={classes.margin} />
      <Typography gutterBottom>Tooltip value label</Typography>
      <Slider
        ValueLabelComponent={ValueLabelComponent}
        aria-label="custom thumb label"
        defaultValue={20}
      />
      <div className={classes.margin} />
      <Typography gutterBottom>Airbnb</Typography>
      <AirbnbSlider
        getAriaValueText={(index) =>
          index%2 === 0 ? `${index}` : ''
        }
        marks={marks}
        step={1}
        min={2000}
        max={2018}
        aria-labelledby="discrete-slider-custom"
        valueLabelDisplay="on"
        defaultValue={[2016, 2018]}
      />
    </div>
  );
}

//getAriaValueText={valuetext}
/*getAriaLabel={(index) =>
          index === 0 ? "Minimum price" : "Maximum price"
        } */
