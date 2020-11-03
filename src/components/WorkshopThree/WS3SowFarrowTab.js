import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form'

//components
import { SowSingle } from '../SowRepresentations'
import { ErrorOrMessage, ErrorMessage, LoadingMessage } from '../CommonComponents'


export function getDateTimeNow() {
  let today = new Date();
  let dd = String(today.getDate()).padStart(2, '0');
  let mm = String(today.getMonth() + 1).padStart(2, '0');
  let yyyy = today.getFullYear();

  today = yyyy + '-' + mm + '-' + dd;
  return today
}

export const renderTextField = ({
  input,
  label,
  type,
  divClass,
  meta: { touched, error, warning }
}) => (
  <div className={divClass}>
    <input {...input} placeholder={label} type={type} />
    {touched &&
      ((error && <span className='color-red2-dark my-1 font-700 pl-1'>*{error}</span>) ||
        (warning && <span>{warning}</span>))}
  </div>
)

function FarrowForm (props) {
  const { parentSubmit, pristine, reset, submitting, handleSubmit, initialValues, tours, boars,
     seminators } = props
  return (
    <form onSubmit={handleSubmit(parentSubmit)} className=''
      initialValues={initialValues}
    >
      <Field 
        name="date" 
        component={renderTextField}
        type='date'
        divClass='float-left mr-2 pr-5'
        label='Дата'
      />

      <button 
        className='btn btn-m mb-1 rounded-s text-uppercase font-900 shadow-s
        bg-blue2-dark text-wrap'
        type="submit"
        disabled={pristine || submitting}>
        записать данные
      </button>
    </form>
  )
}

const validateFarrowForm = values => {
  const errors = {}
  const requiredFields = [
    // 'id',
    // 'dead_quantity',
    // 'mummy_quantity',
    // 'alive_quantity',
    'date',
  ]
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = 'Обязательное поле'
    }
  })
  return errors
}

FarrowForm = reduxForm({
  form: 'farrowForm',
  validate: validateFarrowForm,
})(FarrowForm)


function CountPigletsButtons (props) {
  const { label, count, increase, decrease, dataLabel } = props
  return (
    <div className='farrow-button-block float-left text-center mr-3'>
      <label className='color-mainDark-dark font-17 font-700'>{label} {count}</label>
      <div>
        <div className='btn bg-mainDark-dark px-3 mr-2'
          onClick={increase}
          data-label={dataLabel}
        >
          +
        </div>
        <div className='btn bg-mainDark-dark px-3'
          onClick={decrease}
          data-label={dataLabel}
        >
          -
        </div>
      </div>
    </div>
  )
}


class WS3SowFarrowTab extends Component {
   constructor(props) {
    super(props);
    this.state = {
      current_total_piglets: null,
      total_piglets: 0,
      mummy_piglets: 0,
      dead_piglets: 0,
      alive_piglets: 0,
      date: null,

      choosedSows: [],
      query: {
        alive:true,
        farm_id_starts: '',
        tour: null,
      },
      activeSowFarmId: ''
    }
    this.setQuery = this.setQuery.bind(this);
    this.decreasePiglets = this.decreasePiglets.bind(this);
    this.increasePiglets = this.increasePiglets.bind(this);
    this.clickFarrow = this.clickFarrow.bind(this);
  }

  componentDidMount() {
    this.setState({
      ...this.state,
      query: {
        ...this.state.query,
        alive:true,
        all_in_workshop_number: this.props.workshopNumber,
        status_title: this.props.statusTitleFilter
      },
      date: getDateTimeNow()
    })
    this.props.getFarrows()
  }

  setQuery (e) {
    let { query } = this.state
    query[e.target.name] = e.target.value
    
    this.setState({
      ...this.state,
      query: query,
    })
    this.props.getSows(query)  

    this.props.sowsResetErrorsAndMessages()
  }

  decreasePiglets (e) {
    const { label } = e.target.dataset
    this.setState({
      ...this.state,
      [label]: this.state[label] - 1,
      total_piglets: this.state.total_piglets - 1
    })
  }

  increasePiglets (e) {
    const { label } = e.target.dataset
    this.setState({
      ...this.state,
      [label]: this.state[label] + 1,
      total_piglets: this.state.total_piglets + 1
    })
  }

