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
} from "@material-ui/core";
import AccountCircle from "@material-ui/icons/AccountCircle";
import { useFonts } from "@expo-google-fonts/raleway";
import { withStyles } from "@material-ui/styles";

import HomeIcon from "@material-ui/icons/Home";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import LibraryBooksIcon from "@material-ui/icons/LibraryBooks";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
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
});

/**Class Edit Item responsible to update item
 * from the Cart
 */
export class ViewCart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      list: [],
      anchorEl: null,
      open: false,
      valueNumber: 0,
    };
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
    const { cartNumber } = this.props.route.params;
    const ref = firebase
      .database()
      .ref(
        "User/" + firebase.auth().currentUser.uid + "/Carts/Cart " + cartNumber
      );
    ref.once("value", (snap) => {
      this.setState({ list: [] });
      const { list } = this.state;
      for (let i = 1; i <= snap.val().product; i++) {
        const ref2 = firebase
          .database()
          .ref(
            "User/" +
              firebase.auth().currentUser.uid +
              "/Carts/Cart " +
              cartNumber +
              "/Products/Product " +
              i
          );
        ref2.once("value", (snap2) => {
          list.push({
            name: snap2.val().name,
            price: snap2.val().price,
            quantity: snap2.val().quantity,
            total: snap2.val().price * snap2.val().quantity,
          });
          this.setState({ list: list });
        });
      }
    });
  }

  render() {
    const { cartNumber } = this.props.route.params;
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
          <ScrollView style={{ marginTop: 20 }}>
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
                      Name:{item.name}
                    </Text>
                  </ListItem.Title>
                  <ListItem.Title>
                    <Text style={{ fontFamily: "Questrial", fontSize: 16 }}>
                      Price:{item.price}
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
                      // onPress={() => this.editItem()}
                      onPress={() => this.props.navigation.navigate("")}
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
              label="Report"
              onClick={() => this.props.navigation.navigate("Report")}
              icon={<LibraryBooksIcon />}
            />
            <BottomNavigationAction
              label="Add Item"
              onClick={() => {
                this.props.navigation.navigate("AddItem", {
                  cartNumber: cartNumber,
                });
              }}
              icon={<ShoppingCartIcon />}
            />
          </BottomNavigation>
        </View>
      </View>
    );
  }
}
export default withStyles(styling)(ViewCart);

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
