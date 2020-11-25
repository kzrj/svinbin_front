import React, { Component } from 'react';
import { TourFilterForm } from './ReportsComponent';


function OtkormRows (props) {
  const { rowLabel, tourReport, wsNumber } = props
  return([
    rowLabel == `Цех ${wsNumber}` && 
      `*`, 
    rowLabel == `приход ${wsNumber}` && 
      tourReport[`week_weight_qnty_8_${wsNumber}`] >0 && tourReport[`week_weight_qnty_8_${wsNumber}`],

    rowLabel == `ремонтных ${wsNumber} в 2` && 
        tourReport[`ws${wsNumber}_remont`],
      
    rowLabel == `падеж/в.убой ${wsNumber}` && 
      (tourReport[`ws${wsNumber}_padej_quantity`] || tourReport[`ws${wsNumber}_vinuzhd_quantity`]) && 
        <span className='color-red3-light'>
          {tourReport[`ws${wsNumber}_padej_quantity`] ? tourReport[`ws${wsNumber}_padej_quantity`] : 0}
          <span className='color-black'>/</span>
          {tourReport[`ws${wsNumber}_vinuzhd_quantity`] ? tourReport[`ws${wsNumber}_vinuzhd_quantity`] : 0}
        </span>,

    rowLabel == `падеж/в.убой % ${wsNumber}` && 
      (tourReport[`ws${wsNumber}_padej_percentage`] > 0 || tourReport[`ws${wsNumber}_vinuzhd_percentage`] > 0) && 
        <span className='color-red3-light'>
          {tourReport[`ws${wsNumber}_padej_percentage`] ? tourReport[`ws${wsNumber}_padej_percentage`].toFixed(2) : 0}
          <span className='color-black'>/</span>
          {tourReport[`ws${wsNumber}_vinuzhd_percentage`] ? tourReport[`ws${wsNumber}_vinuzhd_percentage`].toFixed(2) : 0}
        </span>,
    
    rowLabel == `спец. забой ${wsNumber}` && 
        tourReport[`ws${wsNumber}_spec_quantity`],

    rowLabel == `средний вес ${wsNumber}` && 
        tourReport[`ws${wsNumber}_spec_avg_weight`] ? 
          tourReport[`ws${wsNumber}_spec_avg_weight`].toFixed(2) : null,

    rowLabel == `остаток ${wsNumber}` && 
        tourReport[`ws${wsNumber}_piglets_qnty_now`] ? tourReport[`ws${wsNumber}_piglets_qnty_now`] : null,
  ])
}

function DorosRows (props) {
  const { rowLabel, tourReport, wsNumber } = props
  const weightLabel = wsNumber === 4 ? '4_8' : 'ws8'
  return ([
    rowLabel == `Цех ${wsNumber}` && 
        `*`,

    (rowLabel == `падеж/прирез ${wsNumber}` )&& 
      (tourReport[`ws${wsNumber}_padej_quantity`] > 0 || tourReport[`ws${wsNumber}_prirezka_quantity`] > 0) && 
      <span className='color-red3-light'>
        {tourReport[`ws${wsNumber}_padej_quantity`] ? tourReport[`ws${wsNumber}_padej_quantity`] : 0}
        <span className='color-black'>/</span>
        {tourReport[`ws${wsNumber}_prirezka_quantity`] ? tourReport[`ws${wsNumber}_prirezka_quantity`] : 0}
      </span>,

    rowLabel == `падеж/прирез % ${wsNumber}` && 
      (tourReport[`ws${wsNumber}_padej_percentage`] > 0 || tourReport[`ws${wsNumber}_prirezka_percentage`] > 0) &&
        <span className='color-red3-light'>
          {tourReport[`ws${wsNumber}_padej_percentage`] ? tourReport[`ws${wsNumber}_padej_percentage`].toFixed(2) : 0 }
          <span className='color-black'>/</span>
          {tourReport[`ws${wsNumber}_prirezka_percentage`] ? tourReport[`ws${wsNumber}_prirezka_percentage`].toFixed(2) : 0 }
        </span>,

    rowLabel == `падеж/прирез/в.убой ${wsNumber}` && 
      (tourReport[`ws${wsNumber}_padej_quantity`] > 0  || tourReport[`ws${wsNumber}_prirezka_quantity`]> 0 ||
        tourReport[`ws${wsNumber}_vinuzhd_quantity`]) &&
        <span className='color-red3-light'>
          {tourReport[`ws${wsNumber}_padej_quantity`] ? tourReport[`ws${wsNumber}_padej_quantity`] : 0}
          <span className='color-black-light'>/</span>
          {tourReport[`ws${wsNumber}_prirezka_quantity`] ? tourReport[`ws${wsNumber}_prirezka_quantity`] : 0}
          <span className='color-black'>/</span>
          {tourReport[`ws${wsNumber}_vinuzhd_quantity`] ? tourReport[`ws${wsNumber}_vinuzhd_quantity`] :0}
        </span>,

    rowLabel == `падеж/прирез/в.убой % ${wsNumber}` && 
    (tourReport[`ws${wsNumber}_padej_percentage`] > 0 || tourReport[`ws${wsNumber}_prirezka_percentage`] > 0 ||
      tourReport[`ws${wsNumber}_vinuzhd_percentage`] > 0) &&
      <span className='color-red3-light'>
        {tourReport[`ws${wsNumber}_padej_percentage`] ? tourReport[`ws${wsNumber}_padej_percentage`].toFixed(2) : 0}
        <span className='color-black'>/</span>
        {tourReport[`ws${wsNumber}_prirezka_percentage`] ? tourReport[`ws${wsNumber}_prirezka_percentage`].toFixed(2) : 0}
        <span className='color-black'>/</span>
        {tourReport[`ws${wsNumber}_vinuzhd_percentage`] ? tourReport[`ws${wsNumber}_vinuzhd_percentage`].toFixed(2) :0}
      </span>,

    rowLabel == `ремонтных ${wsNumber}` && 
      tourReport[`ws${wsNumber}_gilts_qnty_now`],
      
    rowLabel == `отнятых ${wsNumber}` && 
      tourReport[`week_weight_qnty_${weightLabel}`] >0 && tourReport[`week_weight_qnty_${weightLabel}`],

    rowLabel == `средний вес ${wsNumber}` && 
        tourReport[`week_weight_avg_${weightLabel}`] ? 
          tourReport[`week_weight_avg_${weightLabel}`].toFixed(2) : null,
  ])
}

