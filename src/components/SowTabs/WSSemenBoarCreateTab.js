import React, { Component } from 'react';
// components
import { SemenBoarForm } from './SowForms';
import { getToday } from '../utils';


class WSSemenBoarCreateTab extends Component {
   constructor(props) {
    super(props);
    this.state = {
    }
    this.createRecord = this.createRecord.bind(this);
  }

  createRecord() {
    this.props.semenBoar(this.props.form.values)
  }

  render() {
    const { tours, boars, eventError, eventFetching, message } = this.props
    
    return (
      <div className=''>
        <SemenBoarForm 
          parentSubmit={this.createRecord}
          boars={boars}
          fValues={[
            {value: 1,   label: "F = E / 1"},
            {value: 1.5, label: "F = E / 1.5"},
            {value: 2,   label: "F = E / 2"},
            {value: 2.5, label: "F = E / 2.5"},
            {value: 3,   label: "F = E / 3"},
          ]}

          initialValues={{
            date: getToday(),
            f_denom: 1
          }}

          eventError={eventError}
          eventFetching={eventFetching}
          message={message}
        />
      </div>
    )
  }
}

export default WSSemenBoarCreateTab