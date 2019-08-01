import React, { Component } from 'react';


class WS5ResettelmentTab extends Component {
   constructor(props) {
    super(props);
    this.state = {
      activePiglets: {
        id: 0,
        quantity: 0,
        gilt_quantity: 0
      },
      activeSectionId: null,
      activeCellId: null,
    }
  }
  
  componentDidMount() {
    // query
    this.props.getPiglets()
    this.props.getSections({workshop: 6})
  }
  showProps = () => {
    console.log(this.props)
  }

  clickSection = (e) => {
    const { sectionId } = e.target.dataset
    this.setState({
      ...this.state,
      activeSectionId: sectionId
    })
    this.props.getLocations({by_section: sectionId})
  }

  clickCell = (e) => {
    const { locationId } = e.target.dataset
    this.setState({
      ...this.state,
      activeCellId: locationId
    })
  }

  clickPiglets = (e) => {
    const { pigletsId, pigletsQuantity } = e.target.dataset
    this.setState({
      ...this.state,
      activePiglets: {
        ...this.state.activePiglets,
        id: pigletsId,
        quantity: pigletsQuantity,
      }
    })
  }

  clickSetlle = () => {
    const { activePiglets, activeSectionId, activeCellId } = this.state
    let data = {
      id: activePiglets.id,
      quantity: activePiglets.quantity,
      gilt_quantity: 0,
      to_location: activeCellId
    }
    this.props.setllePiglets(data)
    
    // query
    this.props.getPiglets()
  }

  render() {
    const { piglets, sections, locations } = this.props
    
    return (
        <div className='row workshop-content'>
          <div className='col-3'>
            {piglets.map(group =>
              <div className={this.state.activePiglets.id == group.id ?
                 'piglets piglets-active' : 'piglets'}
                 onClick={this.clickPiglets}
                 data-piglets-id={group.id}
                 data-piglets-quantity={group.quantity}
                 key={group.id}
                 >
                ID{group.id} Количество{group.quantity}
              </div>
            )}
            
          </div>
          <div className='col-9'>
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
                Разместить группу
              </button>
            </div>
          </div>  
      </div>
    )
  }
}

export default WS5ResettelmentTab