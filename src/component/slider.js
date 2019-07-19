import React from 'react';

export default class Slider extends React.Component {
  constructor(props){
    super(props);
    this.slider = React.createRef();
    this.imageLength = this.props.data.length;
    this.size = 0;
    this.touchStartX = 0;
    this.moveX = 0;
    this.liveData = props.data.slice();
    this.state = {
      index:props.startIndex,
      sliding:false,
      active:true,
      slideX:0
    }
  }
  
  componentWillMount() {
    this.liveData.push(this.props.data[0]);
    this.liveData.unshift(this.props.data[this.props.data.length-1]);
  }
  componentDidMount() {
    this.getSlideSize();
    window.addEventListener("resize", this.getSlideSize);
  }
  getSlideSize = () => {
    this.size = this.slider.current.offsetWidth;
    this.handleSlideMove(this.state.index)
  }
  prevNext = (num) => {
    const {index} = this.state;
    const {imageLength} = this;
    const idx = (index + num + imageLength) % imageLength;
    return idx;
  }
  handleSlideMove = (index) => {
    this.setState({
      index,
      slideX:index * this.size
    })

  }
  _renderBtn = () => ({
    next:<button onClick={() => this.handleSlideMove(this.prevNext(1))}>Next</button>,
    prev:<button onClick={() => this.handleSlideMove(this.prevNext(-1))}>Prev</button>
  })
  _renderNav = () => ({
    nav:<div className="slide-nav">
      {this.props.data.map((item,index) => {
        return <button key={index} onClick={() => this.handleSlideMove(index)}>{index+1}</button>
      })}
    </div>
  })
  _renderItem(data){
    const {item} = this.props;
    return item(data.item,data.index)
  }
  onSliderTouchStart = (e) => {
    const touches = e.touches[0];
    this.touchStartX = touches.pageX;
  }
  onSliderTouchMove = (e) => {
    const touches = e.touches[0];
    this.moveX = this.touchStartX - touches.pageX
    this.setState({
      slideX:(this.touchStartX - touches.pageX) + (this.size * this.state.index)
    })
  }
  onSliderTouchEnd = (e) => {
    if(this.moveX > 100){
      this.handleSlideMove(this.prevNext(1))
    }else if(this.moveX < -100){
      this.handleSlideMove(this.prevNext(-1))
    }else{
      this.handleSlideMove(this.state.index)
    }
  }

  render(){
    const duration = this.props.duration/1000
    const {next,prev} = this._renderBtn()
    const {nav} = this._renderNav()
    const sliderStyle = {
      transition:"transform " + duration+"s",
      transform: `translate(${-this.state.slideX}px,0px)`,
      position:'relative',
      left:'-100%' 
    }
    return (
      <div className="slide">
        {prev}
        {next}
        <div className="slide-wrapper" style={sliderStyle} ref={this.slider} onTouchStart={this.onSliderTouchStart} onTouchMove={this.onSliderTouchMove} onTouchEnd={this.onSliderTouchEnd}>
          {
            this.liveData.map((item,index) => {
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