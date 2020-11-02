import React, { Component } from 'react';

//components
import { SowCells, Sections } from '../Locations'
import { FetchingErrorComponentMessage, ErrorMessage, Message } from '../CommonComponents';
import CircularProgress from '@material-ui/core/CircularProgress';


class WS3SowIncomeTab extends Component {
   constructor(props) {
    super(props);
    this.state = {
      query: {
        alive: true,
        by_workshop_number: 3,
        farm_id_starts: '',
        ordering: 'tour'
      },
      activeLocation: null,
      activeSectionId: null,
      activeLocationId: null,
      activeCellId: null,
      activeSowId: null,

      needToRefresh: false
    }
    this.clickSection = this.clickSection.bind(this);
    this.clickLocation = this.clickLocation.bind(this);
    this.clickSetlle = this.clickSetlle.bind(this);
    this.clickSow = this.clickSow.bind(this);
    this.refreshData = this.refreshData.bind(this);

    this.getSowFromSows = this.getSowFromSows.bind(this);
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
    this.props.sowsResetErrorsAndMessages()
  }

  getSowFromSows (e) {
    this.props.getSowFromSows(e.target.value)
  }

  clickSection (e) {
    const { sectionId } = e.target.dataset
    this.props.getLocations({by_section: sectionId, cells: true})
    this.setState({
      ...this.state,
      activeSectionId: sectionId,
    })
  }

  clickLocation (location) {
    this.props.sowsResetErrorsAndMessages()
    this.setState({
      ...this.state,
      activeLocation: location,
      activeCellId: location.id
    })
  }

  clickSetlle () {
    const { activeLocation } = this.state
    const { sow } =this.props
    this.props.sowMoveTo({id: sow.id, location: activeLocation.id})
    this.setState({
      ...this.state,
      activeCellId: null,
      activeLocation: null,
      needToRefresh: true,
      query: {...this.state.query, farm_id_starts: ''},
    })
  }

  refreshData () {
    if (!this.props.eventFetching && this.state.needToRefresh) {
      setTimeout(() => {
        this.setState({...this.state, needToRefresh: false})
        this.props.getSows(this.state.query)
        this.props.getLocations({by_section: this.state.activeSectionId, cells: true})
      }, 100)
    }
  }

  render() {
    this.refreshData()
    const { sow, sections, sectionsFetching, sectionsListError, locationsFetching, 
        locationsListError, eventFetching, eventError, message, queryCount } = this.props
    return (
      <div className='pt-1 mx-1 pb-5'>
        <FetchingErrorComponentMessage 
          fetching={sectionsFetching}
          error={sectionsListError}
          message={null}
          component={
            <Sections 
              sections={sections}
              activeSectionId={this.state.activeSectionId}
              fetching={sectionsFetching}
              error={sectionsListError}

              clickSection={this.clickSection}
            />}
        />
        <FetchingErrorComponentMessage 
          fetching={locationsFetching}
          error={locationsListError}
          message={null}
          component={
            <SowCells 
              locations={this.props.locations}
              activeCellIds={[this.state.activeCellId]}
              fetching={locationsFetching}
              error={locationsListError}
              isSection={this.state.activeSectionId}
              clickLocation={this.clickLocation}
            />}
        />
        <div className='card card-style fixed-bottom mx-1 mb-3'>
          <p className='mt-3 mb-1 font-700 font-18 text-center'>На поступлении {queryCount}</p>
          {eventFetching 
            ? <div className='content text-center'><CircularProgress /></div>
            : <div className='content mt-0 row'>
                <div className='col-6 text-center'>
                  {sow 
                    ? <p className='mb-1 font-16'>{sow.farm_id} {sow.tour}</p>
                    : <p className='mb-1 font-16'>Нет такого ID</p>
                  }
                  <input type='number' className='mt-1' placeholder='ID свиноматки' onChange={this.getSowFromSows}/>
                </div>
                <div className='col-6 text-center'>
                  {this.state.activeLocation
                    ? this.state.activeLocation.is_sow_empty 
                      ? <p className='mb-1 font-16'>клетка {this.state.activeLocation.cell}</p>
                      : <p className='mb-1 font-16 color-red1-light'>
                          клетка {this.state.activeLocation.cell} занята
                        </p>
                    : <p className='mb-1 font-16'>Выберите клетку</p>
                  }
                  {(this.state.activeLocation && sow) && this.state.activeLocation.is_sow_empty &&
                    <button className='btn btn-s bg-mainDark-light' onClick={this.clickSetlle}>
                      Разместить
                    </button>
                  }
                </div>
              </div>
          }
          {eventError && 
            <div className='content mt-0'>
              <ErrorMessage error={eventError} />
            </div>
          }
          {message && 
            <div className='content mt-0 text-center'>
              <Message message={message} />
            </div>
          }
        </div>
      </div>
    )
  }
}

export default WS3SowIncomeTab