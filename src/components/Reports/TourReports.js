import React, { Component } from 'react';


class ToursReportsComponent extends Component {
  constructor(props) {
		super(props);  
	}

  componentDidMount() {
    this.props.getTourReports()
  }

  render() {
    const { tourReportslist } = this.props.reports

    const rows = tourReportslist.length > 0 ? Object.keys(tourReportslist[0]) : null

    const reportRows = [
      'Тур неделя', 
      'осеменненых', 
      'УЗИ 28 супорос/прохолост', 
      'УЗИ 35 супорос/прохолост', 
      'Аборт',
      'активных свиноматок в туре',
      'в цехе 1',
      'в цехе 2',
      'в цехе 3',
      'Цех 3',
      'живорожденных',
      'мертворожденных',
      'муммий',
      'ремонтных',
      'падеж/прирезка 3',
      'падеж/прирезка % 3',
      'количество отнятых 3',
      'средний вес 3',
      'Цех 4',
      'падеж/прирезка 4',
      'падеж/прирезка % 4',
      'количество ремонтных 4',
      'количество отнятых 4',
      'средний вес 4',
      'Цех 8',
      'падеж/прирезка/в.убой 8',
      'падеж/прирезка/в.убой % 8',
      'количество ремонтных 8',
      'количество отнятых 8',
      'средний вес 8',
      'Цех 5',
      'приход 5',
      'падеж/в.убой 5',
      'падеж/в.убой % 5',
      'количество ремонтных 5',
      'ремонтных 5 в 7/5',
      'спец. забой 5',
      'средний вес 5',
      'остаток 5',
      'Цех 6',
      'приход 6',
      'падеж/в.убой 6',
      'падеж/в.убой % 6',
      'количество ремонтных 6',
      'ремонтных 6 в 7/5',
      'спец. забой 6',
      'средний вес 6',
      'остаток 6',
      'Цех 7',
      'приход 7',
      'падеж/в.убой 7',
      'падеж/в.убой % 7',
      'количество ремонтных 7',
      'ремонтных 7 в 7/5',
      'спец. забой 7',
      'средний вес 7',
      'остаток 7'
    ]

    return (
      <div className="container-fluid report-block">
        <h3>Отчет по неделям</h3>
        <table className='report-table'>
          <tbody>
            {reportRows && reportRows.map(rowLabel => 
              <tr>
                {/* {rowLabel == 'Цех 3' ? 
                  <td className='report-cell-title' colSpan={tourReportslist.length}>{rowLabel}</td> :
                  <td className='report-cell-title'>{rowLabel}</td>} */}
                <td className='report-cell-title'>{rowLabel}</td>
                {tourReportslist.map(tourReport =>
                  <td className='report-cell-td'>
                    {rowLabel == 'Тур неделя' && 
                      <div className='report-cell-title'>
                        W{tourReport['week_number']} {tourReport['year']} 
                      </div>}

                    {rowLabel == 'осеменненых' && 
                      <div className='report-cell-value'>
                        {tourReport['count_seminated']}
                      </div>}

                    {rowLabel == 'УЗИ 28 супорос/прохолост' && 
                      <div className='report-cell-value'>
                        {tourReport['count_usound28_proholost'] | tourReport['count_usound28_suporos'] &&
                          <div>
                            <span className='report-cell-sup'>
                              {tourReport['count_usound28_suporos'] ? tourReport['count_usound28_suporos'] : 0}
                            </span>
                            /
                            <span className='report-cell-proh'>
                              {tourReport['count_usound28_proholost'] ? tourReport['count_usound28_proholost'] : 0}
                            </span>
                          </div>}
                      </div>}

                    {rowLabel == 'УЗИ 35 супорос/прохолост' && 
                      <div className='report-cell-value'>
                        {tourReport['count_usound35_proholost'] | tourReport['count_usound35_suporos'] &&
                          <div>
                            <span className='report-cell-sup'>
                              {tourReport['count_usound35_suporos'] ? tourReport['count_usound35_suporos'] : 0}
                            </span>
                            /
                            <span className='report-cell-proh'>
                              {tourReport['count_usound35_proholost'] ? tourReport['count_usound35_proholost'] : 0}
                            </span>
                          </div>}
                      </div>}

                    {rowLabel == 'Аборт' && 
                      <div className='report-cell-value'>
                        <span className='report-cell-proh'>{tourReport['count_abort']}</span>
                      </div>}

                    {rowLabel == 'активных свиноматок в туре' && 
                      <div className='report-cell-value'>
                        {tourReport['count_sow'] >0 && tourReport['count_sow']}
                      </div>}

                    {rowLabel == 'в цехе 1' && 
                      <div className='report-cell-value'>
                        {tourReport['ws1_count_tour_sow']}
                      </div>}

                    {rowLabel == 'в цехе 2' && 
                      <div className='report-cell-value'>
                        {tourReport['ws2_count_tour_sow']}
                      </div>}
                    
                    {rowLabel == 'в цехе 3' && 
                      <div className='report-cell-value'>
                        {tourReport['ws3_count_tour_sow']}
                      </div>}

                    {rowLabel == 'Цех 3' && 
                      <div className='report-cell-value-border'>
                        *
                      </div>}

                    {rowLabel == 'живорожденных' && 
                      <div className='report-cell-value'>
                        {tourReport['total_born_alive']}
                      </div>}

                    {rowLabel == 'мертворожденных' && 
                      <div className='report-cell-value'>
                        {tourReport['total_born_dead']}
                      </div>}

                    {rowLabel == 'муммий' && 
                      <div className='report-cell-value'>
                        {tourReport['total_born_mummy']}
                      </div>}

                    {rowLabel == 'ремонтных' && 
                      <div className='report-cell-value'>
                        {tourReport['gilt_count']}
                      </div>}

                    {rowLabel == 'падеж/прирезка 3' && 
                      <div className='report-cell-value'>
                        {(tourReport['ws3_padej_quantity'] || tourReport['ws3_prirezka_quantity']) &&
                          <span>
                            {tourReport['ws3_padej_quantity'] ? tourReport['ws3_padej_quantity'] : 0 }/
                            {tourReport['ws3_prirezka_quantity'] ? tourReport['ws3_prirezka_quantity'] : 0 }
                          </span>
                        }
                      </div>}

                    {rowLabel == 'падеж/прирезка % 3' && 
                      <div className='report-cell-value'>
                        {(tourReport['ws3_padej_quantity'] || tourReport['ws3_prirezka_quantity']) &&
                          <span>
                            {tourReport['ws3_padej_percentage'] ? tourReport['ws3_padej_percentage'].toFixed(2) : 0 }/
                            {tourReport['ws3_prirezka_percentage'] ? tourReport['ws3_prirezka_percentage'].toFixed(2) : 0 }
                          </span>
                        }
                      </div>}

                    {rowLabel == 'количество отнятых 3' && 
                      <div className='report-cell-value'>
                        {tourReport['week_weight_qnty_3_4'] > 0  && tourReport['week_weight_qnty_3_4'] }
                      </div>}
                    {rowLabel == 'средний вес 3' && 
                      <div className='report-cell-value'>
                        {tourReport['week_weight_avg_3_4'] ? 
                          tourReport['week_weight_avg_3_4'].toFixed(2) : null}
                      </div>}

                    {rowLabel == 'Цех 4' && 
                      <div className='report-cell-value-border'>
                        *
                      </div>}
                    
                    {rowLabel == 'падеж/прирезка 4' && 
                      <div className='report-cell-value'>
                        {tourReport['ws4_padej_quantity']} 
                        {tourReport['ws4_padej_quantity'] && tourReport['ws4_prirezka_quantity'] && '/'}
                        {tourReport['ws4_prirezka_quantity']}
                      </div>}
                    
                    {rowLabel == 'падеж/прирезка % 4' && 
                      <div className='report-cell-value'>
                        {(tourReport['ws4_padej_percentage'] || tourReport['ws4_prirezka_percentage']) &&
                          <span>
                            {tourReport['ws4_padej_percentage'] ? tourReport['ws4_padej_percentage'].toFixed(2) : 0 }/
                            {tourReport['ws4_prirezka_percentage'] ? tourReport['ws4_prirezka_percentage'].toFixed(2) : 0 }
                          </span>
                        }
                      </div>}

                    {rowLabel == 'количество ремонтных 4' && 
                      <div className='report-cell-value'>
                        {tourReport['ws4_gilts_qnty_now']}
                      </div>}
                      
                    {rowLabel == 'количество отнятых 4' && 
                      <div className='report-cell-value'>
                        {tourReport['week_weight_qnty_4_8'] >0 && tourReport['week_weight_qnty_4_8']}
                      </div>}

                    {rowLabel == 'средний вес 4' && 
                      <div className='report-cell-value'>
                        {tourReport['week_weight_avg_4_8'] ? 
                          tourReport['week_weight_avg_4_8'].toFixed(2) : null}
                      </div>}

                    {rowLabel == 'Цех 8' && 
                      <div className='report-cell-value-border'>
                        *
                      </div>}

                    {rowLabel == 'падеж/прирезка/в.убой 8' && 
                      <div className='report-cell-value'>
                        {(tourReport['ws8_padej_quantity'] || tourReport['ws8_prirezka_quantity'] ||
                          tourReport['ws8_vinuzhd_quantity']) &&
                          <span>
                            {tourReport['ws8_padej_quantity'] ? tourReport['ws8_padej_quantity'] : 0}/
                            {tourReport['ws8_prirezka_quantity'] ? tourReport['ws8_prirezka_quantity'] : 0}/
                            {tourReport['ws8_vinuzhd_quantity'] ? tourReport['ws8_vinuzhd_quantity'] :0}
                          </span>
                          }
                      </div>}

                    {rowLabel == 'падеж/прирезка/в.убой % 8' && 
                      <div className='report-cell-value'>
                        {(tourReport['ws8_padej_percentage'] || tourReport['ws8_prirezka_percentage'] ||
                          tourReport['ws8_vinuzhd_percentage']) &&
                          <span>
                            {tourReport['ws8_padej_percentage'] ? tourReport['ws8_padej_percentage'].toFixed(2) : 0}/
                            {tourReport['ws8_prirezka_percentage'] ? tourReport['ws8_prirezka_percentage'].toFixed(2) : 0}/
                            {tourReport['ws8_vinuzhd_percentage'] ? tourReport['ws8_vinuzhd_percentage'].toFixed(2) :0}
                          </span>
                          }
                      </div>}

                    {rowLabel == 'количество ремонтных 8' && 
                      <div className='report-cell-value'>
                       {tourReport['ws8_gilts_qnty_now']}
                      </div>}

                    {rowLabel == 'количество отнятых 8' && 
                      <div className='report-cell-value'>
                        {tourReport['week_weight_qnty_ws8'] >0 && tourReport['week_weight_qnty_ws8']}
                      </div>}

                    {rowLabel == 'средний вес 8' && 
                      <div className='report-cell-value'>
                        {tourReport['week_weight_avg_ws8'] ? 
                          tourReport['week_weight_avg_ws8'].toFixed(2): null}
                      </div>}

                    {rowLabel == 'Цех 5' && 
                      <div className='report-cell-value-border'>
                        *
                      </div>}
                    
                    {rowLabel == 'приход 5' && 
                      <div className='report-cell-value'>
                        {tourReport['week_weight_qnty_8_5'] >0 && tourReport['week_weight_qnty_8_5']}
                      </div>}

                    {rowLabel == 'количество ремонтных 5' && 
                      <div className='report-cell-value'>
                        {tourReport['ws5_gilts_qnty_now']}
                      </div>}

                    {rowLabel == 'ремонтных 5 в 7/5' && 
                      <div className='report-cell-value'>
                        {tourReport['ws5_qnty_to_7_5']}
                      </div>}

                    {rowLabel == 'падеж/в.убой 5' && 
                      <div className='report-cell-value'>
                        {(tourReport['ws5_padej_quantity'] || tourReport['ws5_vinuzhd_quantity']) && 
                          <span>
                            {tourReport['ws5_padej_quantity'] ? tourReport['ws5_padej_quantity'] : 0}/
                            {tourReport['ws5_vinuzhd_quantity'] ? tourReport['ws5_vinuzhd_quantity'] : 0}
                          </span>
                        }
                      </div>}

                    {rowLabel == 'падеж/в.убой % 5' && 
                      <div className='report-cell-value'>
                        {(tourReport['ws5_padej_percentage'] || tourReport['ws5_vinuzhd_percentage']) && 
                          <span>
                            {tourReport['ws5_padej_percentage'] ? tourReport['ws5_padej_percentage'].toFixed(2) : 0}/
                            {tourReport['ws5_vinuzhd_percentage'] ? tourReport['ws5_vinuzhd_percentage'].toFixed(2) : 0}
                          </span>
                        }
                      </div>}
                    
                    {rowLabel == 'спец. забой 5' && 
                      <div className='report-cell-value'>
                        {tourReport['ws5_spec_quantity']}
                      </div>}

                    {rowLabel == 'средний вес 5' && 
                      <div className='report-cell-value'>
                        {tourReport['ws5_spec_avg_weight'] ? 
                          tourReport['ws5_spec_avg_weight'].toFixed(2) : null}
                      </div>}

                    {rowLabel == 'остаток 5' && 
                      <div className='report-cell-value'>
                        {tourReport['ws5_piglets_qnty_now'] ? tourReport['ws5_piglets_qnty_now'] : 0}
                      </div>}

                    {rowLabel == 'Цех 6' && 
                      <div className='report-cell-value-border'>
                        *
                      </div>}
                    
                    {rowLabel == 'приход 6' && 
                      <div className='report-cell-value'>
                        {tourReport['week_weight_qnty_8_6'] >0 && tourReport['week_weight_qnty_8_6']}
                      </div>}

                    {rowLabel == 'количество ремонтных 6' && 
                      <div className='report-cell-value'>
                        {tourReport['ws6_gilts_qnty_now']}
                      </div>}

                    {rowLabel == 'ремонтных 6 в 7/5' && 
                      <div className='report-cell-value'>
                        {tourReport['ws6_qnty_to_7_5']}
                      </div>}

                    {rowLabel == 'падеж/в.убой 6' && 
                      <div className='report-cell-value'>
                        {(tourReport['ws6_padej_quantity'] || tourReport['ws6_vinuzhd_quantity']) && 
                          <span>
                            {tourReport['ws6_padej_quantity'] ? tourReport['ws6_padej_quantity'] : 0}/
                            {tourReport['ws6_vinuzhd_quantity'] ? tourReport['ws6_vinuzhd_quantity'] : 0}
                          </span>
                        }
                      </div>}

                    {rowLabel == 'падеж/в.убой % 6' && 
                      <div className='report-cell-value'>
                        {(tourReport['ws6_padej_percentage'] || tourReport['ws6_vinuzhd_percentage']) && 
                          <span>
                            {tourReport['ws6_padej_percentage'] ? tourReport['ws6_padej_percentage'].toFixed(2) : 0}/
                            {tourReport['ws6_vinuzhd_percentage'] ? tourReport['ws6_vinuzhd_percentage'].toFixed(2) : 0}
                          </span>
                        }
                      </div>}
                    
                    {rowLabel == 'спец. забой 6' && 
                      <div className='report-cell-value'>
                        {tourReport['ws6_spec_quantity']}
                      </div>}

                    {rowLabel == 'средний вес 6' && 
                      <div className='report-cell-value'>
                        {tourReport['ws6_spec_avg_weight'] ? 
                          tourReport['ws6_spec_avg_weight'].toFixed(2) : null}
                      </div>}

                    {rowLabel == 'остаток 6' && 
                      <div className='report-cell-value'>
                        {tourReport['ws6_piglets_qnty_now'] ? tourReport['ws6_piglets_qnty_now'] : 0}
                      </div>}

                    {rowLabel == 'Цех 7' && 
                      <div className='report-cell-value-border'>
                        *
                      </div>}
                    
                    {rowLabel == 'приход 7' && 
                      <div className='report-cell-value'>
                        {tourReport['week_weight_qnty_8_7'] >0 && tourReport['week_weight_qnty_8_7']}
                      </div>}

                    {rowLabel == 'количество ремонтных 7' && 
                      <div className='report-cell-value'>
                        {tourReport['ws7_gilts_qnty_now']}
                      </div>}

                    {rowLabel == 'ремонтных 7 в 7/5' && 
                      <div className='report-cell-value'>
                        {tourReport['ws7_qnty_to_7_5']}
                      </div>}

                    {rowLabel == 'падеж/в.убой 7' && 
                      <div className='report-cell-value'>
                        {(tourReport['ws7_padej_quantity'] || tourReport['ws7_vinuzhd_quantity']) && 
                          <span>
                            {tourReport['ws7_padej_quantity'] ? tourReport['ws7_padej_quantity'] : 0}/
                            {tourReport['ws7_vinuzhd_quantity'] ? tourReport['ws7_vinuzhd_quantity'] : 0}
                          </span>
                        }
                      </div>}

                    {rowLabel == 'падеж/в.убой % 7' && 
                      <div className='report-cell-value'>
                        {(tourReport['ws7_padej_percentage'] || tourReport['ws7_vinuzhd_percentage']) && 
                          <span>
                            {tourReport['ws7_padej_percentage'] ? tourReport['ws7_padej_percentage'].toFixed(2) : 0}/
                            {tourReport['ws7_vinuzhd_percentage'] ? tourReport['ws7_vinuzhd_percentage'].toFixed(2) : 0}
                          </span>
                        }
                      </div>}
                    
                    {rowLabel == 'спец. забой 7' && 
                      <div className='report-cell-value'>
                        {tourReport['ws7_spec_quantity']}
                      </div>}

                    {rowLabel == 'средний вес 7' && 
                      <div className='report-cell-value'>
                        {tourReport['ws7_spec_avg_weight'] ? 
                          tourReport['ws7_spec_avg_weight'].toFixed(2) : null}
                      </div>}

                    {rowLabel == 'остаток 7' && 
                      <div className='report-cell-value'>
                        {tourReport['ws7_piglets_qnty_now'] ? tourReport['ws7_piglets_qnty_now'] : 0}
                      </div>}
                  </td>
                  )}
              </tr>
            )}
              
            </tbody>
        </table>

      </div>
    );
  }
}


export default ToursReportsComponent