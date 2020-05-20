import React, { Component } from 'react';

 export const PigletsMetaTour = (props) => (
  <div>
      {props.metatours.map((metatour, key) => 
        <p key={key}>
          <span>Тур {metatour.tour}</span>
          {/* <span>-{metatour.percentage}%</span> */}
        </p>
        )}
  </div>
)

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
            <td>Тур</td><td><PigletsMetaTour metatours={piglets.metatour_repr} /></td>
          </tr>
          {/* <tr>
            <td>Дата рождения</td><td>{piglets.created_at}</td>
          </tr> */}
        </tbody>
      </table>
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
            <td>Тур</td><td><PigletsMetaTour metatours={piglets.metatour_repr} /></td>
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
        <PigletsMetaTour metatours={piglets.metatour_repr} />
        {piglets.transfer_part_number && <p>Партия {piglets.transfer_part_number}</p>}
      </div>
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
        <thead>
          <tr>
            <th>
              Клетка - секция
            </th>
            <th>
              Тур - %
            </th>
            <th>
              Количество в партию
            </th>
            <th>
              есть ремонтные?
            </th>
          </tr>
        </thead>
        <tbody>
          {this.props.weaningRecords.length > 0 && this.props.weaningRecords.map((weaningRecord, key) => 
            <tr key={key}>
              <td>{weaningRecord.location.cell}</td>
              <td>{weaningRecord.metatour_repr.map((tour, key) => 
                <span key={key}>Тур {tour.tour} - {tour.percentage}%</span>
                )}
              </td>
              <td>
                <input type='number' 
                  onChange={this.props.setQuantity}
                  data-piglets-id={weaningRecord.id}
                  defaultValue={weaningRecord.quantity}
                  />
              </td>
              <td>
                {weaningRecord.gilts_quantity}{' '}
                <input type='checkbox' 
                  disabled={weaningRecord.gilts_quantity <= 0}
                  onChange={this.props.setGiltsContain}
                  data-piglets-id={weaningRecord.id}
                  value={weaningRecord.gilts_contains}
                  checked={weaningRecord.gilts_contains}
                  defaultValue={weaningRecord.gilts_quantity <= 0}
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