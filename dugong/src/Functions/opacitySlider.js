import React, { Component } from 'react'
import Slider from 'react-rangeslider'

class OpacitySlider extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      percentage: 100
    }
  }

  handleOnChange = (value) => {
    this.setState({
      volume: value
    })
  }

  render() {
    let { percentage } = this.state
    return (
      <Slider
        min={0.0}
  		max={1}
  		step={0.1}
        value={percentage}
        orientation="horizontal"
        onChange={this.handleOnChange}
      />
    )
  }
}

export default OpacitySlider;