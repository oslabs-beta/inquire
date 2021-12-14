import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addAvroActionCreator } from '../../actions/actions.js';
import buttonCopyText from '../../assets/buttonCopyText.png'

const mapDispatchToProps = dispatch => (
  {
    addAvro: (text) => dispatch(addAvroActionCreator(text)),
  }
);

const mapStateToProps = state => ({
  avroText: state.schemas.avroText,
});

class AvroInput extends Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    return(
        <div className="p7">
          <img
            className="copyTextButton" 
            src={buttonCopyText} 
            alt="my-logo"
            onClick={() => {navigator.clipboard.writeText(this.props.avroText)}}
          />
          <textarea
          className="inputOutputBox"
          onChange={(e) => { this.props.addAvro(e.target.value) }}
          value={this.props.avroText}
          />
        </div>
    );
  }
}

export default connect (mapStateToProps, mapDispatchToProps) (AvroInput);
