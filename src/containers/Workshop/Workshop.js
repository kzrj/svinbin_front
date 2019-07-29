import React, { Component } from 'react';
import { connect } from 'react-redux';


class Workshop extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tabs: {
      }
    }
	}

  componentDidMount() {
    // $('body').addClass('loaded');
    // this.props.startup();

    // const token = localStorage.getItem('token');
    // if (token) {
    //   this.props.checkToken(token);
    // }
  }

  showStateConsole = () => {
    const { state } = this.props
    console.log(state)
  }

  showProps = () => {
    console.log(this.props)
  }

  setTab = (tab) => {
    let { tabs } = this.state
    Object.keys(tabs).forEach((key) => {
      tabs[key] = false
    })
    this.setState({
      tabs: {
        ...tabs,
        [tab]: true
      }
    })
  }

  render() {
    return (
      <div className="workshop container">
      </div>
    );
  }
}

// const mapStateToProps = (state) => ({
//   state: state
// })

// const mapDispatchToProps = (dispatch) => ({
//   dispatch: () => dispatch(),
// })

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(Workshop);

export default Workshop;