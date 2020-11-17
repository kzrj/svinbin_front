import React, { Component } from 'react';

// components
import { SowSingle } from '../SowRepresentations'
import { ErrorOrMessage, LoadingMessage } from '../CommonComponents';
import { CullingSowForm } from './SowForms';


class WSSowCullingTab extends Component {
   constructor(props) {
    super(props);
    this.state = {
      cullingReason: 'без причины',
      cullingType: 'padej',
      weight: '',
      needToRefresh: false,
    }
    this.setData = this.setData.bind(this);
    this.cullingSow = this.cullingSow.bind(this);
    this.abortionSow = this.abortionSow.bind(this);

    this.findSow = this.findSow.bind(this);
  }
  
  componentDidMount() {
    this.props.sowsResetErrorsAndMessages()
    this.props.getSowCullings({ws_number: 3})
    this.props.setSow(null)
  }

  findSow (e) {
    this.props.getByFarmIdSow({'farm_id': e.target.value, simple: true})
  }

  setData(e) {
    this.setState({
      ...this.state,
      [e.target.name]: e.target.value
    })
  }

  cullingSow() {
    let data = {
      id: this.props.sow.id,
      culling_type: this.state.cullingType,
      reason: this.state.cullingReason,
      weight: this.state.weight,
    }
    this.props.cullingSow(data)
    this.props.setSow(null)
    this.setState({
      ...this.state,
      needToRefresh: true
    })
  }

  abortionSow() {
    let data = {
      id: this.props.sow.id,
    }
    this.props.abortionSow(data)
    this.props.setSow(null)
    this.setState({
      ...this.state,
      needToRefresh: true
    })
  }

  refreshSowsList () {
    if (this.props.eventFetching && this.state.needToRefresh) {
      setTimeout(() => {
        this.props.getSowCullings({ws_number: 3})
        this.setState({...this.state, needToRefresh: false})
      }, 300)
    }
  }

  render() {
    this.refreshSowsList()
    const { sow, eventError, message, eventFetching, cullings, singleSowFetching} = this.props
    return (
      <div className=''>
        <div className="modal fade" id="cullingModal" tabindex="-1" role="dialog" 
          aria-labelledby="cullingModalLabel" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="cullingModalLabel">Подтвердите действие</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body" style={{"font-size": "1.2rem"}}>
                Выбытие свиноматки <span style={{"font-weight": "bold"}}>№{sow && sow.farm_id}.</span>
                <br/>
                Тип выбытия: {this.state.cullingType}.
                <br/>
                Причина: {this.state.cullingReason}.
                <br/>
                Вес: {this.state.weight}кг.
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-dismiss="modal">Отмена</button>
                <button type="button" className="btn bg-red1-light" data-dismiss="modal" 
                  onClick={this.cullingSow}>
                  Забраковать
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className='card my-2 mx-1'>
          <div className='content my-2'>
            <h4 className='mt-2 mx-2 mb-1'>Введите номер свиноматки</h4>
            <input type="number" className="" placeholder="Номер свиноматки"
              name='farm_id' onBlur={this.findSow}
              />
            {sow &&
                <SowSingle sow={sow} className='my-0 font-17 font-600 color-mainDark-dark'/>
              }
          </div>
        </div>

        <div className='card my-2 mx-1'>
          <div className='content'>
            
            <select className="font-16 py-2 my-2 mx-2" 
              name='cullingType' 
              onChange={this.setData}>
                <option selected value='padej' >Падеж</option>
                <option value='vinuzhd' >Вынужденный убой</option>
            </select>

            <input className="font-16 py-1 my-2 mx-2"
              type='text' onChange={this.setData} name='cullingReason'
              placeholder='Напишите причину' value={this.state.cullingReason}/>

            <input className="font-16 py-1 my-2 mx-2"
              type='number' onChange={this.setData} name='weight' value={this.state.weight}
              placeholder='Укажите вес'/>

          </div>
          <div className='content mt-1'>
            <button type="button" className="btn bg-mainDark-dark ml-1 mr-3" data-toggle="modal"
                data-target="#cullingModal">
              Забраковать
            </button>
            { this.props.abort &&
              <button className="btn bg-mainDark-dark ml-5" type="button"  
                onClick={this.abortionSow}>
                  Аборт
              </button>
            }
            <ErrorOrMessage error={eventError} message={message} fetching={eventFetching}
              className='my-3 mx-2 font-15' />
          </div>
      </div>
      
      {singleSowFetching 
          ? <LoadingMessage />
          :cullings.length > 0 && 
        <div className='card my-2'>
          <div className='content'>
            <p className='my-1'> 10 последних выбытий</p>
            <table className='table table-sm'>
              <thead className='bg-mainDark-dark'>
                <th>Дата</th>
                <th>Номер</th>
                <th>Тип</th>
                <th>Причина</th>
                <th>Вес</th>
                <th>Сотрудник</th>
              </thead>
              <tbody>
                {cullings.map(c =>
                  <tr>
                    <td>{c.date}</td>
                    <td>{c.farm_id}</td>
                    <td>{c.culling_type}</td>
                    <td>{c.reason}</td>
                    <td>{c.weight}</td>
                    <td>{c.initiator}</td>
                  </tr>
                  )}
              </tbody>
            </table>
          </div>
        </div>}
    </div>
    )
  }
}

export default WSSowCullingTab