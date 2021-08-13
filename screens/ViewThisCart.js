import React, { useState } from "react";
import { Component } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  MenuItem,
  Menu,
  Fab,
} from "@material-ui/core";
import AccountCircle from "@material-ui/icons/AccountCircle";
import * as Font from "expo-font";
import { withStyles } from "@material-ui/styles";

import HomeIcon from "@material-ui/icons/Home";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import RefreshIcon from "@material-ui/icons/Refresh";

import firebase from "firebase";
import { ListItem } from "react-native-elements";

const styling = (theme) => ({
  title: {
    flexGrow: 1,
  },
  stickToBottom: {
    width: "100%",
    position: "fixed",
    bottom: 0,
  },
  extendedIcon: {
    backgroundColor: "#FAD697",
    position: "fixed",
    bottom: 25,
    right: 160,
  },
});

/**Class Edit Item responsible to update item
 * from the Cart
 */
export class ViewThisCart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      list: [],
      anchorEl: null,
      open: false,
      valueNumber: 0,
    };
  }
  reloadApp() {
    this.componentDidMount();
  }
  /**
   * Handle the Menu when user click on the BarApp
   * @param {event} event
   */
  handleMenu = (event) => {
    this.setState({
      anchorEl: event.currentTarget,
      open: Boolean(event.currentTarget),
    });
  };
  /**
   * Close the Menu when user tap anywhere on the screen
   */
  handleClose = () => {
    this.setState({ anchorEl: null, open: false });
  };
  /**
   * Log the user out
   */
  onLogout = () => {
    firebase.auth().signOut();
  };
  /**
   * Run before rendering, set state for the Product list to be displayed when rendered.
   */
  componentDidMount() {
    Font.loadAsync({
      Questrial: require("../assets/fonts/Questrial-Regular.ttf"),
    });
    const { cartnumber } = this.props.route.params;
    console.log(cartnumber);
    const ref = firebase
      .database()
      .ref(
        "User/" + firebase.auth().currentUser.uid + "/Carts/Cart " + cartnumber
      );
    console.log(
      "User/" + firebase.auth().currentUser.uid + "/Carts/Cart " + cartnumber
    );
    ref.once("value", (snap) => {
      this.setState({ list: [] });
      const { list } = this.state;
      console.log(snap.val());
      for (let i = 1; i <= snap.val().product; i++) {
        const ref2 = firebase
          .database()
          .ref(
            "User/" +
              firebase.auth().currentUser.uid +
              "/Carts/Cart " +
              cartnumber +
              "/Products/Product " +
              i
          );
        ref2.once("value", (snap2) => {
          list.push({
            name: snap2.val().name,
            price: snap2.val().price,
            quantity: snap2.val().quantity,
            total: snap2.val().price * snap2.val().quantity,
            id: snap2.val().id,
          });
          this.setState({ list: list });
        });
      }
    });
  }

  /**s
   * Delete a Cart and update the total Cart count
   * @param {Integer} cartnum
   */
  deleteCart(cartnum) {
    const ref = firebase
      .database()
      .ref(
        "User/" + firebase.auth().currentUser.uid + "/Carts/Cart " + cartnum
      );
    ref
      .remove()
      .then(() => {
        const ref2 = firebase
          .database()
          .ref("User/" + firebase.auth().currentUser.uid);
        ref2.once("value", (snap) => {
          firebase
            .database()
            .ref("User/" + firebase.auth().currentUser.uid)
            .update({
              cart: snap.val().cart - 1,
            });
        });
      })
      .then(() => {
        this.props.navigation.navigate("Home");
      });
  }

  render() {
    const { cartnumber } = this.props.route.params;
    const { classes } = this.props;
    const { list } = this.state;

    return (
      <View style={{ flexDirection: "column", position: "relative" }}>
        <AppBar style={{ background: "#FDB945" }}>
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              View Cart
            </Typography>
            <div>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={this.handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={this.state.anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={this.state.open}
                onClose={this.handleClose}
              >
                <MenuItem
                  onClick={() => this.props.navigation.navigate("EditAuth")}
                >
                  Change authenticate info{" "}
                </MenuItem>
                <MenuItem
                  onClick={() => this.props.navigation.navigate("EditProfile")}
                >
                  Edit profile
                </MenuItem>
                <MenuItem onClick={() => this.onLogout()}>Logout</MenuItem>
              </Menu>
            </div>
          </Toolbar>
        </AppBar>

        <View style={{ flex: 1, margin: 30 }}>
          <ScrollView style={{ marginTop: 40 }}>
            {list.reverse().map((item, i) => (
              <ListItem
                key={i}
                bottomDivider
                style={{
                  marginBottom: 10,
                  borderRadius: 30,
                  overflow: "hidden",
                }}
              >
                <ListItem.Content
                  style={{ flexDirection: "column", alignItems: "center" }}
                >
                  <ListItem.Title>
                    <Text style={{ fontFamily: "Questrial", fontSize: 16 }}>
                      Name: {item.name}
                    </Text>
                  </ListItem.Title>
                  <ListItem.Title>
                    <Text style={{ fontFamily: "Questrial", fontSize: 16 }}>
                      Price: {item.price}$
                    </Text>
                  </ListItem.Title>
                  <ListItem.Title>
                    <Text style={{ fontSize: 16, fontFamily: "Questrial" }}>
                      Quantity: {item.quantity}
                    </Text>
                  </ListItem.Title>
                  <ListItem.Title>
                    <Text style={{ fontSize: 16, fontFamily: "Questrial" }}>
                      Total: {item.total}$
                    </Text>
                  </ListItem.Title>

                  <ListItem.Title>
                    <TouchableOpacity
                      onPress={() =>
                        this.props.navigation.navigate("EditItem", {
                          itemnum: item.id,
                          cartnumber: cartnumber,
                        })
                      }
                    >
                      <Text style={(styles.buttonText, { color: "#B07F0D" })}>
                        Edit Item
                      </Text>
                    </TouchableOpacity>
                  </ListItem.Title>
                </ListItem.Content>
              </ListItem>
            ))}
          </ScrollView>
        </View>
        <View>
          <BottomNavigation
            value={this.state.valueNumber}
            onChange={(event) => {
              const { value } = event.target;
              this.setState({ valueNumber: value });
            }}
            showLabels
            className={classes.stickToBottom}
          >
            <BottomNavigationAction
              label="Home"
              onClick={() => this.props.navigation.navigate("Home")}
              icon={<HomeIcon />}
            />
            <BottomNavigationAction
              label="Delete Cart"
              color="red"
              onClick={() => this.deleteCart(cartnumber)}
              icon={<DeleteForeverIcon style={{ color: "red" }} />}
            />
          </BottomNavigation>
        </View>
        <Fab
          variant="extended"
          onClick={() => this.reloadApp()}
          className={classes.extendedIcon}
        >
          <RefreshIcon />
        </Fab>
      </View>
    );
  }
}
export default withStyles(styling)(ViewThisCart);

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    marginTop: 50,
  },
  screenContainer: {
    flex: 1,
    paddingTop: 50,
    paddingLeft: 20,
  },
  buttons: {
    backgroundColor: "lightgrey",
    color: "white",
    fontSize: 200,
    height: 50,
    width: 190,
  },
  buttonView: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 10,
    marginVertical: 10,
    paddingVertical: 8,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  buttonText: {
    fontSize: 30,
    marginTop: 4,
    textAlign: "center",
    // color: "blackred",
    // marginLeft: 20
  },
  space: {
    width: 20,
    height: 10,
  },
  textElement: {
    fontSize: 25,
    marginTop: 8,
    textAlign: "center",
  },
});
