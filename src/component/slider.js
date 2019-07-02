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
  imageLength = this.props.data.length-1;
  slideMove = (number) => {
    //let idx = (index + dire + len) % len;
    let index = this.state.index + number;
    if(index < 0){
      index = this.imageLength;
    }else if(index > this.imageLength){
      index = 0;
    }
    this.setState({
      index:index
    })
  }
  _renderBtn = () => ({
    next:<button onClick={() => this.slideMove(1)}>Next</button>,
    prev:<button onClick={() => this.slideMove(-1)}>Prev</button>
  })
  _renderNav = () => ({
    nav:<div className="slide-nav">
      {this.props.data.map((item,index) => {
        return <button key={index}>{index+1}</button>
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
    return (
      <div className="slide">
        {prev}
        {next}
        <div className="slide-wrapper">
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