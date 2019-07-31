import React, { Component } from 'react';


class WS4InnerTransferTab extends Component {
   constructor(props) {
    super(props);
    this.state = {
      piglets: props.piglets,
      activePiglets: {
        id: 0,
        quantity: 0,
        gilt_quantity: 0
      },
      activeSection1Id: null,
      activeCell1Id: null,
      activeSection2Id: null,
      activeCell2Id: null,
    }
  }
  
  componentDidMount() {
    // query
    this.props.getSections({workshop: 4})
    // this.props.getLocations({by_section: 8})
  }
  showProps = () => {
    console.log(this.props)
  }

  clickSection = (e) => {
    const { section1Id } = e.target.dataset
    this.setState({
      ...this.state,
      activeSection1Id: section1Id
    })

    this.props.getLocations1({by_section: section1Id})
  }

  clickSection2 = (e) => {
    const { section2Id } = e.target.dataset
    this.setState({
      ...this.state,
      activeSection2Id: section2Id
    })

    this.props.getLocations({by_section: section2Id})
  }

  clickCell = (e) => {
    const { locationId } = e.target.dataset
    this.props.getPiglets({location: locationId})
    this.setState({
      ...this.state,
      activeCell1Id: locationId
    })
  }

  clickTransfer = () => {
    let data = {
      id: this.props.piglets[0].id,
      quantity: this.props.piglets[0].quantity,
      gilt_quantity: 0,
      to_location: 5 // hardcode
    }
    this.props.movePiglets(data)
  }

  render() {
    const { sections, locations1, locations2 } = this.props
    
    return (
        <div className='row workshop-content'>
          <div className='col-6'>
            <div className='row'>
                {sections.map((section, key) => 
                    <div className={ this.state.activeSection1Id == section.id ? 
                      'col-sm section-button section-active': 'col-sm section-button '
                      } onClick={this.clickSection}
                      data-section1-id={section.id}
                      key={key}>
                      ID{section.id} {section.name}
                    </div>
                )}
            </div>
            <div className='row'>
              {locations1.map(location =>
                  <div className={this.state.activeCell1Id == location.id ? 
                    'col-md-5 cell cell-active' : 'col-md-5 cell'}
                    onClick={this.clickCell}
                    data-location1-id={location.id}
                    data-piglets={location.nomadpigletsgroup_set}
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
                    <div className={ this.state.activeSection2Id == section.id ? 
                      'col-sm section-button section-active': 'col-sm section-button '
                      } onClick={this.clickSection}
                      data-section-id={section.id}
                      key={key}>
                      ID{section.id} {section.name}
                    </div>
                )}
              </div>
              <div className='row'>
                {locations2.map((location, key) =>
                  <div className={this.state.activeCell2Id == location.id ? 
                    'col-md-5 cell cell-active' : 'col-md-5 cell'}
                    onClick={this.clickCell}
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
          <button onClick={this.clickTransfer}>
            Отправить в Цех8
          </button>
        </div>
      </div>
    )
  }
}

export default WS4InnerTransferTab