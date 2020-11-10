import React, { Component } from 'react';
import { ErrorOrMessage } from '../CommonComponents';


export class BottomExpand extends Component  {
  constructor(props) { 
    super(props);
  }
  render () {
  const { expand, clickExpand, eventError, message, eventFetching, label } = this.props
  
  return (
    <div className='card card-style fixed-bottom mx-1 my-1'>
      <div className='content'>
        <div className='' 
          onClick={clickExpand}>
          {expand 
            ? <p className='my-0 text-center'>
                <i className="fas fa-chevron-down "><span className='ml-1'>Скрыть</span></i> 
              </p>
            : [<p className='my-0 text-center'>
                <i className="fas fa-chevron-up ">
                  <span className='ml-1'>{label}</span>
                </i>
              </p>,
              <ErrorOrMessage error={eventError} message={message} fetching={eventFetching}
              className='mt-2 mb-0 mx-1 font-15 text-center' />]
            }
        </div>
        {(expand) &&
          this.props.children
        }
      </div>
    </div>
  )}
}

export function PigletsGroupInline (props) {
  const { piglets } = props
  let age = ''
  piglets && piglets.age.split(' ').length > 1 
    ? age = piglets.age.split(' ')[0]
    : age = 0
  
  return (
    <p className={props.className}>
      Количество {piglets.quantity} | {age && age + ' дней'} | рем {piglets.gilts_quantity} | {piglets.week_tour}
    </p>
   )
 }

 export function PigletsGroupInlineMin (props) {
  const { piglets } = props
  let age = ''
  piglets && piglets.age.split(' ').length > 1 
    ? age = piglets.age.split(' ')[0]
    : age = 0
  
  return (
    <p className={props.className}>
      Кол-во {piglets.quantity} | {age && age + ' дней'} | рем {piglets.gilts_quantity} | {piglets.week_tour}
    </p>
   )
 }

 export function PigletsListElem (props) {
  const { piglets } = props
  let tour = piglets.week_tour.split(' 20')[0]
  let age = ''
  piglets && piglets.age.split(' ').length > 1 
    ? age = piglets.age.split(' ')[0]
    : age = 0

  return (
    <div className='content mx-1 my-1'>
      <p className='my-0'>Кол-во {piglets.quantity}</p>
      <p className='my-0'>{age} дней</p>
      {piglets.gilts_quantity > 0 && <p className='my-0'>ремонтных {piglets.gilts_quantity}</p>}
      <p className='my-0'>{tour}</p>
      {piglets.transfer_part_number && <p className='my-0'>Партия {piglets.transfer_part_number}</p>}
    </div>
  )
}
