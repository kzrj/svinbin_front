import React, { Component } from 'react';

// components
import { PigletsCells, Sections } from '../WorkshopThree/Components'


class WS4ResettelmentTab extends Component {
   constructor(props) {
    super(props);
    this.state = {
      activePiglets: null,
      activeSectionId: null,
      activeCellId: null,
      splitLabel: false,
      quantity: 0,
    }
    this.setData = this.setData.bind(this);
    this.clickSection = this.clickSection.bind(this);
    this.clickCell = this.clickCell.bind(this);
    this.clickPiglets = this.clickPiglets.bind(this);
    this.clickSetlle = this.clickSetlle.bind(this);
  }
  
  componentDidMount() {
    this.props.getPiglets({status_title: "Взвешены, готовы к заселению", by_workshop_number: 4})
    this.props.getSections({workshop: 4})
  }

  setData (e) {
    this.setState({
      ...this.state,
      [e.target.name]: e.target.value
    })
  }

  clickSection (e) {
    const { sectionId } = e.target.dataset
    this.setState({
      ...this.state,
      activeSectionId: sectionId
    })
    this.props.getLocations({by_section: sectionId})
  }

  clickCell (location) {
    this.setState({
      ...this.state,
      activeCellId: location.id
    })
  }

  clickPiglets (piglets) {
    this.setState({
      ...this.state,
      activePigletsId: piglets.id,
      activePiglets: piglets,
      weighingRecord: null
    })
  }

  clickSetlle () {
    const { activePiglets, activeCellId, quantity } = this.state
    let endQuantity = activePiglets.quantity;

    if (quantity > 0)
      endQuantity = quantity

    let data = {
      id: activePiglets.id,
      quantity: endQuantity,
      gilt_quantity: 0,
      to_location: activeCellId
    }
    this.props.setllePiglets(data)
    this.setState({
      ...this.state,
      activePiglets: null,
      quantity: null,
      needToRefresh: true, 
      activeCellId: null,
    })
  }

  refreshSowsList () {
    if (this.props.eventFetching && this.state.needToRefresh){
      setTimeout(() => {
        this.setState({...this.state, needToRefresh: false})
        this.props.getLocations({by_section: this.state.activeSectionId})
        this.props.getPiglets({status_title: "Взвешены, готовы к заселению", by_workshop_number: 4})
      }, 500)
    }
  }

  render() {
    this.refreshSowsList()
    const { piglets, sections, locations } = this.props
    return (
        <div className='row workshop-content'>
          <div className='col-3'>
            {piglets.map(group =>
              <div className={this.state.activePigletsId == group.id ? 
                'nomad-piglets-row piglets-active': 'nomad-piglets-row'}
                onClick={() => this.clickPiglets(group)}
                key={group.id}
                >
                №{group.merger_part_number} Партия {group.quantity} голов
              </div>
            )}
          </div>
          <div className='col-9'>
            <Sections 
                sections={sections}
                activeSectionId={this.state.activeSectionId}
                clickSection={this.clickSection}
              />
            <PigletsCells
              locations={locations}
              activeCellIds={[this.state.activeCellId]}
              clickLocation={this.clickCell}
            />
            {this.state.activePiglets ?
              <div>
                <div className="input-group-append">
                  <label>Разделить</label>
                  <input type='checkbox' 
                      onChange={this.setData}
                      name='splitLabel' value={!this.state.splitLabel}/>
                </div>
                
                <div className="input-group-append">
                  {this.state.splitLabel && 
                    <input type='text' 
                        onChange={this.setData} 
                        name='quantity' value={this.state.quantity}/>}
                  <button className='btn btn-outline-secondary' type='button'
                    onClick={this.clickSetlle}
                    >
                      Разместить группу
                  </button>
                </div>
              </div>
              :
              this.props.message ? <p>{this.props.message}</p> : <p>Выберите группу поросят</p>
            }
          </div>  
      </div>
    )
  }
}

export default WS4ResettelmentTab