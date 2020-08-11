import React, { Component } from 'react';
// components
import { ErrorMessage, Message } from '../CommonComponents';


class WSSemenBoarCreateTab extends Component {
   constructor(props) {
    super(props);
    this.state = {
      query: {
      },
      weight: 0,

      birth_id: '',
      boar_id: '',
      semen_date: '',
      a: null,
      b: null,
      d: null,
      morphology_score: null,
      final_motility_score: null,

      needToRefresh: false,
    }
    this.setData = this.setData.bind(this);
    this.createRecord = this.createRecord.bind(this);
  }
  
  componentDidMount() {
  }

  setData(e) {
    this.setState({
      ...this.state,
      [e.target.name]: e.target.value
    })
  }

  createRecord() {
    let data = {
      id: this.state.boar_id,
      date: this.state.semen_date,
      a: this.state.a,
      b: this.state.b,
      d: this.state.d,
      morphology_score: this.state.morphology_score,
      final_motility_score: this.state.final_motility_score,
    }
    this.props.semenBoar(data)
    this.setState({
      ...this.state,
      needToRefresh: true
    })
  }

  refreshSowsList () {
    if (this.props.eventFetching && this.state.needToRefresh) {
      setTimeout(() => {
        this.setState({...this.state, needToRefresh: false})
        // this.props.getBoars()  
      }, 500)
    }
  }

  render() {
    this.refreshSowsList()
    const { boars, eventError, listFetching, message } = this.props
    return (
      <div className='workshop-content'>
        <div>
          <h4>Создание записи. форма</h4>
            <div>
              <div className='form-group'>
                <label for='start-date'>Дата с</label>
                <input type='date'
                  id='semen_date'
                  className="form-control search-input"
                  value={this.state.semen_date}
                  name='semen_date'
                  placeholder="Дата"
                  onChange={this.setData}
                  />
              </div>
              <div className="form-group">
                <label>ID хряка</label>
                <select className="custom-select" name='boar_id' className="form-control" 
                  onChange={this.setData}>
                  <option selected value={null} >Выберите хряка</option>
                  {boars.length > 0 && boars.map(boar => 
                    <option value={boar.id} >{boar.birth_id} {boar.breed ? boar.breed : 'нет породы'}</option>
                    )}
                </select>
              </div>
              <div className="form-group">
                <label>Количество спермы мл. А</label>
                <input type='number' onChange={this.setData} name='a' value={this.state.a}
                  className="form-control"  placeholder='0'/>
              </div>
              <div className="form-group">
                <label >Оценка концентрации (млн). B</label>
                <input type='number' onChange={this.setData} name='b' value={this.state.b}
                  className="form-control"  placeholder='0'/>
              </div>
              <div className="form-group">
                <label >Оценка подвижности (%). D</label>
                <input type='number' onChange={this.setData} name='d' value={this.state.d}
                  className="form-control"  placeholder='0'/>
              </div>
              <div className="form-group">
                <label>morphology_score</label>
                <input type='number' onChange={this.setData} name='morphology_score'
                  value={this.state.morphology_score}
                  className="form-control"  placeholder='0'/>
              </div>
              <div className="form-group">
                <label>Оценка подвижности (%). final_motility_score</label>
                <input type='number' onChange={this.setData} name='final_motility_score' 
                  value={this.state.final_motility_score}
                  className="form-control"  placeholder='0'/>
              </div>
              <button className='btn btn-primary' onClick={this.createRecord}>Создать запись</button>
            </div>
            {/* eventError, message */}
            {eventError && <ErrorMessage error={eventError} />}
            {message && <Message error={message} />}
        </div>
      </div>
    )
  }
}

export default WSSemenBoarCreateTab