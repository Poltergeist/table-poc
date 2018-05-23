import * as React from "react";
import { render } from "react-dom";
import "react-virtualized/styles.css"; // only needs to be imported once
import Table from "./Table";
import { injectGlobal } from "emotion";
import * as faker from "faker";

injectGlobal`
  html, body, #root {
    max-height: 100%;
    height: 100%;
    max-width: 100%;
    width: 100%;
    padding: 0;
    margin: 0;
  }
`;

const styles = {
  fontFamily: "sans-serif",
  textAlign: "center",
  height: "100%"
};

class App extends React.Component<{}, any> {
  constructor(props?: any) {
    super(props);
    this.state = {
      list: new Array(100000).fill(0).map(index => {
        return {
          name: faker.name.firstName(),
          location: `${faker.address.city()}, ${faker.address.country()}`,
          time: Date.now()
        };
      }),
      updater: null
    };
    this.updateState = this.updateState.bind(this);
  }

  componentDidMount() {
    const updater = setInterval(this.updateState, 2000);
    this.setState({ updater });
  }

  componentWillUnmount() {
    clearInterval(this.state.updater);
  }

  updateState() {
    let { list } = this.state;
    for (let x = 0; x <= 6000; x++) {
      let index = Math.round(Math.random() * (list.length - 1));
      list[index].time = Date.now();
    }

    this.setState({ list });
  }

  render() {
    return (
      <div style={styles}>
        <Table list={this.state.list} />
      </div>
    );
  }
}

render(<App />, document.getElementById("root"));
