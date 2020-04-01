import React, { Component } from 'react';


export class Sections extends Component {

  render() {
    const { sections, activeSectionId, fetching, error } = this.props
     
    return (
      <div className='row'>
        {!error ? 
          fetching ? <p className='loading'>Загрузка</p> :
            sections.map((section, key) => 
              <div className={ activeSectionId == section.section_id ? 
                'col-sm-2 section-button section-active': 'col-sm-2 section-button '
                } onClick={this.props.clickSection}
                data-section-id={section.section_id}
                key={key}>
                {section.section_name} 
                {/* {section.pigs_count && [<br/>, 'Кол-во ',section.pigs_count]} */}
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
            locations.map((location, key) =>
                <SowCell 
                  key={key}
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

    const piglets = location.piglets.length > 0 ?
      location.piglets[0] : null

    const cellClassName = activeCellIds.includes(location.id) ? 
      'col-sm-1 cell cell-active' : 
        location.is_sow_empty ? 'col-sm-1 cell' : 'col-sm-1 cell-full cell'
    
    const tour = sow ? sow.tour && sow.tour.replace(' 2019г','') : null
    // const pigletsTour = piglets ? piglets.tour && piglets.tour.replace(' 2019г','') : null
    const pigletsTour = null
    return (
      <div 
        className={cellClassName}
        onClick={() => this.props.clickLocation(location)}
        key={location.id}>
          <span className='cell-setion-number'>#{location.cell}</span>
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
          {/* {!tour && pigletsTour && [<br/>, <span className='cell-tour'>{pigletsTour}</span>]} */}
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
              locations.length > 0 && locations.map((location, key) =>
                    <PigletsCell
                      key={key}
                      location={location}
                      activeCellIds={activeCellIds}
                      clickLocation={this.props.clickLocation}
                      // gilts={this.props.gilts}
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
    const piglets = location.piglets && location.piglets.length > 0 ? location.piglets[0] : null
    // const tour = piglets ? piglets.tour && piglets.tour.replace(' 2019г','') : ''
    return (
      <div 
        className={cellClassName}
        onClick={() => this.props.clickLocation(location)}
        key={location.id}>
          <span className='cell-setion-number'>#{location.cell}</span>
          <br/>
          {piglets && 
            <div>
              <div className='cell-piglets-count'>П {piglets.quantity}</div>
              {piglets.metatour_repr.length > 0 && piglets.metatour_repr.map(metatour => 
                <div className='cell-piglets-metatour'>
                  {metatour.days_left_from_farrow_approx} д Тур {metatour.tour}
                </div>
                )}
            </div>}
          {/* <br/>
          {tour && <span className='cell-tour'>{tour}</span>} */}
          <br/>
          {/* {this.props.gilts && piglets && 
            <span className='gilts-quantity'>рем {piglets.gilts_quantity}</span>} */}          
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