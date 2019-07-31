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
      prevIndex:(props.startIndex + (this.imageLength - 1)) % this.imageLength, 
      sliding:false, 
      active:true, 
      slideX:0
    }
  }
  componentWillMount() { 
    this.liveData.push(this.props.data[0]);
    this.liveData.unshift(this.props.data[this.imageLength-1]);
  }
  componentDidMount() { 
    this.getSlideSize(); 
    window.addEventListener("resize", this.getSlideSize); 
  }

  removeTransition = () => { 
    this.slider.current.style.transition = '0s';
  }
  addTransition = () => { 
    const duration = this.props.duration/1000;
    this.slider.current.style.transition = `${duration}s`;
  }
  getSlideSize = () => { //슬라이드 사이즈를 가져오는 함수 
    this.size = this.slider.current.offsetWidth;
    this.removeTransition();
    this.handleSlideMove(this.state.index, true);
    this.setSlideState(false)
    return this.size;
  }
  setSlideState = (ing) => { //슬라이드 상태값을 변경하는 함수 
    this.setState({
      sliding:ing
    })
  }
  prevNext = (num) => { // 이전/다음 계산 함수
    if(!this.state.sliding){
      const {index} = this.state;
      const {imageLength} = this;
      const idx = (index + num + imageLength) % imageLength;
      return idx;
    }
  }
  handleSlideMove = (index, setting) => { //state slideX값을 setState로 변경 > render > css animation 작동
    let slideX;
    const prevIndex = this.state.index;
    if(!setting && index !== prevIndex) this.props.before();// props로 받은 함수실행 
    if(!this.state.sliding){
      
      if(!setting && this.slider.current.style.transition.indexOf('0s') > -1) this.addTransition();
      if(this.state.index === 0 && index === this.props.data.length-1){ //마지막으로 갈때 예외 처리
        slideX = -1 * this.size
      }else if(this.state.index === this.props.data.length-1 && index === 0){ //처음으로 갈때 예외처리 
        slideX = this.props.data.length * this.size
      }else {
        slideX = index * this.size
      }
      if(!setting && prevIndex !== index) this.setSlideState(true)
      this.setState({
        index,
        slideX,
        prevIndex
      })
    }  
  }
  _renderBtn = () => ({ // 이전 다음 버튼 객체
    next:<button onClick={() => this.handleSlideMove(this.prevNext(1))}>Next</button>,
    prev:<button onClick={() => this.handleSlideMove(this.prevNext(-1))}>Prev</button>
  })
  _renderNav = () => ({ // 네비게이션 버튼 객체
    nav:<div className="slide-nav">
      {this.props.data.map((item,index) => {
        return <button key={index} onClick={() => this.handleSlideMove(index)}>{index+1}</button>
      })}
    </div>
  })
  _renderItem(data){ // App.js에서 사용하는 renderItem함수 
    const {item} = this.props;
    return item(data.item,data.index)
  }
  onSliderTouchStart = (e) => { //slider 터치 시작함수
    const touches = e.touches[0];
    if(!this.state.sliding){
      this.touchStartX = touches.pageX;
      this.removeTransition();
    }
  }
  onSliderTouchMove = (e) => { //slider 터치 무브 함수
    const touches = e.touches[0];
    if(!this.state.sliding){
      this.moveX = this.touchStartX - touches.pageX
      this.setState({
        slideX:(this.touchStartX - touches.pageX) + (this.size * this.state.index)
      })
    }
  }
  onSliderTouchEnd = (e) => { //slider 터치 끝 함수
    if(this.moveX > this.props.sensitivity){
      this.handleSlideMove(this.prevNext(1))
    }else if(this.moveX < -this.props.sensitivity){
      this.handleSlideMove(this.prevNext(-1))
    }else{
      this.handleSlideMove(this.state.index)
    }
  }
  onSlideMoveEnd = () => { //slider 움직임이 끝났을때에 대한 함수
    this.props.after();
    this.removeTransition();
    if(this.state.index === 0 && this.state.prevIndex === this.imageLength-1){ //처음 
      this.setState({
        slideX:0
      })
    }else if(this.state.index === this.imageLength-1 && this.state.prevIndex === 0){ //마지막
      this.setState({
        slideX:(this.imageLength-1) * this.size
      })
    }
    this.setSlideState(false)
  }
  onSlideNext = () => {
    this.handleSlideMove(this.prevNext(1))
  }
  onSlidePrev = () => {
    this.handleSlideMove(this.prevNext(-1))
  }

  render(){
    const duration = this.props.duration/1000
    const {next,prev} = this._renderBtn()
    const {nav} = this._renderNav()
    
    const sliderStyle = {
      transition:`transform ${duration}s`,
      transform: `translate(${-this.state.slideX}px,0px)`,
      position:'relative',
      left:'-100%' 
    }
    return (
      <div className="slide">
        {prev}
        {next}
        <div className="slide-wrapper" style={sliderStyle} ref={this.slider} onTouchStart={this.onSliderTouchStart} onTouchMove={this.onSliderTouchMove} onTouchEnd={this.onSliderTouchEnd} onTransitionEnd={this.onSlideMoveEnd} >
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
Slider.defaultProps = {
  startIndex:0,
  duration:500
}