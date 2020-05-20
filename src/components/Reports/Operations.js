import React, { Component } from 'react';


let operations = {
  ws1_semination:        {active: false, ws: 1, type: 'sow', label: 'Осеменение'},
  ws1_usound:            {active: false, ws: 1, type: 'sow', label: 'УЗИ'},
  ws1_abort:             {active: false, ws: 1, type: 'sow', label: 'Аборт'},
  ws1_culling:           {active: false, ws: 1, type: 'sow', label: 'Падеж'},
  w1_peregon_sow:        {active: false, ws: 1, type: 'sow', label: 'Перегон'},

  ws2_usound:            {active: false, ws: 2, type: 'sow', label: 'УЗИ'},
  ws2_abort:             {active: false, ws: 2, type: 'sow', label: 'Аборт'},
  ws2_culling:           {active: false, ws: 2, type: 'sow', label: 'Падеж'},
  w2_peregon_sow:        {active: false, ws: 2, type: 'sow', label: 'Перегон'},

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

const WsOpInputs2 = (props) =>
  <div className={'div-op-input col-'+ props.col} key={props.key}>
    {Object.keys(props.operations).map(op_key => 
      props.operations[op_key]['ws'] == props.ws_number && props.operations[op_key]['type'] == props.type &&
      <div key={op_key}>
        <td className='op-label-td'>
          <label>{props.operations[op_key]['label']} {' '}</label>
        </td>
        <td>
          <input
            type='checkbox'
            name={op_key}
            onChange={props.clickOperation}
            checked={props.operations[op_key]['active']}
          />
        </td>
      </div>
    )}
  </div>


class Operations extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: null,
      endDate: null,
      farmId: null,
      operations: operations, 

      needToRefresh: false
    }
    this.setData = this.setData.bind(this);
    this.clickOperation = this.clickOperation.bind(this);
	}

  // componentDidMount() {
  //   this.setState({
  //     ...this.state,
  //   })
  // }

  setData (e) {
    this.setState({
      ...this.state,
      [e.target.name]: e.target.value
    })
  }

  clickOperation (e) {
    let operations = this.state.operations
    operations[e.target.name]['active'] = !operations[e.target.name]['active']
    console.log(operations)
    this.setState({
      ...this.state,
      operations: operations
    })
  }

  getOperations (){
    let operations = {}
    Object.keys(this.state.operations).map(op_key =>
      operations[op_key] = this.state.operations[op_key]['active']
      )

    let data = {
      filters: {
        start_date: this.state.startDate,
        end_date: this.state.endDate,
        farm_id: this.state.farmId,
      },
      operations: operations
    }

    console.log(data)
  }

  render() {
    const operations = this.state.operations

    return (
      <div className="container-fluid report-block">
        <h3>Операции</h3>
        <div className='row'>
          <div className='col-6'>
            <div className="form-group row">
              <div className='col-6'>
                <label>Дата с</label>
                <input type='date'
                  id='startDate'
                  className="form-control search-input"
                  value={this.state.startDate}
                  name='startDate'
                  placeholder="Дата опороса"
                  onChange={this.setData}
                  />
              </div>
              <div className='col-6'>
                <label>Дата до</label>
                <input type='date'
                  id='endDate'
                  className="form-control search-input"
                  value={this.state.endDate}
                  name='endDate'
                  placeholder="Дата опороса"
                  onChange={this.setData}
                  />
              </div>
            </div>
          </div>
          <div className="col-6 form-group">
              <label>FARM ID: </label>
              <input type='number' name='farmId'
                className="form-control"
                value={this.state.farmId} onChange={this.setData}/>
            </div>
        </div>
        <div className='row'>
          <div className='col-3 row'>
            <div className='col-6'>
              <p>Цех 1</p>
              <WsOpInputs2 operations={operations} ws_number={1} clickOperation={this.clickOperation} 
                    type={'sow'} col={12} key={'1s'}/>
            </div>

            <div className='col-6'>
              <p>Цех 2</p>
              <WsOpInputs2 operations={operations} ws_number={2} clickOperation={this.clickOperation} 
                    type={'sow'} col={12} key={'2s'}/>
            </div>
          </div>

          <div className='col-3'>
              <p>Цех 3</p>
              <div className='row'>
                <WsOpInputs2 operations={operations} ws_number={3} clickOperation={this.clickOperation} 
                    type={'sow'} col={6} key={'3s'}/>
                <WsOpInputs2 operations={operations} ws_number={3} clickOperation={this.clickOperation} 
                    type={'piglets'} col={6} key={'3p'}/>  
              </div>
          </div>

          <div className='col-3 row'>
            <div className='col-6'>
              <p>Цех 4</p>
              <WsOpInputs2 operations={operations} ws_number={4} clickOperation={this.clickOperation} 
                    type={'piglets'} col={12} key={'4p'}/>
            </div>

            <div className='col-6'>
              <p>Цех 8</p>
              <WsOpInputs2 operations={operations} ws_number={8} clickOperation={this.clickOperation} 
                    type={'piglets'} col={12} key={'8p'}/>
            </div>
          </div>

          <div className='col-3 row'>
            <div className='col-4'>
              <p>Цех 5</p>
              <WsOpInputs2 operations={operations} ws_number={5} clickOperation={this.clickOperation} 
                    type={'piglets'} col={12} key={'5p'}/>
            </div>

            <div className='col-4'>
              <p>Цех 6</p>
              <WsOpInputs2 operations={operations} ws_number={6} clickOperation={this.clickOperation} 
                    type={'piglets'} col={12} key={'6p'}/>
            </div>

            <div className='col-4'>
              <p>Цех 7</p>
              <WsOpInputs2 operations={operations} ws_number={7} clickOperation={this.clickOperation} 
                    type={'piglets'} col={12} key={'7p'}/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}


export default Operations