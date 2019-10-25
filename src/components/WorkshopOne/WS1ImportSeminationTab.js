import React, { Component } from 'react';

import { toggleArray } from '../../components/utils'
// components
import { SowTable }  from '../../components/WorkshopOne/SowComponents'
import { SowFarmIdFilter }  from '../../components/WorkshopOne/SowComponents'


class WS1ImportSeminationTab extends Component {
   constructor(props) {
    super(props);
    this.state = {
      file: null,
    }
    this.setData = this.setData.bind(this);
    this.uploadFile = this.uploadFile.bind(this);
  }
  
  setData (e) {
    this.setState({
      ...this.state,
      [e.target.name]: e.target.files[0],
    })
  }

  uploadFile () {
    this.props.uploadFile({file: this.state.file})
    // this.setState({
    //   file: null,
    // })
  }

  render() {
    const { eventFetching, message, responseData } = this.props
    return (
      <div className='workshop-content'>
        <h3>Импорт осеменений из файла</h3>
        <div className="input-group">
          <input type="file" name="file" onChange={this.setData}/>
          <div className="input-group-append">
            <button type="button" class="btn btn-success btn-block" onClick={this.uploadFile}>Загрузить</button>
          </div>
        </div>
        <div>
          {responseData && 
            <div>
              <p>Количество осемененных {responseData.seminated_list_count}</p>
              <p>Количество пропущенных(осеменили в прошлые разы) 
                {responseData.already_seminated_in_tour_count}</p>
              <p>Количество не осеменненых, которые еще в другом туре(цикле) {responseData.sows_in_another_tour_count}</p>
              <ul>{responseData.sows_in_another_tour_farm_ids.map(sow2 =>
                  <li>{sow2}</li>
                )}</ul>
            </div>
          }
        </div>
      </div>
    )
  }
}

export default WS1ImportSeminationTab