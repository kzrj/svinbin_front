import React, { Component } from 'react';

//components
import { SowCells, Sections } from '../WorkshopThree/Components'

class WS3SowFarrowTab extends Component {
   constructor(props) {
    super(props);
    this.state = {
      activeSow: null,
      activeSectionId: null,
      activeCellLocationId: null,
      current_total_piglets: null,
      total_piglets: 0,
      mummy_piglets: 0,
      dead_piglets: 0,
      alive_piglets: 0,
      date: null,
    }
  }
  
  componentDidMount() {
    this.props.getSections({workshop: 3})    
  }

  clickSection = (e) => {
    const { sectionId } = e.target.dataset
    this.setState({
      ...this.state,
      activeSectionId: sectionId
    })

    this.props.getLocations({by_section: sectionId})
  }

  clickCellLocation = (location) => {
    this.setState({
      ...this.state,
      activeCellLocationId: location.id,
      activeSow: location.sow_set.length > 0 ?
       location.sow_set[0] : null,
      current_total_piglets: location.newbornpigletsgroup_set.length > 0 ?
        location.newbornpigletsgroup_set[0].quantity : 0
    })
  }

  decreasePiglets = (e) => {
    const { label } = e.target.dataset
    this.setState({
      ...this.state,
      [label]: this.state[label] - 1,
      total_piglets: this.state.total_piglets - 1
    })
  }

  increasePiglets = (e) => {
    const { label } = e.target.dataset
    this.setState({
      ...this.state,
      [label]: this.state[label] + 1,
      total_piglets: this.state.total_piglets + 1
    })
  }

  clickFarrow = () => {
    this.props.sowFarrow({
      id: this.state.activeSow.id,
      dead_quantity: this.state.dead_piglets,
      mummy_quantity: this.state.mummy_piglets,
      alive_quantity: this.state.alive_piglets,
    })
    this.setState({
      activeSow: null,
      // activeSectionId: null,
      needToRefresh: true,
      activeCellLocationId: null,
      total_piglets: 0,
      mummy_piglets: 0,
      dead_piglets: 0,
      alive_piglets: 0,
      date: null,
    })
    this.props.getLocations({by_section: this.state.activeSectionId})
  }

  refreshLocations () {
    if (this.props.eventFetching || this.state.needToRefresh) {
      setTimeout(() => {
        this.setState({...this.state, needToRefresh: false})
        this.props.getLocations({by_section: this.state.activeSectionId})
        }, 500)
    }
  }

  render() {
    const { sections, locations } = this.props
    this.refreshLocations()
    
    return (
        <div className='row workshop-content'>
          <div className='col-6'>
            <Sections 
              sections={sections}
              activeSectionId={this.state.activeSectionId}
              clickSection={this.clickSection}
            />
            <SowCells 
              locations={locations}
              activeCellIds={[this.state.activeCellLocationId]}
              clickLocation={this.clickCellLocation}
            />
          </div>
          <div className='col-6'>
              {this.state.activeSow && 
                <div>
                  <h3>Свиноматка {this.state.activeSow.farm_id}</h3>
                  <ul>
                    <li>{this.state.activeSow.farm_id}</li>
                    <li>{this.state.activeSow.status}</li>
                    <li>
                        Текущее число живых поросят в клетке {this.state.current_total_piglets}
                    </li>
                  </ul>
                  <ul>
                    <li>
                        Общее число поросят в опоросе {this.state.total_piglets}
                    </li>
                    <li>Дата начала опороса {this.state.date}</li>
                    <li>
                      Мертворожденные {this.state.dead_piglets}
                      <button onClick={this.decreasePiglets} data-label='dead_piglets'>
                        -
                      </button>
                      <button onClick={this.increasePiglets} data-label='dead_piglets'>
                        +
                      </button>
                    </li>
                    <li>
                      Муммии {this.state.mummy_piglets}
                      <button onClick={this.decreasePiglets} data-label='mummy_piglets'>
                        -
                      </button>
                      <button onClick={this.increasePiglets} data-label='mummy_piglets'>
                        +
                      </button>
                    </li>
                    <li>
                      Живые {this.state.alive_piglets}
                      <button onClick={this.decreasePiglets} data-label='alive_piglets'>
                        -
                      </button>
                      <button onClick={this.increasePiglets} data-label='alive_piglets'>
                        +
                      </button>
                    </li>
                  </ul>
                  <button onClick={this.clickFarrow}>
                    Записать данные
                  </button>
                </div>
              }
          </div>
      </div>
    )
  }
}

export default WS3SowFarrowTab