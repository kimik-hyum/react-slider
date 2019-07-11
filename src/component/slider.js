import React from 'react';

export default class Slider extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      index:props.startIndex,
      sliding:false,
      active:true
    }
  }
  imageLength = this.props.data.length;
  size = 0;
  componentDidMount() {
    this.getSlideSize();
    window.addEventListener("resize", this.getSlideSize);
  }
  getSlideSize = () => {
    this.size = document.querySelector(".slide-wrapper").clientWidth;
    this.slideMove(this.state.index)
  }
  prevNext = (num) => {
    const {index} = this.state;
    const {imageLength} = this;
    const idx = (index + num + imageLength) % imageLength;
    return idx;
  }
  slideMove = (index) => {
    this.setState({
      index
    })
  }
  _renderBtn = () => ({
    next:<button onClick={() => this.slideMove(this.prevNext(1))}>Next</button>,
    prev:<button onClick={() => this.slideMove(this.prevNext(-1))}>Prev</button>
  })
  _renderNav = () => ({
    nav:<div className="slide-nav">
      {this.props.data.map((item,index) => {
        return <button key={index} onClick={() => this.slideMove(index)}>{index+1}</button>
      })}
    </div>
  })
  _renderItem(data){
    const {item} = this.props;
    return item(data.item,data.index)
  }

  render(){
    const {data} = this.props;
    const {next,prev} = this._renderBtn()
    const {nav} = this._renderNav()
    const duration = (this.props.duration / 1000) + "s"
    const x = this.state.index * this.size;
    const sliderStyle = {
      transition:"transform " + duration,
      transform: `translate(${-x}px,0px)` 
    }
    return (
      <div className="slide">
        {prev}
        {next}
        <div className="slide-wrapper" style={sliderStyle}>
          {
            data.map((item,index) => {
              return this._renderItem({item,index})
            })
          }
        </div>
        {nav}
      </div>
    )
  }
}
Slider.defaultProps = {startIndex:0}