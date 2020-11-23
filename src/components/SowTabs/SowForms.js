import React from 'react';
import axios from 'axios';
import { Field, reduxForm, change } from 'redux-form';
import { connect } from 'react-redux'

import endpoints from '../../redux/api/endpoints';
import { createUrlParamsFromFilters } from '../../redux/api/utils';
import SowsActions from '../../redux/redux-sauce/sows';

import { getToday } from '../utils';
import {  renderTextField, renderSelectField, renderDateTimeField, renderChildrenSelectField } 
  from '../PigletsTabs/PigletsForms'
import { ErrorOrMessage } from '../CommonComponents';


export function SemenBoarForm (props) {
  const { parentSubmit, pristine, reset, submitting, handleSubmit, initialValues, boars, fValues,
    eventFetching, eventError, message } = props
  return (
    <div className='card card-style mx-0 my-2'>
      <div className='content'>
        <form onSubmit={handleSubmit(parentSubmit)} className=''
          initialValues={initialValues}
        > 
          
          <Field 
            component={renderDateTimeField}
            name='date'
            label='Дата'
            margin='dense'
          />

          <Field 
            component={renderChildrenSelectField}
            name='id'
            label='Выберите хряка'
            margin='dense'
          >
            {boars.map(boar =>
              <option value={boar.id}>{boar.farm_id}</option>
              )}
          </Field>

          <Field 
            component={renderTextField}
            type='number'
            label="Количество спермы мл. А" 
            name='a'
            margin='dense'
          />

          <Field 
            component={renderTextField}
            type='number'
            label="Оценка концентрации (млн). B" 
            name='b'
            margin='dense'
          />

          <Field 
            component={renderTextField}
            type='number'
            label="Оценка подвижности (%). D" 
            name='d'
            margin='dense'
          />

          <Field 
            component={renderSelectField}
            name='f_denom'
            label='Тип выбытия'
            options={fValues}
            margin='dense'
          />

          <Field 
            component={renderTextField}
            type='number'
            label="final_motility_score" 
            name='final_motility_score'
            margin='dense'
          />

          <button 
            className='btn btn-m mt-2 font-900 shadow-s bg-mainDark-dark text-wrap'
            type="submit"
            disabled={pristine || submitting}>
            Создать запись
          </button>

          <ErrorOrMessage error={eventError} message={message} fetching={eventFetching}
              className='mt-2 mb-0 mx-1 font-15' />
        </form>
      </div>
    </div>
  )
}

const validateSemenBoarForm = values => {
  const errors = {}
  const requiredFields = [
    'id',
    'a',
    'b',
    'd',
    'f_denom',
    'final_motility_score',
    'date',
    'tour'
  ]
  
  if (values['date'] > getToday()) {
    errors['date'] = 'Дата не может быть в будущем'
  }

  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = 'Обязательное поле'
    }
  })
  return errors
}

SemenBoarForm = reduxForm({
  form: 'semenBoarForm',
  validate: validateSemenBoarForm,
})(SemenBoarForm)


export function CullingBoarForm (props) {
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
        component={renderDateTimeField}
        name='date'
        label='Дата'
        margin='dense'
      />

      <Field 
        component={renderSelectField}
        name='culling_type'
        label='Тип выбытия'
        options={cullingTypes}
        margin='dense'
      />

      <Field 
        component={renderTextField}
        type='number'
        label="Вес" 
        name='weight'
        margin='dense'
      />

      <Field 
        component={renderTextField}
        label="Причина" 
        name='reason'
        margin='dense'
      />

      <button 
        className='btn btn-m mt-2 font-900 shadow-s bg-mainDark-dark text-wrap'
        type="submit"
        disabled={pristine || submitting}
      >
        Выбытие / Убой
      </button>

      <ErrorOrMessage error={eventError} message={message} fetching={eventFetching}
          className='mt-2 mb-0 mx-1 font-15' />
    </form>
  )
}

const validateCullingBoarForm = values => {
  const errors = {}
  const requiredFields = [
    'id',
    'culling_type',
    'total_weight',
    'reason',
    'date',
  ]
  
  if (values['date'] > getToday()) {
    errors['date'] = 'Дата не может быть в будущем'
  }

  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = 'Обязательное поле'
    }
  })
  return errors
}

