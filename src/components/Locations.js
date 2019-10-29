import React, { Component } from 'react';


export class Sections extends Component {

  render() {
    const { sections, activeSectionId, fetching } = this.props
     
    return (
      <div className='row'>
        {fetching ? <p className='loading'>Загрузка</p> :
          sections.map((section, key) => 
            <div className={ activeSectionId == section.id ? 
              'col-sm section-button section-active': 'col-sm section-button '
              } onClick={this.props.clickSection}
              data-section-id={section.id}
              key={key}>
              {section.name}
            </div>
        )}
      </div>
    )
  }
 }

export class SowCells extends Component {

  render() {
    let { locations, activeCellIds, fetching } = this.props

    return (
      <div className='row'>
        {fetching ? <p className='loading'>Загрузка</p> :
          locations.map(location =>
              <SowCell 
                location={location}
                activeCellIds={activeCellIds}
                clickLocation={this.props.clickLocation}/>
          )}
        {locations.length < 1 && !fetching && 'Выберите секцию'}
      </div>
    )
  }
 }

 export class SowCell extends Component {

  render() {
    const { location, activeCellIds } = this.props
    const sow = location.sow_set.length > 0 ? location.sow_set[0] : null
    const more_than_one_sow = location.sow_set.length > 1 ? true : false

    const cellClassName = activeCellIds.includes(location.id) ? 
      'col-sm cell cell-active' : 
        location.is_sow_empty ? 'col-sm cell' : 'col-sm cell-full' 
    return (
      <div 
        className={cellClassName}
        onClick={() => this.props.clickLocation(location)}
        key={location.id}>
          #{location.sowAndPigletsCell && location.sowAndPigletsCell.number}
          <br/>
          {sow && sow.farm_id}
          {more_than_one_sow && 'Ошибка! Больше одной свиньи в клетке!'}
      </div>
  )}
 }

 export class PigletsCells extends Component {

  render() {
    let { locations, activeCellIds } = this.props

    return (
      <div className='row'>
        {locations.map(location =>
            <PigletsCell 
              location={location}
              activeCellIds={activeCellIds}
              clickLocation={this.props.clickLocation}/>
        )}
        {locations.length < 1 && 'Выберите секцию'}
      </div>
    )
  }
 }


 export class PigletsCell extends Component {

  render() {
    const { location, activeCellIds } = this.props
    const cellClassName = activeCellIds.includes(location.id) ? 
      'col-sm cell cell-active' : 
        location.is_piglets_empty ? 'col-sm cell' : 'col-sm cell-full' 
    return (
      <div 
        className={cellClassName}
        onClick={() => this.props.clickLocation(location)}
        key={location.id}>
          #
          {location.sowAndPigletsCell && location.sowAndPigletsCell.number}
          {location.pigletsGroupCell && location.pigletsGroupCell.number}
      </div>
  )}
 }