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
    let { locations, activeCellIds, fetching, isSection } = this.props
    console.log('isSection', isSection)
    return (
      <div className='row'>
        {isSection ? 
          fetching ? <p className='loading'>Загрузка</p> :
          locations.map(location =>
              <SowCell 
                location={location}
                activeCellIds={activeCellIds}
                clickLocation={this.props.clickLocation}/>
          )
          :
          <p className='choose-section'>Выберите секцию</p>
        }
        {/* {locations.length < 1 && !fetching && <p className='choose-section'>Выберите секцию</p>} */}
      </div>
    )
  }
 }

 export class SowCell extends Component {

  render() {
    const { location, activeCellIds } = this.props
    const sow = location.sow_set.length > 0 ? location.sow_set[0] : null
    const more_than_one_sow = location.sow_set.length > 1 ? true : false

    const piglets = location.newbornpigletsgroup_set.length > 0 ?
      location.newbornpigletsgroup_set[0] : 
      location.nomadpigletsgroup_set.length > 0 ?
        location.nomadpigletsgroup_set[0] :
        null

    const cellClassName = activeCellIds.includes(location.id) ? 
      'col-sm-2 cell cell-active' : 
        location.is_sow_empty ? 'col-sm-2 cell' : 'col-sm-2 cell-full'
    
    const tour = sow ? sow.tour.replace(' 2019г','') : ''
    const section = location.sowAndPigletsCell ? location.sowAndPigletsCell.section : ''
    return (
      <div 
        className={cellClassName}
        onClick={() => this.props.clickLocation(location)}
        key={location.id}>
          {location.sowAndPigletsCell && 
            <span className='cell-setion-number'>#{section}-{location.sowAndPigletsCell.number}</span>}
          <br/>
          {sow && [
              <span className='cell-sow-farmId'>{sow.farm_id}</span>,
              <br/>,
              <span className='cell-sow-status'>{sow.status}</span>,
              <br/>,
              <span className='cell-tour'>{tour}</span>
            ]}
          {more_than_one_sow && 'Ошибка! Больше одной свиньи в клетке!'}
          <br/>
          {piglets && 
            <span className='cell-piglets-count'>Поросят {piglets.quantity}</span>}
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
    const piglets = location.newbornpigletsgroup_set.length > 0 ?
      location.newbornpigletsgroup_set[0] : 
      location.nomadpigletsgroup_set.length > 0 ?
        location.nomadpigletsgroup_set[0] :
        null
    const tour = piglets ? piglets.tour.replace(' 2019г','') : ''
    const section = location.sowAndPigletsCell ? location.sowAndPigletsCell.section : 
      location.pigletsGroupCell ? location.pigletsGroupCell.section : null
    return (
      <div 
        className={cellClassName}
        onClick={() => this.props.clickLocation(location)}
        key={location.id}>
          {location.sowAndPigletsCell && 
            <span className='cell-setion-number'>#{section}-{location.sowAndPigletsCell.number}</span>}
          {location.pigletsGroupCell && 
            <span className='cell-setion-number'>#{section}-{location.pigletsGroupCell.number}</span>}
          <br/>
          {tour && <span className='cell-tour'>{tour}</span>}
          <br/>
          {piglets && 
            <span className='cell-piglets-count'>Поросят {piglets.quantity}</span>}
      </div>
  )}
 }