CullingBoarForm = reduxForm({
  form: 'cullingBoarForm',
  validate: validateCullingBoarForm,
})(CullingBoarForm)


export function CreateBoarForm (props) {
  const { parentSubmit, pristine, reset, submitting, handleSubmit, initialValues, breeds,
    eventFetching, eventError, message } = props
  return (
    <form onSubmit={handleSubmit(parentSubmit)} className=''
      initialValues={initialValues}
    > 
      <Field 
        component={renderChildrenSelectField}
        name='breed'
        label='Порода'
        margin='dense'
      >
        {breeds.map(breed =>
          <option value={breed.id}>{breed.title}</option>
          )}
      </Field>

      <Field 
        component={renderTextField}
        type='farm_id'
        label="ID" 
        name='farm_id'
        margin='dense'
      />

      <Field 
        component={renderTextField}
        label="Номер бирки" 
        name='birth_id'
        margin='dense'
      />

      <button 
        className='btn btn-m mt-2 font-900 shadow-s bg-mainDark-dark text-wrap'
        type="submit"
        disabled={pristine || submitting}
      >
        Создать хряка.
      </button>
    </form>
  )
}

const validateCreateBoarForm = values => {
  const errors = {}
  const requiredFields = [
    'farm_id',
    'birth_id',
    'breed',
  ]
  
  if (values['date'] > getToday()) {
    errors['date'] = 'Дата не может быть в будущем'
  }

  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = 'Обязательное поле'
    }
  })
  return errors
}

CreateBoarForm = reduxForm({
  form: 'createBoarForm',
  validate: validateCreateBoarForm,
})(CreateBoarForm)


export function CullingSowForm (props) {
  const { parentSubmit, pristine, reset, submitting, handleSubmit, initialValues, cullingTypes, sow,
    eventFetching, eventError, message, abort } = props
  return (
    <form onSubmit={handleSubmit(parentSubmit)} className=''
      initialValues={initialValues}
    > 
      {sow 
        ? <p className='my-0 font-700'>Свиноматка №{sow.farm_id}</p>
        : <p className='my-0 font-700'>Выберите свиноматку</p>
      }
      <Field
        // component={renderAsyncValidateField}
        component={renderTextField}
        name='farm_id'
        type='number'
      />

      <Field
        component={renderTextField}
        name="id"
        hidden={true}
      />
      
      <Field 
        component={renderDateTimeField}
        name='date'
        label='Дата'
        margin='dense'
      />

      <Field 
        component={renderSelectField}
        name='culling_type'
        label='Тип выбытия'
        options={cullingTypes}
        margin='dense'
      />

      <Field 
        component={renderTextField}
        type='number'
        label="Вес" 
        name='weight'
        margin='dense'
      />

      <Field 
        component={renderTextField}
        label="Причина" 
        name='reason'
        margin='dense'
      />

      <button 
        className='btn btn-m mt-2 font-900 shadow-s bg-mainDark-dark text-wrap'
        type="submit"
        disabled={pristine || submitting}
      >
        Выбытие / Убой
      </button>

      <button 
        className='btn btn-m mt-2 font-900 shadow-s bg-mainDark-dark text-wrap ml-5'
        type="button"
        disabled={sow ? false : true}
        onClick={abort}
      >
        Аборт
      </button>

      <ErrorOrMessage error={eventError} message={message} fetching={eventFetching}
          className='mt-2 mb-0 mx-1 font-15' />
    </form>
  )
}

const validateCullingSowForm = values => {
  const errors = {}
  const requiredFields = [
    'id',
    'culling_type',
    'total_weight',
    'reason',
    'date',
  ]
  
  if (values['date'] > getToday()) {
    errors['date'] = 'Дата не может быть в будущем'
  }

  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = 'Обязательное поле'
    }
  })
  return errors
}

