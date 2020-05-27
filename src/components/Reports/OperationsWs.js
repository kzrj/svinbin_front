import React, { Component } from 'react';

import { getOpComponent } from './OperationsComponents';


const OpButton = (props) =>
  <button 
    className={props.active ? 'btn op-button op-btn-active' : 'btn op-button op-btn-inactive' }
    onClick={props.onClick}
    name={props.name}
  >
    {props.label}
  </button>


export class WsOpInputs4 extends Component {
  constructor(props) {
    super(props);
    this.clickOperation = this.clickOperation.bind(this);
  }

  clickOperation (e) {
    let operationsInputs = this.props.operationsInputs
    let data = {operName: e.target.name, value: !operationsInputs[e.target.name]['active'] }
    this.props.changeOperationsInputs(data)
  }

  render () {
    const { operationsInputs, ws_number, type } = this.props

    return(
    <div className='row'>
      {Object.keys(operationsInputs).map(op_key => 
        operationsInputs[op_key]['ws'] == ws_number && 
        operationsInputs[op_key]['type'] == type &&
        <div className='op-label-label col-3'>
          <OpButton label={operationsInputs[op_key]['label']}
              active={operationsInputs[op_key]['active']}
              onClick={this.clickOperation}
              name={op_key}
          />
        </div>
      )}
    </div>
    )}
}

class OperationsWs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: '2020-03-01',
      endDate: null,
      farmId: null,

    }
    this.setData = this.setData.bind(this);
    this.getOperationsList = this.getOperationsList.bind(this);
    this.getOpComponent = getOpComponent.bind(this);
    this.setToday = this.setToday.bind(this);
	}

  componentDidMount() {
    this.getOperationsList()
    this.setToday()
  }

  setData (e) {
    this.setState({
      ...this.state,
      [e.target.name]: e.target.value
    })
  }

  setToday () {
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0');
    let yyyy = today.getFullYear();

    today = yyyy + '-' + mm + '-' + dd;

    this.setState({
      ...this.state,
      startDate: today
    })
    return today
  }

  getOperationsList (){
    let operations = {}
    Object.keys(this.props.operationsInputs).map(op_key =>
      operations[op_key] = this.props.operationsInputs[op_key]['active']
      )

    let data = {
      filters: {
        start_date: this.state.startDate,
        end_date: this.state.endDate,
        farm_id: this.state.farmId,
      },
      operations: operations
    }

    this.props.getOperationsReport(data)
  }

  render() {
    const operationsResultList = this.props.operationsResultList
    return (
      <div className="container-fluid">
        <h3>Операции</h3>
        <div>
          <div className='row'>
            <div className='col-6'>
              <div className="form-group row">
                <div className='col-6'>
                  <label>Дата с</label>
                  <input type='date'
                    id='startDate'
                    className="form-control search-input"
                    value={this.state.startDate}
                    name='startDate'
                    placeholder="Дата опороса"
                    onChange={this.setData}
                    />
                </div>
                <div className='col-6'>
                  <label>Дата до</label>
                  <input type='date'
                    id='endDate'
                    className="form-control search-input"
                    value={this.state.endDate}
                    name='endDate'
                    placeholder="Дата опороса"
                    onChange={this.setData}
                    />
                </div>
              </div>
            </div>
            {this.props.farmId &&
              <div className="col-6 form-group">
                <label>FARM ID: </label>
                <input type='number' name='farmId'
                  className="form-control"
                  value={this.state.farmId} onChange={this.setData}/>
              </div>
            }
          </div>

          <div className='op-inputs'>
            {this.props.children}
          </div>
          <div>
            <button className='btn op-btn-show' onClick={this.getOperationsList}>Показать операции</button>
          </div>
        </div>
        <div className='operations-results'>
          <p>Количество операций {operationsResultList.length}</p>
          {operationsResultList.length > 0 && 
            <table className='op-table-ws'>
              <thead>
                <th className='op-list-item-ws'><div className='op-name'>Операция</div></th>
                <th className='op-list-item-ws'><div className='op-date'>Дата</div></th>
                <th className='op-list-item-ws'><div className='op-initiator'>Сотрудник</div></th>
                <th className='op-list-item-ws'><div className='op-tour'>Тур</div></th>
              </thead>
              <tbody className='op-table-tbody-ws'>
                {operationsResultList.map(op => 
                  this.getOpComponent(op)
                  )}
              </tbody>
            </table>
          }
        </div>
      </div>
    );
  }
}


export default OperationsWs