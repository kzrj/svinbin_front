import React, { Component } from 'react';
import { ErrorMessage, Message } from '../CommonComponents'


class WS1CreateTab extends Component {
   constructor(props) {
    super(props);
    this.state = {
      farmId: '',
      query: {
        by_workshop_number: 1,
        farm_id_isnull: true,
      }
    }
    this.setFarmId = this.setFarmId.bind(this);
    this.create = this.create.bind(this);
    this.onPressEnter = this.onPressEnter.bind(this);
  }
  
  componentDidMount() {
    this.props.getSows(this.state.query)
    this.props.sowsResetErrorsAndMessages()
  }

  setFarmId (e) {
    this.setState({
      ...this.state,
      farmId: e.target.value
    })
  }

  create () {
    this.props.createNewSow({
      farmId: this.state.farmId
    })
    this.props.getSows(this.state.query)

    this.setState({
      ...this.state,
      farmId: ''
    })
  }

  onPressEnter (e) {
    if (e.key === 'Enter') {
      this.create()
    }
  }

  render() {
    const { sow, sows, nonameSow, nonameSowsCount, eventError, message } = this.props
    const countSows = sows.length
    return (
      <div className='workshop-content'>
        <div>
          <div>
            <label className='sow-event-label'>Создать ремонтную свинку без ID</label>
              {/* {nonameSowsCount ? 
                <p>Количество ремонтных свинок {nonameSowsCount}</p> :
                <p>Количество ремонтных свинок {countSows}</p>
              } */}
              <p>Количество ремонтных свинок {countSows}</p>
              <button onClick={this.props.createNewNonameSow} className='btn btn-outline-secondary'>
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
              <div className="input-group">
                <input type="text" value={this.state.farmId} onChange={this.setFarmId}
                  className="form-control search-input"
                  placeholder="Новый ID" onKeyDown={this.onPressEnter}/>
                <div className="input-group-append">
                  <button onClick={this.create} className='btn btn-outline-secondary'>
                    Создать
                  </button>
                </div>
              </div>
              {eventError && <ErrorMessage error={eventError}/>}
              {message && <Message message={eventError}/>}
          </div>
        </div>
      </div>
    )
  }
}

export default WS1CreateTab