import React, { Component } from 'react';

import { ErrorMessage, LoadingMessage } from '../CommonComponents'


class WSSowGlobalSearchTab extends Component {
   constructor(props) {
    super(props);
    this.state = {
      farm_id: null,
    };
    this.findSow = this.findSow.bind(this);
    this._handleKeyDown = this._handleKeyDown.bind(this);
    this.bgColor = this.bgColor.bind(this);
  }

  findSow (e) {
    this.props.getByFarmIdSow({'farm_id': e.target.value})
  }

  _handleKeyDown (e) {
    if (e.key === 'Enter') {
      this.props.getByFarmIdSow({'farm_id': e.target.value})
    }
  }

  bgColor(label, op_to_location) {
    if (label === 'выбытие')
      return 'bg-red1-light'

    if (label === 'аборт')
      return 'bg-red2-light'

    if (label === 'опорос')
      return 'bg-green2-light'

    if (label === 'перемещение')
      if (op_to_location.includes('Цех'))
        return 'bg-blue1-light'
      else 
        return 'bg-green1-light'

    return ''
  }

  render() {
    const { sow, cycles, errorSingle, singleSowFetching } = this.props

    return (
      <div className=''>
        <div className='my-2 ml-4'>
          <label className='mr-2 font-20'>Номер свиноматки</label>
          <input type="number" className="" placeholder="Номер свиноматки"
              name='farm_id' onBlur={this.findSow} onKeyDown={this._handleKeyDown}
              />
        </div>
        {singleSowFetching && <LoadingMessage />}
        {errorSingle && <ErrorMessage error={errorSingle} className='ml-4 font-20 font-600'/>}
        {sow &&
          <div className='card card-style'>
              <div className='content mb-1'>
                <h3 className='mr-5 float-left'>Свиноматка {sow.farm_id}</h3>
                {!sow.alive && <i className="far fa-dizzy float-left mr-2 font-25 color-red1-light"></i>}
                <h4 className='font-500 my-0 mr-4 float-left'>{sow.status}</h4>
                <h4 className='font-500 my-0 mr-4 float-left'>{sow.tour ? sow.tour : 'без тура'}</h4>
                <h4 className='font-500 my-0 '>{sow.location}</h4>
              </div>
              <div className='divider mb-1'></div>
              {cycles.length > 0 &&
                <div className='content '>
                  {/* <h4 className='my-0 font-500'>Циклы ({cycles.length})</h4> */}
                  {cycles.map(cycle =>
                    <div className='float-left border-right border-mainDark-dark mr-2 px-2'>
                      <p className='my-0 font-700 font-15'>Тур {cycle.week_number} {cycle.year}</p>
                      {cycle.sow_semination.length > 0 && cycle.sow_semination.map(sem => 
                        <p className='my-0'>
                          <span className='mr-1'>{sem.date}</span>
                          <span className='mr-1 font-700'>Осеменение</span>
                          <span className='mr-1'>{sem.semination_employee}</span>
                          <span className='mr-1'>{sem.boar}</span>
                        </p>
                        )}
                      {cycle.sow_ultrasound.length > 0 && cycle.sow_ultrasound.map(usound => 
                        <p className='my-0'>
                          <span className='mr-1'>{usound.date}</span>
                          <span className='mr-1 font-700'>УЗИ {usound.u_type === 1 ? '28' : '35'}</span>
                          {usound.result 
                            ? <span className='mr-1 color-green2-light font-700'>супорос</span>
                            : <span className='mr-1 color-red2-light font-700'>прохолост</span>}
                        </p>
                        )}
                      {cycle.sow_farrow.length > 0 && cycle.sow_farrow.map(farrow => 
                        <p className='my-0'>
                          <span className='mr-1'>{farrow.date}</span>
                          <span className='mr-1 font-700'>Опорос </span>
                          <span className='mr-1'>
                            <span className='color-green2-light mr-1 font-700'>{farrow.alive_quantity}</span>
                            <span className='color-red2-light mr-1 font-700'>{farrow.dead_quantity}</span>
                            <span className='color-gray2-light mr-1 font-700'>{farrow.mummy_quantity}</span>
                          </span>
                        </p>
                        )}
                      {cycle.sow_weaning.length > 0 && cycle.sow_weaning.map(weaning => 
                        <p className='my-0'>
                          <span className='mr-1'>{weaning.date}</span>
                          <span className='mr-1 font-700'>Отъем</span>
                          <span className='mr-1'>{weaning.quantity}</span>
                        </p>
                        )}
                    </div>
                    )}
                </div>
              }
              <div className='divider mb-1'></div>
              {sow.last_operations &&
                <div className='content my-1'>
                  <p className='my-1'>10 последних операции:</p>
                  <table className='table table-sm'>
                    <thead className='font-13 bg-mainDark-light'>
                      <th>Дата</th>
                      <th>Операция</th>
                      <th>Сотрудник</th>
                      <th>Тур</th>
                    </thead>
                    <tbody>
                      {sow.last_operations.map(op=>
                        <tr className={this.bgColor(op.op_label, op.op_to_location)}>
                          <td>{op.op_date}</td>
                          <td>
                            <span className='d-block font-700'>{op.op_label}</span>
                            {op.op_from_location && <span className='mr-1'>из {op.op_from_location}</span>}
                            {op.op_to_location && <span className='mr-1'>в {op.op_to_location}</span>}
                            {(op.op_label === 'узи' && op.op_uzi_result) &&
                              <span className='color-green2-light font-700'>супорос</span>
                            }
                            {(op.op_label === 'узи' && !op.op_uzi_result) &&
                              <span className='color-red1-light font-700'>прохолост</span>
                            }
                          </td>
                          <td>{op.op_initiator}</td>
                          <td>{op.op_week}</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              }
          </div>
        }
      </div>
    )
  }
}

export default WSSowGlobalSearchTab