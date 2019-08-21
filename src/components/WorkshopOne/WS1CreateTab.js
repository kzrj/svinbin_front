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
    this.props.createNewSow({
      farmId: this.state.farmId
    })
  }

  createNoname = () =>{
    this.props.createNewNonameSow()
  }

  render() {
    const { sow, nonameSow, nonameSowsCount } = this.props
    return (
      <div className='row workshop-content'>
        <div className="col-6 workshop-left-column">
          <div className='workshop-header-2 under-menu-line text-center'>
                <p>Создать свиноматку с ID</p>
          </div>
          <div className='workshop-content-column-1'>
            <p>Новый farm id</p>
            <input type="text" value={this.state.farmId} onChange={this.setFarmId}/>
            <button onClick={this.create}>
              Создать
            </button>
            {sow && 
              <div>
                <p>{sow.id}</p>
                  <p>{sow.location}</p>
                  <p>{sow.created_at}</p>
                  <p>{sow.farm_id}</p>
                  <p>{sow.status}</p>
              </div>
            }
          </div>
        </div>
        <div className='col-6 workshop-right-column'>
            <div className='under-menu-line text-center workshop-header-2'>
              <p>Создать ремонтную свинку без ID</p>
            </div>
            <div className='workshop-content-column-2'>
              <p>Количество ремонтных свинок {nonameSowsCount}</p>
              <button onClick={this.createNoname}>
                Создать
              </button>
              {nonameSow && 
                <div>
                  <p>{nonameSow.id}</p>
                  <p>{nonameSow.location}</p>
                  <p>{nonameSow.created_at}</p>
                  <p>{nonameSow.farmId}</p>
                  <p>{nonameSow.status}</p>

                </div>
              }
              
            </div>
          </div>
      </div>
    )
  }
}

export default WS1CreateTab