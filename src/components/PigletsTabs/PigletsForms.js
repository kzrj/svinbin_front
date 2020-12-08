import React, { Component, useState  } from 'react';
import { Field, reduxForm } from 'redux-form';

import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import MenuItem from '@material-ui/core/MenuItem';

import { getToday } from '../utils';
import { ErrorOrMessage } from '../CommonComponents';

export const renderFromHelper = ({ touched, error }) => {
  if (!(touched && error)) {
    return
  } else {
    return <FormHelperText>{touched && error}</FormHelperText>
  }
}

export const renderTextField = ({
  label,
  placeholder,
  input,
  multiline,
  meta: { touched, invalid, error },
  labelClass,
  ...custom
}) => (
  <TextField
    fullWidth={true}
    label={label}
    placeholder={placeholder}
    error={touched && invalid}
    helperText={touched && error}
    {...input}
    {...custom}
    multiline={multiline}
    InputLabelProps={{
      className: labelClass,
    }}
  />
)

export const renderSelectField = ({
  input,
  label,
  formClass,
  labelClass,
  meta: { touched, error },
  children,
  options,
  ...custom
}) => (
  <FormControl error={touched && error} className={formClass} fullWidth={true}>
    <InputLabel className={labelClass}>{label}</InputLabel>
    <Select
      {...input}
      {...custom}
      fullWidth={true}
    >
      {options.map(option =>
          <MenuItem value={option.value}>{option.label}</MenuItem>
          )}
    </Select>
    {renderFromHelper({ touched, error })}
  </FormControl>
)

export const renderChildrenSelectField = ({
  input,
  label,
  formClass,
  labelClass,
  meta: { touched, error },
  children,
  options,
  ...custom
}) => (
  <FormControl error={touched && error} className={formClass} fullWidth={true}>
    <InputLabel className={labelClass}>{label}</InputLabel>
    <Select
      {...input}
      {...custom}
      fullWidth={true}
    >
      {children}
    </Select>
    {renderFromHelper({ touched, error })}
  </FormControl>
)

export const renderDateTimeField = ({
  label,
  placeholder,
  input,
  meta: { touched, invalid, error },
  labelClass,
  ...custom
}) => (

  <TextField
    fullWidth={true}
    label={label}
    type="date"
    error={touched && invalid}
    helperText={touched && error}
    {...input}
    {...custom}
    InputLabelProps={{
      className: labelClass,
      shrink: true 
    }}
  />
)

export function CullingPigletsForm (props) {
  const { parentSubmit, pristine, reset, submitting, handleSubmit, initialValues, cullingTypes,
    eventFetching, eventError, message } = props
  return (
    <form onSubmit={handleSubmit(parentSubmit)} className=''
      initialValues={initialValues}
    > 
      <Field
        component={renderTextField}
        name="id"
        hidden={true}
      />

      <Field 
        component={renderSelectField}
        name='culling_type'
        label='Тип выбытия'
        options={cullingTypes}
        margin='dense'
      />

      <Field 
        component={renderDateTimeField}
        name='date'
        label='Дата'
        margin='dense'
      />

      <Field 
        component={renderTextField}
        type='number'
        label="Количество" 
        name='quantity'
        margin='dense'
      />

      <Field 
        component={renderTextField}
        type='number'
        label="Вес" 
        name='total_weight'
        margin='dense'
      />

      <Field 
        component={renderTextField}
        label="Причина" 
        name='reason'
        margin='dense'
      />

      <Field
        component='checkbox'
        name="is_it_gilt"
        hidden={true}
      />

      <Field
        component={renderTextField}
        name="ws_number"
        hidden={true}
      />
      
      {/* {activePiglets.gilts_quantity > 0 && 
            <div>
              <label>Ремонтная свинка?</label>
              <input type='checkbox' onChange={this.setIsGilt} value={this.state.is_it_gilt} />
            </div>
          } */}

      <button 
        className='btn btn-m mt-2 font-900 shadow-s bg-mainDark-dark text-wrap'
        type="submit"
        disabled={pristine || submitting}>
        Выбытие / Убой
      </button>

      <ErrorOrMessage error={eventError} message={message} fetching={eventFetching}
          className='mt-2 mb-0 mx-1 font-15' />
    </form>
  )
}

const validateCullingForm = values => {
  const errors = {}
  const requiredFields = [
    'id',
    'culling_type',
    'quantity',
    'date',
    'total_weight'
  ]
  let avg = values['total_weight'] / values['quantity']

  if (values['date'] > getToday()) {
    errors['date'] = 'Дата не может быть в будущем'
  }

  if (values['total_weight'] <= 0) {
    errors['total_weight'] = 'Укажите вес больше 0'
  }

  if (values['ws_number'] === 3) {
    if (avg > 10)
      errors['total_weight'] = 'Средний вес одной головы не может быть больше 10кг'
  }

  if (values['ws_number'] === 4) {
    if (7 > avg || avg > 26)
      errors['total_weight'] = 'Средний вес одной головы не может быть больше 26кг и меньше 7кг'
  }

  if (values['ws_number'] === 8) {
    if (18 > avg || avg > 65)
      errors['total_weight'] = 'Средний вес одной головы не может быть больше 65кг и меньше 18кг'
  }

  if (values['ws_number'] === 5 || values['ws_number'] === 6 || values['ws_number'] === 7 ) {
    if (45 > avg || avg > 130)
      errors['total_weight'] = 'Средний вес одной головы не может быть больше 130кг и меньше 45кг'
  }
  
  if (values['quantity'] <= 0) {
    errors['quantity'] = 'Укажите больше 0'
  }
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = 'Обязательное поле'
    }
  })
  return errors
}

CullingPigletsForm = reduxForm({
  form: 'cullingPigletsForm',
  validate: validateCullingForm,
})(CullingPigletsForm)


export function WeighingPigletsForm (props) {
  const { parentSubmit, pristine, reset, submitting, handleSubmit, initialValues, cullingTypes,
    eventFetching, eventError, message } = props
  return (
    <form onSubmit={handleSubmit(parentSubmit)} className=''
      initialValues={initialValues}
    > 
      <Field
        component={renderTextField}
        name="id"
        hidden={true}
      />

      <Field 
        component={renderTextField}
        type='number'
        label="Количество" 
        name='new_amount'
        margin='dense'
      />

      <Field 
        component={renderTextField}
        type='number'
        label="Вес" 
        name='total_weight'
        margin='dense'
        placeholder='Укажите вес'
      />

      <Field 
        component={renderTextField}
        name='place'
        hidden={true}
      />

      <Field 
        component={renderTextField}
        type='number'
        name='to_location'
        hidden={true}
      />

      <button 
        className='btn btn-m mt-2 font-900 shadow-s bg-mainDark-dark text-wrap'
        type="submit"
        disabled={pristine || submitting}>
        Взвесить
      </button>

    </form>
  )
}

const validateWeighingPigletsForm = values => {
  const errors = {}
  const requiredFields = [
    'id',
    'new_amount',
    'total_weight'
  ]
  
  if (values['total_weight'] <= 0) {
    errors['total_weight'] = 'Укажите вес больше 0'
  }
  
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = 'Обязательное поле'
    }
  })
  return errors
}

WeighingPigletsForm = reduxForm({
  form: 'weighingPigletsForm',
  validate: validateWeighingPigletsForm,
})(WeighingPigletsForm)
