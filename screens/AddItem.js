import React, { Component } from "react";
import { SearchBar } from "react-native-elements";
import { validateAll } from "indicative/validator";
import { useFonts } from "@expo-google-fonts/raleway";
import { withStyles } from "@material-ui/styles";
import firebase from "firebase";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  TextField,
  MenuItem,
  Menu,
  Switch,
  Fab,
} from "@material-ui/core";
import HomeIcon from "@material-ui/icons/Home";
import DoneIcon from "@material-ui/icons/Done";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import AddIcon from "@material-ui/icons/Add";
import PublishIcon from "@material-ui/icons/Publish";
import AccountCircle from "@material-ui/icons/AccountCircle";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import LibraryBooksIcon from "@material-ui/icons/LibraryBooks";
import { Text, View, StatusBar, StyleSheet } from "react-native";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import * as Font from "expo-font";

const styling = (theme) => ({
  button: {
    marginTop: 50,
    marginLeft: 70,
    marginRight: 70,
    fontFamily: "Questrial",
    fontWeight: "600",
    backgroundColor: "#FFCD29",
  },
  textBox: {
    marginBottom: 10,
  },
  stickToBottom: {
    width: "100%",
    position: "fixed",
    bottom: 0,
  },
  title: {
    flexGrow: 1,
  },
  doneIcon: {
    position: "fixed",
    bottom: 200,
    left: 50,
  },
  addIcon: {
    position: "fixed",
    bottom: 200,
    right: 50,
  },
  icon: {
    marginRight: 5,
  },
});

