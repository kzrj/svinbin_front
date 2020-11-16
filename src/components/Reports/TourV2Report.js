import React, { Component } from 'react';

export const getDate = () => {
  let today = new Date();
  let dd = String(today.getDate()).padStart(2, '0');
  let mm = String(today.getMonth() + 1).padStart(2, '0');
  let yyyy = today.getFullYear();

  today = yyyy + '-' + mm + '-' + dd;
  let month_ago = (mm - 1) > 0 ? (mm-1).toString() : (12).toString();
  month_ago = month_ago < 10 ? '0' + month_ago : month_ago
  let month_ago_day = yyyy + '-' + month_ago + '-' + dd;
  return {date_after: month_ago_day, date_before: today}
}

const thClass = 'font-12 heigth-25 px-1 py-1 color-mainDark-dark'
const tableClass = 'font-17 mr-0 text-center table table-responsive table-sm color-mainGrey-dark'

function TheadList (){
  return (
    <thead>
      <th className={thClass}>дата</th>
      <th className={thClass}>кол-во</th>
      <th className={thClass}>возраст</th>
      <th className={thClass}>ср.вес</th>
      <th className={thClass}>общий.вес</th>
    </thead>
  )
}

function TheadTotal (props) {
  const { oOrs } = props
  return (
    <thead>
      <th className={thClass}>кол-во при приемке</th>
      <th className={thClass}>прием ср. возраст</th>
      <th className={thClass}>прием ср.вес</th>
      <th className={thClass}>прием общий.вес</th>

      <th className={thClass}>{oOrs} кол-во</th>
      <th className={thClass}>{oOrs} ср. возраст</th>
      <th className={thClass}>{oOrs} ср.вес</th>
      <th className={thClass}>{oOrs} общий.вес</th>

      <th className={thClass}>ср. кормодней</th>
      <th className={thClass}>ср.привес</th>
    </thead>
  )
}

function TbodyTotal (props) {
  const { priemTotal, otgruzTotal } = props
  let total_avg_age = otgruzTotal['total_avg_age'] - priemTotal['total_avg_age']
  if (total_avg_age) total_avg_age = total_avg_age.toFixed(2)
  let total_avg = otgruzTotal['total_avg'] - priemTotal['total_avg']
  if (total_avg) total_avg = total_avg.toFixed(2)
  return (
    <tbody>
      <td>{priemTotal['total_quantity']}</td>
      <td>{priemTotal['total_avg_age']}</td>
      <td>{priemTotal['total_avg']}</td>
      <td>{priemTotal['total_total_weight']}</td>

      <td>{otgruzTotal['total_quantity']}</td>
      <td>{otgruzTotal['total_avg_age']}</td>
      <td>{otgruzTotal['total_avg']}</td>
      <td>{otgruzTotal['total_total_weight']}</td>

      <td>{total_avg_age}</td>
      <td>{total_avg}</td>
    </tbody>
  )
} 

function WeightTable(props) {
  const { list, total } = props
  return (
    <table className={tableClass}>
      <TheadList />
      <tbody>
        {list.map(wRecord => 
          <tr>
            <td className={props.checkDate(wRecord['date'])}>{wRecord['date']}</td>
            <td>{wRecord['piglets_quantity']}</td>
            <td>{wRecord['piglets_age']}</td>
            <td>{wRecord['average_weight']}</td>
            <td>{wRecord['total_weight']}</td>
          </tr>
        )}
        <tr>
          <td></td>
          <td>{total['total_quantity']}</td>
          <td>{total['total_avg_age']}</td>
          <td>{total['total_avg']}</td>
          <td>{total['total_total_weight']}</td>
        </tr>
      </tbody>
    </table>
  )
}

function WeightTotalWs4(props) {
  const { priemTotal, otgruzTotal } = props

  let total_avg_age = otgruzTotal['total_avg_age'] - priemTotal['total_avg_age']
  if (total_avg_age) total_avg_age = total_avg_age.toFixed(2)
  let total_avg = otgruzTotal['total_avg'] - priemTotal['total_avg']
  if (total_avg) total_avg = total_avg.toFixed(2)
  return (
    <table className={tableClass}>
      <TheadTotal oOrs={'отгрузка'}/>
      <tbody>
        <tr>
          <td>{priemTotal['total_quantity']}</td>
          <td>{priemTotal['total_avg_age']}</td>
          <td>{priemTotal['total_avg']}</td>
          <td>{priemTotal['total_total_weight']}</td>

          <td>{otgruzTotal['total_quantity']}</td>
          <td>{otgruzTotal['total_avg_age']}</td>
          <td>{otgruzTotal['total_avg']}</td>
          <td>{otgruzTotal['total_total_weight']}</td>

          <td>{total_avg_age}</td>
          <td>{total_avg}</td>
        </tr>
      </tbody>
    </table>
  )
}

