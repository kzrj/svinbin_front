import React, { Component } from 'react';


class WS1CreateTab extends Component {
   constructor(props) {
    super(props);
    this.state = {
      farmId: null,
      query: {
        by_workshop_number: 1,
        farm_id_isnull: true,
      }
    }
  }
  
  componentDidMount() {
    this.props.getSows(this.state.query)
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
    const { sow, sows, nonameSow, nonameSowsCount } = this.props
    const countSows = sows.length
    return (
      <div className='workshop-content'>
        <div className='workshop-header-3'>
        </div>
        <div>
          <div>
            <label className='sow-event-label'>Создать ремонтную свинку без ID</label>
              {nonameSowsCount ? 
              <p>Количество ремонтных свинок {nonameSowsCount}</p> :
              <p>Количество ремонтных свинок {countSows}</p>}
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
          <div>
            <label className='sow-event-label'>Создать свиноматку с ID</label>
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
      </div>
    )
  }
}

export default WS1CreateTab