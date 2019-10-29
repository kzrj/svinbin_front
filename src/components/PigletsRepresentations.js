import React, { Component } from 'react';


export class NewBornGroupWeaningList extends Component {
  calcTotalPiglets (){
    const { locations } = this.props
    let total = 0
    locations.map(location => {
      if (location.newbornpigletsgroup_set.length > 0)
        total = total + location.newbornpigletsgroup_set[0].quantity
    })
    return total
  }

  render() {
    const { locations } = this.props
    const total = this.calcTotalPiglets()
    return (
      <div className='newborn-group-list'>
        <p>Выбрано клеток {locations.length} {'|'} Всего поросят {total}</p>
        {locations.length > 0 &&
            <table className='table table-dark newborn-group-table'>
              <thead>
                <th>№ клетки</th>
                <th>Кол-во поросят</th>
                <th>Тур</th>
              </thead>
              <tbody>
                {locations.map(location => <NewBornGroupWeaning location={location}/>)}
              </tbody>
            </table>
        }
      </div>
    )
  }
 }


export class NewBornGroupWeaning extends Component {

  render() {
    const { location } = this.props
    const cellNumber = location.sowAndPigletsCell.number
    let newBornGroup = null
    if (location.newbornpigletsgroup_set.length > 0)
      newBornGroup = location.newbornpigletsgroup_set[0]

    return (
      <tr>
        <td>{cellNumber}</td>
        <td>{newBornGroup ? newBornGroup.quantity : 'Нет поросят'}</td>
        <td>{newBornGroup ? newBornGroup.tour : 'Нет тура'}</td>
      </tr>
    )
  }
 }

 export class NomadGroupsFromMerge extends Component {

  render() {
    const { location } = this.props
    const cellNumber = location.sowAndPigletsCell.number
    let newBornGroup = null
    if (location.newbornpigletsgroup_set.length > 0)
      newBornGroup = location.newbornpigletsgroup_set[0]

    return (
      <tr>
        <td>{cellNumber}</td>
        <td>{newBornGroup ? newBornGroup.quantity : 'Нет поросят'}</td>
        <td>{newBornGroup ? newBornGroup.tour : 'Нет тура'}</td>
      </tr>
    )
  }
 }

 export class PigletsGroup extends Component {

  render() {
    const { piglets } = this.props
    return (
      <table className='table table-sm'>
        <thead>
        </thead>
        <tbody>
          <tr>
            <td>Количество</td><td>{piglets.quantity}</td>
          </tr>
          <tr>
            <td>Количество ремонтных</td><td>{piglets.gilts_quantity}</td>
          </tr>
          <tr>
            <td>Тур</td><td>{piglets.tour}</td>
          </tr>
          <tr>
            <td>Дата рождения</td><td>{piglets.created_at}</td>
          </tr>
        </tbody>
      </table>
    )
  }
 }

export const NomadGroupDetail = (props) => (
    <table className='table table-sm'>
        <thead>
        </thead>
        <tbody>
        <tr>
            <td>Количество</td><td>{props.piglets.quantity}</td>
        </tr>
        <tr>
            <td>Количество ремонтных</td><td>{props.piglets.gilts_quantity}</td>
        </tr>
        <tr>
            <td>Тур</td><td>{props.piglets.tour}</td>
        </tr>
        </tbody>
    </table>
)

export const WeighingDetail = (props) => (
    <table className='table table-sm'>
        <tbody>
        <tr>
            <td>Средний вес</td><td>{props.weighingData.average_weight}</td>
        </tr>
        <tr>
            <td>Общий вес</td><td>{props.weighingData.total_weight}</td>
        </tr>
        </tbody>
    </table>
)