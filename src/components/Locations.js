import React, { Component } from 'react';


export class Sections extends Component {
  render() {
    const { sections, activeSectionId, fetching, error } = this.props
    const sectionClass = 'border border-mainDark-dark px-2 py2 float-left '

    return (
      <div className='my-2'>
        {!error ? 
          fetching 
            ? <p className='loading'>Загрузка</p> 
            : sections.map((section, key) => 
              <div className={activeSectionId == section.section_id 
                ? sectionClass + ' section-active'
                : sectionClass
                }
                style={{'height': '50px'}}
                onClick={this.props.clickSection}
                data-section-id={section.section_id}
                key={key}>
                {section.section_name}
              </div>)
          : <p className='error-message'>{error}</p>
        }
        <div className='clearfix'></div>
      </div>
    )
  }
 }

export class SowCells extends Component {

  render() {
    let { locations, activeCellIds, fetching, isSection, error, fromCellId, toCellId } = this.props
    return (
      <div className='row mb-5 pb-4'>
        {!error ?
          isSection ? 
            fetching ? <p className='loading'>Загрузка</p> :
            locations.map((location, key) =>
                <SowCell 
                  key={key}
                  location={location}
                  activeCellIds={activeCellIds}
                  fromCellId={fromCellId}
                  toCellId={toCellId}
                  clickLocation={this.props.clickLocation}/>
            )
            :
            <p className='choose-section'>Выберите секцию</p>
          :
          <p className='error-message'>{error}</p>
        }
      </div>
    )
  }
 }

 export class SowCell extends Component {

  render() {
    const { location, activeCellIds, fromCellId, toCellId } = this.props
    const sow = (location.sow_set && location.sow_set.length > 0) ? location.sow_set[0] : null
    const more_than_one_sow = (location.sow_set && location.sow_set.length > 1) ? true : false

    const piglets = location.piglets.length > 0 ?
      location.piglets[0] : null

    let cellClassName = activeCellIds.includes(location.id) ? 
      'col-2 cell cell-active' : 
        location.is_sow_empty ? 'col-2 cell' : 'col-2 cell-full cell'

    if (fromCellId === location.id)
      cellClassName = 'col-2 cell bg-teal-dark'
    
    if (toCellId === location.id)
      cellClassName = 'col-2 cell bg-brown1-dark'
    
    const tour = sow ? sow.tour && sow.tour.replace(' 2019г','').replace(' 2020г','') : null
    return (
      <div 
        className={cellClassName}
        onClick={() => this.props.clickLocation(location)}
       >
          <span className='cell-setion-number'>#{location.cell}</span>
          <br/>
          {sow && [
              <span key={sow.farm_id} className='cell-sow-farmId'>{sow.farm_id}</span>,
              <br/>,
              <span className='cell-sow-status'>{sow.status}</span>,
              tour &&
              [<br/>,
              <span key={sow.farm_id + tour} className='cell-tour color-green1-dark'>{tour}</span>]
            ]}
          {more_than_one_sow && 'Ошибка! Больше одной свиньи в клетке!'}
          <br/>
          {piglets && 
            <span className='cell-piglets-count'>П {piglets.quantity}</span>}
          {/* {!tour && pigletsTour && [<br/>, <span className='cell-tour'>{pigletsTour}</span>]} */}
      </div>
  )}
 }

 export class PigletsCells extends Component {

  render() {
    let { locations, activeCellIds, isSection, fetching, error, className, grid, fromCellId, toCellId } = this.props

    return (
      <div className={className +  ' row d-flex justify-content-center'}>
        {!error ? 
          isSection ? 
            fetching ? <p className='loading'>Загрузка</p> :
              locations.length > 0 && locations.map((location, key) =>
                <PigletsCell
                  key={key}
                  location={location}
                  activeCellIds={activeCellIds}
                  clickLocation={this.props.clickLocation}
                  user={this.props.user}
                  grid={grid}
                  fromCellId={fromCellId}
                  toCellId={toCellId}
                  />
                )
          :
          <p className='choose-section'>Выберите секцию</p>
        :
        <p className='error-message'>{error}</p>
        }
      </div>
    )
  }
 }


 export class PigletsCell extends Component {

  render() {
    const { location, activeCellIds, grid, fromCellId, toCellId } = this.props

    let cellClassName = activeCellIds.includes(location.id) ? 
     grid + 'cell cell-active' : 
        location.is_piglets_empty ? grid + 'cell' : grid + 'cell-full cell'

    if (fromCellId === location.id)
      cellClassName =  grid +' cell bg-teal-dark'
    
    if (toCellId === location.id)
      cellClassName = grid + ' cell bg-brown1-dark'
    
    const piglets = location.piglets && location.piglets.length > 0 ? location.piglets[0] : null
    let age = ''
    piglets && piglets.age.split(' ').length > 1 
      ? age = piglets.age.split(' ')[0]
      : age = 0
    return (
      <div 
        className={cellClassName}
        onClick={() => this.props.clickLocation(location)}
        >
          <span className='cell-setion-number'>#{location.cell}</span>
          <br/>
          {piglets && 
            <div>
              {piglets.gilts_quantity > 0 && 
                <span className="d-block badge badge-warning">Рм {piglets.gilts_quantity}</span>}
              {this.props.user && this.props.user.is_officer && <span>id {piglets.id}</span>}
              <div className='cell-piglets-count'>П {piglets.quantity}</div>
              <div className='cell-piglets-metatour'>
                  {/* {piglets.age.split(' ')[0]}д */}
                  {age}д
              </div>
              <div className='cell-piglets-metatour'>
                  {piglets.week_tour && 'Т '+ piglets.week_tour.split(' ')[1]}
              </div>
            </div>}
          <br/>

      </div>
  )}
 }


 export class SectionsWs3 extends Component {

  render() {
    const { sections, activeSectionId, fetching, error } = this.props
     
    return (
      <div className='row'>
        {!error ? 
          fetching ? <p className='loading'>Загрузка</p> :
            sections.map((section, key) => 
              <div className={ activeSectionId == section.id ? 
                'col-5 section-ws3-button section-ws3-active': 'col-5 section-ws3-button '
                } onClick={this.props.clickSection}
                data-section-id={section.id}
                data-location-id={section.location}
                key={key}>
                <span className='section-name'>{section.name}</span>
                {section.sows_count_by_tour.map(tour => 
                  <div>
                    <span className='section-tour' 
                      onClick={this.props.clickSection}
                      data-section-id={section.id}
                      data-location-id={section.location}>Тур {tour.week_number} - </span>
                    <span className='section-count-sows' 
                      onClick={this.props.clickSection}
                      data-section-id={section.id}
                      data-location-id={section.location}> свиноматок {tour.count_sows}</span>
                  </div>)}
              </div>)
          :
          <p className='error-message'>{error}</p>
        }
      </div>
    )
  }
 }