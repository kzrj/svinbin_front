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
    placeholder="Причина" />)
    