import React, { Component } from 'react';


export const CullingTypeInput = (props) => (
  <select className="custom-select" name='culling_type' 
    onChange={props.setData}>
    <option selected>Выберите тип падежа...</option>
    <option value='padej' >Падеж</option>
    <option value='spec' >Спец. убой</option>
    <option value='prirezka' >Прирезка</option>
  </select>
  )

export const CullingReasonInput = (props) => (
  <input type='text' value={props.culling_reason} 
    onChange={props.setData} 
    name='culling_reason' className="form-control search-input"
    placeholder="Причина" />
)

export const WeighingPigletsInput = (props) => (
  <div className="input-group-append">
    <input type='text' 
      className="form-control search-input"
      value={props.totalWeight}  
      name='totalWeight'
      placeholder="Укажите вес"
      onChange={props.setData}/>
    <button className='btn btn-outline-secondary' onClick={props.weighing}>
      Взвесить
    </button>
  </div>
)

export const NomadGroupDetail = (props) => (
  <table className='table table-sm'>
    <thead>
    </thead>
    <tbody>
      <tr>
        <td>Количество</td><td>{props.piglets.quantity}</td>
      </tr>
      <tr>
        <td>Количество ремонтных</td><td>{props.piglets.gilts_quantity}</td>
      </tr>
      <tr>
        <td>Тур</td><td>{props.piglets.tour}</td>
      </tr>
    </tbody>
  </table>
)

export const WeighingDetail = (props) => (
  <table className='table table-sm'>
    <tbody>
      <tr>
        <td>Средний вес</td><td>{props.weighingData.average_weight}</td>
      </tr>
      <tr>
        <td>Общий вес</td><td>{props.weighingData.total_weight}</td>
      </tr>
    </tbody>
  </table>
)