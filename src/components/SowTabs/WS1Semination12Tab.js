import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form'
import { ErrorMessage, Message, LoadingMessage } from '../CommonComponents'


const renderTextField = ({
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

const renderSelectField = ({
  input,
  label,
  type,
  name,
  children,
  divClass,
  meta: { touched, error, warning }
}) => (
  <div className={divClass}>
    <select name={name} {...input} placeholder={label} type={type}>
      {children}
    </select>
    {touched &&
        ((error && <span className='color-red2-dark my-1 font-700 pl-1'>*{error}</span>) ||
          (warning && <span>{warning}</span>))}
  </div>
)


function SeminationForm (props) {
  const { parentSubmit, pristine, reset, submitting, handleSubmit, initialValues, tours, boars,
     seminators } = props
  return (
    <form onSubmit={handleSubmit(parentSubmit)} className='mt-4 mx-3'>
      <Field
        component={renderTextField}
        name="farm_id"
        label='Номер'
        divClass='float-left mr-2 pr-5'
        // onBlur={() => console.log('farm_id on blur')}
        />

      <Field 
        name="week" 
        component={renderSelectField}
        divClass='float-left mr-2 pr-5'
        >
          <option className='font-10' defaultValue={null} key={0}>Выберите тур</option>
          {tours && tours.length > 0 && tours.map(tour => 
            <option className='font-10' value={tour.week_number} key={tour.id}>Неделя {tour.week_number}</option>
          )}
      </Field>

      <Field 
        name="date" 
        component={renderTextField}
        type='date'
        divClass='float-left mr-2 pr-5'
        label='Дата'
      />
      <div className='clearfix'></div>
      
      <div className='row my-2'>
        <div className='col-5 border border-secondary mr-2 py-1'>
          <label className='my-0 font-18 color-mainDark-dark'>Осеменение 1</label>
          <Field 
            name="boar1" 
            component={renderSelectField}
            divClass=''
            >
              <option className='font-10' defaultValue={null} key={0}>Выберите хряка</option>
              {boars && boars.length > 0 && boars.map(boar => 
                <option className='font-10' value={boar.id} key={boar.id}>
                    Хряк {boar.farm_id} {boar.birth_id}
                </option>
              )}
          </Field>

          <Field 
            name="seminator1" 
            component={renderSelectField}
            divClass=''
            >
              <option className='font-10' defaultValue={null} key={0}>Выберите семенатора</option>
              {seminators && seminators.length > 0 && seminators.map(seminator => 
                <option className='font-10' value={seminator.id} key={seminator.id}>
                    семенатор {seminator.username}
                </option>
              )}
          </Field>
        </div>
        <div className='col-5 border border-secondary py-1'>
          <label className='my-0 font-18 color-mainDark-dark'>Осеменение 2</label>
          <Field 
            name="boar2" 
            component={renderSelectField}
            divClass=''
            >
              <option className='font-10' defaultValue={null} key={0}>Выберите хряка</option>
              {boars && boars.length > 0 && boars.map(boar => 
                <option className='font-10' value={boar.id} key={boar.id}>
                    Хряк {boar.farm_id} {boar.birth_id}
                </option>
              )}
          </Field>

          <Field 
            name="seminator2" 
            component={renderSelectField}
            divClass=''
            >
              <option className='font-10' defaultValue={null} key={0}>Выберите семенатора</option>
              {seminators && seminators.length > 0 && seminators.map(seminator => 
                <option className='font-10' value={seminator.id} key={seminator.id}>
                    семенатор {seminator.username}
                </option>
              )}
          </Field>
        </div>
      </div>
      <button 
        className='btn btn-m mb-1 rounded-s text-uppercase font-900 shadow-s
        bg-blue2-dark text-wrap'
        type="submit"
        disabled={pristine || submitting}>
        осеменить 2 раза
      </button>
    </form>
  )
}

const validateSeminationForm = values => {
  const errors = {}
  const requiredFields = [
    'farm_id',
    'tour',
    'boar1',
    'seminator1',
    'boar2',
    'seminator2',
    'date',
  ]
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = 'Обязательное поле'
    }
  })
  return errors
}

SeminationForm = reduxForm({
  form: 'seminationForm',
  validate: validateSeminationForm,
})(SeminationForm)


class WS1Semination12Tab extends Component {
   constructor(props) {
    super(props);
    this.state = {
      week: null,
      boar1: null,
      boar2: null,
      seminationEmployee: null,
      needToRefresh: false,
    }
    this.getSowsById = this.getSowsById.bind(this);
    this.doubleSeminate = this.doubleSeminate.bind(this);
    this.setData = this.setData.bind(this);
  }
  
  componentDidMount() {
    this.props.getBoars()
    this.props.getSeminators()
  }

  getSowsById (e) {
    let { query } = this.state
    query.farm_id_starts = e.target.value
    this.setState({
      ...this.state,
      query: query
    })
    this.props.getSows(query)
  }

  setData (e) {
    this.setState({
      ...this.state,
      [e.target.name]: e.target.value
    })
  }

  doubleSeminate () {
    this.props.seminationSow(this.props.seminationForm.values)
  }
  

  render() {
    const { tours, boars, seminators, eventFetching, eventError, message } = this.props
    return (
      <div className=''>
        <SeminationForm 
          parentSubmit={this.doubleSeminate}
          boars={boars}
          seminators={seminators}
          tours={tours}
        />
        {eventFetching 
          ? <LoadingMessage />
          : eventError 
            ? <ErrorMessage error={eventError} />
            : <Message message={message} />
        }
      </div>
    )
  }
}

export default WS1Semination12Tab