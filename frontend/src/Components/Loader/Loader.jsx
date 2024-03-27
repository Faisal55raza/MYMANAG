import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import Flex from "../Ui/Flex/Flex";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > * + *": {
      marginLeft: theme.spacing(2),
    },
  },
}));

export default function Loader() {
  const classes = useStyles();

  return (
    <Flex className={classes.root}>
      <CircularProgress color="secondary" />
    </Flex>
  );
}
