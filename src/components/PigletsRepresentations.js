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
    // const total = 0
    return (
      <div className='newborn-group-list'>
        <p>Выбрано клеток {locations.length} {'|'} Всего поросят {total}</p>
        {locations.length > 0 &&
            <table className='table table-sm newborn-group-table'>
              <thead>
                <th>№ клетки</th>
                <th>Кол-во поросят</th>
                <th>Тур</th>
              </thead>
              <tbody>
                {locations.map(location => <NewBornGroupWeaning location={location}
                   decreasePiglets={this.props.decreasePiglets}/>)}
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
    const cellSection = location.sowAndPigletsCell.section
    let newBornGroup = null
    let pigletsTour = null
    if (location.newbornpigletsgroup_set.length > 0)
      newBornGroup = location.newbornpigletsgroup_set[0]
      pigletsTour = newBornGroup ? newBornGroup.tour && newBornGroup.tour.replace(' 2019г','') : null

    return (
      <tr>
        <td>{cellSection}-{cellNumber}</td>
        <td>
          <button className='btn btn-weaning btn-outline-dark' disabled>+</button>
          {newBornGroup ? newBornGroup.quantity : 'Нет поросят'}
          <button className='btn btn-weaning btn-outline-dark' 
            onClick={() => this.props.decreasePiglets(location)}>-</button>
        </td>
        <td className='td-piglets-tour'>{newBornGroup ? pigletsTour : 'Нет тура'}</td>
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

export class PigletsWeaningSectionsTable extends Component {
  render() {
    const { locations, activePigletsIds } = this.props
    console.log(locations)
    return (
      <table className='table table-sm table-piglets-weaning'>
        <tbody>
          {locations.length > 0 && locations.map(location => 
            <td>
              <tr>{location.section}</tr>
              {location.piglets.length > 0 && location.piglets.map(piglets => 
                <tr 
                  className={activePigletsIds.includes(piglets.id) ? 
                    'col-sm-1 weaning-cell cell-active' : 'col-sm-1 weaning-cell' } 
                  onClick={() => this.props.clickPiglets(piglets, location)}>
                    {/* {piglets.metatour_repr.map(tour => 
                      <span>Тур {tour.tour} - {tour.percentage}%</span>
                      )} */}
                    <p>{piglets.quantity}</p>
                </tr>
                )}
            </td>)
          }
        </tbody>
      </table>
    )
  }
 }

 
export class PigletsWeaningInput extends Component {
  render() {
    return (
    <table className='table table-sm table-piglets-weaning'>
      <tbody>
        {this.props.piglets.map(piglets => 
          <tr key={piglets.id}>
            <td>{piglets.location}</td>
            <td>{piglets.metatour_repr.map(tour => 
              <span>Тур {tour.tour} - {tour.percentage}%</span>
              )}
            </td>
            {/* <td>{piglets.quantity}</td> */}
            <td>
              <input type='number' 
                onChange={this.props.setQuantity}
                data-piglets-id={piglets.id}
                defaultValue={piglets.quantity}
                />
            </td>
          </tr>
          )}
      </tbody>
    </table>
    )
  }
}