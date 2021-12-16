import React, { Component } from 'react';
import { connect } from 'react-redux';
import buttonYellow from '../../assets/buttonYellowCircle.png';
import { connectKafkaActionCreator } from '../../actions/actions.js';
import { makeGraphQLActionCreator } from '../../actions/actions.js';
import { clearAvroActionCreator } from '../../actions/actions.js';

const mapDispatchToProps = (dispatch) => ({
  connectKafka: () => dispatch(connectKafkaActionCreator()),
  makeGraphQL: () => dispatch(makeGraphQLActionCreator()),
  clearAvro: () => dispatch(clearAvroActionCreator()),
});

class ButtonContainer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      // Three buttons, each triggering action creator to either start Kafka,
      // generate GraphQL, or clear values in avroInput and graphQLOutput components, respectively

      <div className="buttonContainer">
        {/* Future functionality: connecting Kafka demo online */}
        {/* <div className="converterButton"
        onClick={() => this.props.connectKafka()}>
          <div className="p3">connect kafka</div>
          <img src={buttonYellow} alt="my-logo"></img>
        </div> */}

        <div
          className="converterButton"
          id="generate"
          onClick={() => this.props.makeGraphQL()}
        >
          <div className="p3">generate now</div>
          <img src={buttonYellow} alt="my-logo"></img>
        </div>

        <div
          className="converterButton"
          id="clear"
          onClick={() => this.props.clearAvro()}
        >
          <div className="p3">clear all values</div>
          <img src={buttonYellow} alt="my-logo"></img>
        </div>
      </div>
    );
  }
}

export default connect(null, mapDispatchToProps)(ButtonContainer);
