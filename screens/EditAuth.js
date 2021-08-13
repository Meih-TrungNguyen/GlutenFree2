import React, { Component } from "react";
import { View, StyleSheet, Text } from "react-native";
import firebase from "firebase";
import "firebase/firestore";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  MenuItem,
  TextField,
  InputAdornment,
  InputLabel,
  FormControl,
  IconButton,
  OutlinedInput,
  Menu,
} from "@material-ui/core";
import AccountCircle from "@material-ui/icons/AccountCircle";
import { useFonts } from "@expo-google-fonts/raleway";
import { withStyles } from "@material-ui/styles";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import LibraryBooksIcon from "@material-ui/icons/LibraryBooks";
import HomeIcon from "@material-ui/icons/Home";

const styling = (theme) => ({
  title: {
    flexGrow: 1,
  },
  stickToBottom: {
    width: "100%",
    position: "fixed",
    bottom: 0,
  },
  button: {
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 20,
    fontFamily: "Questrial",
    fontWeight: "600",
    backgroundColor: "#FFCD29",
  },
  textBox: {
    marginBottom: 10,
  },
});

export class EditAuth extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentpassword: "",
      newpassword: "",
      email: "",
      error: {},
      anchorEl: null,
      open: false,
      showPassword: false,
      valueNumber: 0,
    };
  }
  /**
   * Log the user out
   */
  onLogout = () => {
    firebase.auth().signOut();
  };
  /**
   * Handle Click for the Password TextField, SHow/Hide Password
   */
  handleClickShowPassword = () => {
    this.setState((prevState) => ({
      showPassword: !prevState.showPassword,
    }));
  };
  /**
   * Handle Click for the Password TextField, SHow/Hide Password
   */
  handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

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
   * Use user's current password to reauthenticate to change user's authentication data
   * @param {string} currentpassword
   * @returns UserCredential
   */
  reauthenticate(currentpassword) {
    const user = firebase.auth().currentUser;
    const cred = firebase.auth.EmailAuthProvider.credential(
      user.email,
      currentpassword
    );
    return user.reauthenticateWithCredential(cred);
  }
  /**
   * Update user's password, password must has at least 6 characters
   */
  onPasswordChange() {
    const { currentpassword, newpassword } = this.state;
    this.reauthenticate(currentpassword)
      .then(() => {
        const user = firebase.auth().currentUser;
        user
          .updatePassword(newpassword)
          .then(() => {
            alert("Password has been updated");
          })
          .catch((error) => {
            const formattedErrors = {};
            if (error.code === "auth/weak-password") {
              formattedErrors["password"] = error.message;
            }
            console.log(error);
          });
      })
      .then(() => {
        this.onLogout();
      })
      .catch((error) => {
        const formattedErrors = {};
        if (error.code === "auth/wrong-password") {
          formattedErrors["cpassword"] = error.message;
        }
        console.log(error);
      });
  }
  /**
   * Update user's email, email must have correct syntax
   */
  onEmailChange() {
    const { currentpassword, email } = this.state;
    this.reauthenticate(currentpassword)
      .then(() => {
        const user = firebase.auth().currentUser;
        user
          .updateEmail(email)
          .then(() => {
            firebase
              .database()
              .ref("User/" + user.uid)
              .update({
                email: email,
              });
          })
          .then(() => {
            alert("Email has been updated");
          })
          .catch((error) => {
            const formattedErrors = {};
            if (error.code === "auth/invalid-email") {
              formattedErrors["email"] = error.message;
            }
            console.log(error);
          });
      })
      .then(() => {
        this.onLogout();
      })
      .catch((error) => {
        const formattedErrors = {};
        if (error.code === "auth/wrong-password") {
          formattedErrors["cpassword"] = error.message;
        }
        console.log(error);
      });
  }

  render() {
    const { classes } = this.props;

    return (
      <View style={{ flex: 1, marginTop: 30 }}>
        <AppBar style={{ background: "#FDB945" }}>
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              Change Auth Info
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
                  Change authenticate info
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
        <View style={styles.textcontainer}>
          <Text
            style={{
              fontFamily: "Questrial",
              fontSize: "25px",
              textAlign: "left",
            }}
          >
            Please enter your current password to update your information.
          </Text>
        </View>
        <View style={styles.screenContainer}>
          <View style={styles.form}>
            <FormControl
              className={classes.textBox}
              variant="outlined"
              size="small"
              error={!!this.state.error["cpassword"]}
            >
              <InputLabel htmlFor="cpassword">Current Password</InputLabel>
              <OutlinedInput
                id="cpassword"
                type={this.state.showPassword ? "text" : "password"}
                value={this.state.currentpassword}
                onChange={(event) => {
                  const { value } = event.target;
                  this.setState({ currentpassword: value });
                }}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={this.handleClickShowPassword}
                      onMouseDown={this.handleMouseDownPassword}
                      edge="end"
                    >
                      {this.state.showPassword ? (
                        <Visibility />
                      ) : (
                        <VisibilityOff />
                      )}
                    </IconButton>
                  </InputAdornment>
                }
                labelWidth={70}
              />
            </FormControl>
            <FormControl
              className={classes.textBox}
              variant="outlined"
              size="small"
            >
              <InputLabel htmlFor="password">New Password</InputLabel>
              <OutlinedInput
                id="password"
                type={this.state.showPassword ? "text" : "password"}
                value={this.state.newpassword}
                onChange={(event) => {
                  const { value } = event.target;
                  this.setState({ newpassword: value });
                }}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={this.handleClickShowPassword}
                      onMouseDown={this.handleMouseDownPassword}
                      edge="end"
                    >
                      {this.state.showPassword ? (
                        <Visibility />
                      ) : (
                        <VisibilityOff />
                      )}
                    </IconButton>
                  </InputAdornment>
                }
                labelWidth={70}
              />
            </FormControl>
            <Button
              variant="contained"
              className={classes.button}
              onClick={() => this.onPasswordChange()}
            >
              Update Password
            </Button>
            <TextField
              id="email"
              label="New Email"
              placeholder="New Email"
              variant="outlined"
              value={this.state.email}
              onChange={(event) => {
                const { value } = event.target;
                this.setState({ email: value });
              }}
              error={!!this.state.error["email"]}
              helperText={this.state.error["email"]}
              className={classes.textBox}
              size="small"
            />
            <Button
              variant="contained"
              className={classes.button}
              onClick={() => this.onEmailChange()}
            >
              Update Email{" "}
            </Button>
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
          </BottomNavigation>
        </View>
      </View>
    );
  }
}
export default withStyles(styling)(EditAuth);

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    paddingTop: 20,
    alignItems: "center",
  },
  textcontainer: {
    marginTop: 60,
    marginLeft: 30,
    lineHeight: 1.4,
  },
  textBoxView: {
    flexDirection: "row",
    marginBottom: 40,
  },
  textBox: {
    paddingHorizontal: 10,
    paddingVertical: 20,
    marginHorizontal: 30,
    backgroundColor: "white",
    shadowColor: "#000",
    flex: 1,
    borderWidth: 1,
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 1,
  },
  textElement: {
    fontSize: 25,
    marginTop: 8,
    textAlign: "center",
    color: "black",
  },
});
