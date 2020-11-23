import React, { Component } from 'react';

// components
import { SowSingle } from '../SowRepresentations'
import { ErrorOrMessage, LoadingMessage } from '../CommonComponents';


class WS3NurseSowTab extends Component {
   constructor(props) {
    super(props);
    this.state = {
      query: {
        tour: null,
        alive:true,
      },
      needToRefresh: false,
      farmId: null,
    };

    this.markAsNurse = this.markAsNurse.bind(this);
    this.refreshSowsList = this.refreshSowsList.bind(this);
    this.findSow = this.findSow.bind(this);
  }

  componentDidMount(){
    this.setState({
      ...this.state,
      query: {
        ...this.state.query,
        alive:true,
        all_in_workshop_number: this.props.workshopNumber,
        status_title_in: this.props.statusTitleFilters
      }
    })
    this.props.getNurses()
    this.props.setSow(null)
    this.props.sowsResetErrorsAndMessages()
  }
  
  markAsNurse () {
    this.props.markAsNurse({
      id: this.props.sow.id,
    })
    this.setState({
      needToRefresh: true,
    })
  }

  findSow (e) {
    this.props.getByFarmIdSow({
      'farm_id': e.target.value,
       simple: true, 
       status_title_in: this.props.statusTitleFilters,
       all_in_workshop_number: this.props.workshopNumber,})
  }

  refreshSowsList () {
    if (!this.props.eventFetching && this.state.needToRefresh){
      setTimeout(() => {
        this.setState({...this.state, needToRefresh: false,
          })
        this.props.getNurses()
      }, 300)
    }
  }

  render() {
    this.refreshSowsList()
    const { sow, eventError, message, eventFetching, nurses, listFetching, errorSingle } = this.props
    
    return (
      <div className=''>
        <div className='card my-2 mx-1'>
          <div className='content my-2'>
            <h4 className='mt-2 mx-2 mb-1'>Введите номер свиноматки</h4>
              <input type="number" 
                className="font-20 mx-2 my-2 rounded-s input-custom-placeholder" 
                placeholder="Номер свиноматки"
                name='farm_id'
                onChange={() => this.props.sowsResetErrorsAndMessages()}
                onBlur={this.findSow} />
            {sow &&
                <SowSingle sow={sow} className='my-0 font-17 font-600 color-mainDark-dark'/>
              }
            {errorSingle && <p className='my-0 color-red1-light'>
              В цехе нет свиноматки c опоросом с таким ID.</p>}
          </div>
          <div className='content'>
            <button className='btn btn-dark' disabled={!sow}
                    onClick={this.markAsNurse}>Отметить как кормилицу</button>
            <ErrorOrMessage error={eventError} message={message} fetching={eventFetching}
              className='my-3 mx-2 font-15' />
          </div>
        </div>
        {listFetching 
          ? <LoadingMessage />
          : nurses.length > 0 && 
          <div className='card my-2'>
            <div className='content'>
              <p className='my-1'> 10 последних кормилиц</p>
              <table className='table table-sm'>
                <thead className='bg-mainDark-dark'>
                  <th>Дата</th>
                  <th>Номер</th>
                  <th>Тур</th>
                  <th>Сотрудник</th>
                </thead>
                <tbody>
                  {nurses.map(c =>
                    <tr>
                      <td>{c.date}</td>
                      <td>{c.farm_id}</td>
                      <td>{c.tour}</td>
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

export default WS3NurseSowTab