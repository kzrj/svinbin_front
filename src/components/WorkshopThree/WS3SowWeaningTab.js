import React, { Component } from 'react';
import { toggleArray } from '../utils';

//components
import { SowCells, Sections } from '../Locations'


class WS3SowWeaningTab extends Component {
   constructor(props) {
    super(props);
    this.state = {
      activeSows: [],
      activeSectionId: 6,
      activeLocationsIds: [],
      addPiglets: false,
      pigletsTour: null,
      needToRefresh: false,
    };

    this.massMove = this.massMove.bind(this);
    this.setData = this.setData.bind(this);
    this.markAsNurse = this.markAsNurse.bind(this);
    this.refreshSowsList = this.refreshSowsList.bind(this);
    this.clickSection = this.clickSection.bind(this);
    this.clickLocation = this.clickLocation.bind(this);
  }

  componentDidMount(){
    this.props.getTours()
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

  clickLocation (location) {
    let { activeLocationsIds, activeSows } = this.state
    activeLocationsIds = toggleArray(activeLocationsIds, location.id)
    !location.is_sow_empty ?
      activeSows = toggleArray(activeSows, location.sow_set[0].id) 
      : null

    this.setState({
      ...this.state,
      activeLocationsIds: activeLocationsIds,
      activeSows: activeSows
    })
  }

  massMove () {
    const data = {
      sows: this.state.activeSows,
      to_location: 1
    }
    this.props.massMove(data)
    this.setState({
      activeSows: [],
      activeSectionId: 6,
      activeLocationsIds: [],
      needToRefresh: true,
    })
  }

  markAsNurse () {
    this.props.markAsNurse({
      id: this.state.activeSows[0],
      piglets_tour: this.state.pigletsTour
    })
    this.setState({
      activeSows: [],
      activeSectionId: 6,
      activeLocationsIds: [],
      needToRefresh: true,
      addPiglets: false,
      pigletsTour: null,
    })
  }

  refreshSowsList () {
    if (!this.props.eventFetching && this.state.needToRefresh){
      setTimeout(() => {
        this.setState({...this.state, needToRefresh: false})
        if (this.state.activeSectionId) {
          this.props.getLocations({by_section: this.state.activeSectionId})}
      }, 500)
    }
  }

  render() {
    this.refreshSowsList()
    const { sections, locations, tours } = this.props
    
    return (
        <div className='row workshop-content'>
          <div className='col-8'>
          <Sections 
              sections={sections}
              fetching={this.props.sectionFetching}
              activeSectionId={this.state.activeSectionId}
              clickSection={this.clickSection}
              error={this.props.sectionsListError}
            />
            <SowCells
              isSection={this.state.activeSectionId}
              locations={locations}
              fetching={this.props.locationsFetching}
              activeCellIds={this.state.activeLocationsIds}
              activeCellId={null}
              clickLocation={this.clickLocation}
              error={this.props.locationsListError}
            />
          </div>
          <div className='col-4'>
            <div>
              Выбрано {this.state.activeSows.length} маток
              {this.state.activeSows.length > 0 &&
                <div className='bottom-buttons-block'>
                  Перевести в ЦЕХ 1
                  <div className="input-group">
                    <div className="input-group-append">
                      <button className="btn btn-outline-secondary" type="button" 
                        onClick={this.massMove}>
                        Перевести в ЦЕХ 1
                      </button>
                    </div>
                  </div>
                </div>
              }
            </div>
            <hr/>
            <div>
              <p>Отметить как кормилицу. Добавить группу поросят.</p>
              {this.state.activeSows.length === 1 ? 
                <div>
                  <div className="input-group">
                    <label>Добавить пустую группу поросят c туром</label>
                    <input type='checkbox' onChange={() => this.setState(
                      {...this.state, addPiglets: !this.state.addPiglets})} 
                      checked={this.state.addPiglets}
                      />
                    {this.state.addPiglets &&
                      <select className="custom-select" id="inputGroupSelect01" 
                        onChange={this.setData} name='pigletsTour'>
                        <option selected value=''>Выбрать тур</option>
                        {tours.map(tour =>
                            <option value={tour.id} key={tour.id}>
                            Неделя{tour.week_number}
                            </option>
                            )}
                      </select>
                    }
                  </div>
                  <button className="btn btn-outline-secondary" type="button" 
                            onClick={this.markAsNurse}>
                      Кормилица
                  </button>
                </div>
                :
                <p>Выберите одну клетку</p>
              }
            </div>
          </div>
        </div>
    )
  }
}

export default WS3SowWeaningTab