import React, { Component } from 'react';
import { TourFilterForm } from './ReportsComponent';


class ToursReportsComponent extends Component {
  constructor(props) {
    super(props);  
    this.clickFilter = this.clickFilter.bind(this);
	}

  componentDidMount() {
    this.props.getTourReports({last_n: 10})
  }

  clickFilter () {
    this.props.getTourReports(this.props.form.values)
  }

  render() {
    const { tourReportslist } = this.props.reports
    const { tours, toursFormSetID } = this.props

    const rows = tourReportslist.length > 0 ? Object.keys(tourReportslist[0]) : null

    const reportRows = [
      'Тур неделя', 
      'осеменненых', 
      'УЗИ 28 суп/прох', 
      'УЗИ 35 суп/прох', 
      'Аборт',
      'активных в туре',
      'в цехе 1',
      'в цехе 2',
      'в цехе 3',
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
      'ремонтных 4',
      'отнятых 4',
      'средний вес 4',
      'Цех 8',
      'падеж/прирез/в.убой 8',
      'падеж/прирез/в.убой % 8',
      'ремонтных 8',
      'отнятых 8',
      'средний вес 8',
      'Цех 5',
      'приход 5',
      'падеж/в.убой 5',
      'падеж/в.убой % 5',
      ' ремонтных 5',
      'ремонтных 5 в 7/5',
      'спец. забой 5',
      'средний вес 5',
      'остаток 5',
      'Цех 6',
      'приход 6',
      'падеж/в.убой 6',
      'падеж/в.убой % 6',
      'ремонтных 6',
      'ремонтных 6 в 7/5',
      'спец. забой 6',
      'средний вес 6',
      'остаток 6',
      'Цех 7',
      'приход 7',
      'падеж/в.убой 7',
      'падеж/в.убой % 7',
      'ремонтных 7',
      'ремонтных 7 в 7/5',
      'спец. забой 7',
      'средний вес 7',
      'остаток 7'
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
              {reportRows && reportRows.map(rowLabel => 
                <tr>
                  <td className={cellTitleClass} >{rowLabel}</td>
                  {tourReportslist.map(tourReport =>
                    <td className={
                      (rowLabel == 'Тур неделя'  || rowLabel == 'Цех 3' || rowLabel == 'Цех 4' || 
                        rowLabel == 'Цех 8' || rowLabel == 'Цех 5' || rowLabel == 'Цех 6'
                        || rowLabel == 'Цех 7')
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

                      {rowLabel == 'активных в туре' && 
                        tourReport['count_sow'] >0 && tourReport['count_sow']
                      }

                      {rowLabel == 'в цехе 1' && 
                        tourReport['ws1_count_tour_sow']
                      }

                      {rowLabel == 'в цехе 2' && 
                        tourReport['ws2_count_tour_sow']
                      }
                      
                      {rowLabel == 'в цехе 3' && 
                        tourReport['ws3_count_tour_sow']
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

                      {rowLabel == 'Цех 4' && 
                          '*'
                      }
                      
                      {rowLabel == 'падеж/прирез 4' && 

                        (tourReport['ws4_padej_quantity'] || tourReport['ws4_prirezka_quantity']) && 
                        <span className='color-red3-light'>
                          {tourReport['ws4_padej_quantity'] ? tourReport['ws4_padej_quantity'] : 0}
                          <span className='color-black'>/</span>
                          {tourReport['ws4_prirezka_quantity'] ? tourReport['ws4_prirezka_quantity'] : 0}
                        </span>
                        
                        }
                      
                      {rowLabel == 'падеж/прирезка % 4' && 
                        (tourReport['ws4_padej_percentage'] || tourReport['ws4_prirezka_percentage']) &&
                          <span className='color-red3-light'>
                            {tourReport['ws4_padej_percentage'] ? tourReport['ws4_padej_percentage'].toFixed(2) : 0 }
                            <span className='color-black'>/</span>
                            {tourReport['ws4_prirezka_percentage'] ? tourReport['ws4_prirezka_percentage'].toFixed(2) : 0 }
                          </span>
                        
                      }

                      {rowLabel == 'ремонтных 4' && 
                          tourReport['ws4_gilts_qnty_now']
                      }
                        
                      {rowLabel == 'отнятых 4' && 
                        
                          tourReport['week_weight_qnty_4_8'] >0 && tourReport['week_weight_qnty_4_8']
                        }

                      {rowLabel == 'средний вес 4' && 
                        
                          tourReport['week_weight_avg_4_8'] ? 
                            tourReport['week_weight_avg_4_8'].toFixed(2) : null
                        }

                      {rowLabel == 'Цех 8' && 
                        '*'
                      }

                      {rowLabel == 'падеж/прирезка/в.убой 8' && 
                        
                          (tourReport['ws8_padej_quantity'] || tourReport['ws8_prirezka_quantity'] ||
                            tourReport['ws8_vinuzhd_quantity']) &&
                            <span className='color-red3-light'>
                              {tourReport['ws8_padej_quantity'] ? tourReport['ws8_padej_quantity'] : 0}
                              <span className='color-black-light'>/</span>
                              {tourReport['ws8_prirezka_quantity'] ? tourReport['ws8_prirezka_quantity'] : 0}
                              <span className='color-black'>/</span>
                              {tourReport['ws8_vinuzhd_quantity'] ? tourReport['ws8_vinuzhd_quantity'] :0}
                            </span>
                            
                        }

                      {rowLabel == 'падеж/прирезка/в.убой % 8' && 
                        
                          (tourReport['ws8_padej_percentage'] || tourReport['ws8_prirezka_percentage'] ||
                            tourReport['ws8_vinuzhd_percentage']) &&
                            <span className='color-red3-light'>
                              {tourReport['ws8_padej_percentage'] ? tourReport['ws8_padej_percentage'].toFixed(2) : 0}
                              <span className='color-black'>/</span>
                              {tourReport['ws8_prirezka_percentage'] ? tourReport['ws8_prirezka_percentage'].toFixed(2) : 0}
                              <span className='color-black'>/</span>
                              {tourReport['ws8_vinuzhd_percentage'] ? tourReport['ws8_vinuzhd_percentage'].toFixed(2) :0}
                            </span>
                            
                        }

                      {rowLabel == 'ремонтных 8' && 
                        
                        tourReport['ws8_gilts_qnty_now']
                        }

                      {rowLabel == 'отнятых 8' && 
                        
                          tourReport['week_weight_qnty_ws8'] >0 && tourReport['week_weight_qnty_ws8']
                      }

                      {rowLabel == 'средний вес 8' && 
                        
                          tourReport['week_weight_avg_ws8'] ? 
                            tourReport['week_weight_avg_ws8'].toFixed(2): null
                        }

                      {rowLabel == 'Цех 5' && 
                        '*'
                      }
                      
                      {rowLabel == 'приход 5' && 
                        
                          tourReport['week_weight_qnty_8_5'] >0 && tourReport['week_weight_qnty_8_5']
                        }

                      {rowLabel == 'ремонтных 5' && 
                        
                          tourReport['ws5_gilts_qnty_now']
                        }

                      {rowLabel == 'ремонтных 5 в 7/5' && 
                        
                          tourReport['ws5_qnty_to_7_5']
                        }

                      {rowLabel == 'падеж/в.убой 5' && 
                        
                          (tourReport['ws5_padej_quantity'] || tourReport['ws5_vinuzhd_quantity']) && 
                            <span className='color-red3-light'>
                              {tourReport['ws5_padej_quantity'] ? tourReport['ws5_padej_quantity'] : 0}
                              <span className='color-black'>/</span>
                              {tourReport['ws5_vinuzhd_quantity'] ? tourReport['ws5_vinuzhd_quantity'] : 0}
                            </span>
                          
                        }

                      {rowLabel == 'падеж/в.убой % 5' && 
                        
                          (tourReport['ws5_padej_percentage'] > 0 || tourReport['ws5_vinuzhd_percentage'] > 0) && 
                            <span className='color-red3-light'>
                              {tourReport['ws5_padej_percentage'] ? tourReport['ws5_padej_percentage'].toFixed(2) : 0}
                              <span className='color-black'>/</span>
                              {tourReport['ws5_vinuzhd_percentage'] ? tourReport['ws5_vinuzhd_percentage'].toFixed(2) : 0}
                            </span>
                          
                        }
                      
                      {rowLabel == 'спец. забой 5' && 
                        
                          tourReport['ws5_spec_quantity']
                      }

                      {rowLabel == 'средний вес 5' && 
                        
                          tourReport['ws5_spec_avg_weight'] ? 
                            tourReport['ws5_spec_avg_weight'].toFixed(2) : null
                        }

                      {rowLabel == 'остаток 5' && 
                        
                          tourReport['ws5_piglets_qnty_now'] ? tourReport['ws5_piglets_qnty_now'] : null
                        }

                      {rowLabel == 'Цех 6' && 
                        '*'
                        }
                      
                      {rowLabel == 'приход 6' && 
                        
                          tourReport['week_weight_qnty_8_6'] >0 && tourReport['week_weight_qnty_8_6']
                      }

                      {rowLabel == 'ремонтных 6' && 
                        
                          tourReport['ws6_gilts_qnty_now']
                        }

                      {rowLabel == 'ремонтных 6 в 7/5' && 
                        
                          tourReport['ws6_qnty_to_7_5']
                        }

                      {rowLabel == 'падеж/в.убой 6' && 
                        
                          (tourReport['ws6_padej_quantity'] || tourReport['ws6_vinuzhd_quantity']) && 
                            <span className='color-red3-light'>
                              {tourReport['ws6_padej_quantity'] ? tourReport['ws6_padej_quantity'] : 0}
                              <span className='color-black'>/</span>
                              {tourReport['ws6_vinuzhd_quantity'] ? tourReport['ws6_vinuzhd_quantity'] : 0}
                            </span>
                          
                        }

                      {rowLabel == 'падеж/в.убой % 6' && 
                        
                          (tourReport['ws6_padej_percentage'] > 0 || tourReport['ws6_vinuzhd_percentage']> 0) && 
                            <span className='color-red3-light'>
                              {tourReport['ws6_padej_percentage'] ? tourReport['ws6_padej_percentage'].toFixed(2) : 0}
                              <span className='color-black'>/</span>
                              {tourReport['ws6_vinuzhd_percentage'] ? tourReport['ws6_vinuzhd_percentage'].toFixed(2) : 0}
                            </span>
                          
                        }
                      
                      {rowLabel == 'спец. забой 6' && 
                        
                          tourReport['ws6_spec_quantity']
                        }

                      {rowLabel == 'средний вес 6' && 
                        tourReport['ws6_spec_avg_weight'] ? 
                          tourReport['ws6_spec_avg_weight'].toFixed(2) : null
                      }

                      {(rowLabel == 'остаток 6' && tourReport['ws6_piglets_qnty_now']) 
                          ? tourReport['ws6_piglets_qnty_now']
                          : null
                        }

                      {rowLabel == 'Цех 7' && 
                        '*'}
                      
                      {rowLabel == 'приход 7' && 
                        
                          tourReport['week_weight_qnty_8_7'] > 0 && tourReport['week_weight_qnty_8_7']
                        }

                      {rowLabel == 'количество ремонтных 7' && 
                        
                          tourReport['ws7_gilts_qnty_now']
                        }

                      {rowLabel == 'ремонтных 7 в 7/5' && 
                        tourReport['ws7_qnty_to_7_5']
                      }

                      {rowLabel == 'падеж/в.убой 7' && 
                        
                          (tourReport['ws7_padej_quantity'] || tourReport['ws7_vinuzhd_quantity']) && 
                            <span className='color-red3-light'>
                              {tourReport['ws7_padej_quantity'] ? tourReport['ws7_padej_quantity'] : 0}
                              <span className='color-black'>/</span>
                              {tourReport['ws7_vinuzhd_quantity'] ? tourReport['ws7_vinuzhd_quantity'] : 0}
                            </span>
                          
                        }

                      {rowLabel == 'падеж/в.убой % 7' && 
                        
                          (tourReport['ws7_padej_percentage'] > 0 || tourReport['ws7_vinuzhd_percentage'] > 0) && 
                            <span className='color-red3-light'>
                              {tourReport['ws7_padej_percentage'] ? tourReport['ws7_padej_percentage'].toFixed(2) : 0}
                              <span className='color-black'>/</span>
                              {tourReport['ws7_vinuzhd_percentage'] ? tourReport['ws7_vinuzhd_percentage'].toFixed(2) : 0}
                            </span>
                          
                        }
                      
                      {rowLabel == 'спец. забой 7' && 
                        
                          tourReport['ws7_spec_quantity']
                        }

                      {rowLabel == 'средний вес 7' && 
                        
                          tourReport['ws7_spec_avg_weight'] ? 
                            tourReport['ws7_spec_avg_weight'].toFixed(2) : null
                        }

                      {rowLabel == 'остаток 7' && 
                        
                          tourReport['ws7_piglets_qnty_now'] ? tourReport['ws7_piglets_qnty_now'] : null
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