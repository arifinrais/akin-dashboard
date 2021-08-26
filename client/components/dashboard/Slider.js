import React from "react";
import PropTypes from "prop-types";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Slider from "@material-ui/core/Slider";
//import Typography from "@material-ui/core/Typography";
import Tooltip from "@material-ui/core/Tooltip";

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%'
  },
  margin: {
    height: theme.spacing(0)
  }
}));

function ValueLabelComponent(props) {
  const { children, open, value } = props;
  return (
    <Tooltip arrow open={open} enterTouchDelay={0} placement="top" title={value}>
      {children}
    </Tooltip>
  );
}

ValueLabelComponent.propTypes = {
  children: PropTypes.element.isRequired,
  open: PropTypes.bool.isRequired,
  value: PropTypes.number.isRequired
};

//tar ini diisi sama state pake component did mount juga, parent-child harus dibenerin
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

const TimelineSlider = withStyles({
    root: {
      color: "#dcdcdc",
      height: 3,
      padding: "8px 0"
    },
    thumb: {
      height: 24,
      width: 0.1,
      backgroundColor: "#717171",
      border: "1px solid #717171",
      marginTop: -9,
      marginLeft: 0,
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
    valueLabel: {
      left: "calc(+50% - 10px)",
      top: -16,
      "& *": {
        background: "transparent",
        color: "#fff",
        backgroundColor: "#000"
      }
    },
    track: {
      height: 8,
      opacity: 1,
      borderRadius: 5,
    },
    rail: {
      height:8,
      opacity: 1,
      borderRadius: 5
    },
    mark: {
      backgroundColor: "#000000",
      height: 8,
      width: 1,
      marginTop: 0,
      color: "#000000"
    }
  })(Slider);  

const TimerangeSlider = withStyles({
  root: {
    color: "#dcdcdc",
    height: 3,
    padding: "8px 0"
  },
  thumb: {
    height: 24,
    width: 0.1,
    backgroundColor: "#717171",
    border: "1px solid #717171",
    marginTop: -9,
    marginLeft: 0,
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
  valueLabel: {
    left: "calc(+50% - 10px)",
    top: -16,
    "& *": {
      background: "transparent",
      color: "#fff",
      backgroundColor: "#000"
    }
  },
  track: {
    height: 3,
    opacity: 1,
    borderRadius: 5,
    color: "#a9a9a9",
    alignTracks:"center",
    top: 11
  },
  rail: {
    height:8,
    opacity: 1,
    borderRadius: 5
  },
  mark: {
    backgroundColor: "#000000",
    height: 8,
    width: 1,
    marginTop: 0,
    color: "#000000"
  }
})(Slider);

export default function CustomizedSlider(props) {
    const classes = useStyles();
    const handleChange = (ev, val) => {
      props.updateYear(val);
    };
    //var temp = true
    //conditional vtype
    if (props.vtype == "otv"){
        return (
            <div className={classes.root}>
                <div className={classes.margin} />
                <TimerangeSlider
                  ValueLabelComponent={ValueLabelComponent}
                  marks={marks}
                  step={1}
                  min={2000}
                  max={2018}
                  aria-labelledby="discrete-slider-custom"
                  valueLabelDisplay="auto"
                  defaultValue={[2007, 2018]}
                  onChange={handleChange}
                  onChangeCommitted={handleChange}
                />
            </div>
        );
    } else if (props.vtype === "tmv") {
        return(
            <div className={classes.root}>
              <div className={classes.margin} />
                <TimelineSlider
                ValueLabelComponent={ValueLabelComponent}
                marks={marks}
                step={1}
                min={2000}
                max={2018}
                aria-labelledby="discrete-slider-custom"
                valueLabelDisplay="auto"
                defaultValue={props.year}
                onChange={handleChange}
                onChangeCommitted={handleChange}
                />
            </div>
        );
    } else {
      //handling not-needed slider
      return null
    }
}

//getAriaValueText={valuetext}
/*getAriaLabel={(index) =>
          index === 0 ? "Minimum price" : "Maximum price"
        } */
