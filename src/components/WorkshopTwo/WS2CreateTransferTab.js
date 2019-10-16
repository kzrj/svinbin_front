import React, { Component } from 'react';

import { toggleArray } from '../../components/utils'
// components


class WS2CreateTransferTab extends Component {
   constructor(props) {
    super(props);
    this.state = {
      sowFarmId: '',
      sows: [],
      week: '',
    }
    this.createTransferSow = this.createTransferSow.bind(this);
    this.setData = this.setData.bind(this);
    this.addSow = this.addSow.bind(this);
    this.deleteSow = this.deleteSow.bind(this);
  }
 
  setData (e) {
    this.setState({
      ...this.state,
      [e.target.name]: e.target.value
    })
  }

  addSow () {
    let { sows, sowFarmId } = this.state
    if (sowFarmId > 0) {
      sows = toggleArray(sows, sowFarmId)
    }
    this.setState({
      ...this.state,
      sows: sows,
      sowFarmId: ''
    })
  }

  deleteSow (e) {
    let { sows } = this.state
    const { id } = e.target.dataset
    sows = toggleArray(sows, id)
    
    this.setState({
      ...this.state,
      sows: sows
    })
  }

  createTransferSow () {
    this.props.massInitTransfer({
      sows: this.state.sows,
      week: this.state.week
    })
    this.setState({
      ...this.state,
      sows: [],
      week: ''
    })
  }

  render() {
    return (
      <div className='workshop-content'>
        <div className='row'>
          <div className='col-8'>
            <div className="input-group">
              <label>Номер недели</label>
              <input type='text' 
                    value={this.state.week} 
                    onChange={this.setData}
                    name='week' className="form-control search-input"
                    placeholder="Номер недели" />
            </div>
            {this.state.week.length > 0 &&
              <div>
                <div className="input-group">
                  <input type='text' 
                      value={this.state.sowFarmId} 
                      onChange={this.setData}
                      name='sowFarmId' className="form-control search-input"
                      placeholder="FarmId" />
                  <div className="input-group-append">
                    <button className="btn btn-outline-secondary" type="button" 
                      onClick={this.addSow}>
                      Добавить
                    </button>
                  </div>
                </div>
              </div>}
                {this.state.sows.length > 0 ?
                  <div className="input-group">
                    <label>
                      Создать, осеменить, провести УЗИ и отправить {this.state.sows.length}
                    </label>
                    <button className='btn btn-outline-secondary'
                          onClick={this.createTransferSow}>
                          Создать и отправить
                        </button>
                  </div>
                  : 
                  this.props.message ? <div>{this.props.message}</div> : 
                    <p>Добавьте номера свиноматок</p>
                  }
            </div>
          <div className='col-4'>
              {this.state.sows.map(sowId => 
                <li>
                  {sowId} {'   '}
                  <button className='btn btn-outline-secondary'
                     onClick={this.deleteSow} data-id={sowId}>
                    удалить
                  </button>
                </li>
                )}
          </div>
        </div>
      </div>
    )
  }
}

export default WS2CreateTransferTab