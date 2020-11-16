import React, { Component } from 'react';

// components
import CircularProgress from '@material-ui/core/CircularProgress';

import { ErrorOrMessage, FetchingErrorComponentMessage } from '../CommonComponents';
import { CullingBoarForm, CreateBoarForm } from './SowForms';
import { getToday } from '../utils';


function BoarList (props) {
  return (
    <div >
      {props.list.length > 0 && <span className='mx-2 font-15 font-600'>Кол-во: {props.list.length}</span>}
      {props.listFetching ? <CircularProgress className='color-mainDark-dark'/> :
        props.list.length > 0 &&
        props.list.map(elem => 
        <div className={props.boar &&  props.boar.id == elem.id 
            ? 'sow-active sow-li text-center' 
            : 'sow-li text-center'} 
          onClick={() => props.clickBoar(elem)}>
          ID {elem.farm_id} {elem.breed ? elem.breed : 'нет породы'}
        </div>
      )}
      
    </div>
  )
}

// function 

class WSBoarTab extends Component {
   constructor(props) {
    super(props);
    this.state = {
      query: {
      },
      boar: null,
      breed: null,
      cullingReason: 'без причины',
      cullingType: 'padej',
      weight: 0,

      birth_id: '',
      farm_id: '',

      needToRefresh: false,
    }
    this.clickBoar = this.clickBoar.bind(this);
    this.setData = this.setData.bind(this);
    this.cullingBoar = this.cullingBoar.bind(this);
    this.createBoar = this.createBoar.bind(this);
  }
  
  componentDidMount() {
    this.props.sowsResetErrorsAndMessages()
  }

  clickBoar (boar) {
    this.setState({
      ...this.state,
      boar: boar
    })
    this.props.cullingFormSetID(boar.id)
    this.props.sowsResetErrorsAndMessages()
  }

  setData(e) {
    this.setState({
      ...this.state,
      [e.target.name]: e.target.value
    })
  }

  cullingBoar() {
    this.props.cullingBoar(this.props.cullingForm.values)
    this.setState({
      ...this.state,
      boar: null,
      needToRefresh: true
    })
  }

  createBoar() {
    this.props.createBoar(this.props.createForm.values)
    this.props.resetCreateForm()
    this.setState({
      ...this.state,
      needToRefresh: true
    })
  }

  refreshSowsList () {
    if (this.props.eventFetching && this.state.needToRefresh) {
      setTimeout(() => {
        this.setState({...this.state, needToRefresh: false})
        this.props.getBoars()  
      }, 300)
    }
  }

  render() {
    this.refreshSowsList()
    const { boars, breeds, eventError, listFetching, message, eventFetching } = this.props
    const { boar } = this.state
    
    return (
      <div className='row mx-0'>
        <div className='col-3 px-0 py-3'>
          <FetchingErrorComponentMessage
            fetching={this.props.listFetching}
            component={
              <BoarList list={boars} 
                boar={this.state.boar} clickBoar={this.clickBoar} listFetching={listFetching}/>}
          />
        </div>
        <div className='col-9 pl-2'>
          <div className='card card-style mt-3 mb-2 mx-0'>
            <div className='content'>
              <h5>
                Выбраковка {boar 
                  && <span>{boar.farm_id} {boar.breed}</span>}
              </h5>
              {boar 
                ? <CullingBoarForm
                  parentSubmit={this.cullingBoar}
                  cullingTypes={[{value:'padej', label: 'Падеж'}, {value: 'vinuzhd', label: 'Вынужденный убой'}]}

                  initialValues={{
                    id: boar && boar.id,
                    culling_type: 'padej',
                    date: getToday(),
                    reason: 'без причины'
                  }}
                  
                  eventFetching={eventFetching}
                  eventError={eventError}
                  message={message}
                />
                : <p className='my-0'>Выберите хряка для выбытия.</p>
              }
              </div>
            </div>
          <ErrorOrMessage error={eventError} message={message} fetching={eventFetching}
              className='mt-2 mb-0 mx-1 my-2 font-15' />

          <div className='card card-style mx-0'>
            <div className='content'>
              <h4>Создать хряка</h4>
              <CreateBoarForm 
                parentSubmit={this.createBoar}
                breeds={breeds}
                />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default WSBoarTab