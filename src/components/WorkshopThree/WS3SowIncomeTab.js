import React, { Component } from 'react';


class WS3SowIncomeTab extends Component {
   constructor(props) {
    super(props);
    this.state = {
      query: {by_workshop_number: 3,},
      activeSectionId: null,
      activeCellId: null,
    }
  }
  
  componentDidMount() {
    this.props.getSows(this.state.query)
    this.props.getSections({workshop: 3})
    
  }

  getSowsById = (e) => {
    let { query } = this.state
    query.farm_id_starts = e.target.value
    this.setState({
      ...this.state,
      query: query
    })
    this.props.getSows(query)
  }

  clickCell = (e) => {
    const { locationId } = e.target.dataset
    this.setState({
      ...this.state,
      activeCellId: locationId
    })
  }

  clickSection = (e) => {
    const { sectionId } = e.target.dataset
    this.setState({
      ...this.state,
      activeSectionId: sectionId
    })
    this.props.getLocations({by_section: sectionId})
  }

  clickSetlle = () => {
    const { activeCellId } = this.state
    this.props.sowMoveTo({id: this.props.sow.id, location: activeCellId})
  }

  render() {
    const { sows, sow, sections, locations } = this.props
    return (
        <div className='row workshop-content'>
          <div className='col-3 workshop-left-column'>
            <div className='workshop-header-2 under-menu-line text-center'>
              <p >ПОИСК ПО ID</p>
            </div>
            <div className='workshop-content-column-1'>
              <input type='text' onChange={this.getSowsById} className="search-input"/>
              <ul className='list-unstyled'>
                {sows.length > 0 && sow &&
                  sows.map(sowInList => 
                    <li className={sowInList.id == sow.id ? 'sow-active sow-li text-center' : 'sow-li text-center'} 
                      key={sowInList.id} 
                      onClick={() => this.props.getSow(sowInList.id)}>
                      {sowInList.farm_id}
                    </li>)
                }
              </ul>
            </div>
          </div>
          <div className='col-9 workshop-right-column'>
            <div className='row'>
                {sections.map((section, key) => 
                    <div className={ this.state.activeSectionId == section.id ? 
                      'col-sm section-button section-active': 'col-sm section-button '
                      } onClick={this.clickSection}
                      data-section-id={section.id}
                      key={key}>
                      ID{section.id} {section.name}
                    </div>
                )}
              </div>
              <div className='row'>
                {locations.map(location =>
                    <div className={this.state.activeCellId == location.id ? 
                      'col-md-5 cell cell-active' : 'col-md-5 cell'}
                      onClick={this.clickCell}
                      data-location-id={location.id}
                      key={location.id}>
                      ID{location.id} 
                    </div>
                )}
                {locations.length < 1 && 'Выберите секцию'}
              </div>
              <div>
                <button onClick={this.clickSetlle}>
                  Разместить свиноматку
                </button>
              </div>
          </div>
        </div>
    )
  }
}

export default WS3SowIncomeTab