import React, { Component } from 'react';
import './Modal.css';

import { connect } from 'react-redux';
import { connectProcesses } from 'redux-saga-process';

class ModalContainer extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      willOpen: false,
      isOpened: false,
    };
    this.timeouts = Object.create(null);
  }

  componentWillReceiveProps(np) {
    if (np.modal.isOpened !== this.props.modal.isOpened) {
      this.setState({
        willOpen: np.modal.isOpened,
      });
      this.timeouts.willOpen = setTimeout(() => {
        this.setState({ isOpened: np.modal.isOpened });
      }, np.modal.isOpened ? 10 : 500);
    }
  }

  componentWillUnmount() {
    for (let timeoutID in this.timeouts) {
      clearTimeout(this.timeouts[timeoutID]);
    }
  }

  render() {
    if (!this.state.willOpen && !this.state.isOpened) {
      return null;
    }
    let wrapperClasses = `Modal-wrapper`;
    if (this.state.willOpen) {
      wrapperClasses += ' willOpen';
    }
    if (this.state.isOpened) {
      wrapperClasses += ' isOpened';
    }
    return (
      <div className={wrapperClasses} onClick={() => this.props.modalClose()}>
        <div
          className="Modal-container"
          onClick={e => {
            e.stopPropagation();
          }}
        >
          <pre>
            <code>
              {JSON.stringify(this.props, null, 2)}
            </code>
          </pre>
        </div>
      </div>
    );
  }
}

const ConnectToRedux = ({ actions, selectors }) =>
  connect(
    state => ({
      modal: selectors.modal(state),
    }),
    actions,
  )(ModalContainer);

export default connectProcesses(
  {
    modal: ['actions', 'selectors'],
  },
  ConnectToRedux,
);
