import React, { Component } from 'react';


export class Sections extends Component {

  render() {
    const { sections, activeSectionId, fetching, error } = this.props
     
    return (
      <div className='row'>
        {!error ? 
          fetching ? <p className='loading'>Загрузка</p> :
            sections.map((section, key) => 
              <div className={ activeSectionId == section.id ? 
                'col-sm-2 section-button section-active': 'col-sm-2 section-button '
                } onClick={this.props.clickSection}
                data-section-id={section.id}
                key={key}>
                {section.name}
              </div>)
          :
          <p className='error-message'>{error}</p>
        }
      </div>
    )
  }
 }

export class SowCells extends Component {

  render() {
    let { locations, activeCellIds, fetching, isSection, error } = this.props
    return (
      <div className='row div-cells'>
        {!error ?
          isSection ? 
            fetching ? <p className='loading'>Загрузка</p> :
            locations.map(location =>
                <SowCell 
                  location={location}
                  activeCellIds={activeCellIds}
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
    const { location, activeCellIds } = this.props
    const sow = location.sow_set.length > 0 ? location.sow_set[0] : null
    const more_than_one_sow = location.sow_set.length > 1 ? true : false

    const piglets = location.newbornpigletsgroup_set.length > 0 ?
      location.newbornpigletsgroup_set[0] : 
      location.nomadpigletsgroup_set.length > 0 ?
        location.nomadpigletsgroup_set[0] :
        null

    const cellClassName = activeCellIds.includes(location.id) ? 
      'col-sm-1 cell cell-active' : 
        location.is_sow_empty ? 'col-sm-1 cell' : 'col-sm-1 cell-full cell'
    
    const tour = sow ? sow.tour && sow.tour.replace(' 2019г','') : null
    const pigletsTour = piglets ? piglets.tour && piglets.tour.replace(' 2019г','') : null
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
              tour &&
              [<br/>,
              <span className='cell-tour'>{tour}</span>]
            ]}
          {more_than_one_sow && 'Ошибка! Больше одной свиньи в клетке!'}
          <br/>
          {piglets && 
            <span className='cell-piglets-count'>П {piglets.quantity}</span>}
          {!tour && pigletsTour && [<br/>, <span className='cell-tour'>{pigletsTour}</span>]}
      </div>
  )}
 }

 export class PigletsCells extends Component {

  render() {
    let { locations, activeCellIds, isSection, fetching, error } = this.props

    return (
      <div className='row'>
        {!error ? 
          isSection ? 
            fetching ? <p className='loading'>Загрузка</p> :
              locations.map(location =>
                    <PigletsCell 
                      location={location}
                      activeCellIds={activeCellIds}
                      clickLocation={this.props.clickLocation}
                      gilts={this.props.gilts}
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
    const { location, activeCellIds } = this.props
    const cellClassName = activeCellIds.includes(location.id) ? 
      'col-sm-1 cell cell-active' : 
        location.is_piglets_empty ? 'col-sm-1 cell' : 'col-sm-1 cell-full cell'
    const piglets = location.newbornpigletsgroup_set.length > 0 ?
      location.newbornpigletsgroup_set[0] : 
      location.nomadpigletsgroup_set.length > 0 ?
        location.nomadpigletsgroup_set[0] :
        null
    const tour = piglets ? piglets.tour && piglets.tour.replace(' 2019г','') : ''
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
          {piglets && 
            <span className='cell-piglets-count'>П {piglets.quantity}</span>}
          <br/>
          {tour && <span className='cell-tour'>{tour}</span>}
          <br/>
          {this.props.gilts && piglets && 
            <span className='gilts-quantity'>рем {piglets.gilts_quantity}</span>}
          
      </div>
  )}
 }