import React, { Component } from 'react';

//components
import { PigletsCells, Sections } from '../WorkshopThree/Components'
import { PigletsGroup } from '../WorkshopThree/PigletsComponents'


class WS4TransferTab extends Component {
   constructor(props) {
    super(props);
    this.state = {
      piglets: props.piglets,
      activePiglets: null,
      activeSectionId: null,
      activeCellId: null,

    }
  }
  
  componentDidMount() {
    this.props.getSections({workshop: 4})
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

  clickCell = (location) => {
    this.setState({
      ...this.state,
      activeCellId: location.id,
      activePiglets: location.nomadpigletsgroup_set.length > 0 ?
       location.nomadpigletsgroup_set[0] : null
    })
  }

  clickTransfer = () => {
    let data = {
      id: this.state.activePiglets.id,
      quantity: this.state.activePiglets.quantity,
      gilt_quantity: 0,
      to_location: 5
    }
    this.props.movePiglets(data)
    this.setState({
      ...this.state,
      activePiglets: null,
      needToRefresh: true, 
      activeCellId: null,
    })
  }

  refreshSowsList () {
    if (this.props.eventFetching && this.state.needToRefresh){
      setTimeout(() => {
        this.setState({...this.state, needToRefresh: false})
        this.props.getLocations({by_section: this.state.activeSectionId})
      }, 500)
    }
  }

  render() {
    this.refreshSowsList()
    const { sections, locations } = this.props
    
    return (
        <div className='row workshop-content'>
          <div className='col-6'>
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
          </div>
          <div className='col-6'>
            {this.state.activePiglets && 
              <div>
                <PigletsGroup piglets={this.state.activePiglets}/>
                <button 
                  className='btn btn-outline-secondary' type='button'
                  onClick={this.clickTransfer}>
                    Отправить в Цех8
                </button>
              </div>
            }
        </div>
      </div>
    )
  }
}

export default WS4TransferTab