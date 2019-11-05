import React, { Component } from 'react';


class WS3InfoTab extends Component {
  componentDidMount() {
    this.props.getInfoWs3()
  }

  render() {
  const { infoData } = this.props
  
  return (
    <div className='row workshop-content'>
      <h3>Информация</h3>
      <table className='table table-sm table-bordered table-info'>
        <thead className='info-table-head'>
          <th>Секция #</th>
          <th>Пустые клетки</th>
          <th>Занятые клетки</th>
          <th>Клетки с поросятами</th>
          <th>только свиноматки</th>
          <th>колво свиноматок</th>
          <th>колво поросят</th>
        </thead>
        <tbody>
          {infoData && Object.keys(infoData).map(key => 
            <tr>
              <td>{key}</td>
              <td>{infoData[key].empty}</td>
              <td>{infoData[key].not_empty}</td>
              <td>{infoData[key].with_piglets}</td>
              <td>{infoData[key].sow_only}</td>
              <td>{infoData[key].sow_count}</td>
              <td>{infoData[key].piglets_count}</td>
            </tr>
            )}
          
        </tbody>
      </table>

    </div>
   )
  }
}

export default WS3InfoTab