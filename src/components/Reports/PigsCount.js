import React, { Component } from 'react';


class PigsCount extends Component {
  constructor(props) {
    super(props);
	}

  componentDidMount() {
    this.props.getPigsCountReport()
  }

  render() {
    
    let sections = this.props.pigsCount.sections ?
       this.props.pigsCount.sections : null
    let workshops = this.props.pigsCount.workshops ?
       this.props.pigsCount.workshops : null
    // console.log(sections)

    return (
      <div className="container-fluid report-block">
        <h3>Текущее количество</h3>
        <table className='report-table'>
          <thead>
            <tr>
              <th ><span className='report-dir-th'></span></th>
              <th colSpan='3'><span className='report-dir-th'>Свиноматки</span></th>
              <th colSpan='7'><span className='report-dir-th'>Поросята</span></th>
            </tr>
            <tr>
              <th ><span className='report-dir-th'> - </span></th>
              <th ><span className='report-dir-th'>Цех 1</span></th>
              <th ><span className='report-dir-th'>Цех 2</span></th>
              <th ><span className='report-dir-th'>Цех 3</span></th>
              <th ><span className='report-dir-th'>Цех 3</span></th>
              <th ><span className='report-dir-th'>Цех 4</span></th>
              <th ><span className='report-dir-th'>Цех 8</span></th>
              <th ><span className='report-dir-th'>Цех 5</span></th>
              <th ><span className='report-dir-th'>Цех 6</span></th>
              <th ><span className='report-dir-th'>Цех 7</span></th>
              <th ><span className='report-dir-th'>Цех 7-5</span></th>
            </tr>
          </thead>
          <tbody>
            {workshops && 
              <tr>
                <td className="report-cell-td report-cell-value report-dir-date">
                  Всего по цеху
                </td>
                <td className="report-cell-td report-cell-value report-dir-date">
                  {workshops['ws1']['sows_count']}</td>
                <td className="report-cell-td report-cell-value report-dir-date">
                  {workshops['ws2']['sows_count']}</td>
                <td className="report-cell-td report-cell-value report-dir-date">
                  {workshops['ws3']['sows_count']}</td>
                <td className="report-cell-td report-cell-value report-dir-date">
                  {workshops['ws3']['pigs_count']}</td>
                <td className="report-cell-td report-cell-value report-dir-date">
                  {workshops['ws4']['pigs_count']}</td>
                <td className="report-cell-td report-cell-value report-dir-date">
                  {workshops['ws8']['pigs_count']}</td>
                <td className="report-cell-td report-cell-value report-dir-date">
                  {workshops['ws5']['pigs_count']}</td>
                <td className="report-cell-td report-cell-value report-dir-date">
                  {workshops['ws6']['pigs_count']}</td>
                <td className="report-cell-td report-cell-value report-dir-date">
                  {workshops['ws7']['pigs_count']}</td>
                <td className="report-cell-td report-cell-value report-dir-date">
                  {workshops['ws11']['pigs_count']}</td>
              </tr>
            }
            {sections && Object.keys(sections).map(s_number => 
              <tr key={s_number}>
                <td className="report-cell-td report-cell-value report-dir-date">
                  Секция {s_number[4]}{s_number[5] && s_number[5]} 
                </td>
                <td className="report-cell-td report-cell-value report-dir-date">
                  {sections[s_number]['ws1_sows_count'] > 0 && sections[s_number]['ws1_sows_count']}
                </td>
                <td className="report-cell-td report-cell-value report-dir-date">
                  {sections[s_number]['ws2_sows_count'] > 0 && sections[s_number]['ws2_sows_count']}</td>
                <td className="report-cell-td report-cell-value report-dir-date">
                  {sections[s_number]['ws3_sows_count'] > 0 && sections[s_number]['ws3_sows_count']}</td>
                <td className="report-cell-td report-cell-value report-dir-date">
                  {sections[s_number]['ws3_pigs_count']}</td>
                <td className="report-cell-td report-cell-value report-dir-date">
                  {sections[s_number]['ws4_pigs_count']}</td>
                <td className="report-cell-td report-cell-value report-dir-date">
                  {sections[s_number]['ws8_pigs_count']}</td>
                <td className="report-cell-td report-cell-value report-dir-date">
                  {sections[s_number]['ws5_pigs_count']}</td>
                <td className="report-cell-td report-cell-value report-dir-date">
                  {sections[s_number]['ws6_pigs_count']}</td>
                <td className="report-cell-td report-cell-value report-dir-date">
                  {sections[s_number]['ws7_pigs_count']}</td>
                <td className="report-cell-td report-cell-value report-dir-date">
                  {sections[s_number]['ws11_pigs_count']}</td>
              </tr>
              )}
            
          </tbody>
        </table>

      </div>
    );
  }
}


export default PigsCount