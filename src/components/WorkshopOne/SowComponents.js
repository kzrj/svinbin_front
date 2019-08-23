import React, { Component } from 'react';


class SowToursData extends Component {
   constructor(props) {
    super(props);
    this.state = {
      farmId: null,
    }
  }
  
  componentDidMount() {

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
                          {ultrasound.result ? 'Супорос' : 'Прохолост'} 
                        </li>
                        )}
                    </td>
                    <td>
                      {tourInfo.ultrasoundsV2.map(ultrasoundV2 =>
                        <li>
                          {ultrasoundV2.date} {' '}
                          {ultrasoundV2.result ? 'Супорос' : 'Прохолост'} 
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

export default SowToursData