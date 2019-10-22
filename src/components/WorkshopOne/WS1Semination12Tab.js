import React, { Component } from 'react';

// components
import SowToursData from '../../components/WorkshopOne/SowComponents'
import { SowFindById, SowLightDetail } from '../WorkshopThree/Components'


class WS1Semination12Tab extends Component {
   constructor(props) {
    super(props);
    this.state = {
      cullingReason: 'padej',
      cullingType: 'padej',
      query: { 
        by_workshop_number: 1,
        to_seminate: true,
        farm_id_isnull: false,
      },
    }
  }
  
  componentDidMount() {
    this.props.getSows(this.state.query)
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


  seminate = () => {
    let data = {
      id: this.props.sow.sow.id,
    }
    
    this.props.seminateSow(data)
  }

  render() {
    const { sows, sow } = this.props
    return (
      <div className='row workshop-content'>
          <div className='col-3 workshop-left-column'>
            <SowFindById 
                sows={sows} 
                sow={sow} 
                getSowsById={this.getSowsById} 
                getSow={this.props.getSow}/>
          </div>

          <div className='col-9'>
            <div className='workshop-content-column-2'>
              {sow && 
                <div>
                  <SowLightDetail sow={sow}/>
                  <SowToursData sow={sow} />
                </div>
              }
            </div>
        </div>
    </div>
    )
  }
}

export default WS1Semination12Tab