import React from 'react';
import './App.css';
import ReactkimikSlider from "./component/slider";

class App extends React.Component {
  test(data,index){
    return (
      <div key={index}>{data}</div>
    )
  };
  render() {
    const infor = ["apple","before"]
    return (
      <div className="App">
        <ReactkimikSlider data={infor} item={this.test}></ReactkimikSlider>
      </div>
    );
  }
}

export default App;
