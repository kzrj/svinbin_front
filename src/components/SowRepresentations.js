import React, { Component } from 'react';
import { ErrorMessage, LoadingMessage } from './CommonComponents';

export const SowLightDetail = (props) => (
    <ul>
        {/* <li>{props.sow.id}</li> */}
        <li>{props.sow.location}</li>
        <li>{props.sow.status}</li>
        <li>{props.sow.farm_id}</li>
    </ul>
)

 export class SowTable extends Component {
 
  render() {
    const { sows, sowClick, choosedSows } = this.props
    return (
      <div className='card card-style mx-1'>
        <div className='content'>
          <table className="table table-sm">
            <thead className='font-13 bg-mainDark-light'>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Статус</th>
                <th scope="col">Тур</th>
                <th scope="col">Осеменения</th>
                <th scope="col">УЗИ 28</th>
                <th scope="col">УЗИ 35</th>
                <th scope="col">Местоположение</th>
              </tr>
            </thead>
            <tbody>
              {sows.length > 0 && sows.map(sow => 
                <SowRow sow={sow} sowClick={sowClick} choosedSows={choosedSows} key={sow.id}/>
                )}
            </tbody>
          </table>
        </div>
      </div>
    )
  }
 }
 
 export class SowRow extends Component {
  render() {
    const { sow, sowClick, choosedSows } = this.props
    const sowClassName = choosedSows.includes(sow.id.toString()) ? 'sow-row-active' : 'sow-row'
    
    return (
     <tr key={sow.id} className={sowClassName} >
       <th scope="row" onClick={sowClick} data-id={sow.id} data-farm_id={sow.farm_id}>{sow.farm_id}</th>
       <td onClick={sowClick} data-id={sow.id} data-farm_id={sow.farm_id}>{sow.status}</td>
       <td onClick={sowClick} data-id={sow.id} data-farm_id={sow.farm_id}>{sow.tour ? sow.tour : '-'}</td>
       <td onClick={sowClick} data-id={sow.id} data-farm_id={sow.farm_id} className="sow-row-date">
         {sow.seminations_current_tour.length > 0 ? 
           <ul className='sow-seminations' onClick={sowClick}>
             {sow.seminations_current_tour.map((seminationDate,key) => 
              <li onClick={sowClick} key={key}>
              {seminationDate}</li> )}
           </ul>
           : '-'
         }
       </td>
       <td onClick={sowClick} data-id={sow.id} data-farm_id={sow.farm_id} className="sow-row-date">
         {sow.ultrasound_30_current_tour && sow.ultrasound_30_current_tour.length > 0 ? 
             sow.ultrasound_30_current_tour.map(usound30Date => usound30Date)
             : '-'
           }
       </td>
       <td onClick={sowClick} data-id={sow.id} data-farm_id={sow.farm_id} className="sow-row-date">
         {sow.ultrasound_60_current_tour && sow.ultrasound_60_current_tour.length > 0 ? 
             sow.ultrasound_60_current_tour.map(usound60Date => usound60Date)
             : '-'
           }
       </td>
       <td onClick={sowClick} data-id={sow.id} data-farm_id={sow.farm_id}>{sow.location}</td>
     </tr>
    )
  }
 }


 export class SowFindByIdWithoutGet extends Component {
  render() {
    const { sows, activeSowId, fetching, sowIdValue, error } = this.props
    const sowClass = 'card card-style mx-0 my-1 border-bottom border-mainDark-dark'
    return (
       <div className=''>
          <div class="input-group mb-3">
              <input type='number' 
                onChange={this.props.getSowsById} 
                onClick={this.props.clickSearch}
                className="form-control search-input" 
                value={sowIdValue}
                placeholder="Номер свиноматки"/>
          <label>Количество: {sows.length}</label>
          </div>
          <div className='div-scroll position-static h-50'>
              {!error ? fetching ? <LoadingMessage /> :
                  (sows.length > 0 ) && 
                      sows.map(sowInList => 
                        <div
                          className={sowInList.id == activeSowId 
                            ? sowClass + ' sow-row-active' 
                            : sowClass} 
                          key={sowInList.id} 
                          data-id={sowInList.id}
                          onClick={this.props.clickSow}>
                            <div className='content mx-1 my-1 text-center'>
                              <span className='d-block sow-list-farm-id' onClick={this.props.clickSow}>
                                {sowInList.farm_id}
                              </span>
                              <span className='sow-list-tour' onClick={this.props.clickSow}>
                                  {sowInList.tour ? sowInList.tour.replace(' 2019г','') : ''}</span>
                            </div>
                        </div>
                      )
                  :
                  <ErrorMessage error={error} />
              }
              
          </div>
       </div>
    )
  }
 }

 export function SowSingle(props) {
   const { sow } = props
   return (
    <div className='my-2 mx-2'>
      <p className='my-0 font-19 font-600 color-mainDark-dark'>
        Свиноматка {sow.farm_id} | {sow.status} 
        | {sow.tour ? sow.tour : <span className='color-red1-light'>без тура</span>} | {sow.location} 
      </p>
    </div>
   )
 }
