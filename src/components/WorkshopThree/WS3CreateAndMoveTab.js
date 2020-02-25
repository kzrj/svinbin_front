import React, { Component } from 'react';

import { lodashToggle } from '../../components/utils'
// components
import { Message, ErrorMessage } from '../CommonComponents'


class WS3CreateAndMoveTab extends Component {
   constructor(props) {
    super(props);
    this.state = {
      week: '',
      quantity: '',
      pigletsRecords: [],
      transfer_part_number: '',
      total: 0
    }
    this.setData = this.setData.bind(this);
    this.addPigletsRecord = this.addPigletsRecord.bind(this);
    this.deletePigletsRecord = this.deletePigletsRecord.bind(this);
    this.createAndMove = this.createAndMove.bind(this);
  }

  setData (e) {
    this.setState({
      ...this.state,
      [e.target.name]: e.target.value
    })
  }

  addPigletsRecord () {
    const { week, quantity, pigletsRecords, total } = this.state
    let piglets = { week: week, quantity: quantity }
    this.setState({
      ...this.state,
      pigletsRecords: lodashToggle(pigletsRecords, piglets),
      week: '',
      quantity: '',
      total: total + parseInt(piglets.quantity)
    })
  }

  deletePigletsRecord (piglets) {
    let { pigletsRecords, total } = this.state
    this.setState({
      ...this.state,
      pigletsRecords: lodashToggle(pigletsRecords, piglets),
      total: total - parseInt(piglets.quantity)
    })
  }

  createAndMove () {
    const { pigletsRecords, transfer_part_number } = this.state
    this.props.mergeFromInitListPiglets({
      records: pigletsRecords,
      transfer_part_number: transfer_part_number
    })
    this.setState({
      ...this.state,
      pigletsRecords: [],
      transfer_part_number: '',
      week: '',
      quantity: '',
      total: 0
    })
  }
  
  render() {
    const { message, eventError } = this.props
    return (
      <div className='workshop-content'>
        <div className='row'>
          <div className='col-4'>
            <div className=''>
              <label>Добавить поросят в партию:</label>
              <div className="form-group">
                <input type='text'
                    id='week'
                    className="form-control"
                    value={this.state.week}
                    name='week'
                    placeholder="Укажите неделю"
                    onChange={this.setData}/>
              </div>
              <div className="form-group">
                <input type='text'
                    id='quantity'
                    className="form-control"
                    value={this.state.quantity}
                    name='quantity'
                    placeholder="Укажите количество"
                    onChange={this.setData}/>
              </div>
              {/* добавить запись поросят в партию */}
              <button className="btn btn-outline-secondary" onClick={this.addPigletsRecord}>
                Добавить
              </button>
            </div>
          </div>
          <div className='col-8'>
              {/* ввод номера партии */}
              <div className="form-group row">
                <div className='col-6'>
                  <input type='text'
                      id='transfer_part_number'
                      className="form-control"
                      value={this.state.transfer_part_number}
                      name='transfer_part_number'
                      placeholder="Укажите номер партии"
                      required
                      onChange={this.setData}/>
                </div>
                {/* общее количество */}
                <div className='col-6'>
                  Общее количество: {this.state.total}
                </div>

              </div>
              {/* список поросят */}
              {this.state.pigletsRecords.length > 0 && this.state.pigletsRecords.map(piglets => 
                <div>
                  Неделя {piglets.week} - количество {piglets.quantity} 
                  <button className='btn btn-outline-secondary'
                     onClick={() => this.deletePigletsRecord(piglets)}>
                    удалить
                  </button>
                </div>
                )}
              {/* кнопка создать и отправить */}
              {this.state.pigletsRecords.length > 0 && this.state.transfer_part_number !== '' &&
                <div className="form-group">
                  <button className="btn btn-outline-secondary" onClick={this.createAndMove}>
                    Создать и отправить партию в Цех4
                  </button>
                </div>
              }
              {/* сообщение об отправке */}
              {eventError && <ErrorMessage error={eventError} />}
              {message && <Message message={message} />}
          </div>
        </div>
      </div>
    )
  }
}

export default WS3CreateAndMoveTab