import React, { Component } from 'react';


export let operations = {
  ws1_semination:        {active: false, ws: '1', type: 'sow', label: 'Осеменение'},
  ws1_usound:            {active: false, ws: '1', type: 'sow', label: 'УЗИ'},
  ws1_abort:             {active: false, ws: '1', type: 'sow', label: 'Аборт'},
  ws1_culling:           {active: false, ws: '1', type: 'sow', label: 'Падеж маток'},
  w1_peregon_sow:        {active: false, ws: '1', type: 'sow', label: 'Перегон маток'},

  ws2_usound:            {active: false, ws: '2', type: 'sow', label: 'УЗИ'},
  ws2_abort:             {active: false, ws: '2', type: 'sow', label: 'Аборт'},
  ws2_culling:           {active: false, ws: '2', type: 'sow', label: 'Падеж маток'},
  w2_peregon_sow:        {active: false, ws: '2', type: 'sow', label: 'Перегон маток'},

  ws3_farrow:            {active: false, ws: '3s', type: 'sow', label: 'Опорос'},
  ws3_abort:             {active: false, ws: '3s', type: 'sow', label: 'Аборт'},
  ws3_sow_culling:       {active: false, ws: '3s', type: 'sow', label: 'Падеж маток'},
  ws3_sow_rassadka:      {active: false, ws: '3s', type: 'sow', label: 'Рассадка маток'},
  ws3_sow_otiem:         {active: false, ws: '3s', type: 'sow', label: 'Отъем маток'},
  ws3_sow_inner:         {active: false, ws: '3s', type: 'sow', label: 'Внут. перемещ. маток'},
  ws3_mark_as_nurse:     {active: false, ws: '3s', type: 'sow', label: 'Кормилица'},
  ws3_mark_as_gilt:      {active: false, ws: '3p', type: 'piglets', label: 'Отметка Ремонт'},
  ws3_piglets_padej:     {active: false, ws: '3p', type: 'piglets', label: 'Падеж поросят'},
  ws3_piglets_vinuzhd:   {active: false, ws: '3p', type: 'piglets', label: 'Вынужд. убой'},
  ws3_piglets_prirezka:  {active: false, ws: '3p', type: 'piglets', label: 'Прирезка поросят'},
  ws3_piglets_inner_trs: {active: false, ws: '3p', type: 'piglets', label: 'Внут. перемещ. поросят'},
  ws3_piglets_outer_trs: {active: false, ws: '3p', type: 'piglets', label: 'Перегон поросят'},
  
  ws4_weighing:          {active: false, ws: '4', type: 'piglets', label: 'Взвешивание'},
  ws4_piglets_padej:     {active: false, ws: '4', type: 'piglets', label: 'Падеж'},
  ws4_piglets_prirezka:  {active: false, ws: '4', type: 'piglets', label: 'Прирезка'},
  ws4_piglets_vinuzhd:   {active: false, ws: '4', type: 'piglets', label: 'Вынужд. убой'},
  ws4_piglets_rassadka:  {active: false, ws: '4', type: 'piglets', label: 'Рассадка'},
  ws4_piglets_inner_trs: {active: false, ws: '4', type: 'piglets', label: 'Внутр. перемещения'},
  ws4_piglets_outer_trs: {active: false, ws: '4', type: 'piglets', label: 'Перегон'},

  ws8_weighing:          {active: false, ws: '8', type: 'piglets', label: 'Взвешивание'},
  ws8_piglets_padej:     {active: false, ws: '8', type: 'piglets', label: 'Падеж'},
  ws8_piglets_vinuzhd:   {active: false, ws: '8', type: 'piglets', label: 'Вынужд. убой'},
  ws8_piglets_prirezka:  {active: false, ws: '8', type: 'piglets', label: 'Прирезка'},
  ws8_piglets_rassadka:  {active: false, ws: '8', type: 'piglets', label: 'Рассадка'},
  ws8_piglets_inner_trs: {active: false, ws: '8', type: 'piglets', label: 'Внутр. перемещения'},
  ws8_piglets_outer_trs: {active: false, ws: '8', type: 'piglets', label: 'Перегон'},

  ws5_weighing:          {active: false, ws: '5', type: 'piglets', label: 'Взвешивание'},
  ws5_piglets_padej:     {active: false, ws: '5', type: 'piglets', label: 'Падеж'},
  ws5_piglets_vinuzhd:   {active: false, ws: '5', type: 'piglets', label: 'Вынужд. убой'},
  ws5_piglets_spec:      {active: false, ws: '5', type: 'piglets', label: 'Спец. убой'},
  ws5_piglets_rassadka:  {active: false, ws: '5', type: 'piglets', label: 'Рассадка'},
  ws5_piglets_inner_trs: {active: false, ws: '5', type: 'piglets', label: 'Внутр. перемещения'},
  ws5_piglets_to_75:     {active: false, ws: '5', type: 'piglets', label: 'Перегон в 7-5'},

  ws6_weighing:          {active: false, ws: '6', type: 'piglets', label: 'Взвешивание'},
  ws6_piglets_padej:     {active: false, ws: '6', type: 'piglets', label: 'Падеж'},
  ws6_piglets_vinuzhd:   {active: false, ws: '6', type: 'piglets', label: 'Вынужд. убой'},
  ws6_piglets_spec:      {active: false, ws: '6', type: 'piglets', label: 'Спец. убой'},
  ws6_piglets_rassadka:  {active: false, ws: '6', type: 'piglets', label: 'Рассадка'},
  ws6_piglets_inner_trs: {active: false, ws: '6', type: 'piglets', label: 'Внутр. перемещения'},
  ws6_piglets_to_75:     {active: false, ws: '6', type: 'piglets', label: 'Перегон в 7-5'},

  ws7_weighing:          {active: false, ws: '7', type: 'piglets', label: 'Взвешивание'},
  ws7_piglets_padej:     {active: false, ws: '7', type: 'piglets', label: 'Падеж'},
  ws7_piglets_vinuzhd:   {active: false, ws: '7', type: 'piglets', label: 'Вынужд. убой'},
  ws7_piglets_spec:      {active: false, ws: '7', type: 'piglets', label: 'Спец. убой'},
  ws7_piglets_rassadka:  {active: false, ws: '7', type: 'piglets', label: 'Рассадка'},
  ws7_piglets_inner_trs: {active: false, ws: '7', type: 'piglets', label: 'Внутр. перемещения'},
  ws7_piglets_to_75:     {active: false, ws: '7', type: 'piglets', label: 'Перегон в 7-5'},
}


