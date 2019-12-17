import React, { Component } from 'react';
import _ from 'lodash';


export class SowFindById extends Component {
    render() {
      const { sows, sow, fetching, sowIdValue, error } = this.props
       
      return (
         <div className='workshop-content-column-1'>
            <div class="input-group mb-3">
                <input type='number' onChange={this.props.getSowsById} 
                className="form-control search-input" value={sowIdValue}
                placeholder="Поиск по ID"/>
            <label>Количество: {sows.length}</label>
            </div>
            <div className='div-scroll'>
                <ul className='list-unstyled'>
                {!error ? fetching ? <p className='loading'>Загрузка</p> :
                    (sows.length > 0 && sow) && 
                    sows.map(sowInList => 
                        <li className={sowInList.id == sow.id ? 'sow-active sow-li text-center' :
                        'sow-li text-center'} 
                        key={sowInList.id} 
                        onClick={() => this.props.getSow(sowInList.id)}>
                        <span className='sow-list-farm-id'>{sowInList.farm_id}</span>
                        <span className='span-block span sow-list-tour'>
                            {sowInList.tour ? sowInList.tour.replace(' 2019г','') : ''}</span>
                        </li>)
                    :
                    <p className='error-message'>{error}</p>
                }
                </ul>
            </div>
         </div>
      )
    }
   }

export class SowFindByIdWithoutGet extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeSowId: null,
        }
        this.clickSow = this.clickSow.bind(this);
        }

    clickSow (e) {
        this.setState({
            ...this.state,
            activeSowId: e.target.dataset.id
        })
        }
    render() {
        const { sow, sows, fetching, sowIdValue, error } = this.props
        
        return (
            <div className='workshop-content-column-1'>
            <div class="input-group mb-3">
                <input type='number' onChange={this.props.getSowsById} 
                className="form-control search-input" value={sowIdValue}
                placeholder="Поиск по ID"/>
            <label>Количество: {sows.length}</label>
            </div>
            <div className='div-scroll'>
                <ul className='list-unstyled'>
                {!error ? fetching ? <p className='loading'>Загрузка</p> :
                    sows.length > 0 && sow && sows.asMutable().map(sowInList => 
                        <li className={sowInList.id == sow.id ? 
                                'sow-active sow-li text-center' :
                                'sow-li text-center'} 
                            key={sowInList.id}
                            data-id={sowInList.id}
                            onClick={() => this.props.setSow()}
                            >
                        <span className='sow-list-farm-id'>{sowInList.farm_id}</span>
                        <span className='span-block span sow-list-tour'>
                            {sowInList.tour ? sowInList.tour.replace(' 2019г','') : ''}</span>
                        </li>)
                    :
                    <p className='error-message'>{error}</p>
                }
                </ul>
            </div>
            </div>
        )
    }
}

export class SowFindByIdMany extends Component {
    render() {
      const { sows, choosedSows, fetching, sowIdValue, error } = this.props
      return (
         <div className='workshop-content-column-1'>
            <div class="input-group mb-3">
                <input type='number' onChange={this.props.getSowsById} 
                className="form-control search-input" value={sowIdValue}
                placeholder="Поиск по ID"/>
            <label>Количество: {sows.length}</label>
            </div>
            <div className='div-scroll'>
                <ul className='list-unstyled'>
                {!error ? fetching ? <p className='loading'>Загрузка</p> :
                    (sows.length > 0 ) && 
                        sows.map(sowInList => 
                            <SowRowFindByIdMany sow={sowInList} clickSow={this.props.clickSow}
                                choosedSows={choosedSows} />
                        )
                    :
                    <p className='error-message'>{error}</p>
                }
                </ul>
            </div>
         </div>
      )
    }
   }

export class SowRowFindByIdMany extends Component {
  render() {
    const { sow, choosedSows } = this.props
    const sowClassName = choosedSows.includes(sow.id.toString()) ? 'sow-row-active' : 'sow-row'
    return (
        <li className={sowClassName} 
            key={sow.id} 
            data-id={sow.id}
            onClick={this.props.clickSow}>
            <span className='sow-list-farm-id' onClick={this.props.clickSow}>{sow.farm_id}</span>
            <br/>
            <span className='sow-list-tour' onClick={this.props.clickSow}>
                {sow.tour ? sow.tour.replace(' 2019г','') : ''}</span>
            </li>
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
            <input type="number" className="form-control" placeholder="Farm ID"
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

export const SowSectionFilter = (props) => (
    <div className="input-group mb-3 col-3">
        <select className="custom-select" id="inputGroupSelect01" name='by_section'
            onChange={props.setQuery}>
            {/* <option selected value=''>Выбрать секцию</option> */}
            {props.sections.map(section =>
            <option value={section.id} key={section.id}>
                Секция {' '} {section.number}
            </option>
            )}
        </select>
    </div>
    )

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
        <option selected value='Супорос 28'>Супорос 28</option>
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
        <option value='status_title=Супорос 28'>Супорос 28</option>
        <option selected value='status_title=Супорос 35'>Супорос 35</option>
        </select>
    </div>
    )
}
}

export const CullingTypeInput = (props) => (
    <select className="custom-select" name='culling_type' 
      onChange={props.setData} value={props.culling_type}>
      <option selected>Выберите тип падежа...</option>
      <option value='padej' >Падеж</option>
      <option value='spec' >Спец. убой</option>
      <option value='prirezka' >Прирезка</option>
    </select>
    )
  
export const CullingReasonInput = (props) => (
<input type='text' value={props.culling_reason} 
    onChange={props.setData} 
    name='culling_reason' className="form-control search-input"
    placeholder="Причина" />
)

export const WeighingPigletsInput = (props) => (
<div className="input-group-append">
    <input type='text' 
    className="form-control search-input"
    value={props.totalWeight}  
    name='totalWeight'
    placeholder="Укажите вес"
    onChange={props.setData}/>
    <button className='btn btn-outline-secondary' onClick={props.weighing}>
    Взвесить
    </button>
</div>
)