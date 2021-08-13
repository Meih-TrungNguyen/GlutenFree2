import React, { Component } from "react";
import { CSVLink } from "react-csv";
import "./Data.json";
import { Text, View, StyleSheet, Image } from "react-native";
import { Button } from "@material-ui/core";
import { withStyles } from "@material-ui/styles";
import * as Font from "expo-font";

const styling = (theme) => ({
  button: {
    fontFamily: "Questrial",
    fontWeight: "600",
    backgroundColor: "#FFCD29",
    marginBottom: 20,
  },
});

export class Report extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };

    this.csvLinktEl = React.createRef();

    this.headers = [
      { label: "Id", key: "id" },
      { label: "Name", key: "name" },
      { label: "Email", key: "email" },
    ];
  }
  componentDidMount() {
    Font.loadAsync({
      Questrial: require("../assets/fonts/Questrial-Regular.ttf"),
    });
  }

  getUserList = () => {
    return fetch("https://jsonplaceholder.typicode.com/users").then((res) =>
      res.json()
    );
  };

  downloadReport = async () => {
    const data = await this.getUserList();
    this.setState({ data: data }, () => {
      setTimeout(() => {
        this.csvLinktEl.current.link.click();
      });
    });
  };

  render() {
    const { classes } = this.props;

    const { data } = this.state;
    return (
      <View style={{ margin: 30, alignItems: "center" }}>
        <Image
          source={require("../assets/bread.png")}
          style={{ width: 100, height: 100 }}
        ></Image>
        <View>
          <Text
            style={{
              fontFamily: "Questrial",
              fontWeight: "1000",
              fontSize: "30px",
              marginBottom: 15,
              textAlign: "center",
            }}
          >
            Download your monthly report here!
          </Text>
        </View>
        <Button
          variant="contained"
          className={classes.button}
          onClick={() => {
            this.downloadReport();
          }}
        >
          Download Report{" "}
        </Button>

        <CSVLink
          headers={this.headers}
          data={data}
          filename="Product_Report.csv"
          ref={this.csvLinktEl}
        />
      </View>
    );
  }
}
export default withStyles(styling)(Report);
const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 300,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  buttons: {
    backgroundColor: "lightgrey",
    color: "white",
    fontSize: 200,
    height: 50,
    width: 200,
  },
  space: {
    width: 20,
    height: 20,
  },
  textBox: {
    marginBottom: 100,
    fontSize: 45,
    color: "brown",
  },
  textElement: {
    fontSize: 25,
    marginTop: 8,
    textAlign: "center",
  },
});
