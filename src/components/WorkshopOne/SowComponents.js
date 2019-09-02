import React, { Component } from 'react';


export default class SowToursData extends Component {
   constructor(props) {
    super(props);
    this.state = {
      farmId: null,
    }
  }
  
  render() {
    const { sow } = this.props
    return (
      <div>
        {sow.tours_info && sow.tours_info.length > 0 ?
          sow.tours_info.map(tourInfo => 
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

export class SowRow extends Component {
  constructor(props) {
   super(props);
   this.state = {
     expand: false,
   }
 }

 render() {
   const { sow, sowClick, choosedSows } = this.props
   const sowClassName = choosedSows.includes(sow.id.toString()) ? 'sow-row-active' : 'sow-row'
   
   return (
    <tr key={sow.id} className={sowClassName}>
      <th scope="row" onClick={sowClick} data-id={sow.id}>{sow.farm_id}</th>
      <td onClick={sowClick} data-id={sow.id}>{sow.status}</td>
      <td onClick={sowClick} data-id={sow.id}>25.05.2019 15:09</td>
      <td onClick={sowClick} data-id={sow.id}>25.05.2019 15:09</td>
      <td onClick={sowClick} data-id={sow.id}>25.05.2019 15:09</td>
      <td >-</td>
    </tr>
   )
 }
}