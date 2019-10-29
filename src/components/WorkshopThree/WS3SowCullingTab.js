import React, { Component } from 'react';

// components
import { SowToursData } from '../../components/SowRepresentations'

class WS3CullingTab extends Component {
  constructor(props) {
   super(props);
   this.state = {
     cullingReason: 'padej',
     cullingType: 'padej',
     query: { all_in_workshop_number: 3,},
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

 setReason = (e) => {
   this.setState({
     ...this.state,
     cullingReason: e.target.value
   })
 }

 setType = (e) => {
   this.setState({
     ...this.state,
     cullingType: e.target.value
   })
 }

 cullingSow = () => {
   let data = {
     id: this.props.sow.sow.id,
     culling_type: this.state.cullingType,
     reason: this.state.cullingReason
   }
   
   this.props.cullingSow(data)
   this.props.getSows(this.state.query)
 }

 abortionSow = () => {
   let data = {
     id: this.props.sow.sow.id,
   }
   
   this.props.abortionSow(data)
   this.props.getSows(this.state.query)
 }

 render() {
   const { sows, sow } = this.props
   return (
     <div className='workshop-content'>
       <div className='row'>

         <div className='col-3 workshop-left-column'>
           <div className='workshop-content-column-1'>
             <div class="input-group mb-3">
               <input type='text' onChange={this.getSowsById} 
               className="form-control search-input"
               placeholder="Поиск по ID"/>
             </div>
               <ul className='list-unstyled'>
                 {sows.length > 0 && sow &&
                     sows.map(sowInList => 
                       <li className={sowInList.id == sow.id ? 'sow-active sow-li text-center' :
                         'sow-li text-center'} 
                         key={sowInList.id} 
                         onClick={() => this.props.getSow(sowInList.id)}>
                         {sowInList.farm_id}
                       </li>)
                   }
               </ul>
           </div>
         </div>

         <div className='col-9'>
           <div className='workshop-content-column-2'>
             {sow && sow &&
               <div>
                 <ul>
                   <li>{sow.id}</li>
                   <li>{sow.location}</li>
                   <li>{sow.status}</li>
                   <li>{sow.farm_id}</li>
                 </ul>
                 <SowToursData sow={sow} />
                 <div className="input-group">
                     <select className="custom-select" onChange={this.setType}>
                       <option selected value='padej' >Падеж</option>
                       <option value='spec' >Спец. убой</option>
                       <option value='prirezka' >Прирезка</option>
                     </select>
                     <input type='text' onChange={this.setReason} placeholder='Напишите причину'/>
                   <div className="input-group-append">
                     <button className="btn btn-outline-secondary" type="button"  
                     onClick={this.cullingSow}>
                       Забраковать
                     </button>
                   </div>
                 </div>
                 <div className="input">
                   <label className='sow-event-label'>Пометить как аборт</label>
                   <div>
                     <button className="btn btn-outline-secondary" type="button"  
                     onClick={this.abortionSow}>
                       Аборт
                     </button>
                   </div>
                 </div>
               </div>
             }
           </div>
       </div>
     </div>
   </div>
   )
 }
}

export default WS3CullingTab