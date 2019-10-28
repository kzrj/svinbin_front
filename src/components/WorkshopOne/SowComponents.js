import React, { Component } from 'react';


export default class SowToursData extends Component {
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


export class SowFilter extends Component {

  render() {
    const { tours } = this.props
    return (
      <div className='commonfilter row'>
        <div className="input-group mb-3 col-3">
          <input type="text" className="form-control" placeholder="Farm ID"
            aria-label="Farmid" aria-describedby="basic-addon1"
            onChange={this.props.setSowFarmId} />
        </div>
        <div className="input-group mb-3 col-3">
          <select className="custom-select" id="inputGroupSelect01" 
              onChange={this.props.setTour}>
              <option selected value=''>Выбрать тур</option>
              {tours.map(tour =>
                <option value={tour.id} key={tour.id}>
                  Неделя{tour.week_number}
                </option>
                )}
            </select>
        </div>
        {this.props.seminationTab &&
          <div className="input-group mb-3 col-3">
            <select className="custom-select" id="inputGroupSelect01"
              onChange={this.props.setSeminatedStatus}>
              <option selected value='seminated=0'>Ожидает осеменения</option>
              <option value='seminated=1'>Осеменена 1</option>
            </select>
          </div>
        }
        {this.props.usoundTab &&
          <div className="input-group mb-3 col-3">
            <select className="custom-select" id="inputGroupSelect01"
              onChange={this.props.setSeminatedStatus}>
              <option selected value='seminated=2'>Осеменена 2</option>
              <option value='seminated=1'>Осеменена 1</option>
            </select>
          </div>
        }
      </div>
    )
  }
 }

 export class SowFarmIdFilter extends Component {
  render() {
    return (
        <div className="input-group mb-3 col-3">
          <input type="text" className="form-control" placeholder="Farm ID"
            aria-label="Farmid" aria-describedby="basic-addon1" name='farm_id_starts'
            onChange={this.props.setQuery} />
        </div>
    )
  }
 }

 export class SowTourFilter extends Component {
  render() {
    const { tours } = this.props
    return (
      <div className="input-group mb-3 col-3">
        <select className="custom-select" id="inputGroupSelect01" name='tour'
            onChange={this.props.setQuery}>
            <option selected value=''>Выбрать тур</option>
            {tours.map(tour =>
              <option value={tour.id} key={tour.id}>
                Неделя {' '} {tour.week_number}
              </option>
              )}
          </select>
      </div>
    )
  }
 }

 export class SowSeminatedFilter extends Component {
  render() {
    return (
      <div className="input-group mb-3 col-3">
        <select className="custom-select" id="inputGroupSelect01"
          onChange={this.props.setSeminatedSuporosStatus}>
          <option selected value='to_seminate=true'>Ожидает осеменения</option>
          <option value='status_title_in=Осеменена 1'>Осеменена 1</option>
        </select>
      </div>
    )
  }
 }

export class SowUsound30Filter extends Component {
  render() {
    return (
      <div className="input-group mb-3 col-3">
        <select className="custom-select" id="inputGroupSelect01"
          onChange={this.props.setQuery} name='status_title'>
          <option selected value='Осеменена 2'>Осеменена 2</option>
          {/* <option value='Супорос 30'>Супорос 30</option> */}
        </select>
      </div>
    )
  }
 }

 export class SowUsound60Filter extends Component {
  render() {
    return (
      <div className="input-group mb-3 col-3">
        <select className="custom-select" id="inputGroupSelect01"
          onChange={this.props.setQuery} name='status_title'>
          {/* <option selected value='Осеменена 2'>Осеменена 2</option> */}
          <option selected value='Супорос 30'>Супорос 28</option>
        </select>
      </div>
    )
  }
 }

export class SowSemUsoundFilter extends Component {
  render() {
    return (
      <div className="input-group mb-3 col-3">
        <select className="custom-select" id="inputGroupSelect01"
          onChange={this.props.setSeminatedSuporosStatus}>
          <option value='to_seminate=true'>Не Осеменена, нет УЗИ</option>
          <option value='farm_id_isnull=true'>Ремонтные</option>
          <option value='status_title=Осеменена 1'>Осеменена 1</option>
          <option value='status_title=Осеменена 2'>Осеменена 2</option>
          <option value='status_title=Супорос 30'>Супорос 28</option>
          <option selected value='status_title=Супорос 60'>Супорос 35</option>
        </select>
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