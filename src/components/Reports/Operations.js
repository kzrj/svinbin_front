import React, { Component } from 'react';

import { getOpComponent, operations } from './OperationsComponents';


const WsOpInputs3 = (props) =>
  <div className='col-4 op-div-table'>
    <table className='op-div-table'>
      <thead>
        <th className='op-label-td'>Цех {props.ws_name ? props.ws_name : props.ws_number}</th>
        <th className='op-label-td-checkbox'>
          <input type='checkbox' onClick={props.clickWs} name={'ws'+props.ws_number}
           ws_number={props.ws_number}/>
        </th>
      </thead>
      <tbody>
        {Object.keys(props.operations).map(op_key => 
          props.operations[op_key]['ws'] == props.ws_number && 
          props.operations[op_key]['type'] == props.type &&
          <tr key={op_key} className='op-label-td'>
            <td className='op-label-td'>
              <label>{props.operations[op_key]['label']} {' '}</label>
            </td>
            <td className='op-label-td-checkbox'>
              <input
                type='checkbox'
                name={op_key}
                onChange={props.clickOperation}
                checked={props.operations[op_key]['active']}
              />
            </td>
          </tr>
        )}
      </tbody>
    </table>
  </div>


class Operations extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: '2020-03-01',
      endDate: null,
      farmId: null,
      operations: operations,
      ws1: false,
      ws2: false,
      ws3s: false,
      ws3p: false,
      ws4: false,
      ws6: false,
      ws5: false,
      ws6: false,
      ws7: false,

      needToRefresh: false
    }
    this.setData = this.setData.bind(this);
    this.clickOperation = this.clickOperation.bind(this);
    this.getOperationsList = this.getOperationsList.bind(this);
    this.getOpComponent = getOpComponent.bind(this);
    this.clickWs = this.clickWs.bind(this);
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

  clickOperation (e) {
    let operations = this.state.operations
    operations[e.target.name]['active'] = !operations[e.target.name]['active']
    this.setState({
      ...this.state,
      operations: operations
    })
  }

  clickWs (e) {
    let operations = this.state.operations
    let wsNumber = e.target.name

    if (!this.state[wsNumber])
      Object.keys(operations).map(op_key =>{
        if ('ws' + operations[op_key]['ws'] === wsNumber){
          operations[op_key]['active'] = true
        }
      })
    else 
      Object.keys(operations).map(op_key =>{
        if ('ws' + operations[op_key]['ws'] === wsNumber)
          operations[op_key]['active'] = false
        
      })
    
    this.setState({
      ...this.state,
      [wsNumber]: !this.state[wsNumber], 
      operations: operations
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
    Object.keys(this.state.operations).map(op_key =>
      operations[op_key] = this.state.operations[op_key]['active']
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
    const operations = this.state.operations
    const operationsResultList = this.props.operationsResultList
    const operationsAdditionalData = this.props.operationsAdditionalData
    
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
            <div className="col-6 form-group">
                <label>FARM ID: </label>
                <input type='number' name='farmId'
                  className="form-control"
                  value={this.state.farmId} onChange={this.setData}/>
              </div>
          </div>

          <div className='row'>
            <div className='col-4 row'>
                <WsOpInputs3 operations={operations} ws_number={1} clickOperation={this.clickOperation} 
                      type={'sow'} col={12} key={'1s'} clickWs={this.clickWs}/>
                <WsOpInputs3 operations={operations} ws_number={2} clickOperation={this.clickOperation} 
                      type={'sow'} col={12} key={'2s'} clickWs={this.clickWs}/>
                <WsOpInputs3 operations={operations} ws_number={'3s'} clickOperation={this.clickOperation} 
                    type={'sow'} col={6} key={'3s'} ws_name={'3 матки'} clickWs={this.clickWs}/>
            </div>
            <div className='col-4 row'>
                <WsOpInputs3 operations={operations} ws_number={'3p'} clickOperation={this.clickOperation} 
                    type={'piglets'} col={6} key={'3p'} ws_name={'3 пор'} clickWs={this.clickWs}/>  
                <WsOpInputs3 operations={operations} ws_number={4} clickOperation={this.clickOperation} 
                      type={'piglets'} col={12} key={'4p'} clickWs={this.clickWs}/>
                <WsOpInputs3 operations={operations} ws_number={8} clickOperation={this.clickOperation} 
                      type={'piglets'} col={12} key={'8p'} clickWs={this.clickWs}/>
            </div>
            <div className='col-4 row'>
                <WsOpInputs3 operations={operations} ws_number={5} clickOperation={this.clickOperation} 
                      type={'piglets'} col={12} key={'5p'} clickWs={this.clickWs}/>
                <WsOpInputs3 operations={operations} ws_number={6} clickOperation={this.clickOperation} 
                      type={'piglets'} col={12} key={'6p'} clickWs={this.clickWs}/>
                <WsOpInputs3 operations={operations} ws_number={7} clickOperation={this.clickOperation} 
                      type={'piglets'} col={12} key={'7p'} clickWs={this.clickWs}/>
            </div>
          </div>

          <button className='btn btn-outline' onClick={this.getOperationsList}>Показать операции</button>
        </div>
        <div className='operations-add-data'>
          <p>Количество операций {operationsResultList.length}</p>
        </div>
        <div className='operations-results'>
          
          {operationsResultList.length > 0 && 
            <table>
              <thead className='op-list-item'>
                <th><div className='op-name'>Операция</div></th>
                <th><div className='op-date'>Дата</div></th>
                <th><div className='op-initiator'>Сотрудник</div></th>
                <th><div className='op-tour'>Тур</div></th>
              </thead>
              <tbody>
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


export default Operations