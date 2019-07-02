import React from 'react';
import './App.css';
import ReactkimikSlider from "./component/slider";
import './scss/style.scss';
class App extends React.Component {
  test(data,index){
    return (
      <div key={index}>{data}</div>
    )
  };
  render() {
    const infor = ["1","2","3","4","5"]
    return (
      <div className="App">
        <ReactkimikSlider data={infor} item={this.test}>
        </ReactkimikSlider>
      </div>
    );
  }
}

export default App;
