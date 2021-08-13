import React, { Component } from "react";
import { View, StyleSheet, Text } from "react-native";
import firebase from "firebase";
import { validateAll } from "indicative/validator";
import "firebase/firestore";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Menu,
  TextField,
  FormControl,
  Select,
  MenuItem,
  FormHelperText,
} from "@material-ui/core";
import AccountCircle from "@material-ui/icons/AccountCircle";
import * as Font from "expo-font";
import { withStyles } from "@material-ui/styles";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import LibraryBooksIcon from "@material-ui/icons/LibraryBooks";
import HomeIcon from "@material-ui/icons/Home";

const styling = (theme) => ({
  title: {
    flexGrow: 1,
  },
  button: {
    marginLeft: 30,
    marginRight: 30,
    marginTop: 60,
    fontFamily: "Questrial",
    fontWeight: "600",
    backgroundColor: "#FFCD29",
  },
  stickToBottom: {
    marginLeft: -30,
    width: "100%",
    position: "fixed",
    bottom: 0,
  },
  flexRowTextField: {
    marginRight: 10,
    marginBottom: 10,
  },
  textField: {
    marginBottom: 10,
  },
  formControl: {
    minWidth: 157,
    height: 50,
  },
  selectEmpty: {
    marginRight: 10,
  },
});

