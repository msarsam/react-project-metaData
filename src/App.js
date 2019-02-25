import React, { Component } from "react";

import _Meta from "./_data/entityMeta.json";
import _Data from "./_data/entityData.json";

import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);

    this.original = this.getDataObj();
    this.state = this.getDataObj();
  }

  getDataObj = function() {
    let stateObj = {};
    Object.keys(_Data).map((item, i, type) => {
      return (stateObj[item] = _Data[item]);
    });

    return stateObj;
  };

  inputChange = e => {
    if (e.target.id === "firstName") {
      this.setState({ label: this.state.lastName + "," + e.target.value });
    }

    if (e.target.id === "lastName") {
      this.setState({ label: e.target.value + "," + this.state.firstName });
    }

    this.setState({ [e.target.id]: e.target.value });
  };

  formSave = e => {
    let collectionOFAll = {};
    collectionOFAll = this.state;
    collectionOFAll["original"] = this.getDataObj();
    //console.log(collectionOFAll);
    sessionStorage.removeItem("__collection__");
    sessionStorage.setItem("__collection__", JSON.stringify(collectionOFAll));
  };

  componentDidMount = () => {};

  render() {
    return (
      <div className="App">
        <div className="App-container">
          {Object.keys(_Data).map((item, i, type) => {
            let filteredMetaByItem = Object.keys(_Meta.field).filter(
              (val, idx, arr) => _Meta.field[idx].name === item
            );

            let dataObj;
            if (filteredMetaByItem.length === 0) {
              //no match
              dataObj = {};
            } else {
              dataObj = _Meta.field[filteredMetaByItem[0]];
            }

            //console.log('_Data[item]',Array.isArray(_Data[item]));

            return (
              <div
                id={"cnt_" + i}
                key={"cnt_" + i}
                className={i % 3 === 0 ? "new-row" : "new-column"}
              >
                <label id={"lbl_" + i} key={"lbl_" + i}>
                  {dataObj.label}
                </label>

                <input
                  id={item}
                  name={item}
                  key={item}
                  ref={item}
                  type="text"
                  title= {item  +` :\n `+JSON.stringify(dataObj)}
                  data={encodeURIComponent(JSON.stringify(dataObj))}
                  value={
                    dataObj.dataType === "Date"
                      ? new Date(this.state[item])
                      : this.state[item]
                  }
                  className={
                    dataObj.readOnly === true || item === "label"
                      ? "ctrl-readOnly"
                      : "ctrl-class"
                  }
                  readOnly={
                    dataObj.readOnly === true || item === "label"
                      ? "readOnly"
                      : ""
                  }
                  onChange={e => this.inputChange(e)}
                />
              </div>
            );
          })}

          <div className="leftAlign" id="cnt-99" key="cnt-99">
            <label id="lbl_99" key="lbl_99" />

            <button id="btn-save" onClick={e => this.formSave()}>
              Save
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