function OtkormSummary (props) {
  const { rowLabel, tourReport } = props
  let padej_qnty = 0
  let padej_percentage = 0.00

  let vinuzhd_qnty = 0
  let vinuzhd_percentage = 0.00

  let spec_qnty = 0
  let spec_denom = 0
  let spec_avg = 0.00

  rowLabel == `откорм общий падеж/в.убой` && 
    [5, 6, 7].map(wsNumber => {
      if (tourReport[`ws${wsNumber}_padej_quantity`] > 0) 
        padej_qnty = padej_qnty +  parseInt(tourReport[`ws${wsNumber}_padej_quantity`])
      if (tourReport[`ws${wsNumber}_vinuzhd_quantity`] > 0) 
        vinuzhd_qnty = vinuzhd_qnty +  parseInt(tourReport[`ws${wsNumber}_vinuzhd_quantity`])
      })
  
  rowLabel == `откорм общий падеж/в.убой %` && 
    [5, 6, 7].map(wsNumber => {
      if (tourReport[`ws${wsNumber}_padej_percentage`] > 0) 
        padej_percentage = padej_percentage +  parseFloat(tourReport[`ws${wsNumber}_padej_percentage`])
      if (tourReport[`ws${wsNumber}_vinuzhd_percentage`] > 0) 
        vinuzhd_percentage = vinuzhd_percentage +  parseFloat(tourReport[`ws${wsNumber}_vinuzhd_percentage`])
    })

  rowLabel == `откорм общий спец. забой` && 
    [5, 6, 7].map(wsNumber => {
      if (tourReport[`ws${wsNumber}_spec_quantity`] > 0) 
        spec_qnty = spec_qnty +  parseFloat(tourReport[`ws${wsNumber}_spec_quantity`])
    })

  if (rowLabel == `откорм общий средний вес`) { 
    [5, 6, 7].map(wsNumber => {
      if (tourReport[`ws${wsNumber}_spec_avg_weight`] > 0){ 
        spec_avg = spec_avg +  parseFloat(tourReport[`ws${wsNumber}_spec_avg_weight`])
        spec_denom = spec_denom + 1
      }
    })
    spec_denom = spec_denom > 0 ? spec_denom : 1
    spec_avg = spec_avg / spec_denom
  }
  
  return ([
    rowLabel == `Откормочные цеха` && `*`,
    rowLabel == `откорм общий приход` && 
      tourReport[`week_weight_qnty_ws8`] > 0 && tourReport[`week_weight_qnty_ws8`],
    rowLabel == `откорм общий падеж/в.убой` && (padej_qnty > 0 || vinuzhd_qnty > 0) &&
      <span className='color-red3-light'>
        {padej_qnty}<span className='color-black'>/</span>{vinuzhd_qnty}
      </span>,
    rowLabel == `откорм общий падеж/в.убой %` && (padej_percentage > 0 || vinuzhd_percentage > 0) &&
      <span className='color-red3-light'>
        {padej_percentage.toFixed(2)}<span className='color-black'>/</span>
        {vinuzhd_percentage.toFixed(2)}
      </span>,

    rowLabel == `откорм общий спец. забой` && spec_qnty > 0 && spec_qnty,
    rowLabel == `откорм общий средний вес` && spec_avg > 0 && spec_avg.toFixed(2),
    rowLabel == `откорм общий ремонтных отправлено` && 
      tourReport[`count_remont_total`],
  ])
}

