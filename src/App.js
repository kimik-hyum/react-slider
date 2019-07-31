import React from 'react';
import './App.css';
import ReactKimikSlider from "./component/slider";
import './scss/style.scss';
class App extends React.Component {
  slider = React.createRef();
  
  renderItem(data,index){ //슬라이드 안의 마크업
    return (
      <div key={index}><img src={data} alt=""/></div>
    )
  };
  componentDidMount() {
    console.log(this.slider.current)
  }
  slideBefore = () => {
    console.log('before')
  }
  slideAfter = () => {
    console.log('after')
  }
  slideNext = () => {
    this.slider.current.onSlideNext();
  }
  slidePrev = () => {
    this.slider.current.onSlidePrev();
  }
  render() {
    const infor = ["https://bxslider.com/assets/images/plant.jpg","https://bxslider.com/assets/images/daisies.jpg","https://bxslider.com/assets/images/succulents.jpg"] //슬라이드 각각에 들어갈 데이터들
    return (
      <div className="App">
        <ReactKimikSlider data={infor} item={this.renderItem} duration={800} startIndex={0} ref={this.slider}
        before={this.slideBefore} after={this.slideAfter} sensitivity={10}>
        </ReactKimikSlider>
        <button onClick={this.slidePrev}>이전</button>
        <button onClick={this.slideNext}>다음</button>
      </div>
    );
  }
}

export default App;
