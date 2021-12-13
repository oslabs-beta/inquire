import React, { Component } from 'react';
import { connect } from 'react-redux';
import buttonYellow from '../../assets/buttonYellowCircleOnGreen.png'
// import { changePageActionCreator } from '../../actions/actions.js';

const mapDispatchToProps = dispatch => (
  {
    connectKafka: () => dispatch(connectKafkaActionCreator()),
    makeGraphQL: () => dispatch(makeGraphQLActionCreator()),
    clearAvro: () => dispatch(clearAvroActionCreator()),
  }
);

const mapStateToProps = state => ({
  // add pertinent state here
  // totalCards: state.markets.totalCards,
  // totalMarkets: state.markets.totalMarkets,
});

class ButtonContainer extends Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    const descriptionText = `
      Topic
    `
    return(
      <div className="buttonContainer">
        <div className="converterButton"
        onClick={() => this.props.connectKafka()}>
          <div className="p3">connect kafka</div>
          <img src={buttonYellow} alt="my-logo"></img>
        </div>

        <div className="converterButton"
          onClick={() => this.props.makeGraphQL()}>
          <div className="p3">generate now</div>
          <img src={buttonYellow} alt="my-logo"></img>
        </div>

        <div className="converterButton"
        onClick={() => this.props.clearAvro()}>
          <div className="p3">try another one</div>
          <img src={buttonYellow} alt="my-logo"></img>
        </div>
      </div>
    );
  }
}

export default connect (mapStateToProps, mapDispatchToProps) (ButtonContainer);