export class AddItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      price: "",
      consumer: "1",
      quantity: "",
      glutenSwitch: true,
      taxSwitch: false,
      medSwitch: false,
      error: {},
      anchorEl: null,
      open: false,
      valueNumber: 0,
    };
  }
  componentDidMount() {
    Font.loadAsync({
      Questrial: require("../assets/fonts/Questrial-Regular.ttf"),
    });
    this.setState({
      name: "",
      price: "",
      consumer: "1",
      quantity: "",
      glutenSwitch: true,
      taxSwitch: false,
      medSwitch: false,
      error: {},
      anchorEl: null,
      open: false,
      valueNumber: 0,
    });
  }
  /**this function validate the ItemName field,
   * it can not be EMPTY
   */
  validate = async (data) => {
    const rules = {
      name: "required",
    };

    const message = {
      "name.required": "Name field cannot be empty",
    };
    try {
      await validateAll(data, rules, message).then(() => this.addItemToCart());
    } catch (errors) {
      const formattedErrors = {};
      console.log("=====", errors.response);
      errors.forEach((error) => (formattedErrors[error.field] = error.message));
      this.setState({
        error: formattedErrors,
      });
    }
  };

  counter = 0;
  total = 0;

  /**this function validate the Enter Item name to be only alphabetic,
   * submmit the input to the database
   */
  addItemToCart() {
    const { cartNumber } = this.props.route.params;

    const {
      name,
      price,
      consumer,
      quantity,
      glutenSwitch,
      taxSwitch,
      medSwitch,
    } = this.state;
    this.counter += 1;
    this.total += price * quantity;
    const cart = {
      name,
      price,
      consumer,
      quantity,
      glutenSwitch,
      taxSwitch,
      medSwitch,
      id: this.counter,
    };
    firebase
      .database()
      .ref(
        "User/" +
          firebase.auth().currentUser.uid +
          "/Carts/Cart " +
          cartNumber +
          "/Products"
      )
      .child("Product " + this.counter)
      .set(cart)
      .then(() => {
        firebase
          .database()
          .ref(
            "User/" +
              firebase.auth().currentUser.uid +
              "/Carts/Cart " +
              cartNumber
          )
          .update({
            total: this.total,
            product: this.counter,
          })
          .then(() => {
            this.reloadApp();
            alert("New Item Added");
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
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
   * Log the user out
   */
  onLogout = () => {
    firebase.auth().signOut();
  };
  /**
   * Close the Menu when user tap anywhere on the screen
   */
  handleClose = () => {
    this.setState({ anchorEl: null, open: false });
  };

  render() {
    const { classes } = this.props;
    const { cartNumber } = this.props.route.params;

    return (
      <View style={{ flex: 1, marginTop: 30 }}>
        <AppBar style={{ background: "#FDB945" }}>
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              New Cart
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
              </Menu>
            </div>
          </Toolbar>
        </AppBar>
        <View style={{ margin: 30, marginTop: 35 }}>
          <Button
            variant="outlined"
            className={classes.buttonLeft}
            // onClick={() => this.addCart()}
            startIcon={<PublishIcon />}
            size="large"
          >
            Upload Receipt
          </Button>
          <View style={styles.form}>
            <Text
              style={{
                fontFamily: "Questrial",
                fontSize: 25,
                marginTop: 20,
                marginBottom: 10,
              }}
            >
              Add New Item
            </Text>
            <TextField
              id="name"
              label="Item name"
              placeholder="Item name"
              variant="outlined"
              value={this.state.name}
              onChange={(event) => {
                const { value } = event.target;
                this.setState({ name: value });
              }}
              error={!!this.state.error["name"]}
              helperText={this.state.error["name"]}
              className={classes.textBox}
              size="medium"
            />
            <TextField
              id="price"
              label="Item price"
              placeholder="Item price"
              variant="outlined"
              value={this.state.price}
              onChange={(event) => {
                const { value } = event.target;
                this.setState({ price: value });
              }}
              className={classes.textBox}
              size="medium"
            />
            <TextField
              id="quantity"
              label="Item quantity"
              placeholder="Item quantity"
              variant="outlined"
              value={this.state.quantity}
              onChange={(event) => {
                const { value } = event.target;
                this.setState({ quantity: value });
              }}
              className={classes.textBox}
              size="medium"
            />
            <TextField
              id="consumer"
              label="Number of comsumers"
              placeholder="Number of comsumers"
              variant="outlined"
              value={this.state.consumer}
              onChange={(event) => {
                const { value } = event.target;
                this.setState({ consumer: value });
              }}
              className={classes.textBox}
              size="medium"
            />
            <FormGroup column className={classes.formGroup}>
              <FormControlLabel
                control={
                  <Switch
                    color="primary"
                    checked={this.state.glutenSwitch}
                    onChange={() => {
                      this.setState((prevState) => ({
                        glutenSwitch: !prevState.glutenSwitch,
                      }));
                    }}
                  />
                }
                label="Gluten Free"
                labelPlacement="end"
              />
              <FormControlLabel
                control={
                  <Switch
                    color="primary"
                    checked={this.state.taxSwitch}
                    onChange={() => {
                      this.setState((prevState) => ({
                        taxSwitch: !prevState.taxSwitch,
                      }));
                    }}
                  />
                }
                label="Taxable"
                labelPlacement="end"
              />
              <FormControlLabel
                control={
                  <Switch
                    color="primary"
                    checked={this.state.medSwitch}
                    onChange={() => {
                      this.setState((prevState) => ({
                        medSwitch: !prevState.medSwitch,
                      }));
                    }}
                  />
                }
                label="Mediacal Expense"
                labelPlacement="end"
              />
            </FormGroup>
          </View>
          <View>
            <Fab
              style={{ marginTop: 20, backgroundColor: "#FDB945" }}
              variant="extended"
              onClick={() => this.validate()}
            >
              <AddIcon className={classes.icon} />
              Add
            </Fab>
            <Fab
              style={{ marginTop: 10, backgroundColor: "#A6C424" }}
              variant="extended"
              onClick={() => this.props.navigation.navigate("Home")}
            >
              <DoneIcon className={classes.icon} />
              Done
            </Fab>
          </View>
        </View>
        <View style={{ flex: 1, justifyContent: "flex-end" }}>
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
              label="View Cart"
              onClick={() => {
                this.props.navigation.navigate("ViewCart", {
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
export default withStyles(styling)(AddItem);

const styles = StyleSheet.create({
  scrollView: {
    marginHorizontal: 20,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
  },
  inner: {
    padding: 24,
    flex: 1,
    justifyContent: "space-around",
  },
  header: {
    fontSize: 36,
    marginBottom: 48,
  },
  font: {
    fontSize: 25,
    justifyContent: "flex-start",
  },
  textInput: {
    height: 50,
    borderColor: "#000000",
    backgroundColor: "white",
    borderBottomWidth: 1,
    marginBottom: 40,
    shadowColor: "#000",
    shadowOffset: { width: 3, height: 4 },
    shadowOpacity: 0.8,
    shadowRadius: 1,
  },
  btnContainer: {
    backgroundColor: "grey",
    marginTop: 12,
    width: 150,
    height: 50,
  },
  buttonView: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 10,
    marginVertical: 10,
    paddingVertical: 8,
    marginBottom: 80,
  },
  switchTextBox: {
    height: 50,
    borderColor: "#000000",
    backgroundColor: "white",
    borderBottomWidth: 1,
    marginBottom: 40,
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 5,
    margin: 5,
    shadowColor: "#000",
    shadowOffset: { width: 3, height: 4 },
    shadowOpacity: 0.8,
    shadowRadius: 1,
  },
  textElement: {
    fontSize: 25,
    marginTop: 8,
    textAlign: "center",
  },
  topView: {
    justifyContent: "space-between",
    flexDirection: "row",
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  textcontainer: {
    marginLeft: 30,
    lineHeight: 1.4,
  },
});
