import React, { Component } from 'react';


export let operations = {
  ws1_semination:        {active: false, ws: 1, type: 'sow', label: 'Осеменение'},
  ws1_usound:            {active: false, ws: 1, type: 'sow', label: 'УЗИ'},
  ws1_abort:             {active: false, ws: 1, type: 'sow', label: 'Аборт'},
  ws1_culling:           {active: false, ws: 1, type: 'sow', label: 'Падеж свиноматки'},
  w1_peregon_sow:        {active: false, ws: 1, type: 'sow', label: 'Перегон свиноматок'},

  ws2_usound:            {active: false, ws: 2, type: 'sow', label: 'УЗИ'},
  ws2_abort:             {active: false, ws: 2, type: 'sow', label: 'Аборт'},
  ws2_culling:           {active: false, ws: 2, type: 'sow', label: 'Падеж свиноматки'},
  w2_peregon_sow:        {active: false, ws: 2, type: 'sow', label: 'Перегон свиноматок'},

  ws3_farrow:            {active: false, ws: 3, type: 'sow', label: 'Опорос'},
  ws3_abort:             {active: false, ws: 3, type: 'sow', label: 'Аборт'},
  ws3_sow_culling:       {active: false, ws: 3, type: 'sow', label: 'Падеж свиноматок'},
  ws3_sow_rassadka:      {active: false, ws: 3, type: 'sow', label: 'Рассадка свиноматок'},
  ws3_sow_otiem:         {active: false, ws: 3, type: 'sow', label: 'Отъем свиноматок'},
  ws3_sow_inner:         {active: false, ws: 3, type: 'sow', label: 'Внут. пемемещ. свиноматок'},
  ws3_mark_as_nurse:     {active: false, ws: 3, type: 'sow', label: 'Отметка Кормилица'},
  ws3_mark_as_gilt:      {active: false, ws: 3, type: 'piglets', label: 'Отметка Ремонт'},
  ws3_piglets_padej:     {active: false, ws: 3, type: 'piglets', label: 'Падеж поросят'},
  ws3_piglets_prirezka:  {active: false, ws: 3, type: 'piglets', label: 'Прирезка поросят'},
  ws3_piglets_inner_trs: {active: false, ws: 3, type: 'piglets', label: 'Внут. перемещ. поросят'},
  ws3_piglets_outer_trs: {active: false, ws: 3, type: 'piglets', label: 'Перегон поросят'},
  
  ws4_piglets_weighing:  {active: false, ws: 4, type: 'piglets', label: 'Взвешивание'},
  ws4_piglets_padej:     {active: false, ws: 4, type: 'piglets', label: 'Падеж'},
  ws4_piglets_prirezka:  {active: false, ws: 4, type: 'piglets', label: 'Прирезка'},
  ws4_piglets_rassadka:  {active: false, ws: 4, type: 'piglets', label: 'Рассадка'},
  ws4_piglets_inner_trs: {active: false, ws: 4, type: 'piglets', label: 'Внутр. перемещения'},
  ws4_piglets_outer_trs: {active: false, ws: 4, type: 'piglets', label: 'Перегон'},

  ws8_piglets_weighing:  {active: false, ws: 8, type: 'piglets', label: 'Взвешивание'},
  ws8_piglets_padej:     {active: false, ws: 8, type: 'piglets', label: 'Падеж'},
  ws8_piglets_vinuzhd:   {active: false, ws: 8, type: 'piglets', label: 'Вынужд. убой'},
  ws8_piglets_rassadka:  {active: false, ws: 8, type: 'piglets', label: 'Рассадка'},
  ws8_piglets_inner_trs: {active: false, ws: 8, type: 'piglets', label: 'Внутр. перемещения'},
  ws8_piglets_outer_trs: {active: false, ws: 8, type: 'piglets', label: 'Перегон'},

  ws5_piglets_weighing:  {active: false, ws: 5, type: 'piglets', label: 'Взвешивание'},
  ws5_piglets_padej:     {active: false, ws: 5, type: 'piglets', label: 'Падеж'},
  ws5_piglets_vinuzhd:   {active: false, ws: 5, type: 'piglets', label: 'Вынужд. убой'},
  ws5_piglets_spec:      {active: false, ws: 5, type: 'piglets', label: 'Спец. убой'},
  ws5_piglets_rassadka:  {active: false, ws: 5, type: 'piglets', label: 'Рассадка'},
  ws5_piglets_inner_trs: {active: false, ws: 5, type: 'piglets', label: 'Внутр. перемещения'},
  ws5_piglets_to_75:     {active: false, ws: 5, type: 'piglets', label: 'Перегон в 7-5'},

  ws6_piglets_weighing:  {active: false, ws: 6, type: 'piglets', label: 'Взвешивание'},
  ws6_piglets_padej:     {active: false, ws: 6, type: 'piglets', label: 'Падеж'},
  ws6_piglets_vinuzhd:   {active: false, ws: 6, type: 'piglets', label: 'Вынужд. убой'},
  ws6_piglets_spec:      {active: false, ws: 6, type: 'piglets', label: 'Спец. убой'},
  ws6_piglets_rassadka:  {active: false, ws: 6, type: 'piglets', label: 'Рассадка'},
  ws6_piglets_inner_trs: {active: false, ws: 6, type: 'piglets', label: 'Внутр. перемещения'},
  ws6_piglets_to_75:     {active: false, ws: 6, type: 'piglets', label: 'Перегон в 7-5'},

  ws7_piglets_weighing:  {active: false, ws: 7, type: 'piglets', label: 'Взвешивание'},
  ws7_piglets_padej:     {active: false, ws: 7, type: 'piglets', label: 'Падеж'},
  ws7_piglets_vinuzhd:   {active: false, ws: 7, type: 'piglets', label: 'Вынужд. убой'},
  ws7_piglets_spec:      {active: false, ws: 7, type: 'piglets', label: 'Спец. убой'},
  ws7_piglets_rassadka:  {active: false, ws: 7, type: 'piglets', label: 'Рассадка'},
  ws7_piglets_inner_trs: {active: false, ws: 7, type: 'piglets', label: 'Внутр. перемещения'},
  ws7_piglets_to_75:     {active: false, ws: 7, type: 'piglets', label: 'Перегон в 7-5'},
}


