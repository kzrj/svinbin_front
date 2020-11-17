import React, { Component } from 'react';
import _ from 'lodash';

import { ErrorMessage } from './CommonComponents'


export function SowFindByIdWithoutGet (props) {

const { sows, sow, fetching, sowIdValue, error, queryCount } = props

return (
    <div className=''>
        <div className="input-group mb-3">
            <input type='number' onChange={props.getSowsById} 
            className="form-control search-input" value={sowIdValue}
            placeholder="Номер свиноматки"/>
        </div>
        <div className="input-group mb-3">
            <button className='btn btn-secondary mx-2'
                onClick={() => props.getGilts()}>
                Показать только ремонтных
            </button>
        </div>
        <p>Количество: {queryCount}</p>
        <div className=''>
            <ul className='list-unstyled'>
            {!error 
                ? fetching 
                    ? <p className='loading'>Загрузка</p> 
                    : (sows.length > 0) && 
                        sows.map(sowInList => 
                            <li className={(sow && sowInList.id == sow.id)
                                ? 'sow-active sow-li my-0 py-0 pl-3 text-justify' 
                                : 'sow-li my-0 py-0 pl-3 text-justify'} 
                            key={sowInList.id} 
                            onClick={() => props.setSow(sowInList)}>
                                <p className='sow-list-farm-id my-0 '>{sowInList.farm_id}</p>
                                <p className='my-0 '>
                                    {sowInList.tour ? sowInList.tour.replace(' 2019г','') : ''}
                                </p>
                                <p className='mr-3 my-0 '>{sowInList.status}</p>
                                {sowInList.birth_id &&
                                    <span className='float-right'>
                                        №бирки {sowInList.birth_id}
                                    </span>
                                }
                                
                            </li>
                        )
                : <ErrorMessage error={error} />
            }
            </ul>
        </div>
    </div>
  )
}


export class SowFindByIdMany extends Component {
    render() {
      const { sows, choosedSows, fetching, sowIdValue, error } = this.props
      return (
         <div className='workshop-content-column-1'>
            <div class="input-group mb-3">
                <input type='number' onChange={this.props.getSowsById} 
                className="form-control search-input" value={sowIdValue}
                placeholder="Номер свиноматки"/>
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
                    <ErrorMessage error={error} />
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


export const SowSectionFilter = (props) => (
    <div className="input-group mb-3 col-3">
        <select className="custom-select" id="inputGroupSelect01" name='by_section_in_cell'
            onChange={props.setQuery}>
            <option selected value=''>Все секции</option>
            {props.sections.map((section, key) =>
            <option value={section.section_id} key={key}>
                Секция {' '} {section.section_number}
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
      <option selected>Выберите тип выбытия...</option>
      {props.cullingTypes.map(cType =>
        <option value={cType.value}>{cType.label}</option>
        )}
      {/* <option value='padej' >Падеж</option>
      <option value='spec' >Спец. убой</option>
      <option value='vinuzhd' >Вынужден. убой</option>
      <option value='prirezka' >Прирезка</option> */}
    </select>
    )
  
export const CullingReasonInput = (props) => (
    <input type='text' value={props.culling_reason} 
        onChange={props.setData} 
        name='culling_reason' 
        className=""
        placeholder="Причина" />
)

export const WeighingPigletsInput = (props) => (
    <div className="">

        <div className="form-check">
            <input type="checkbox" className="form-check-input" id="new-amount-check"
                onChange={props.turnOnNewAmount} />
            <label className="form-check-label" htmlFor="new-amount-check">
                Другое количество поросят?
            </label>
        </div>

        {props.checkNewAmount &&
            <div className="form-group">
                {/* <label htmlFor="new_amount">Вес</label> */}
                <input type='number'
                    id='new_amount'
                    className="form-control search-input"
                    value={props.newAmount}
                    name='newAmount'
                    placeholder="Другое количество поросят, которое хотите взвесить."
                    aria-describedby="newAmountHelp"
                    onChange={props.setData}/>
                <small id="newAmountHelp" className="form-text text-muted">
                    Укажите другое количество поросят</small>
            </div>
        }

        <div className="form-group">
            {/* <label for="weighing">Вес</label> */}
            <input type='number'
                id='weighing'
                className="form-control search-input"
                value={props.totalWeight}
                name='totalWeight'
                placeholder="Укажите вес"
                onChange={props.setData}/>
        </div>

        <button className='btn btn-outline-secondary' onClick={props.weighing}>
            Взвесить
        </button>
    </div>
)

export const SplitPigletsInput = (props) => (
    <form className="">
        <div className="form-check">
            <input type="checkbox" className="form-check-input" id="new-amount-check"
                name='changeQuantity'
                onChange={props.checked} />
            <label className="form-check-label" htmlFor="new-amount-check">
                Изменить количество
            </label>
        </div>
        {props.changeQuantity &&
            <div className="form-row">
                {/* <label htmlFor="quantity">Вес</label> */}
                <div className='col'>
                    <input type='number'
                        id='quantity'
                        className="form-control search-input"
                        value={props.quantity}
                        name='quantity'
                        placeholder={props.helpMessage}
                        aria-describedby="quantityHelp"
                        onChange={props.setData}/>
                    <small id="quantityHelp" className="form-text text-muted">
                        {props.helpMessage}
                    </small>
                </div>

                <div className='col'>
                    Переводим ремонтных?
                    <input type='checkbox'
                        id='gilts_contains'
                        className="form-control"
                        value={props.gilts_contains}
                        checked={props.gilts_contains}
                        name='gilts_contains'
                        // placeholder={props.helpMessage}
                        aria-describedby="giltHelp"
                        onChange={props.checked}/>
                    {/* <small id="giltHelp" className="form-text text-muted">
                        Переводим ремонтных?
                    </small> */}
                </div>
            </div>
        }
    </form>
)


// export const SplitPigletsInput = (props) => (

// )