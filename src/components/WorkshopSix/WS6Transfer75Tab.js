import React, { Component } from 'react';


class WS6Transfer75Tab extends Component {
   constructor(props) {
    super(props);
    this.state = {
      piglets: props.piglets,
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
    this.props.getSections({workshop: 7})
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
    this.props.getPiglets({location: locationId})
    this.setState({
      ...this.state,
      activeCellId: locationId
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
    const { sections, locations } = this.props
    
    return (
        <div className='row workshop-content'>
          <div className='col-6'>
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
                    data-piglets={location.nomadpigletsgroup_set}
                    key={location.id}>
                    ID{location.id} 
                    {location.is_empty && 'Пустая'}
                    
                  </div>
              )}
              {locations.length < 1 && 'Выберите секцию'}
            </div>
          </div>
          <div className='col-6'>
            <div>
              {this.props.piglets.length > 0 ? 
                <div>
                  <p>id {this.props.piglets[0].id}</p>
                  <p>количество {this.props.piglets[0].quantity}</p>
                  <p>количество ремонтных {this.props.piglets[0].gilts_quantity}</p>
                  <input type='text' value={this.props.piglets[0].quantity}>

                  </input>
                </div>
                : 'Пустая клетка'}
            </div>
            <div>
              <button onClick={this.clickTransfer}>
                Отправить в 7-5
              </button>
            </div>  
        </div>
      </div>
    )
  }
}

export default WS6Transfer75Tab