class SowRowOperation extends Component {
  render() {
    const operation = this.props.operation
    return (
      <div className={'op-list-item ' + 'op-' + operation.oper_name}
        key={operation.oper_name + operation.sow}>
        <td><div className='op-name'>{operations[operation.oper_name]['label']} </div></td>
        <td><div className='op-date'>{operation.date.split(' ')[0]} </div></td>
        <td><div className='op-initiator'>{operation.initiator} </div></td>
        <td><div className='op-tour'>{operation.tour} </div></td>
        <td><div className='op-sow-id'>{operation.sow} </div></td>
        {this.props.children}
      </div>
    )
  }
}

export const getOpComponent = (op) => {
  let component = null
  switch (op.oper_name) {
    case 'ws1_semination':
      component = 
        <SowRowOperation operation={op}>
          <td><div className='op-sem-emp'>{op.semination_employee} </div></td>
          <td><div className='op-sem-boar'>{op.boar} </div></td>
        </SowRowOperation>
      break;
    case 'ws1_usound':
      component = 
        <SowRowOperation operation={op}>
          <td><div className='op-location'>{op.location} </div></td>
          <td><div className='op-sow-id'>{op.u_type} д</div></td>
          <td><div className='op-uzi-result'>{op.result ? 'Супорос' : 'Прохолост'} </div></td>
        </SowRowOperation>
      break;
    case 'ws2_usound':
      component = 
        <SowRowOperation operation={op}>
          <td><div className='op-location'>{op.location} </div></td>
          <td><div className='op-sow-id'>{op.u_type} д</div></td>
          <td><div className='op-uzi-result'>{op.result ? 'Супорос' : 'Прохолост'} </div></td>
        </SowRowOperation>
      break;
    case 'ws1_abort':
      component = 
        <SowRowOperation operation={op}>
          <td><div className='op-location'>{op.location} </div></td>
        </SowRowOperation>
      break;
    case 'ws2_abort':
      component = 
        <SowRowOperation operation={op}>
          <td><div className='op-location'>{op.location} </div></td>
        </SowRowOperation>
      break;
    case 'ws1_culling':
        component = 
          <SowRowOperation operation={op}>
            <td><div className='op-location'>{op.location} </div></td>
            <td><div className='op-location'>{op.culling_type} </div></td>
            <td><div className='op-location'>{op.reason} </div></td>
          </SowRowOperation>
        break;
    case 'ws2_culling':
      component = 
        <SowRowOperation operation={op}>
          <td><div className='op-location'>{op.location} </div></td>
          <td><div className='op-location'>{op.culling_type} </div></td>
          <td><div className='op-location'>{op.reason} </div></td>
        </SowRowOperation>
      break;
    case 'w1_peregon_sow':
        component = 
          <SowRowOperation operation={op}>
            <td><div className='op-location'>Из {op.from_location} </div></td>
            <td><div className='op-location'>В {op.to_location} </div></td>
          </SowRowOperation>
        break;
    case 'w2_peregon_sow':
      component = 
        <SowRowOperation operation={op}>
          <td><div className='op-location'>Из {op.from_location} </div></td>
          <td><div className='op-location'>В {op.to_location} </div></td>
        </SowRowOperation>
      break;
    case 'ws3_farrow':
      component = 
        <SowRowOperation operation={op}>
          <td><div className='op-location'>{op.location ? op.location : '-'} </div></td>
          <td><div className='op-farrow-quantity'>живых {op.alive_quantity} </div></td>
          <td><div className='op-farrow-quantity'>мертвых {op.dead_quantity} </div></td>
          <td><div className='op-farrow-quantity'>муммий {op.mummy_quantity} </div></td>
        </SowRowOperation>
      break;
    case 'ws3_abort':
      component = 
        <SowRowOperation operation={op}>
          <td><div className='op-location'>{op.location} </div></td>
        </SowRowOperation>
      break;
    case 'ws3_culling':
      component = 
        <SowRowOperation operation={op}>
          <td><div className='op-location'>{op.location} </div></td>
          <td><div className='op-location'>{op.culling_type} </div></td>
          <td><div className='op-location'>{op.reason} </div></td>
        </SowRowOperation>
      break;
  }

  return component
}