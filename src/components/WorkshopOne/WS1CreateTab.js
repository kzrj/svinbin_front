import React, { Component } from 'react';


class WS1CreateTab extends Component {
   constructor(props) {
    super(props);
    this.state = {
      farmId: null,
    }
  }
  
  componentDidMount() {

  }

  setFarmId = (e) => {
    this.setState({
      ...this.state,
      farmId: e.target.value
    })
  }

  create = () =>{
    // console.log('create')
    this.props.createNewSow({
      farmId: this.state.farmId
    })
  }

  render() {
    const { sow } =this.props
    return (
      <div className='row workshop-content'>
        <p>Создать свиноматку.</p>
        <p>Новый farm id</p>
        <input type="text" value={this.state.farmId} onChange={this.setFarmId}/>
        <button onClick={this.create}>
          Создать
        </button>
        {sow && 
          <div>
            {sow.farmId}
          </div>
        }
      </div>
    )
  }
}

export default WS1CreateTab