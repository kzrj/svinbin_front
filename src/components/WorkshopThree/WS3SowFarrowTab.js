import React, { Component } from 'react';

//components
import { SowCells, Sections } from '../Locations'

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
    this.clickSection = this.clickSection.bind(this);
    this.clickCellLocation = this.clickCellLocation.bind(this);
    this.decreasePiglets = this.decreasePiglets.bind(this);
    this.increasePiglets = this.increasePiglets.bind(this);
    this.clickFarrow = this.clickFarrow.bind(this);
  }
  
  componentDidMount() {
    this.props.getSections({workshop: 3})    
  }

  clickSection (e) {
    const { sectionId } = e.target.dataset
    this.setState({
      ...this.state,
      activeSectionId: sectionId
    })

    this.props.getLocations({by_section: sectionId})
  }

  clickCellLocation (location) {
    this.setState({
      ...this.state,
      activeCellLocationId: location.id,
      activeSow: location.sow_set.length > 0 ?
       location.sow_set[0] : null,
      current_total_piglets: location.newbornpigletsgroup_set.length > 0 ?
        location.newbornpigletsgroup_set[0].quantity : 0
    })
  }

  decreasePiglets (e) {
    const { label } = e.target.dataset
    this.setState({
      ...this.state,
      [label]: this.state[label] - 1,
      total_piglets: this.state.total_piglets - 1
    })
  }

  increasePiglets (e) {
    const { label } = e.target.dataset
    this.setState({
      ...this.state,
      [label]: this.state[label] + 1,
      total_piglets: this.state.total_piglets + 1
    })
  }

  clickFarrow () {
    this.props.sowFarrow({
      id: this.state.activeSow.id,
      dead_quantity: this.state.dead_piglets,
      mummy_quantity: this.state.mummy_piglets,
      alive_quantity: this.state.alive_piglets,
    })
    this.setState({
      activeSow: null,
      needToRefresh: true,
      activeCellLocationId: null,
      total_piglets: 0,
      mummy_piglets: 0,
      dead_piglets: 0,
      alive_piglets: 0,
      date: null,
    })
  }

  refreshLocations () {
    if (!this.props.eventFetching && this.state.needToRefresh) {
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
              fetching={this.props.sectionsFetching}
              activeSectionId={this.state.activeSectionId}
              clickSection={this.clickSection}
            />
            <SowCells 
              locations={locations}
              fetching={this.props.locationsFetching}
              activeCellIds={[this.state.activeCellLocationId]}
              clickLocation={this.clickCellLocation}
            />
          </div>
          <div className='col-6'>
              {this.state.activeSow && 
                <div>
                  <h3>Свиноматка {this.state.activeSow.farm_id}</h3>
                  <p>{this.state.activeSow.status}</p>
                  <table className='table table-sm'>
                    <tbody>
                      <tr>
                        <td>Живых поросят в клетке</td>
                        <td>{this.state.current_total_piglets}</td>
                      </tr>
                      <tr>
                        <td>Общее число поросят в опоросе</td>
                        <td>{this.state.total_piglets}</td>
                      </tr>
                      {/* <tr>
                        <td>Дата начала опороса</td>
                        <td>{this.state.date}</td>
                      </tr> */}
                    </tbody>
                  </table>
                  <div className='farrow-button-block'>
                    <p>Живые {this.state.alive_piglets}</p>
                    <div className='row'>
                      <div className='col-6 btn btn-dark btn-inc-dec'
                        onClick={this.increasePiglets}
                        data-label='alive_piglets'
                      >
                        +
                      </div>
                      <div className='col-6 btn btn-dark btn-inc-dec'
                        onClick={this.decreasePiglets}
                        data-label='alive_piglets'
                      >
                        -
                      </div>
                    </div>
                  </div>

                  <div className='farrow-button-block'>
                    <p>Мертворожденные {this.state.dead_piglets}</p>
                    <div className='row'>
                      <div className='col-6 btn btn-dark btn-inc-dec'
                        onClick={this.increasePiglets}
                        data-label='dead_piglets'
                      >
                        +
                      </div>
                      <div className='col-6 btn btn-dark btn-inc-dec'
                        onClick={this.decreasePiglets}
                        data-label='dead_piglets'
                      >
                        -
                      </div>
                    </div>
                  </div>

                  <div className='farrow-button-block'>
                    <p>Муммии {this.state.mummy_piglets}</p>
                    <div className='row'>
                      <div className='col-6 btn btn-dark btn-inc-dec'
                        onClick={this.increasePiglets}
                        data-label='mummy_piglets'
                      >
                        +
                      </div>
                      <div className='col-6 btn btn-dark btn-inc-dec'
                        onClick={this.decreasePiglets}
                        data-label='mummy_piglets'
                      >
                        -
                      </div>
                    </div>
                  </div>
                  <button onClick={this.clickFarrow}
                    className="btn btn-outline-secondary btn-lg" type="button" >
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