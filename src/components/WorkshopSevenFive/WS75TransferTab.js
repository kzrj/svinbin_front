import React, { Component } from 'react';


class WS7TransferTab extends Component {
   constructor(props) {
    super(props);
    this.state = {
      // piglets: props.piglets,
      activePiglets: null,
      // activeSectionId: null,
      // activeCellId: null,
    }
  }
  
  componentDidMount() {
    // query
    this.props.getLocations({section: 27})
  }

  clickCell = (e) => {
    const { piglets } = e.target.dataset    
    // this.props.getPiglets({location: locationId})
    this.setState({
      ...this.state,
      activePiglets: piglets.length > 0 ? piglets[0] : null
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

  showData = () => {
    console.log(this.props)
    console.log(this.props.state)
    console.log(this.state)
  }

  render() {
    const { locations } = this.props
    
    return (
        <div className='row workshop-content'>
          <div className='col-6'>
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
              
            </div>
            <div>
              {this.state.activePiglets ? 
                <button onClick={this.clickTransfer}>
                  Отправить в Цех 1
                </button>
                :
                <p>Пусто</p>
                
              }
              <button onClick={this.showData}>
                show store state
              </button>
            </div>  
        </div>
      </div>
    )
  }
}

export default WS7TransferTab