export function validateSowByFarmIdCullingWs3 (values, dispatch) {
  const params = createUrlParamsFromFilters({simple:true, farm_id: values.farm_id, alive: true, all_in_workshop_number: 3});
  const token = localStorage.getItem('token') || '';
  const url = endpoints.SOW_BY_FARM_ID;
  return axios({
      method: 'get',
      url: url,
      params: params,
      headers: { 'content-type': 'multipart/form-data', 'Authorization': `JWT ${token}` }
  })
  .then(response => {
    dispatch(SowsActions.getSowByFarmIdSuccess(response.data))
    dispatch(change('cullingSowForm', 'id', response.data.sow.id))
  })
  .catch(err => {
      if (err.response.status === 404 )
        dispatch(SowsActions.getSowByFarmIdFail())
        dispatch(change('cullingSowForm', 'id', null))
        throw { farm_id: 'Свиноматки с таким номером нет.' };
    })

}

const mapDispatchToPropsCullingForm = (dispatch) => ({
})

CullingSowForm = reduxForm({
  form: 'cullingSowForm',
  validate: validateCullingSowForm,
  asyncValidate: validateSowByFarmIdCullingWs3,
  asyncBlurFields: ['farm_id',]
})(connect(
  null,
  mapDispatchToPropsCullingForm,
)(CullingSowForm))


export function CreateGiltForm (props) {
  const { parentSubmit, pristine, reset, submitting, handleSubmit, initialValues, sow,
    eventFetching, eventError, message } = props
  return (
    <form onSubmit={handleSubmit(parentSubmit)} className=''
      initialValues={initialValues}
    > 
      {sow 
        ? <p className='my-0 font-700'>Свиноматка №{sow.farm_id}</p>
        : <p className='my-0 font-700'>Выберите свиноматку</p>
      }

      <Field
        // component={renderAsyncValidateField}
        component={renderTextField}
        name='farm_id'
        type='number'
      />

      <Field
        component={renderTextField}
        name="id"
        hidden={true}
      />
      
      <Field 
        component={renderDateTimeField}
        name='date'
        label='Дата'
        margin='dense'
      />

      <Field 
        component={renderTextField}
        label="Номер бирки" 
        name='birth_id'
        margin='dense'
      />

      <button 
        className='btn btn-m mt-2 font-900 shadow-s bg-mainDark-dark text-wrap'
        type="submit"
        disabled={pristine || submitting}
      >
        Отметить ремонтку
      </button>

      <ErrorOrMessage error={eventError} message={message} fetching={eventFetching}
          className='mt-2 mb-0 mx-1 font-15' />
    </form>
  )
}

const validateCreateGiltForm = values => {
  const errors = {}
  const requiredFields = [
    'farm_id',
    'birth_id',
    'date',
  ]
  
  if (values['date'] > getToday()) {
    errors['date'] = 'Дата не может быть в будущем'
  }

  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = 'Обязательное поле'
    }
  })
  return errors
}

export function validateSowByFarmIdCreateGilt (values, dispatch) {
  const params = createUrlParamsFromFilters({simple:true, farm_id: values.farm_id});
  const token = localStorage.getItem('token') || '';
  const url = endpoints.SOW_BY_FARM_ID;
  return axios({
      method: 'get',
      url: url,
      params: params,
      headers: { 'content-type': 'multipart/form-data', 'Authorization': `JWT ${token}` }
  })
  .then(response => {
    dispatch(SowsActions.getSowByFarmIdSuccess(response.data))
    dispatch(change('createGiltForm', 'id', response.data.sow.id))
  })
  .catch(err => {
      if (err.response.status === 404 )
        dispatch(SowsActions.getSowByFarmIdFail())
        dispatch(change('createGiltForm', 'id', null))
        throw { farm_id: 'Свиноматки с таким номером нет.' };
    })

}
const mapDispatchToProps = (dispatch) => ({
})

CreateGiltForm = reduxForm({
  form: 'createGiltForm',
  validate: validateCreateGiltForm,
  asyncValidate: validateSowByFarmIdCreateGilt,
  asyncBlurFields: ['farm_id',]
})(connect(
  null,
  mapDispatchToProps,
)(CreateGiltForm))
