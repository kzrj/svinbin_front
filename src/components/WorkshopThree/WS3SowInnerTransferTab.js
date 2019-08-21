import React, { Component } from 'react';


class WS3SowInnerTransferTab extends Component {
   constructor(props) {
    super(props);
    this.state = {
      activeSow: null,
      activeFromSectionId: null,
      activeCellFromLocationId: null,
      activeToSectionId: null,
      activeCellToLocationId: null,
    }
  }
  
  componentDidMount() {
    this.props.getSections({workshop: 3})    
  }

  clickFromSection = (e) => {
    const { sectionId } = e.target.dataset
    this.setState({
      ...this.state,
      activeFromSectionId: sectionId
    })

    this.props.getLocations1({by_section: sectionId})
  }

  clickToSection = (e) => {
    const { sectionId } = e.target.dataset
    this.setState({
      ...this.state,
      activeToSectionId: sectionId
    })
    this.props.getLocations2({by_section: sectionId})
  }

  clickCellFromLocation = (location) => {
    this.setState({
      ...this.state,
      activeCellFromLocationId: location.id,
      activeSow: location.sow_set.length > 0 ?
       location.sow_set[0] : null
    })
  }

  clickCellToLocation = (e) => {
    const { locationId } = e.target.dataset
    this.setState({
      ...this.state,
      activeCellToLocationId: locationId
    })
  }

  clickTransfer = () => {
    this.props.sowMoveTo({
      id: this.state.activeSow.id,
      location: this.state.activeCellToLocationId
    })
    this.props.getLocations1({by_section: this.state.activeFromSectionId})
    this.props.getLocations2({by_section: this.state.activeToSectionId})
    this.setState({
      ...this.state,
      activeSow: null
    })
  }

  render() {
    const { sections, locations1, locations2 } = this.props
    
    return (
        <div className='row workshop-content'>
          <div className='col-6'>
            <div className='row'>
                {sections.map((section, key) => 
                    <div className={ this.state.activeFromSectionId == section.id ? 
                      'col-sm section-button section-active': 'col-sm section-button '
                      } onClick={this.clickFromSection}
                      data-section-id={section.id}
                      key={key}>
                      ID{section.id} {section.name}
                    </div>
                )}
            </div>
            <div className='row'>
              {locations1.map(location =>
                  <div className={this.state.activeCellFromLocationId == location.id ? 
                    'col-md-5 cell cell-active' : 'col-md-5 cell'}
                    onClick={() => this.clickCellFromLocation(location)}
                    key={location.id}>
                    ID{location.id} 
                    {location.is_empty && 'Пустая'}
                  </div>
              )}
              {locations1.length < 1 && 'Выберите секцию'}
            </div>
          </div>
          <div className='col-6'>
            <div className='row'>
                {sections.map((section, key) => 
                    <div className={ this.state.activeToSectionId == section.id ? 
                      'col-sm section-button section-active': 'col-sm section-button '
                      } onClick={this.clickToSection}
                      data-section-id={section.id}
                      key={key}>
                      ID{section.id} {section.name}
                    </div>
                )}
              </div>
              <div className='row'>
                {locations2.map((location, key) =>
                  <div className={this.state.activeCellToLocationId == location.id ? 
                    'col-md-5 cell cell-active' : 'col-md-5 cell'}
                    onClick={this.clickCellToLocation}
                    data-location-id={location.id}
                    data-piglets={location.nomadpigletsgroup_set}
                    key={key}>
                    ID{location.id} 
                    {location.is_empty && 'Пустая'}
                  </div>
                )}
                {locations2.length < 1 && 'Выберите секцию'}
              </div>
          </div>
        <div>
          <div>
            {this.state.activeSow && 
              <ul>
                <li>{this.state.activeSow.id}</li>
                <li>{this.state.activeSow.farm_id}</li>
                <li>{this.state.activeSow.status}</li>
              </ul>  
            }
          </div>
          <button onClick={this.clickTransfer}>
            Отправить в Цех8
          </button>
        </div>
      </div>
    )
  }
}

export default WS3SowInnerTransferTab