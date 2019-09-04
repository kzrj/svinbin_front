import React, { Component } from 'react';
import { toggleArray, addItemToArray, removeItemFromArray,
  uniq} from '../utils';

//components
import { Cells, Sections } from '../WorkshopThree/Components'


class WS3SowWeaningTab extends Component {
   constructor(props) {
    super(props);
    this.state = {
      activeSows: [],
      activeSectionId: null,
      activeLocationsIds: [],
    };

    this.massMove = this.massMove.bind(this);
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

  clickLocation = (location) => {
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
      activeSectionId: null,
      activeLocationsIds: [],
    })
  }

  render() {
    const { sections, locations } = this.props
    
    return (
        <div className='row workshop-content'>
          <div className='col-6'>
          <Sections 
              sections={sections}
              activeSectionId={this.state.activeSectionId}
              clickSection={this.clickSection}
            />
            <Cells
              locations={locations}
              activeCellIds={this.state.activeLocationsIds}
              activeCellId={null}
              clickLocation={this.clickLocation}
            />
          </div>
          <div className='col-6'>
              Выбрано {this.state.activeSows.length} маток
              {this.state.activeSows.length > 0 &&
                <div>
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
        </div>
    )
  }
}

export default WS3SowWeaningTab