function WeightTotalWs8(props) {
  const { priemTotal, otgruzData } = props
  let otgruzTotal = {
    'total_quantity': 0, 
    'total_avg_age': 0,
    'total_avg': 0,
    'total_total_weight': 0,
  }

  let lenCount = 0
  for (const key in otgruzData) {
    if (otgruzData[key]['list'] && otgruzData[key]['list'].length > 0 
        && (key == '8/5' || key == '8/6' || key == '8/7')){
      lenCount += 1
      otgruzTotal['total_quantity'] += otgruzData[key]['total']['total_quantity']
      otgruzTotal['total_total_weight'] += otgruzData[key]['total']['total_total_weight']
      otgruzTotal['total_avg_age'] += otgruzData[key]['total']['total_avg_age']
      otgruzTotal['total_avg'] += otgruzData[key]['total']['total_avg']
    }
  }
  otgruzTotal['total_avg'] = (otgruzTotal['total_avg'] / lenCount).toFixed(2)
  otgruzTotal['total_avg_age'] = (otgruzTotal['total_avg_age'] / lenCount).toFixed(2)
  otgruzTotal['total_total_weight'] = (otgruzTotal['total_total_weight'] / lenCount).toFixed(2)
  
  return (
    <table className={tableClass}>
      <TheadTotal oOrs={'отгрузка'}/>
      <TbodyTotal priemTotal={priemTotal} otgruzTotal={otgruzTotal}/>
    </table>
  )
}

function SpecUboiTable(props){
  return (
    <table className={tableClass}>
      <TheadList />
      <tbody>
        {props.cullings.map(cull => 
          <tr>
            <td className={props.checkDate(cull.date)}>{cull.date}</td>
            <td>{cull.quantity}</td>
            <td>{cull.piglets_age}</td>
            <td>{cull.average_weight}</td>
            <td>{cull.total_weight}</td>
          </tr>
        )}
        <tr>
          <td></td>
          <td>{props.cullTotal['total_quantity']}</td>
          <td>{props.cullTotal['total_avg_age']}</td>
          <td>{props.cullTotal['total_avg']}</td>
          <td>{props.cullTotal['total_total_weight']}</td>
        </tr>
      </tbody>
    </table>
  )
}


function SpecUboiTotal (props) {
  const {priemTotal, cullTotal } = props
  return (
    <table className={tableClass}>
      <TheadTotal oOrs={'спец. убой'}/>
      <TbodyTotal priemTotal={priemTotal} otgruzTotal={cullTotal}/>
    </table>
  )
}

