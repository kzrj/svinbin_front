import React, { Component } from 'react';


export class SowFindById extends Component {

 render() {
   const { sows, sow } = this.props
    
   return (
      <div className='workshop-content-column-1'>
        <div class="input-group mb-3">
          <input type='number' onChange={this.props.getSowsById} 
            className="form-control search-input"
            placeholder="Поиск по ID"/>
        </div>
          <ul className='list-unstyled'>
            {sows.length > 0 && sow &&
              sows.map(sowInList => 
                <li className={sowInList.id == sow.id ? 'sow-active sow-li text-center' :
                   'sow-li text-center'} 
                  key={sowInList.id} 
                  onClick={() => this.props.getSow(sowInList.id)}>
                  {sowInList.farm_id}
                </li>)
            }
          </ul>
      </div>
   )
 }
}

export class SowLightDetail extends Component {
  render() {
    const { sow } = this.props
    return (
      <ul>
        <li>{sow.id}</li>
        <li>{sow.location}</li>
        <li>{sow.status}</li>
        <li>{sow.farm_id}</li>
      </ul>
    )
  }
 }

export class SowCells extends Component {

  render() {
    let { locations, activeCellIds } = this.props

    return (
      <div className='row'>
        {locations.map(location =>
            <SowCell 
              location={location}
              activeCellIds={activeCellIds}
              clickLocation={this.props.clickLocation}/>
        )}
        {locations.length < 1 && 'Выберите секцию'}
      </div>
    )
  }
 }

 export class SowCell extends Component {

  render() {
    const { location, activeCellIds } = this.props
    const cellClassName = activeCellIds.includes(location.id) ? 
      'col-sm cell cell-active' : 
        location.is_sow_empty ? 'col-sm cell' : 'col-sm cell-full' 
    return (
      <div 
        className={cellClassName}
        onClick={() => this.props.clickLocation(location)}
        key={location.id}>
          #{location.sowAndPigletsCell && location.sowAndPigletsCell.number}
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

 export class Sections extends Component {

  render() {
    const { sections, activeSectionId } = this.props
     
    return (
      <div className='row'>
        {sections.map((section, key) => 
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