class SowRowOperation extends Component {
  render() {
    const operation = this.props.operation
    return (
      <tr className='op-list-item' 
        key={operation.oper_name + operation.sow}>
        <td><div className={'op-name op-' + operation.oper_name}>
          {operations[operation.oper_name]['label']} </div></td>
        <td><div className='op-date'>{operation.date.split(' ')[0]} </div></td>
        <td><div className='op-initiator'>{operation.initiator} </div></td>
        <td><div className='op-tour'>{operation.tour} </div></td>
        <td><div className='op-sow-id'>{operation.sow} </div></td>
        {this.props.children}
      </tr>
    )
  }
}


class PigletsRowOperation extends Component {
  render() {
    const operation = this.props.operation
    return (
      <tr className='op-list-item'
        key={operation.oper_name + operation.week_tour}>
        <td><div className={'op-name op-' + operation.oper_name}>
          {operations[operation.oper_name]['label']} </div></td>
        <td><div className='op-date'>{operation.date.split(' ')[0]} </div></td>
        <td><div className='op-initiator'>{operation.initiator} </div></td>
        <td><div className='op-tour'>{operation.week_tour} </div></td>
        <td><div className='op-sow-id'>{operation.age_at} дн </div></td>
        {this.props.children}
      </tr>
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
          <td><div className='op-sem-boar'>Хряк № {op.boar} </div></td>
        </SowRowOperation>
      break;

    case 'ws1_usound':
    case 'ws2_usound':
      component = 
        <SowRowOperation operation={op}>
          <td><div className='op-location'>{op.location} </div></td>
          <td><div className='op-sow-id'>{op.u_type == '30' ? '28' : '35'} д</div></td>
          <td><div className={'op-uzi-result-'+ (op.result ? 'true' : 'false')}>
            {op.result ? 'Супорос' : 'Прохолост'} </div></td>
        </SowRowOperation>
      break;

    case 'ws1_abort':
    case 'ws2_abort':
    case 'ws3_abort':
      component = 
        <SowRowOperation operation={op}>
          <td><div className='op-location'>{op.location} </div></td>
        </SowRowOperation>
      break;

    case 'ws1_culling':
    case 'ws2_culling':
    case 'ws3_sow_culling':
      component = 
        <SowRowOperation operation={op}>
          <td><div className='op-location'>{op.location} </div></td>
          <td><div className='op-location'>{op.reason} </div></td>
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

    case 'w1_peregon_sow':
    case 'w2_peregon_sow':
    case 'ws3_sow_rassadka':
    case 'ws3_sow_otiem':
    case 'ws3_sow_inner':
      component = 
        <SowRowOperation operation={op}>
          <td><div className='op-location'>Из {op.from_location} </div></td>
          <td><div className='op-location'>В {op.to_location} </div></td>
        </SowRowOperation>
      break;

    case 'ws3_mark_as_nurse':
      component = 
        <SowRowOperation operation={op} />
      break;
    
    case 'ws3_mark_as_gilt':
      component = 
        <SowRowOperation operation={op} >
          <td><div className='op-gilt'>№бирки {op.gilt} </div></td>
        </SowRowOperation>
      break;
    
    case 'ws3_piglets_padej':
    case 'ws4_piglets_padej':
    case 'ws8_piglets_padej':
    case 'ws5_piglets_padej':
    case 'ws6_piglets_padej':
    case 'ws7_piglets_padej':
    case 'ws3_piglets_prirezka':
    case 'ws4_piglets_prirezka':
    case 'ws8_piglets_prirezka':
    case 'ws3_piglets_vinuzhd':
    case 'ws4_piglets_vinuzhd':
    case 'ws5_piglets_vinuzhd':
    case 'ws6_piglets_vinuzhd':
    case 'ws7_piglets_vinuzhd':
    case 'ws8_piglets_vinuzhd':
      component = 
        <PigletsRowOperation operation={op}>
          <td><div className='op-sow-id'>{op.quantity} гол </div></td>
          <td><div className='op-location'>{op.location} </div></td>
          <td><div className='op-reason'>{op.total_weight} кг </div></td>
          <td><div className='op-location'>{op.reason} </div></td>
        </PigletsRowOperation>
      break;

    case 'ws3_piglets_inner_trs':
    case 'ws3_piglets_outer_trs':
    case 'ws4_piglets_rassadka':
    case 'ws4_piglets_inner_trs':
    case 'ws4_piglets_outer_trs':
    case 'ws8_piglets_rassadka':
    case 'ws8_piglets_inner_trs':
    case 'ws8_piglets_outer_trs':
    case 'ws5_piglets_rassadka':
    case 'ws5_piglets_inner_trs':
    case 'ws5_piglets_to_75':
    case 'ws6_piglets_rassadka':
    case 'ws6_piglets_inner_trs':
    case 'ws6_piglets_to_75':
    case 'ws7_piglets_rassadka':
    case 'ws7_piglets_inner_trs':
    case 'ws7_piglets_to_75':
      component = 
        <PigletsRowOperation operation={op}>
          <td><div className='op-sow-id'>{op.quantity} гол </div></td>
          <td><div className='op-location'>Из {op.from_location} </div></td>
          <td><div className='op-location'>В {op.to_location == 'Цех 11' ? '7/5' : op.to_location} </div></td>
        </PigletsRowOperation>
      break;

    case 'ws4_weighing':
    case 'ws8_weighing':
    case 'ws5_weighing':
    case 'ws6_weighing':
    case 'ws7_weighing':
      component = 
        <PigletsRowOperation operation={op}>
          <td><div className='op-sow-id'>{op.piglets_quantity} гол </div></td>
          <td><div className='op-location'>{ 'Цех '+ op.place.split('/')[1]}
              </div></td>
          <td><div className='op-location'>~ {op.average_weight} кг </div></td>
          <td><div className='op-location'>{op.total_weight} кг </div></td>
        </PigletsRowOperation>
      break;

    case 'ws5_piglets_spec':
    case 'ws6_piglets_spec':
    case 'ws7_piglets_spec':
      component = 
        <PigletsRowOperation operation={op}>
          <td><div className='op-sow-id'>{op.quantity} гол </div></td>
          <td><div className='op-location'>{op.location} </div></td>
          <td><div className='op-location'>~ {op.average_weight} кг </div></td>
          <td><div className='op-reason'>{op.total_weight} кг </div></td>
        </PigletsRowOperation>
      break;
  }

  return component
}