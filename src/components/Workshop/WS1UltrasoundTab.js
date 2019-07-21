import React, { Component } from 'react';


class WS1UltrasoundTab extends Component {
   constructor(props) {
    super(props);
    this.state = {
      sow: null
    }
  }
  
  componentDidMount() {
    this.props.getSows()
    this.setState({
      sow: this.props.sow
    })
    // console.log(this.props.sow)
    // console.log(this.props.sows)
    // console.log(this.props.sows[1])
    // console.log(this.state.sow)
  }

  getSowsById = () => {
    this.props.sows.length > 0 &&
      this.setState({
        sow: this.props.sows[1]
      })
    this.props.getSows()
    const token = localStorage.getItem('token');
    console.log(token)
    console.log('OOPA')
    console.log(Array.isArray(this.props.sows))
    // this.props.sows.length > 0 &&
    //   this.setState({
    //     sow: this.props.sows[1]
    //   })
    console.log(this.props.sows)
    console.log(this.props.sows[1])
    console.log(this.state.sow)
    
  }

  showSowData = (sow) => {
    console.log(sow)
    this.setState({
      sow: this.props.sow
    })
  }

  ultrasoundSow = (result) => {
    let data = {
      id: this.state.sow.id,
      week: '104',
      result: result
    }
    this.props.ultrasoundSow(data)
    this.props.getSows()
    console.log('ultrasoundSow')
  }

  render() {
    const { sows, sow } = this.props
    return (
        <div className='row workshop-content'>
          <div className='col-3'>
            <div className='under-menu-line text-center'>
              <p className="workshop-header-2">ПОИСК ПО ID</p>
            </div>
            <div className='workshop-content-column-1'>
              <input type='text' onChange={this.getSowsById} />
              <ul className='list-unstyled'>
                {sows.length > 0 && this.state.sow &&
                  sows.map(sow => 
                    <li className={sow.id === this.state.sow.id ? 'sow-active' : ''} key={sow.id} onClick={() => this.showSowData(sow)}>
                      {sow.farm_id}
                    </li>)
                }
              </ul>
            </div>
          </div>
          <div className='col-9'>
            <div className='under-menu-line text-center'>
              <p className="workshop-header-2">ВЫБРАНА МАТКА</p>
            </div>
            <div className='workshop-content-column-2'>
              {this.state.sow &&
                <div>
                  <ul>
                    <li>{this.state.sow.id}</li>
                    <li>{this.state.sow.location}</li>
                    <li>{this.state.sow.status}</li>
                    <li>{this.state.sow.farm_id}</li>
                  </ul>
                  {sow &&
                  <ul>
                    <li>{sow.id}</li>
                    <li>{sow.location}</li>
                    <li>{sow.status}</li>
                    <li>{sow.farm_id}</li>
                  </ul>
                  }
                  <div>
                    <button onClick={() => this.ultrasoundSow(false)}>
                      Отметить как прохолост
                    </button>
                    <button onClick={() => this.ultrasoundSow(true)}>
                      Отметить как супорос
                    </button>
                  </div>
                </div>
              }
            </div>
          </div>
        </div>
    )
  }
}

export default WS1UltrasoundTab