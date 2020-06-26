import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
    changeOperationsInputs: ['data'],
})

export const InputsTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
    operationsInputs: {
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
        ws3_piglets_prirezka:  {active: false, ws: '3p', type: 'piglets', label: 'Прирезка поросят'},
        ws3_piglets_vinuzhd:   {active: false, ws: '3p', type: 'piglets', label: 'Вынужд. убой'},
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
        ws8_piglets_prirezka:  {active: false, ws: '8', type: 'piglets', label: 'Прирезка поросят'},
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
})

/* ------------- Selectors ------------- */

export const InputsSelectors = {
    getTourInputs: state => state.operationsInputs,
}

/* ------------- Reducers ------------- */

export const changeOperationsInputs = (state, { data }) => {
    return state.merge({ operationsInputs: {
        ...state.operationsInputs,
        [data['operName']]: {
            ...state.operationsInputs[data['operName']],
            active: data['value']
        }
    }
 })
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
    [Types.CHANGE_OPERATIONS_INPUTS]: changeOperationsInputs,
})