class ToursV2ReportComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      has_weights_in_range_after: null,
      has_weights_in_range_before: null,
      has_weights: true,
      activeTour: null,
    }
    this.setData = this.setData.bind(this);
    this.clickTour = this.clickTour.bind(this);
    this.showTours = this.showTours.bind(this);
    this.checkDate = this.checkDate.bind(this);
    this.getDate = getDate.bind(this);
	}

  componentDidMount() {
    // this.props.getToursV2Report({has_weights: true})
    const { date_before, date_after } = this.getDate()
    this.setState({
      ...this.state,
      has_weights_in_range_after: date_after,
      has_weights_in_range_before: date_before,
    })
    this.props.getToursV2Report({
      has_weights: true,
      has_weights_in_range_after: date_after,
      has_weights_in_range_before: date_before,
    })
  }

  setData (e) {
    this.setState({
      ...this.state,
      [e.target.name]: e.target.value
    })
  }

  clickTour (id) {
    this.setState({
      ...this.state,
      activeTour: id
    })
    this.props.getTourV2Report(id)
  }

  showTours () {
    this.props.getToursV2Report(this.state)
  }

  checkDate (targetDate) {
    let className = 'my-0'
    let td = targetDate.split('-')
    if (td[0].length < 3)
      targetDate = td[2] + '-' + td[1] + '-' + td[0]

    if (this.state.has_weights_in_range_before >= targetDate && targetDate >= this.state.has_weights_in_range_after)
      className = 'my-0 color-magenta2-light font-700'
    
    return className
  }

  render() {
    const { tours, tourData, reportsFetching } = this.props
    let classTour = 'card card-style mx-1 my-1 font-11 rounded-xs'

    
    return (
      <div className="mx-1">
        <h3>Отчет по турам(взвешивания)</h3>
        <div className='card card-style mx-0'>
          <div className='content'>
            <p className='my-0'>Взвешивания в периоде:</p>
            <input type='date' 
              name='has_weights_in_range_after'
              value={this.state.has_weights_in_range_after}
              onChange={this.setData}
              />
            <input type='date' 
              name='has_weights_in_range_before'
              value={this.state.has_weights_in_range_before} 
              onChange={this.setData}/>
            <button onClick={this.showTours}>Показать туры</button>
          </div>
        </div>
        <div className='row mx-1' style={{'line-height': '12px'}}>
          {tours && tours.length > 0 
            ? tours.map(tour => 
                <div key={tour.id} onClick={() => this.clickTour(tour.id)}
                    className={(tour.id === this.state.activeTour) 
                      ? 'card card-style mx-1 my-1 font-11 rounded-xs bg-brown1-light'
                      : 'card card-style mx-1 my-1 font-11 rounded-xs'
                     }>
                  <div className='content mx-2 my-2'>
                    <p className='my-0'>Тур {tour.week_number} {tour.year} </p>
                    <p className='my-0'>Взвешивания</p>
                    {tour.first_date_3_4 && 
                      <p className={this.checkDate(tour.first_date_3_4)}>
                          из 3 в 4 {tour.first_date_3_4}
                      </p>}
                    {tour.first_date_4_8 && 
                      <p className={this.checkDate(tour.first_date_4_8)}>
                        из 4 в 8 {tour.first_date_4_8}
                      </p> }
                    {tour.first_date_8_5 && 
                      <p className={this.checkDate(tour.first_date_8_5)}>
                        из 8 в 5 {tour.first_date_8_5}
                      </p> }
                    {tour.first_date_8_6 && 
                      <p className={this.checkDate(tour.first_date_8_6)}>
                        из 8 в 6 {tour.first_date_8_6}
                        </p> }
                    {tour.first_date_8_7 && 
                      <p className={this.checkDate(tour.first_date_8_7)}>
                        из 8 в 7 {tour.first_date_8_7}
                        </p> }
                    {tour.first_date_spec && 
                      <p className={this.checkDate(tour.first_date_spec)}>
                        с. убой {tour.first_date_spec}
                        </p> }
                  </div>
                </div>
              )
            : 'Нет результатов'
          }
        </div>
          {tourData &&
            <div style={{'line-height': '15px'}} className='mx-0'>
              {tourData['3/4'] && tourData['3/4']['list'].length > 0 &&
                <div className='card card-style mx-0'>
                  <div className='content'>
                    <span className='font-900'>
                      3 цех. 
                      Тур {tourData['tour']['week_number']} {tourData['tour']['year']}
                    </span>
                    <div className='row'>
                      <div className='col-6'>
                        Родилось
                        {tourData['farrow_data']['total_alive'] && 
                          <p className='my-0'>живых {tourData['farrow_data']['total_alive']}</p>
                        }
                        {tourData['farrow_data']['total_dead'] && 
                          <p className='my-0'>мертвых {tourData['farrow_data']['total_dead']}</p>
                        }
                        {tourData['farrow_data']['total_mummy'] && 
                          <p className='my-0'>муммий {tourData['farrow_data']['total_mummy']}</p>
                        }
                      </div>
                      <div className='col-6'>
                        Отгрузка
                        <WeightTable list={tourData['3/4']['list']} 
                          checkDate={this.checkDate}
                          total={tourData['3/4']['total']}/>
                      </div>
                    </div>
                    <table className={tableClass + ' table table-responsive table-sm'}>
                      <thead>
                        <th className={thClass}>родилось</th>
                        <th className={thClass}>отгрузка гол</th>
                        <th className={thClass}>ср. возраст</th>
                        <th className={thClass}>ср.вес</th>
                        <th className={thClass}>общий.вес</th>
                        <th className={thClass}>ср.привес</th>
                      </thead>
                      <tbody>
                        <tr>
                          <td>
                            {tourData['farrow_data']['total_alive'] && 
                                tourData['farrow_data']['total_alive']}
                          </td>
                          <td>{tourData['3/4']['total']['total_quantity']}</td>
                          <td>{tourData['3/4']['total']['total_avg_age']}</td>
                          <td>{tourData['3/4']['total']['total_avg']}</td>
                          <td>{tourData['3/4']['total']['total_total_weight']}</td>
                          <td>{tourData['3/4']['total']['total_avg']}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              }
              {(tourData['4/8'] || tourData['3/4']) && 
                (tourData['3/4']['list'].length > 0 || tourData['4/8']['list'].length > 0) &&
                <div className='card card-style mx-0'>
                  <div className='content'>
                    <span className='font-900'>
                      4 цех. 
                      Тур {tourData['tour']['week_number']} {tourData['tour']['year']}
                    </span>
                    <div className='row'>
                      <div className='col-6'>
                        Приём
                        <WeightTable list={tourData['3/4']['list']} total={tourData['3/4']['total']} 
                          checkDate={this.checkDate}/>
                      </div>
                      <div className='col-6'>
                        Отгрузка
                        <WeightTable list={tourData['4/8']['list']} total={tourData['4/8']['total']}
                          checkDate={this.checkDate}/>
                      </div>
                    </div>
                    <WeightTotalWs4 priemTotal={tourData['3/4']['total']} otgruzTotal={tourData['4/8']['total']}/>
                  </div>
                </div>
              }
              {(tourData['8/5'] || tourData['8/6'] || tourData['8/7'] || tourData['4/8']) &&
                (tourData['8/5']['list'].length > 0 || tourData['8/6']['list'].length > 0 || 
                  tourData['8/7']['list'].length > 0 || tourData['4/8']['list'].length > 0) &&
                <div className='card card-style mx-0'>
                  <div className='content'>
                    <span className='font-900'>
                      8 цех. 
                      Тур {tourData['tour']['week_number']} {tourData['tour']['year']}
                    </span>
                    <div className='row'>
                      <div className='col-6'>
                        Приём
                        <WeightTable list={tourData['4/8']['list']} total={tourData['4/8']['total']}
                          checkDate={this.checkDate}/>
                      </div>
                      <div className='col-6'>
                        {tourData['8/5']['list'].length > 0 && ['Отгрузка в 5', 
                          <WeightTable list={tourData['8/5']['list']} total={tourData['8/5']['total']}
                           checkDate={this.checkDate}/>]}
                        {tourData['8/6']['list'].length > 0 && ['Отгрузка в 6', 
                          <WeightTable list={tourData['8/6']['list']} total={tourData['8/6']['total']}
                            checkDate={this.checkDate}/>]}
                        {tourData['8/7']['list'].length > 0 && ['Отгрузка в 7', 
                          <WeightTable list={tourData['8/7']['list']} total={tourData['8/7']['total']}
                            checkDate={this.checkDate}/>]}
                      </div>
                    </div>
                    <WeightTotalWs8 priemTotal={tourData['4/8']['total']} otgruzData={tourData} />
                  </div>
                </div>
              }
              {tourData['8/5']['list'].length > 0 &&
                <div className='card card-style mx-0'>
                  <div className='content'>
                    <span className='font-900'>
                      5 цех. 
                      Тур {tourData['tour']['week_number']} {tourData['tour']['year']}
                    </span>
                    <div className='row'>
                      <div className='col-6'>
                        Приём
                        <WeightTable list={tourData['8/5']['list']} total={tourData['8/5']['total']}
                          checkDate={this.checkDate}/>
                      </div>
                      <div className='col-6'>
                        Спец. убой
                        {tourData['spec_5']['list'].length > 0 && 
                          <SpecUboiTable cullings={tourData['spec_5']['list']} 
                            cullTotal={tourData['spec_5']['total']} checkDate={this.checkDate}/>
                        }
                      </div>
                    </div>
                    <SpecUboiTotal priemTotal={tourData['8/5']['total']} 
                          cullTotal={tourData['spec_5']['total']}/>
                  </div>
                </div>
              }
              {tourData['8/6']['list'].length > 0 &&
                <div className='card card-style mx-0'>
                  <div className='content'>
                    <span className='font-900'>
                      6 цех. 
                      Тур {tourData['tour']['week_number']} {tourData['tour']['year']}
                    </span>
                    <div className='row'>
                      <div className='col-6'>
                        Приём
                        <WeightTable list={tourData['8/6']['list']} total={tourData['8/6']['total']}
                          checkDate={this.checkDate}/>
                      </div>
                      <div className='col-6'>
                        Спец. убой
                        {tourData['spec_6']['list'].length > 0 && 
                          <SpecUboiTable cullings={tourData['spec_6']['list']} 
                            cullTotal={tourData['spec_6']['total']} checkDate={this.checkDate}/>
                        }
                      </div>
                    </div>
                    <SpecUboiTotal priemTotal={tourData['8/6']['total']} 
                          cullTotal={tourData['spec_6']['total']}/>
                  </div>
                </div>
              }
              {tourData['8/7']['list'].length > 0 &&
                <div className='card card-style mx-0'>
                  <div className='content'>
                    <span className='font-900'>
                      7 цех. 
                      Тур {tourData['tour']['week_number']} {tourData['tour']['year']}
                    </span>
                    <div className='row'>
                      <div className='col-6'>
                        Приём
                        <WeightTable list={tourData['8/7']['list']} total={tourData['8/7']['total']}
                          checkDate={this.checkDate}/>
                      </div>
                      <div className='col-6'>
                        Спец. убой
                        {tourData['spec_7']['list'].length > 0 && 
                          <SpecUboiTable cullings={tourData['spec_7']['list']} 
                            cullTotal={tourData['spec_7']['total']} checkDate={this.checkDate}/>
                        }
                      </div>
                    </div>
                    <SpecUboiTotal priemTotal={tourData['8/7']['total']} 
                          cullTotal={tourData['spec_7']['total']}/>
                  </div>
                </div>
              }
            </div>
          }
      </div>
    );
  }
}


export default ToursV2ReportComponent