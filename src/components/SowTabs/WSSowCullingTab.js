import React, { Component } from 'react';

// components
import { SowFindByIdWithoutGet } from '../FiltersAndInputs'
import { SowLightDetail } from '../SowRepresentations'
import { ErrorMessage, Message, LoadingMessage, FetchingErrorComponentMessage } from '../CommonComponents';


function CullingModal () {
  return (
    <div className="modal fade" id="cullingModal" tabindex="-1" role="dialog" 
      aria-labelledby="cullingModalLabel" aria-hidden="true">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="cullingModalLabel">Modal title</h5>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            ...
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="button" className="btn btn-primary">Save changes</button>
          </div>
        </div>
      </div>
    </div>
  )
}


class WSSowCullingTab extends Component {
   constructor(props) {
    super(props);
    this.state = {
      query: {
        all_in_workshop_number: null,
        alive: true,
        farm_id_isnull: false
      },
      cullingReason: 'без причины',
      cullingType: 'padej',
      weight: 0,
      needToRefresh: false,
    }
    this.getSowsById = this.getSowsById.bind(this);
    this.getGilts = this.getGilts.bind(this);
    this.setData = this.setData.bind(this);
    this.cullingSow = this.cullingSow.bind(this);
    this.abortionSow = this.abortionSow.bind(this);
  }
  
  componentDidMount() {
    this.props.getSows({
      alive:true,
      all_in_workshop_number: this.props.workshopNumber,
      farm_id_isnull: false
    })
    this.setState({
      ...this.state,
      query: {
        ...this.state.query,
        all_in_workshop_number: this.props.workshopNumber
      }
    })
    this.props.sowsResetErrorsAndMessages()
  }

  getSowsById (e) {
    let { query } = this.state
    query.farm_id_starts = e.target.value
    query.farm_id_isnull = false
    this.setState({
      ...this.state,
      query: query
    })
    this.props.getSows(query)
  }

  getGilts () {
    let { query } = this.state
    query.farm_id_isnull = true
    query.farm_id_starts = null
    this.setState({
      ...this.state,
      query: query
    })
    this.props.getSows(query)
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
    this.setState({
      ...this.state,
      needToRefresh: true
    })
  }

  refreshSowsList () {
    if (this.props.eventFetching && this.state.needToRefresh) {
      setTimeout(() => {
        this.setState({...this.state, needToRefresh: false})
        this.props.getSows({
          all_in_workshop_number: this.props.workshopNumber,
          farm_id_isnull: false
        })  
      }, 500)
    }
  }

  render() {
    this.refreshSowsList()
    const { sows, sow, tours_info, eventError, message, errorList, eventFetching, sowsListFetching } = this.props
    return (
      <div className='row workshop-content'>
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
                <button type="button" className="btn btn-primary" data-dismiss="modal" 
                  onClick={this.cullingSow}>
                  Забраковать
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className='col-3 workshop-left-column'>
            <SowFindByIdWithoutGet 
              sows={sows}
              queryCount={this.props.queryCount}
              sow={sow} 
              sowIdValue={this.state.query.farm_id_starts}
              getSowsById={this.getSowsById} 
              getGilts={this.getGilts}
              setSow={this.props.setSow}
              fetching={this.props.sowsListFetching}
              error={errorList}
              />
        </div>
        <div className='col-9'>
          <div className='workshop-content-column-2'>
            {this.props.singleFetching 
                ? <LoadingMessage /> 
                : sow &&
                    <div>
                      <SowLightDetail sow={sow}/>
                      {eventFetching 
                        ? <LoadingMessage />
                        : !eventError 
                          ? <div>
                              <div className="input-group">
                                <select className="custom-select" name='cullingType' onChange={this.setData}>
                                  <option selected value='padej' >Падеж</option>
                                  <option value='vinuzhd' >Вынужденный убой</option>
                                </select>
                                <input type='text' onChange={this.setData} name='cullingReason'
                                  placeholder='Напишите причину' value={this.state.cullingReason}/>
                                <input type='number' onChange={this.setData} name='weight' value={this.state.weight}
                                  placeholder='Укажите вес'/>
                                <div className="input-group-append">
                                  {/* <button className="btn btn-outline-secondary" type="button"  
                                  onClick={this.cullingSow}>
                                    Забраковать
                                  </button> */}
                                  <button type="button" className="btn btn-outline-secondary" data-toggle="modal"
                                     data-target="#cullingModal">
                                    Забраковать
                                  </button>
                                </div>
                              </div>
                              { this.props.abort &&
                                <div className="input">
                                  <label className='sow-event-label'>Пометить как аборт</label>
                                  <div>
                                    <button className="btn btn-outline-secondary" type="button"  
                                    onClick={this.abortionSow}>
                                      Аборт
                                    </button>
                                  </div>
                                </div>}
                                {message && <Message message={message}/>}
                            </div>
                          : <ErrorMessage error={eventError}/>
                      }
                    </div>
            }
          </div>
        </div>
      </div>
    )
  }
}

export default WSSowCullingTab