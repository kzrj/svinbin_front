
import React, { Component } from 'react';

import { toggleArray } from '../../components/utils'
// components
import { SowTable }  from '../../components/WorkshopOne/SowComponents'
import { SowFarmIdFilter, SowTourFilter, SowSemUsoundFilter }  from '../../components/WorkshopOne/SowComponents'


class WS1TransferToWS2Tab extends Component {
   constructor(props) {
    super(props);
    this.state = {
      query: {
        by_workshop_number: 1,
        tour: null,
        status_title: "Супорос 60",
        to_seminate: null,
        farm_id_isnull: false
      },
      choosedSows: [],
      needToRefresh: false
    };
    this.setQuery = this.setQuery.bind(this);
    this.chooseAll = this.chooseAll.bind(this);
    this.setSeminatedSuporosStatus = this.setSeminatedSuporosStatus.bind(this);
    this.sowClick = this.sowClick.bind(this);
    this.massMove = this.massMove.bind(this);
    this.refreshSowsList = this.refreshSowsList.bind(this);
  }

  componentDidMount() {
    // query
    this.props.getSows(this.state.query)
    this.props.getTours()
  }

  showState = () => {
    console.log(this.state)
    // <button onClick={this.showState}>
    //   State
    // </button>
  }

  chooseAll () {
    let ids = []
    this.props.sows.map(sow => ids = toggleArray(ids, sow.id))
    this.setState({
      ...this.state,
      choosedSows: ids
    })
  }

  setQuery (e) {
    let { query } = this.state
    query[e.target.name] = e.target.value

    this.setState({
      ...this.state,
      query: {
        ...this.state.query,
        query: query
      },
      choosedSows: [],
      needToRefresh: true
    })
    // this.props.getSows(query)
  }
  
  setSeminatedSuporosStatus (e) {
    let { query } = this.state
    let finalQuery = {}
    const filter = e.target.value.split('=')[0]
    const value = e.target.value.split('=')[1]
    if (filter == 'to_seminate')
      finalQuery = {...query, [filter]:value, farm_id_isnull: false,
         status_title: null}
    if (filter == 'status_title')
      finalQuery = {...query, [filter]:value, to_seminate: null, farm_id_isnull: false}
    if (filter == 'farm_id_isnull')
      finalQuery = {...query, farm_id_isnull: true,
         to_seminate: null, status_title: null}
    this.setState({
      ...this.state,
      query: finalQuery,
      choosedSows: []
    })
    this.props.getSows(finalQuery)
  }

  sowClick (e) {
    let { choosedSows } = this.state
    const { id } = e.target.dataset
    choosedSows = toggleArray(choosedSows, id)
    this.setState({
      ...this.state,
      choosedSows: choosedSows
    })
  }
  
  massMove () {
    const data = {
      sows: this.state.choosedSows,
      to_location: 2
    }
    this.props.massMove(data)
    this.setState({
      ...this.state,
      choosedSows: [],
      needToRefresh: true
    })
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
    const { sows, tours } = this.props
    this.refreshSowsList()
    return (
      <div className='workshop-content'>
         {/* <button onClick={this.showState}>
           State
         </button> */}
        <div>
          <div className='commonfilter row'>
            <SowFarmIdFilter setQuery={this.setQuery} />
            <SowTourFilter tours={tours} setQuery={this.setQuery}/>
            <SowSemUsoundFilter setSeminatedSuporosStatus={this.setSeminatedSuporosStatus}/>
          </div>
          <div>
            <div>
              Перевести в ЦЕХ 2
              <div className="input-group">
                <div className="input-group-append">
                  <button className="btn btn-outline-secondary" type="button" 
                    onClick={this.massMove}>
                    Перевести в ЦЕХ 2
                  </button>
                </div>
                </div>
            </div>
          </div>
        </div>
        <div className='commonfilter-results'>
          <div className='count row'>
            <div className='col-6'>
              Выбрано {this.state.choosedSows.length} из {sows.length}
            </div>
            {/* <div className='col-6'>
              <button onClick={this.chooseAll}>Выбрать всех</button>
            </div> */}
          </div>
          {this.state.needToRefresh && this.props.sowsListFetching  ? 'Loading' :
            <SowTable sows={sows} sowClick={this.sowClick} choosedSows={this.state.choosedSows}/>}
        </div>
      </div>
    )
  }
}

export default WS1TransferToWS2Tab