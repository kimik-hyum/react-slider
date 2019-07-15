import React from 'react';

export default class Slider extends React.Component {
  constructor(props){
    super(props);
    this.slider = React.createRef();
    this.imageLength = this.props.data.length;
    this.size = 0;
    this.touchStartX = 0;
    this.touchMoveX = 0;
    this.state = {
      index:props.startIndex,
      sliding:false,
      active:true
    }
  }
  
  
  componentDidMount() {
    this.getSlideSize();
    window.addEventListener("resize", this.getSlideSize);
  }
  getSlideSize = () => {
    this.size = this.slider.current.offsetWidth;
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
  onSliderTouchStart = (e) => {
    const touches = e.touches[0];
    this.touchStartX = touches.pageX
   
  }
  onSliderTouchMove = (e) => {
    const touches = e.touches[0];
    this.touchMoveX = this.touchStartX - touches.pageX;
  }
  onSliderTouchEnd = (e) => {
    if(this.touchMoveX > 100){
      this.slideMove(this.prevNext(1))
    }else if(this.touchMoveX){
      this.slideMove(this.prevNext(-1))
    }
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
        <div className="slide-wrapper" style={sliderStyle} ref={this.slider} onTouchStart={this.onSliderTouchStart} onTouchMove={this.onSliderTouchMove} onTouchEnd={this.onSliderTouchEnd}>
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