import React, { Component } from 'react';


class WS4ResettelmentTab extends Component {
   constructor(props) {
    super(props);
    this.state = {
      
    }
  }
  
  componentDidMount() {
    // query
    this.props.getPiglets()
  }
  showProps = () => {
    console.log(this.props)
  }
  render() {
    const { piglets } = this.props
    return (
        <div className='row workshop-content'>
          <div className='col-3'>
            {piglets.map(group =>
              <div>
                ID{group.id} Количество{group.quantity}
              </div>
            )}
            
          </div>
          <div className='col-9'>
            
            
        </div>
      </div>
    )
  }
}

export default WS4ResettelmentTab