import React, { Component } from 'react';

export class PigletsGroup extends Component {

  render() {
    const { piglets } = this.props
    let age = ''
    piglets && piglets.age.split(' ').length > 1 
      ? age = piglets.age.split(' ')[0]
      : age = 0
    return (
      <div className='card card-style mx-0'>
        <div className='content my-1'>
          <p className='my-0'>
            Количество {piglets.quantity}
          </p>
          <p className='my-0'>
            ремонтных {piglets.gilts_quantity}
          </p>
          <p className='my-0'>
            {piglets.week_tour}
          </p>
          <p className='my-0'>
            Возраст {age && age + ' д'}
          </p>
        </div>
      </div>
    )
  }
 }

 export class PigletsWeighing extends Component {

  render() {
    const { piglets } = this.props
    return (
      <table className='table table-sm'>
        <thead>
        </thead>
        <tbody>
          <tr>
            <td>Количество</td>
            <td><button > - </button>{piglets.quantity}</td>
          </tr>
          <tr>
            <td>Количество ремонтных</td><td>{piglets.gilts_quantity}</td>
          </tr>
          <tr>
            <td>Тур</td><td>{piglets.week_tour}</td>
          </tr>
        </tbody>
      </table>
    )
  }
 }

 export class PigletsListElem extends Component {

  render() {
    const { piglets } = this.props
    return (
      <div className='piglets-list-elem'>
        <p>Количество {piglets.quantity}</p>
        {piglets.gilts_quantity > 0 && <p>Количество ремонтных {piglets.gilts_quantity}</p>}
        {piglets.week_tour}
        {piglets.transfer_part_number && <p>Партия {piglets.transfer_part_number}</p>}
      </div>
    )
  }
 }

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
        <thead>
          <tr>
            <th>
              Клетка - секция
            </th>
            <th>
              Тур
            </th>
            <th>
              Количество в партию
            </th>
            <th>
              Количество ремонтных
            </th>
          </tr>
        </thead>
        <tbody>
          {this.props.weaningRecords.length > 0 && this.props.weaningRecords.map((weaningRecord, key) => 
            <tr key={key}>
              <td>{weaningRecord.location.cell}</td>
              {/* <td>{weaningRecord.metatour_repr.map((tour, key) => 
                <span key={key}>Тур {tour.tour} - {tour.percentage}%</span>
                )}
              </td> */}
              <td>{weaningRecord.week_tour}</td>
              <td>
                <input type='number' 
                  onChange={this.props.setQuantity}
                  data-piglets-id={weaningRecord.id}
                  defaultValue={weaningRecord.quantity}
                  />
              </td>
              <td>
                <input type='number' 
                  onChange={this.props.setGiltsQuantity}
                  data-piglets-id={weaningRecord.id}
                  value={weaningRecord.gilts_quantity}
                  defaultValue={weaningRecord.gilts_quantity}
                  />
              </td>
            </tr>
            )}
        </tbody>
      </table>
    )
  }
}

export const PigletsAge = (age) => 
  age.split(' ')[1]