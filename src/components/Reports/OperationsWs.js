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


const PigsCountWs3 = (props) =>
  <div>
    <div className='row'>
      <div className='col-6'>
        Свиноматки
        <table>
          <thead>
            <th><span className='report-ws-count-th'>Подсосных(из них кормилиц)</span></th>
            <th><span className='report-ws-count-th'>Супоросных</span></th>
            <th><span className='report-ws-count-th'>Всего</span></th>
          </thead>
          <tbody>
            <tr>
              <td className="report-cell-td report-cell-value">{props.pigsCount.ws3_sows_pods_count}({props.pigsCount.ws3_sows_nurse_count})</td>
              <td className="report-cell-td report-cell-value">{props.pigsCount.ws3_sows_sup_count}</td>
              <td className="report-cell-td report-cell-value">{props.pigsCount.ws3_sows_pods_count + props.pigsCount.ws3_sows_sup_count}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className='col-6'>
        Поросята
        <table>
          <thead>
            <th><span className='report-ws-count-th'>Ремонт</span></th>
            <th><span className='report-ws-count-th'>Всего</span></th>
          </thead>
          <tbody>
            <tr>
              <td className="report-cell-td report-cell-value">{props.pigsCount.ws3_gilts_count}</td>
              <td className="report-cell-td report-cell-value">{props.pigsCount.ws_piglets_count}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>


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
    this.props.getWsReportPigsCount()
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
    const { operationsResultList, operationsAddData, pigsCount}  = this.props
    
    return (
      <div className="container-fluid">

        {pigsCount && pigsCount.ws_number == 3 &&
          <PigsCountWs3 pigsCount={pigsCount}/>
        }
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
          <div className='operation-add-data'>
            <p>Количество операций {operationsResultList.length}</p>
            {operationsAddData && operationsAddData.farrow_data 
              && operationsAddData.farrow_data.total_count > 0 &&
              <div className='operation-farrow-data'>
                <p>Итого по опоросам за указанный период:</p>
                <div className='row'>
                  <div className='col-3'>
                    Опоросилось {operationsAddData.farrow_data.total_count}
                  </div>
                  <div className='col-8'>
                    Оприходовано:
                    <span className='operation-farrow-data-count'> {' '}
                        живых {operationsAddData.farrow_data.total_alive_quantity}</span>
                    <span className='operation-farrow-data-count'>
                        мертвых {operationsAddData.farrow_data.total_dead_quantity}</span>
                    <span className='operation-farrow-data-count'>
                        муммий {operationsAddData.farrow_data.total_mummy_quantity}</span>
                  </div>
                </div>
              </div>
            }
            {operationsAddData && operationsAddData.sow_padej_data && operationsAddData.piglets_padej_data 
              && operationsAddData.piglets_prirezka_data &&
              (operationsAddData.sow_padej_data.total_qnty || operationsAddData.piglets_padej_data.total_qnty
                || operationsAddData.piglets_prirezka_data.total_qnty) &&
              <div className='operation-farrow-data'>
                <p>Итого по выбраковкам за указанный период:</p>
                <div className='row'>
                  {operationsAddData.sow_padej_data.total_qnty > 0 &&
                    <div className='col-4'>
                      Падеж свиноматок {operationsAddData.sow_padej_data.total_qnty}
                    </div>
                  }
                  {operationsAddData.piglets_padej_data.total_qnty > 0 && 
                    <div className='col-4'> 
                      Падеж поросят {operationsAddData.piglets_padej_data.total_qnty}
                    </div>
                    }
                  {operationsAddData.piglets_prirezka_data.total_qnty > 0 &&
                    <div className='col-4'> 
                      Прирезка поросят {operationsAddData.piglets_prirezka_data.total_qnty}
                    </div>
                  }
                </div>
              </div>
            }
            {operationsAddData && operationsAddData.sow_nurse 
              && operationsAddData.sow_nurse.total_qnty > 0 &&
              <div className='operation-farrow-data'>
                <p>Отмечено кормилицами за указанный период: {operationsAddData.sow_nurse.total_qnty}</p>
              </div>
            }
            {operationsAddData && operationsAddData.mark_as_gilt 
              && operationsAddData.mark_as_gilt.total_qnty > 0 &&
              <div className='operation-farrow-data'>
                <p>Отмечено ремонтками за указанный период: {operationsAddData.mark_as_gilt.total_qnty}</p>
              </div>
            }
          </div>
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