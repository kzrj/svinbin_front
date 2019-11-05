import React, { Component } from 'react';

//components
import { SowCells, Sections } from '../Locations'
import { SowFindById } from '../FiltersAndInputs'


class WS3SowIncomeTab extends Component {
   constructor(props) {
    super(props);
    this.state = {
      query: {
        by_workshop_number: 3,
        farm_id_starts: '',
      },
      activeSectionId: null,
      activeCellId: null,
      needToRefresh: false
    }
    this.clickSection = this.clickSection.bind(this);
    this.clickCell = this.clickCell.bind(this);
    this.getSowsById = this.getSowsById.bind(this);
    this.clickSetlle = this.clickSetlle.bind(this);
    this.refreshData = this.refreshData.bind(this);
  }
  
  componentDidMount() {
    this.props.getSows(this.state.query)
  }

  getSowsById (e) {
    let { query } = this.state
    query.farm_id_starts = e.target.value
    this.setState({
      ...this.state,
      query: query
    })
    this.props.getSows(query)
  }

  clickCell (location) {
    this.setState({
      ...this.state,
      activeCellId: location.id,
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

  clickSetlle () {
    const { activeCellId } = this.state
    this.props.sowMoveTo({id: this.props.sow.id, location: activeCellId})
    this.setState({
      query: {by_workshop_number: 3, farm_id_starts: ''},
      activeCellId: null,
      needToRefresh: true
    })
  }

  refreshData () {
    if (!this.props.eventFetching && this.state.needToRefresh) {
      setTimeout(() => {
        this.setState({...this.state, needToRefresh: false})
        this.props.getSows(this.state.query)
        if (this.state.activeSectionId) {
          this.props.getLocations({by_section: this.state.activeSectionId})}
      }, 500)
    }
  }

  render() {
    this.refreshData()
    const { sows, sow, sections, locations } = this.props
    console.log(this.state.activeSectionId)
    return (
        <div className='row workshop-content'>
          <div className='col-3 workshop-left-column'>
            <SowFindById 
              sows={sows}
              sow={sow}
              sowIdValue={this.state.query.farm_id_starts}
              getSowsById={this.getSowsById} 
              getSow={this.props.getSow}
              fetching={this.props.listFetching}
              />
          </div>
          <div className='col-9 workshop-right-column'>
            <Sections 
              sections={sections}
              fetching={this.props.sectionFetching}
              activeSectionId={this.state.activeSectionId} 
              clickSection={this.clickSection}/>
            <SowCells
              isSection={this.state.activeSectionId}
              locations={locations}
              clickLocation={this.clickCell}
              fetching={this.props.locationsFetching}
              activeCellIds={[this.state.activeCellId]}
              />
            <div className='bottom-buttons-block'>
              <div className="input-group">
                {this.state.activeCellId && this.props.sow &&
                  <button onClick={this.clickSetlle} className='btn btn-outline-secondary'>
                    Разместить свиноматку
                  </button>
                }
              </div>
            </div>
          </div>
        </div>
    )
  }
}

export default WS3SowIncomeTab