  clickFarrow () {
    this.props.sowFarrow({
      id: this.props.sow.id,
      dead_quantity: this.state.dead_piglets,
      mummy_quantity: this.state.mummy_piglets,
      alive_quantity: this.state.alive_piglets,
      date: this.state.date,
    })
    this.setState({
      needToRefresh: true,
      total_piglets: 0,
      mummy_piglets: 0,
      dead_piglets: 0,
      alive_piglets: 0,
      query: {
        ...this.state.query,
        farm_id_starts: '',
      }
    })
  }

  refreshSowsList () {
    if (!this.props.eventFetching && this.state.needToRefresh) {
      setTimeout(() => {
        this.setState({...this.state, needToRefresh: false,
          query: {
            ...this.state.query,
            farm_id_starts: ''
          }
          })
        this.props.getFarrows()
      }, 300)
    }
  }

  render() {
    const { sow, farrows, eventError, eventFetching, message, sowsListFetching } = this.props
    this.refreshSowsList()
    let today = getDateTimeNow()
    
    return (
      <div className=''>
        <div className='card my-2 mx-1'>
          <div className='content my-2'>
            <h4 className='mt-2 mx-2 mb-1'>Введите номер свиноматки</h4>
              <input type="number" 
                className="font-20 mx-2 my-2 rounded-s input-custom-placeholder" 
                placeholder="Номер свиноматки"
                name='farm_id_starts'
                value={this.state.query.farm_id_starts}
                defaultValue={sow && sow.farm_id}
                onChange={this.setQuery} />
            {sow &&
                <SowSingle sow={sow} className='my-0 font-17 font-600 color-mainDark-dark'/>
              }
          </div>
        </div>
        <div className='card my-2 mx-1'>
          <div className="content my-1 d-flex justify-content-center">
            <CountPigletsButtons 
              label={"Живые"}
              dataLabel={'alive_piglets'}
              count={this.state.alive_piglets}
              increase={this.increasePiglets}
              decrease={this.decreasePiglets}
            />
            <CountPigletsButtons 
              label={"Мертвые"}
              dataLabel={'dead_piglets'}
              count={this.state.dead_piglets}
              increase={this.increasePiglets}
              decrease={this.decreasePiglets}
            />
            <CountPigletsButtons 
              label={"Муммий"}
              dataLabel={'mummy_piglets'}
              count={this.state.mummy_piglets}
              increase={this.increasePiglets}
              decrease={this.decreasePiglets}
            />
          </div>

          <div className='content my-2 mx-3 mr-3'>
            <input type='date'
                className='font-20 mx-2 mr-5 rounded-s bg-color-white'
                value={this.state.date}
                defaultValue={today}
                name='date'
                onChange={this.setData}
                />
              
            {this.state.date > today 
                ? <ErrorMessage error={{message:'Нельзя выбрать дату в будущем'}}/>
                : <button onClick={this.clickFarrow}
                    disabled={!sow}
                    className="btn bg-mainDark-dark btn-s font-20 font-900" type="button" >
                    Записать данные
                  </button>
              }
            <ErrorOrMessage error={eventError} message={message} fetching={eventFetching}
              className='my-3 mx-2 font-15' />
          </div>
        </div>
        {sowsListFetching 
          ? <LoadingMessage />
          : farrows.length > 0 && 
          <div className='card my-2'>
            <div className='content'>
              <p className='my-1'> 10 последних опоросов</p>
              <table className='table table-sm'>
                <thead className='bg-mainDark-dark'>
                  <th>Дата</th>
                  <th>Номер</th>
                  <th>Тур</th>
                  <th>Оприходовано</th>
                  <th>Сотрудник</th>
                </thead>
                <tbody>
                  {farrows.map(c =>
                    <tr>
                      <td>{c.date}</td>
                      <td>{c.farm_id}</td>
                      <td>{c.tour}</td>
                      <td>
                        <span className='color-green2-light mr-2 font-700'>{c.alive_quantity}</span>
                        <span className='color-red2-light mr-2 font-700'>{c.dead_quantity}</span>
                        <span className='color-gray2-light mr-2 font-700'>{c.mummy_quantity}</span>
                      </td>
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

export default WS3SowFarrowTab