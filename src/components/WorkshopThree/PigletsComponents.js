import React, { Component } from 'react';


export class NewBornGroupWeaningList extends Component {

  render() {
    const { locations } = this.props
    
  
    return (
      <div className='newborn-group-list'>
        <p>Выбрано клеток {locations.length}</p>
        {locations.map(location => <NewBornGroupWeaning location={location}/>)}
      </div>
    )
  }
 }


export class NewBornGroupWeaning extends Component {

  render() {
    const { location } = this.props
    const cellNumber = location.sowAndPigletsCell.number
    let newBornGroup = null
    if (location.newbornpigletsgroup_set.length > 0)
      newBornGroup = location.newbornpigletsgroup_set[0]

    return (
      <div className='newborn-group'>
        {cellNumber} {' '} {newBornGroup ? newBornGroup.quantity : 'Нет поросят'} 
      </div>
    )
  }
 }