import React, { Component } from 'react';


class WS75IncomeTab extends Component {
   constructor(props) {
    super(props);
    this.state = {
      activePiglets: null,
    }
  }
  
  componentDidMount() {
    // query section 7-5
    this.props.getPiglets()
  }

  showProps = () => {
    console.log(this.props)
  }

  clickPiglets = (piglets) => {
    this.setState({
      ...this.state,
      activePiglets: piglets
    })
  }

  clickSetlle = () => {
    const { activePiglets } = this.state
    const toLocation = 1
    let data = {
      id: activePiglets.id,
      quantity: activePiglets.quantity,
      gilt_quantity: 0,
      to_location: toLocation
    }
    this.props.setllePiglets(data)
    
    // query
    this.props.getPiglets()
  }

  render() {
    const { piglets } = this.props
    
    return (
        <div className='row workshop-content'>
          <div className='col-3'>
            {piglets.map(group =>
              <div className={this.state.activePiglets && this.state.activePiglets.id == group.id ?
                 'piglets piglets-active' : 'piglets'}
                 onClick={() => this.clickPiglets(group)}
                 key={group.id}
                 >
                ID{group.id} Количество{group.quantity}
              </div>
            )}
            
          </div>
          <div className='col-9'>
              {this.state.activePiglets && 
                <div>
                  {this.state.activePiglets.id}
                  <button onClick={this.clickSetlle}>
                Разместить группу
              </button>
                </div>
              }

          </div>  
      </div>
    )
  }
}

export default WS75IncomeTab