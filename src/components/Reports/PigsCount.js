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
    let total = this.props.pigsCount.ws_total
    // console.log(sections)

    return (
      <div className="card">
        <div className='content text-center'>
          <h3 className='mb-3'>Текущее количество</h3>
          <table className='table table-responsive-sm table-sm font-14'>
            <thead className='bg-mainDark-dark'>
              <tr>
                <th ></th>
                <th colSpan='3'>Свиноматки</th>
                <th colSpan='7'>Поросята</th>
              </tr>
              <tr>
                <th > - </th>
                <th >Цех 1</th>
                <th >Цех 2</th>
                <th >Цех 3</th>
                <th >Цех 3</th>
                <th >Цех 4</th>
                <th >Цех 8</th>
                <th >Цех 5</th>
                <th >Цех 6</th>
                <th >Цех 7</th>
                <th >Всего</th>
              </tr>
            </thead>
            <tbody>
              {workshops && 
                <tr>
                  <td className="">
                    Цех
                  </td>
                  <td className="">
                    {workshops['ws1']['sows_count']}</td>
                  <td className="">
                    {workshops['ws2']['sows_count']}</td>
                  <td className="">
                    {workshops['ws3']['sows_count']}</td>
                  <td className="">
                    {workshops['ws3']['pigs_count']}</td>
                  <td className="">
                    {workshops['ws4']['pigs_count']}</td>
                  <td className="">
                    {workshops['ws8']['pigs_count']}</td>
                  <td className="">
                    {workshops['ws5']['pigs_count']}</td>
                  <td className="">
                    {workshops['ws6']['pigs_count']}</td>
                  <td className="">
                    {workshops['ws7']['pigs_count']}</td>
                  <td className="">
                    {total}</td>
                </tr>
              }
              {sections && Object.keys(sections).map(s_number => 
                <tr key={s_number}>
                  <td className="text-nowrap">
                    Секция {s_number[4]}{s_number[5] && s_number[5]} 
                  </td>
                  <td className="">
                    {sections[s_number]['ws1_sows_count'] > 0 && sections[s_number]['ws1_sows_count']}
                  </td>
                  <td className="">
                    {sections[s_number]['ws2_sows_count'] > 0 && sections[s_number]['ws2_sows_count']}</td>
                  <td className="">
                    {sections[s_number]['ws3_sows_count'] > 0 && sections[s_number]['ws3_sows_count']}</td>
                  <td className="">
                    {sections[s_number]['ws3_pigs_count']}</td>
                  <td className="">
                    {sections[s_number]['ws4_pigs_count']}</td>
                  <td className="">
                    {sections[s_number]['ws8_pigs_count']}</td>
                  <td className="">
                    {sections[s_number]['ws5_pigs_count']}</td>
                  <td className="">
                    {sections[s_number]['ws6_pigs_count']}</td>
                  <td className="">
                    {sections[s_number]['ws7_pigs_count']}</td>
                  <td className="">
                    </td>
                </tr>
                )}
              
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}


export default PigsCount