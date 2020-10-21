import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form'

//components
import { SowTable }  from '../../components/SowRepresentations'
import { ErrorMessage, FetchingErrorComponentMessage } from '../CommonComponents'


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
    <div className='farrow-button-block col-3'>
      <label className='color-mainDark-dark font-17 font-700'>{label} {count}</label>
      <div>
        <div className='col-5 btn btn-dark btn-inc-dec'
          onClick={increase}
          data-label={dataLabel}
        >
          +
        </div>
        <div className='col-5 btn btn-dark btn-inc-dec'
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
    this.setData = this.setData.bind(this);
    this.resetQuery = this.resetQuery.bind(this);
    this.sowClick = this.sowClick.bind(this);
    this.decreasePiglets = this.decreasePiglets.bind(this);
    this.increasePiglets = this.increasePiglets.bind(this);
    this.clickFarrow = this.clickFarrow.bind(this);
  }

  componentDidMount() {
    this.setState({
      ...this.state,
      query: {
        ...this.state.query,
        by_section_in_cell: '',
        alive:true,
        all_in_workshop_number: this.props.workshopNumber,
        status_title: this.props.statusTitleFilter
      },
      date: getDateTimeNow()
    })
    this.props.getSows({
      by_section_in_cell: '',
      alive:true,
      all_in_workshop_number: this.props.workshopNumber,
      status_title: this.props.statusTitleFilter
    })
  }

  setQuery (e) {
    let { query } = this.state
    query[e.target.name] = e.target.value

    this.setState({
      ...this.state,
      query: query,
      choosedSows: [],
      needToRefresh: true
    })
  }

  resetQuery (e) {
    let { query } = this.state
    query[e.target.name] = ''

    this.setState({
      ...this.state,
      query: query,
      choosedSows: [],
      needToRefresh: true
    })
  }

  sowClick (e) {
    this.setState({
      ...this.state,
      choosedSows: [e.target.dataset.id,],
      activeSowFarmId: e.target.dataset.farm_id,
    })
    this.props.sowsResetErrorsAndMessages()
  }

  setData (e) {
    this.setState({
      ...this.state,
      [e.target.name]: e.target.value
    })
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
      id: this.state.choosedSows[0],
      dead_quantity: this.state.dead_piglets,
      mummy_quantity: this.state.mummy_piglets,
      alive_quantity: this.state.alive_piglets,
      date: this.state.date,
    })
    this.setState({
      activeSow: null,
      needToRefresh: true,
      activeCellLocationId: null,
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
        this.setState({...this.state, needToRefresh: false})
        this.props.getSows(this.state.query)  
      }, 500)
    }
  }

  render() {
    const { sows } = this.props
    this.refreshSowsList()
    let today = getDateTimeNow()
    
    return (
      <div className='workshop-content'>
          {this.state.activeSowFarmId 
            ? <h4>Свиноматка {this.state.activeSowFarmId}</h4> 
            : <h4>Выберите свиноматку</h4>}
          <div className='my-1'>
            <input type="number" 
              className="font-20 mx-2 rounded-s input-custom-placeholder" 
              placeholder="Номер свиноматки"
              aria-label="Farmid" aria-describedby="basic-addon1" name='farm_id_starts'
              value={this.state.query.farm_id_starts}
              onClick={this.resetQuery}
              onChange={this.setQuery} />
          
            <input type='date'
              className='font-20 mx-2 rounded-s bg-color-white'
              value={this.state.date}
              defaultValue={today}
              name='date'
              onChange={this.setData}
              />
            
            {this.state.date > today 
              ? <ErrorMessage error={{message:'Нельзя выбрать дату в будущем'}}/>
              : <FetchingErrorComponentMessage 
                  fetching={this.props.eventFetching}
                  error={this.props.eventError}
                  message={this.props.message}
                  divClassName={'font-20 mx-2 d-inline'}
                  component={
                    <button onClick={this.clickFarrow}
                      className="btn btn-primary btn-l font-20 font-900" type="button" >
                      Записать данные
                    </button>
                  }
                  />
            }
          </div>
          <div className="row my-1">
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
        <div className='commonfilter-results'>
          <FetchingErrorComponentMessage 
              fetching={this.props.sowsListFetching}
              error={this.props.sowsErrorList}
              message={null}
              component={
                <SowTable sows={sows} sowClick={this.sowClick} 
                  choosedSows={this.state.choosedSows}/>
              }
            />
        </div>
      </div>
    )
  }
}

export default WS3SowFarrowTab