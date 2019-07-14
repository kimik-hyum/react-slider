import React from 'react';
import './App.css';
import ReactkimikSlider from "./component/slider";
import './scss/style.scss';
class App extends React.Component {
  slider = React.createRef();
  
  renderItem(data,index){
    return (
      <div key={index}><img src={data} alt=""/></div>
    )
  };
  render() {
    const infor = ["https://bxslider.com/assets/images/plant.jpg","https://bxslider.com/assets/images/daisies.jpg","https://bxslider.com/assets/images/succulents.jpg"]
    return (
      <div className="App">
        <ReactkimikSlider data={infor} item={this.renderItem} duration={300} ref={this.slider}>
        </ReactkimikSlider>
      </div>
    );
  }
}

export default App;
