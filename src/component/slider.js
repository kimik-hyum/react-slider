import React from 'react';

export default class Slider extends React.Component {
  _renderItem(data){
    const {item} = this.props;
    return item(data.item,data.index)
  }
  render(){
    const {data} = this.props;
    return (
      <div className="slide">
        {
          data.map((item,index) => {
            return this._renderItem({item,index})
          })
        }
      </div>
    )
  }
}