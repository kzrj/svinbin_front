import React, { Component } from 'react';

//components
import { toggleArray } from '../../components/utils'
import { SowCells, Sections, SectionsWs3 } from '../Locations'
import { SowFindById, SowFindByIdMany } from '../FiltersAndInputs'
import { SowFindByIdWithoutGet } from '../SowRepresentations'


class WS3SowIncomeTab extends Component {
   constructor(props) {
    super(props);
    this.state = {
      query: {
        by_workshop_number: 3,
        farm_id_starts: '',
        ordering: 'tour'
      },
      activeSectionId: null,
      activeSectionLocationId: null,
      activeCellId: null,
      activeSowId: null,
      choosedSows: [],

      needToRefresh: false
    }
    this.clickSection = this.clickSection.bind(this);
    this.getSowsById = this.getSowsById.bind(this);
    this.clickSetlle = this.clickSetlle.bind(this);
    this.clickSow = this.clickSow.bind(this);
    this.refreshData = this.refreshData.bind(this);
  }
  
  componentDidMount() {
    this.props.getSows(this.state.query)
  }

  clickSow (e) {
    const { id } = e.target.dataset
    this.setState({
      ...this.state,
      activeSowId: id
    })
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

  clickSection (e) {
    const { sectionId, locationId } = e.target.dataset
    this.setState({
      ...this.state,
      activeSectionId: sectionId,
      activeSectionLocationId: locationId
    })
  }

  clickSetlle () {
    const { activeSectionLocationId, choosedSows } = this.state
    this.props.sowsMoveMany({sows: choosedSows, to_location: activeSectionLocationId})
    this.setState({
      ...this.state,
      activeCellId: null,
      activeSectionLocationId:null,
      choosedSows: [],
      needToRefresh: true
    })
  }

  refreshData () {
    if (!this.props.eventFetching && this.state.needToRefresh) {
      setTimeout(() => {
        this.setState({...this.state, needToRefresh: false})
        this.props.getSows(this.state.query)
        this.props.getSections({workshop: 3})
      }, 500)
    }
  }

  render() {
    this.refreshData()
    const { sows, sections } = this.props
    return (
        <div className='row workshop-content'>
          <div className='col-3 workshop-left-column'>
            <SowFindByIdWithoutGet 
              sows={sows}
              activeSowId={this.state.activeSowId}
              clickSow={this.clickSow}

              sowIdValue={this.state.query.farm_id_starts}
              getSowsById={this.getSowsById} 
              
              fetching={this.props.listFetching}
              error={this.props.sowsListError}
              />
          </div>
          <div className='col-9 workshop-right-column'>
            <SectionsWs3 
              sections={sections} 
              activeSectionId={this.state.activeSectionId}
              clickSection={this.clickSection}/>
            <div className='bottom-buttons-block'>
              <div className="input-group">
                {this.state.activeSectionLocationId && this.state.choosedSows.length > 0 &&
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