import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import * as Font from "expo-font";
import { withStyles } from "@material-ui/styles";
import { ListItem } from "react-native-elements";

import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  MenuItem,
  Menu,
  Fab,
} from "@material-ui/core";
import AccountCircle from "@material-ui/icons/AccountCircle";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import LibraryBooksIcon from "@material-ui/icons/LibraryBooks";
import RefreshIcon from "@material-ui/icons/Refresh";

import firebase from "firebase";
import { format } from "date-fns";

const styling = (theme) => ({
  title: {
    flexGrow: 1,
  },
  buttonLeft: {
    flex: 1,
    fontFamily: "Questrial",
    fontWeight: "600",
    marginRight: 10,
  },
  button: {
    flex: 1,
    fontFamily: "Questrial",
    fontWeight: "600",
  },
  extendedIcon: {
    backgroundColor: "#FAD697",
    position: "fixed",
    bottom: 25,
    right: 160,
  },
});
export class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      total: 0,
      product: 0,
      anchorEl: null,
      open: false,
      username: "",
      list: [],
    };
  }

  cartNumber = 0;
  /**
   * Run before rendering, set state for the Cart History list to be displayed when rendered.
   */
  componentDidMount() {
    Font.loadAsync({
      Questrial: require("../assets/fonts/Questrial-Regular.ttf"),
    });
    const refname = firebase
      .database()
      .ref("User/" + firebase.auth().currentUser.uid);
    refname.once("value", (snap) => {
      this.setState({
        username: snap.val().firstname + " " + snap.val().lastname,
      });
    });

    const ref = firebase
      .database()
      .ref("User/" + firebase.auth().currentUser.uid);
    ref.once("value", (snap) => {
      this.setState({ list: [] });
      const { list } = this.state;
      console.log(snap.val().cart);
      for (let i = 1; i <= snap.val().cart; i++) {
        const ref2 = firebase
          .database()
          .ref("User/" + firebase.auth().currentUser.uid + "/Carts/Cart " + i);
        ref2.once("value", (snap2) => {
          list.push({
            Date: snap2.val().createDate,
            price: snap2.val().total,
            id: snap2.val().cartID,
          });
          this.setState({ list: list.reverse() });
          console.log(this.state.list);
        });
      }
    });
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
   * Retrieve and Update the total of carts and add new Cart to the Database
   */
  addCart() {
    const { total, product } = this.state;
    const ref = firebase
      .database()
      .ref("User/" + firebase.auth().currentUser.uid);
    ref.once("value", (snap) => {
      this.cartNumber = snap.val().cart + 1;
      firebase
        .database()
        .ref("User/" + firebase.auth().currentUser.uid)
        .update({
          cart: this.cartNumber,
        })
        .then(() => {
          const cart = {
            createDate: JSON.parse(
              JSON.stringify(format(new Date(), "MM/dd/yyyy"))
            ),
            total,
            product,
            cartID: this.cartNumber,
          };
          firebase
            .database()
            .ref("User/" + firebase.auth().currentUser.uid + "/Carts")
            .child("Cart " + this.cartNumber)
            .set(cart)
            .then(() => {
              this.props.navigation.navigate("AddItem", {
                cartNumber: this.cartNumber,
              });
            })
            .catch((error) => {
              console.log(error);
            });
        })
        .catch((error) => {
          console.log(error);
        });
    });
  }

  /**
   * Rerun componentDidMount() function/ Reload app to re-render the new updated cart list
   */
  reloadApp() {
    this.componentDidMount();
  }

  /**
   * Render the Cart History List and UI
   * @returns View
   */
  render() {
    const { classes } = this.props;
    const { list } = this.state;
    return (
      <View style={{ flexDirection: "column", position: "relative" }}>
        <AppBar style={{ background: "#FDB945" }}>
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              Hello, {this.state.username}
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
          <View
            style={{
              flexDirection: "row",
              marginTop: 60,
            }}
          >
            <Button
              variant="outlined"
              className={classes.buttonLeft}
              onClick={() => this.addCart()}
              startIcon={<AddShoppingCartIcon />}
              size="large"
            >
              Add Cart
            </Button>
            <Button
              variant="outlined"
              className={classes.button}
              onClick={() => this.props.navigation.navigate("Report")}
              startIcon={<LibraryBooksIcon />}
              size="large"
            >
              Report
            </Button>
          </View>
          <ScrollView style={{ marginTop: 20 }}>
            <Text
              style={{
                fontFamily: "Questrial",
                fontSize: 25,
                marginBottom: 10,
              }}
            >
              History
            </Text>
            {list.map((item, i) => (
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
                      Date: {item.Date}
                    </Text>
                  </ListItem.Title>
                  <ListItem.Title>
                    <Text style={{ fontSize: 16, fontFamily: "Questrial" }}>
                      Total: {item.price}$
                    </Text>
                  </ListItem.Title>

                  <ListItem.Title>
                    <TouchableOpacity
                      onPress={() => {
                        this.props.navigation.navigate("ViewThisCart", {
                          cartnumber: item.id,
                        });
                      }}
                    >
                      <Text style={{ color: "#B07F0D" }}>ViewCart</Text>
                    </TouchableOpacity>
                  </ListItem.Title>
                </ListItem.Content>
              </ListItem>
            ))}
          </ScrollView>
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
export default withStyles(styling)(HomeScreen);
const styles = StyleSheet.create({
  screenContainer: {
    paddingTop: 50,
    paddingLeft: 20,
  },
  buttons: {
    backgroundColor: "dodgerblue",
    color: "white",
    height: 35,
    width: 150,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  space: {
    width: 20,
    height: 10,
  },
  textBoxView: {
    flexDirection: "row",
    paddingTop: 30,
  },
  textBox: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 4 },
    shadowOpacity: 0.8,
    shadowRadius: 1,
  },
  textElement: {
    fontSize: 25,
    marginTop: 8,
    textAlign: "center",
    color: "black",
    marginLeft: 20,
  },
  topText: {
    fontSize: 35,
    marginTop: 20,
    textAlign: "center",
    color: "black",
  },
});
