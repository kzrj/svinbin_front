import React, { Component } from 'react';

//components
import { SowFindById, Cells, Sections } from '../WorkshopThree/Components'


class WS3SowIncomeTab extends Component {
   constructor(props) {
    super(props);
    this.state = {
      query: {by_workshop_number: 3,},
      activeSectionId: null,
      activeCellId: null,
      needToRefresh: false
    }
  }
  
  componentDidMount() {
    this.props.getSows(this.state.query)
    this.props.getSections({workshop: 3})
    
  }

  getSowsById = (e) => {
    let { query } = this.state
    query.farm_id_starts = e.target.value
    this.setState({
      ...this.state,
      query: query
    })
    this.props.getSows(query)
  }

  clickCell = (location) => {
    this.setState({
      ...this.state,
      activeCellId: location.id,
    })
  }

  clickSection = (e) => {
    const { sectionId } = e.target.dataset
    this.setState({
      ...this.state,
      activeSectionId: sectionId
    })
    this.props.getLocations({by_section: sectionId})
  }

  clickSetlle = () => {
    const { activeCellId, sectionId } = this.state
    this.props.sowMoveTo({id: this.props.sow.id, location: activeCellId})
    this.props.getLocations({by_section: sectionId})
    this.setState({
      query: {by_workshop_number: 3,},
      activeSectionId: null,
      activeCellId: null,
      needToRefresh: true
    })
    // this.props.getSows(this.state.query)
  }

  refreshSowsList () {
    if (this.props.eventFetching) {
      setTimeout(() => {
        this.setState({...this.state, needToRefresh: false})
        this.props.getSows(this.state.query)  
      }, 500)
    }
  }

  render() {
    this.refreshSowsList()
    const { sows, sow, sections, locations } = this.props
    
    return (
        <div className='row workshop-content'>
          <div className='col-3 workshop-left-column'>
            <SowFindById 
              sows={sows} 
              sow={sow} 
              getSowsById={this.getSowsById} 
              getSow={this.props.getSow}/>
          </div>
          <div className='col-9 workshop-right-column'>
            <Sections 
              sections={sections}
              activeSectionId={this.state.activeSectionId} 
              clickSection={this.clickSection}/>
            <Cells 
              locations={locations} 
              clickLocation={this.clickCell} 
              activeCellIds={[this.state.activeCellId]}
              />
            <div className='bottom-buttons-block'>
              <div className="input-group">
                {this.state.activeCellId && 
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