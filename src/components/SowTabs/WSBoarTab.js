import React, { Component } from 'react';

// components
import { ErrorMessage, Message } from '../CommonComponents';


function BoarList (props) {
  return (
    <div >
      {props.list.length > 0 && <label>Количество: {props.list.length}</label>}
      <ul className='list-unstyled'>
        {props.listFetching ? <p className='loading'>Загрузка</p> :
          props.list.length > 0 &&
          props.list.map(elem => 
          <li className={props.boar && 
            props.boar.id == elem.id ? 'sow-active sow-li text-center' : 'sow-li text-center'} 
            onClick={() => props.clickBoar(elem)}>
            ID {elem.birth_id} {elem.breed ? elem.breed : 'нет породы'}
          </li>
        )}
      </ul>
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

      needToRefresh: false,
    }
    this.clickBoar = this.clickBoar.bind(this);
    this.setData = this.setData.bind(this);
    this.cullingBoar = this.cullingBoar.bind(this);
    this.createBoar = this.createBoar.bind(this);
  }
  
  componentDidMount() {
    // this.props.getBoars()
    this.props.sowsResetErrorsAndMessages()
  }

  clickBoar (boar) {
    this.setState({
      ...this.state,
      boar: boar
    })
  }

  setData(e) {
    this.setState({
      ...this.state,
      [e.target.name]: e.target.value
    })
  }

  cullingBoar() {
    let data = {
      id: this.props.boar.id,
      culling_type: this.state.cullingType,
      reason: this.state.cullingReason,
      weight: this.state.weight,
    }
    this.props.cullingBoar(data)
    this.setState({
      ...this.state,
      needToRefresh: true
    })
  }

  createBoar() {
    this.props.createBoar({birth_id: this.state.birth_id, breed: this.state.breed})
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
      }, 500)
    }
  }

  render() {
    this.refreshSowsList()
    const { boars, boar, breeds, eventError, listFetching, message } = this.props
    return (
      <div className='workshop-content'>
        <div className='row'>
          <div className='col-4'>
            <BoarList list={boars} 
              boar={this.state.boar} clickBoar={this.clickBoar} listFetching={listFetching}/>
          </div>
          <div className='col-4'>
              <h4>Выбраковка</h4>
              <div className="input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text">Вид выбраковки</span>
                </div>
                <select className="custom-select" name='cullingType' className="form-control" 
                  onChange={this.setData}>
                  <option selected value='padej' >Падеж</option>
                  <option value='vinuzhd' >Вынужденный убой</option>
                </select>
              </div>
              <div className="input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text">Причина</span>
                </div>
                <input type='text' onChange={this.setData} name='cullingReason' className="form-control" 
                    placeholder='Напишите причину' value={this.state.cullingReason}/>
              </div>
              <div className="input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text">Вес</span>
                </div>
                <input type='number' onChange={this.setData} name='weight' value={this.state.weight}
                  className="form-control"  placeholder='Укажите вес'/>
              </div>
              {this.state.boar &&
                <div className="input-group">
                  <button className="btn btn-outline-secondary" type="button"  
                  onClick={this.cullingBoar}>
                    Забраковать
                  </button>
                </div>
              }
            </div>
            <div className='col-4'>
              <h4>Создать хряка</h4>
              <div className="input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text">ID нового хряка</span>
                </div>
                <input type='text' onChange={this.setData} name='birth_id' className="form-control" 
                    placeholder='ID' value={this.state.birth_id}/>
              </div>
              <div className="input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text">Порода</span>
                </div>
                <select className="custom-select" name='breed' className="form-control" 
                  onChange={this.setData}>
                    <option selected value={null}>выбрать породу</option>
                    {breeds.length > 0 && breeds.map(breed => 
                      <option value={breed.id} >{breed.title}</option>
                    )}
                </select>
              </div>
              {this.state.birth_id &&
                <div className="input-group">
                  <button className="btn btn-outline-secondary" type="button"  
                    onClick={this.createBoar}>
                    Создать хряка
                  </button>
                </div>
              }
            </div>
          </div>
        <div className='col'>
          {eventError && <ErrorMessage error={eventError}/>}
          {message && <Message message={message}/>}
        </div>

      </div>
    )
  }
}

export default WSBoarTab