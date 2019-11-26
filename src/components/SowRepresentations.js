import React, { Component } from 'react';

export const SowLightDetail = (props) => (
    <ul>
        <li>{props.sow.id}</li>
        <li>{props.sow.location}</li>
        <li>{props.sow.status}</li>
        <li>{props.sow.farm_id}</li>
    </ul>
)

export class SowToursData extends Component {
    constructor(props) {
     super(props);
     this.state = {
       farmId: null,
     }
   }
   
   render() {
     const { tours_info } = this.props
     return (
       <div>
         {tours_info.length > 0 ?
           tours_info.map(tourInfo => 
           <div>
             <table>
               <thead>
                 <tr>
                     <th colspan="5">{tourInfo.tour_title}</th>
                 </tr>
               </thead>
               <tbody>
                 <tr>
                     <td>Осеменения</td>
                     <td>Узи 1</td>
                     <td>Узи 2</td>
                     <td>Опорос</td>
                     <td>Отъем</td>
                 </tr>
                 <tr>
                     <td>
                       <ul>
                       {tourInfo.seminations.map(semination =>
                         <li>
                           {semination.date} {' '}
                           {semination.semination_employee} {' '}
                           Хряк {semination.boar}
                         </li>)}
                       </ul>
                     </td>
                     <td>
                       {tourInfo.ultrasounds.map(ultrasound =>
                         <li>
                           {ultrasound.date} {' '}
                           {ultrasound.u_type}
                           {ultrasound.result ? 'Супорос' : 'Прохолост'} 
                         </li>
                         )}
                     </td>
                     <td>
                       {tourInfo.farrows.map(farrow =>
                         <li>
                           {farrow.date} {' '}
                           {farrow.alive_quantity} {' '} 
                           {farrow.dead_quantity} {' '} 
                           {farrow.mummy_quantity}
                         </li>
                         )}
                     </td>
                     <td>Отъем</td>
                 </tr>
               </tbody>
             </table>
             
           </div>
           ) :
           'Нет записей'
         }
       </div>
     )
   }
 }
 
 
 export class SowTable extends Component {
 
  render() {
    const { sows, sowClick, choosedSows } = this.props
    return (
     <table className="table table-light table-sm">
       <thead>
         <tr>
           <th scope="col">#</th>
           <th scope="col">Статус</th>
           <th scope="col">Тур</th>
           <th scope="col">Осеменения</th>
           <th scope="col">УЗИ 28</th>
           <th scope="col">УЗИ 35</th>
           <th scope="col">Выбрать</th>
         </tr>
       </thead>
       <tbody>
         {sows.length > 0 && sows.map(sow => 
           <SowRow sow={sow} sowClick={sowClick} choosedSows={choosedSows}/>
           )}
       </tbody>
     </table>
    )
  }
 }
 
 export class SowRow extends Component {
  render() {
    const { sow, sowClick, choosedSows } = this.props
    const sowClassName = choosedSows.includes(sow.id.toString()) ? 'sow-row-active' : 'sow-row'
    
    return (
     <tr key={sow.id} className={sowClassName} >
       <th scope="row" onClick={sowClick} data-id={sow.id}>{sow.farm_id}</th>
       <td onClick={sowClick} data-id={sow.id}>{sow.status}</td>
       <td onClick={sowClick} data-id={sow.id}>{sow.tour ? sow.tour : '-'}</td>
       <td onClick={sowClick} data-id={sow.id} className="sow-row-date">
         {sow.seminations_current_tour.length > 0 ? 
           <ul className='sow-seminations' onClick={sowClick}>
             {sow.seminations_current_tour.map(seminationDate => <li onClick={sowClick}>{seminationDate}</li> )}
           </ul>
           : '-'
         }
       </td>
       <td onClick={sowClick} data-id={sow.id} className="sow-row-date">
         {sow.ultrasound_30_current_tour.length > 0 ? 
             sow.ultrasound_30_current_tour.map(usound30Date => usound30Date)
             : '-'
           }
       </td>
       <td onClick={sowClick} data-id={sow.id} className="sow-row-date">
         {sow.ultrasound_60_current_tour.length > 0 ? 
             sow.ultrasound_60_current_tour.map(usound60Date => usound60Date)
             : '-'
           }
       </td>
       <td >-</td>
     </tr>
    )
  }
 }