export class EditProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: "",
      lastname: "",
      city: "null",
      province: "null",
      error: {},
      anchorEl: null,
      open: false,
      valueNumber: 0,
    };

    this.onSignUp = this.onSignUp.bind(this);
  }
  componentDidMount() {
    Font.loadAsync({
      Questrial: require("../assets/fonts/Questrial-Regular.ttf"),
    });
  }
  /**
   * Log the user out
   */
  onLogout = () => {
    firebase.auth().signOut();
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

  validate = async (data) => {
    const rules = {
      firstname: "required|string",
      lastname: "required|string",
    };

    const message = {
      "firstname.required": "Name is required",
      "lastname.required": "Name is required",
    };
    try {
      await validateAll(data, rules, message).then(() => this.onSignUp());
    } catch (errors) {
      const formattedErrors = {};
      console.log("=====", errors.response);
      errors.forEach((error) => (formattedErrors[error.field] = error.message));

      this.setState({
        error: formattedErrors,
      });
    }
  };

  onSignUp() {
    const { firstname, lastname, city, province } = this.state;
    firebase
      .database()
      .ref("User/" + firebase.auth().currentUser.uid)
      .update({
        firstname: firstname,
        lastname: lastname,
        city: city,
        province: province,
      })
      .then(() => {
        alert("Profile information was changed");
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    const { classes } = this.props;

    return (
      <View style={{ flex: 1, margin: 30 }}>
        <AppBar style={{ background: "#FDB945" }}>
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              Change Profile Info
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
                  Change Account Info
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
            Update your account information.
          </Text>
        </View>
        <View style={{ flexDirection: "row", marginTop: 30 }}>
          <TextField
            id="fname"
            label="First name"
            placeholder="First name"
            variant="outlined"
            onChange={(event) => {
              const { value } = event.target;
              this.setState({ firstname: value });
            }}
            error={!!this.state.error["firstname"]}
            helperText={this.state.error["firstname"]}
            size="small"
            className={classes.flexRowTextField}
          />
          <TextField
            id="lname"
            label="Last name"
            placeholder="Last name"
            variant="outlined"
            onChange={(event) => {
              const { value } = event.target;
              this.setState({ lastname: value });
            }}
            error={!!this.state.error["lastname"]}
            helperText={this.state.error["lastname"]}
            size="small"
            className={classes.textField}
          />
        </View>
        <View style={{ flexDirection: "row" }}>
          <FormControl className={classes.formControl} size="small">
            <Select
              variant="outlined"
              value={this.state.city}
              onChange={(event) => {
                const { value } = event.target;
                this.setState({ city: value });
              }}
              displayEmpty
              className={classes.selectEmpty}
              inputProps={{ "aria-label": "Without label" }}
            >
              <MenuItem value="" disabled>
                City
              </MenuItem>
              <MenuItem value={"Barrie"}>Barrie</MenuItem>
              <MenuItem value={"Belleville"}>Belleville</MenuItem>
              <MenuItem value={"Brampton"}>Brampton</MenuItem>
              <MenuItem value={"Brant"}>Brant</MenuItem>
              <MenuItem value={"Brantford"}>Brantford</MenuItem>
              <MenuItem value={"Brockville"}>Brockville</MenuItem>
              <MenuItem value={"Burlington"}>Burlington</MenuItem>
              <MenuItem value={"Cambridge"}>Cambridge</MenuItem>
              <MenuItem value={"Clarence-Rockland"}>Clarence-Rockland</MenuItem>
              <MenuItem value={"Cornwall"}>Cornwall</MenuItem>
              <MenuItem value={"Dryden"}>Dryden</MenuItem>
              <MenuItem value={"Elliot Lake"}>Elliot Lake</MenuItem>
              <MenuItem value={"Greater Sudbury"}>Greater Sudbury</MenuItem>
              <MenuItem value={"Guelph"}>Guelph</MenuItem>
              <MenuItem value={"Haldimand County"}>Haldimand County</MenuItem>
              <MenuItem value={"Hamilton"}>Hamilton</MenuItem>
              <MenuItem value={"Kawartha Lakes"}>Kawartha Lakes</MenuItem>
              <MenuItem value={"Kenora"}>Kenora</MenuItem>
              <MenuItem value={"Kingston"}>Kingston</MenuItem>
              <MenuItem value={"Kitchener"}>Kitchener</MenuItem>
              <MenuItem value={"London"}>London</MenuItem>
              <MenuItem value={"Markham"}>Markham</MenuItem>
              <MenuItem value={"Mississauga"}>Mississauga</MenuItem>
              <MenuItem value={"Niagara Falls"}>Niagara Falls</MenuItem>
              <MenuItem value={"Norfolk County"}>Norfolk County</MenuItem>
              <MenuItem value={"North Bay"}>North Bay</MenuItem>
              <MenuItem value={"Orillia"}>Orillia</MenuItem>
              <MenuItem value={"Oshawa"}>Oshawa</MenuItem>
              <MenuItem value={"Ottawa"}>Ottawa</MenuItem>
              <MenuItem value={"Owen Sound"}>Owen Sound</MenuItem>
              <MenuItem value={"Pembroke"}>Pembroke</MenuItem>
              <MenuItem value={"Peterborough"}>Peterborough</MenuItem>
              <MenuItem value={"Pickering"}>Pickering</MenuItem>
              <MenuItem value={"Port Colborne"}>Port Colborne</MenuItem>
              <MenuItem value={"Prince Edward C."}>
                Prince Edward County
              </MenuItem>
              <MenuItem value={"Quinte West"}>Quinte West</MenuItem>
              <MenuItem value={"Richmond Hill"}>CRichmond Hillity</MenuItem>
              <MenuItem value={"Sarnia"}>Sarnia</MenuItem>
              <MenuItem value={"Sault Ste. Marie"}>Sault Ste. Marie</MenuItem>
              <MenuItem value={"St. Catharines"}>St. Catharines</MenuItem>
              <MenuItem value={"St. Thomas"}>St. Thomas</MenuItem>
              <MenuItem value={"Stratford"}>Stratford</MenuItem>
              <MenuItem value={"Temiskaming Shores"}>
                Temiskaming Shores
              </MenuItem>
              <MenuItem value={"Thorold"}>Thorold</MenuItem>
              <MenuItem value={"Thunder Bay"}>Thunder Bay</MenuItem>
              <MenuItem value={"Timmins"}>Timmins</MenuItem>
              <MenuItem value={"Toronto"}>Toronto</MenuItem>
              <MenuItem value={"Vaughan"}>Vaughan</MenuItem>
              <MenuItem value={"Waterloo"}>Waterloo</MenuItem>
              <MenuItem value={"Welland"}>Welland</MenuItem>
              <MenuItem value={"Windsor"}>Windsor</MenuItem>
              <MenuItem value={"Woodstock"}>Woodstock</MenuItem>
            </Select>
            <FormHelperText>City</FormHelperText>
          </FormControl>

          <View style={styles.space}></View>
          <FormControl className={classes.formControl} size="small">
            <Select
              variant="outlined"
              value={this.state.province}
              onChange={(event) => {
                const { value } = event.target;
                this.setState({ province: value });
              }}
              displayEmpty
              inputProps={{ "aria-label": "Without label" }}
            >
              <MenuItem value="" disabled>
                Province
              </MenuItem>
              <MenuItem value={"Alberta"}>Alberta</MenuItem>
              <MenuItem value={"British Columbia"}>British Columbia</MenuItem>
              <MenuItem value={"Manitoba"}>Manitoba</MenuItem>
              <MenuItem value={"New Brunswick"}>New Brunswick</MenuItem>
              <MenuItem value={"N.L"}>Newfoundland and Labrador</MenuItem>
              <MenuItem value={"N.W.T."}>Northwest Territories</MenuItem>
              <MenuItem value={"Nova Scotia"}>Nova Scotia</MenuItem>
              <MenuItem value={"Nunavut"}>Nunavut</MenuItem>
              <MenuItem value={"Ontario"}>Ontario</MenuItem>
              <MenuItem value={"P.E.I"}>Prince Edward Island</MenuItem>
              <MenuItem value={"Quebec"}>Quebec</MenuItem>
              <MenuItem value={"Saskatchewan"}>Saskatchewan</MenuItem>
              <MenuItem value={"Yukon"}>Yukon</MenuItem>
            </Select>
            <FormHelperText>Province</FormHelperText>
          </FormControl>
        </View>
        <Button
          variant="contained"
          className={classes.button}
          onClick={() => this.validate(this.state)}
        >
          Update Account
        </Button>
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
export default withStyles(styling)(EditProfile);

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    paddingTop: 20,
    alignItems: "center",
  },
  textcontainer: {
    marginTop: 60,
    lineHeight: 1.4,
  },
  textBoxView: {
    flexDirection: "row",
    marginBottom: 40,
  },
  testView: {
    flexDirection: "row",
    marginBottom: 20,
  },
  textBox: {
    marginHorizontal: 10,
    paddingVertical: 20,
    paddingHorizontal: 20,
    flex: 1,
    backgroundColor: "white",
    color: "black",
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 4 },
    shadowOpacity: 0.8,
    shadowRadius: 1,
  },
  textElement: {
    fontSize: 25,
    marginTop: 8,
    textAlign: "center",
    color: "white",
  },
});