class ToursReportsComponent extends Component {
  constructor(props) {
    super(props);  
    this.state = {
      otkormExpand: false,
    }
    this.clickFilter = this.clickFilter.bind(this);
	}

  componentDidMount() {
    this.props.getTourReports({last_n: 100})
  }

  clickFilter () {
    this.props.getTourReports(this.props.form.values)
  }

  render() {
    const { tourReportslist } = this.props.reports
    const { tours, toursFormSetID } = this.props
    const { otkormExpand } = this.state

    const rows = tourReportslist.length > 0 ? Object.keys(tourReportslist[0]) : null

    const reportRows = [
      'Тур неделя', 
      'осеменненых', 
      'УЗИ 28 суп/прох', 
      'УЗИ 35 суп/прох', 
      'Аборт',
      'опоросившихся',
      '% опоросившихся',
      'Цех 3',
      'живорожденных',
      'мертворожденных',
      'муммий',
      'ремонтных',
      'падеж/прирез 3',
      'падеж/прирез % 3',
      'отнятых 3',
      'средний вес 3',
      'Цех 4',
      'падеж/прирез 4',
      'падеж/прирез % 4',
      // 'ремонтных 4',
      'отнятых 4',
      'средний вес 4',
      'Цех 8',
      'падеж/прирез/в.убой 8',
      'падеж/прирез/в.убой % 8',
      // 'ремонтных 8',
      'отнятых 8',
      'средний вес 8',
      'Откормочные цеха',
      'откорм общий приход',
      'откорм общий падеж/в.убой',
      'откорм общий падеж/в.убой %',
      'откорм общий ремонтных отправлено',
      'откорм общий спец. забой',
      'откорм общий средний вес',
       otkormExpand && 'Цех 5',
       otkormExpand && 'приход 5',
       otkormExpand && 'падеж/в.убой 5',
       otkormExpand && 'падеж/в.убой % 5',
       otkormExpand && 'ремонтных 5 в 2',
       otkormExpand && 'спец. забой 5',
       otkormExpand && 'средний вес 5',
      //  otkormExpand && 'остаток 5',
       otkormExpand && 'Цех 6',
       otkormExpand && 'приход 6',
       otkormExpand && 'падеж/в.убой 6',
       otkormExpand && 'падеж/в.убой % 6',
      //  otkormExpand && 'ремонтных 6',
       otkormExpand && 'ремонтных 6 в 2',
       otkormExpand && 'спец. забой 6',
       otkormExpand && 'средний вес 6',
      //  otkormExpand && 'остаток 6',
       otkormExpand && 'Цех 7',
       otkormExpand && 'приход 7',
       otkormExpand && 'падеж/в.убой 7',
       otkormExpand && 'падеж/в.убой % 7',
      //  otkormExpand && 'ремонтных 7',
       otkormExpand && 'ремонтных 7 в 2',
       otkormExpand && 'спец. забой 7',
       otkormExpand && 'средний вес 7',
      //  otkormExpand && 'остаток 7'
    ]

    const cellClass = 'font-16 align-middle text-center text-wrap'
    const cellTitleClass = 'bg-magenta2-light text-wrap px-2 '

    return (
      <div className="container-fluid">
        <div className='card'>
          <div className='content'>
            <h3>Отчет по неделям</h3>
            <TourFilterForm parentSubmit={this.clickFilter} tours={tours} toursFormSetID={toursFormSetID}/>
          </div>
        </div>
        <div className='table-responsive ' >
          <table className='table table-sm' style={{'line-height': '13px'}} >
            <tbody>
              {reportRows && reportRows.map(rowLabel => rowLabel &&
                <tr>
                  <td className={cellTitleClass} style={{'width': '20px'}}>
                    {rowLabel}
                    {rowLabel === 'Откормочные цеха' && 
                        <button 
                          // className='btn btn-s'
                          onClick={() => this.setState({...this.state, otkormExpand: !this.state.otkormExpand})}>
                            {this.state.otkormExpand ? 'Скрыть' : 'Показать цеха'}
                        </button>
                      }
                  </td>
                  {tourReportslist.map(tourReport =>
                    <td className={
                      (rowLabel == 'Тур неделя'  || rowLabel == 'Цех 3' || rowLabel == 'Цех 4' || 
                        rowLabel == 'Цех 8' || rowLabel == 'Цех 5' || rowLabel == 'Цех 6'
                        || rowLabel == 'Цех 7' || rowLabel == 'Откормочные цеха')
                        ? 'bg-magenta2-light align-middle text-center' 
                        : cellClass}>
                      {rowLabel == 'Тур неделя' && 
                        'W ' + tourReport['week_number'] + ' ' + tourReport['year'] 
                      }

                      {rowLabel == 'осеменненых' && 
                          tourReport['count_seminated']
                        }

                      {rowLabel == 'УЗИ 28 суп/прох' && 
                        tourReport['count_usound28_proholost'] | tourReport['count_usound28_suporos'] &&
                          <div>
                            <span className='color-green3-light'>
                              {tourReport['count_usound28_suporos'] ? tourReport['count_usound28_suporos'] : 0}
                            </span>
                            /
                            <span className='color-red3-light'>
                              {tourReport['count_usound28_proholost'] ? tourReport['count_usound28_proholost'] : 0}
                            </span>
                          </div>
                        }

                      {rowLabel == 'УЗИ 35 суп/прох' && 
                        tourReport['count_usound35_proholost'] | tourReport['count_usound35_suporos'] &&
                          <div>
                            <span className='color-green3-dark'>
                              {tourReport['count_usound35_suporos'] ? tourReport['count_usound35_suporos'] : 0}
                            </span>
                            /
                            <span className='color-red3-light'>
                              {tourReport['count_usound35_proholost'] ? tourReport['count_usound35_proholost'] : 0}
                            </span>
                          </div>
                        }

                      {rowLabel == 'Аборт' && 
                        <span className='color-red3-light'>{tourReport['count_abort']}</span>
                      }

                      {rowLabel == 'опоросившихся' && 
                        tourReport['count_farrows'] > 0 && tourReport['count_farrows']
                      }

                      {rowLabel == '% опоросившихся' && 
                        tourReport['farrow_percentage'] > 0 && tourReport['farrow_percentage'] + '%'
                      }

                      {rowLabel == 'Цех 3' && 
                          '*'}

                      {rowLabel == 'живорожденных' && 
                        tourReport['total_born_alive']
                      }

                      {rowLabel == 'мертворожденных' && 
                        <span className='color-red3-light'>{tourReport['total_born_dead']}</span>
                      }

                      {rowLabel == 'муммий' && 
                        tourReport['total_born_mummy']
                      }

                      {rowLabel == 'ремонтных' && 
                        tourReport['gilt_count']
                      }

                      {rowLabel == 'падеж/прирез 3' && 
                        (tourReport['ws3_padej_quantity'] || tourReport['ws3_prirezka_quantity']) &&
                          <span className='color-red3-light'>
                            {tourReport['ws3_padej_quantity'] ? tourReport['ws3_padej_quantity'] : 0 }
                            <span className='color-black'>/</span>
                            {tourReport['ws3_prirezka_quantity'] ? tourReport['ws3_prirezka_quantity'] : 0 }
                          </span>
                      }

                      {rowLabel == 'падеж/прирез % 3' && 
                        (tourReport['ws3_padej_quantity'] || tourReport['ws3_prirezka_quantity']) &&
                          <span className='color-red3-light'>
                            {tourReport['ws3_padej_percentage'] ? tourReport['ws3_padej_percentage'].toFixed(2) : 0 }
                            <span className='color-black'>/</span>
                            {tourReport['ws3_prirezka_percentage'] ? tourReport['ws3_prirezka_percentage'].toFixed(2) : 0 }
                          </span>
                      }

                      {rowLabel == 'отнятых 3' && 
                        tourReport['week_weight_qnty_3_4'] > 0  && tourReport['week_weight_qnty_3_4'] 
                      }
                      {rowLabel == 'средний вес 3' && 
                          tourReport['week_weight_avg_3_4'] ? 
                            tourReport['week_weight_avg_3_4'].toFixed(2) : null
                      }

                      <DorosRows rowLabel={rowLabel} tourReport={tourReport} wsNumber={4}/>

                      <DorosRows rowLabel={rowLabel} tourReport={tourReport} wsNumber={8}/>

                      <OtkormSummary rowLabel={rowLabel} tourReport={tourReport} />

                      {this.state.otkormExpand && [
                        <OtkormRows rowLabel={rowLabel} tourReport={tourReport} wsNumber={5} />,
                        <OtkormRows rowLabel={rowLabel} tourReport={tourReport} wsNumber={6} />,
                        <OtkormRows rowLabel={rowLabel} tourReport={tourReport} wsNumber={7} />,
                        ]
                      }

                    </td>
                    )}
                </tr>
              )}
              </tbody>
          </table>
        </div>
      </div>
    );
  }
}


export default ToursReportsComponent