import React, { Component } from 'react';


class WS5InnerTransferTab extends Component {
   constructor(props) {
    super(props);
    this.state = {
      activePiglets: {
        id: 0,
        quantity: 0,
        gilt_quantity: 0
      },
      activeFromSectionId: null,
      activeCellFromLocationId: null,
      activeToSectionId: null,
      activeCellToLocationId: null,
    }
  }
  
  componentDidMount() {
    // query
    this.props.getSections({workshop: 6})
    // this.props.getLocations({by_section: 8})
  }
  showProps = () => {
    console.log(this.props)
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
      activePiglets: location.nomadpigletsgroup_set.length > 0 ?
       location.nomadpigletsgroup_set[0] : 0
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
    let data = {
      id: this.state.activePiglets.id,
      quantity: this.state.activePiglets.quantity,
      gilt_quantity: 0,
      to_location: this.state.activeCellToLocationId
    }
    this.props.movePiglets(data)
    this.props.getLocations1({by_section: this.state.activeFromSectionId})
    this.props.getLocations2({by_section: this.state.activeToSectionId})
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
            {this.state.activePiglets.id > 0 && 
              <ul>
                <li>{this.state.activePiglets.id}</li>
                <li>{this.state.activePiglets.quantity}</li>
                <li>{this.state.activePiglets.gilt_quantity}</li>
              </ul>  
            }
          </div>
          <button onClick={this.clickTransfer}>
            Переместить
          </button>
        </div>
      </div>
    )
  }
}

export default WS5InnerTransferTab