import React from "react";
import Aux from "../../hoc/Auxxxxx";
import classes from "./Layout.css";
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from "../../components/Layout/Layout";

const layout = props => (
  <Aux>
    <Toolbar/>
    {/* <SideDrawer/> */}
    <main className={classes.Content}>{props.children}</main>
  </Aux>
);

export default layout;
