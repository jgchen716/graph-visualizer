// Code for handling single and double clicks
// Reference: https://medium.com/trabe/prevent-click-events-on-double-click-with-react-with-and-without-hooks-6bf3697abc40

import { Component } from "react";

const cancellablePromise = (promise) => {
  let isCanceled = false;

  const wrappedPromise = new Promise((resolve, reject) => {
    promise.then(
      (value) => (isCanceled ? reject({ isCanceled, value }) : resolve(value)),
      (error) => reject({ isCanceled, error })
    );
  });

  return {
    promise: wrappedPromise,
    cancel: () => (isCanceled = true),
  };
};

const noop = () => {};
const delay = (n) => new Promise((resolve) => setTimeout(resolve, n));

const pleaseStopTriggeringClicksOnDoubleClick = (WrappedComponent) => {
  class ComponentWrapper extends Component {
    componentWillUnmount() {
      // cancel all pending promises to avoid
      // side effects when the component is unmounted
      this.clearPendingPromises();
    }

    pendingPromises = [];

    appendPendingPromise = (promise) =>
      (this.pendingPromises = [...this.pendingPromises, promise]);

    removePendingPromise = (promise) =>
      (this.pendingPromises = this.pendingPromises.filter(
        (p) => p !== promise
      ));

    clearPendingPromises = () => this.pendingPromises.map((p) => p.cancel());

    handleClick = () => {
      // create the cancelable promise and add it to
      // the pending promises queue
      const waitForClick = cancellablePromise(delay(300));
      this.appendPendingPromise(waitForClick);

      return waitForClick.promise
        .then(() => {
          // if the promise wasn't cancelled, we execute
          // the callback and remove it from the queue
          this.removePendingPromise(waitForClick);
          this.props.onClick();
        })
        .catch((errorInfo) => {
          // rethrow the error if the promise wasn't
          // rejected because of a cancelation
          this.removePendingPromise(waitForClick);
          if (!errorInfo.isCanceled) {
            throw errorInfo.error;
          }
        });
    };

    handleDoubleClick = () => {
      // all (click) pending promises are part of a
      // dblclick event so we cancel them
      this.clearPendingPromises();
      this.props.onDoubleClick();
    };

    render() {
      return (
        <WrappedComponent
          {...this.props}
          onClick={this.handleClick}
          onDoubleClick={this.handleDoubleClick}
        />
      );
    }
  }

  ComponentWrapper.displayName = `withClickPrevention(${
    WrappedComponent.displayName || WrappedComponent.name || "Component"
  })`;

  ComponentWrapper.defaultProps = {
    onClick: noop,
    onDoubleClick: noop,
  };

  return ComponentWrapper;
};

export default pleaseStopTriggeringClicksOnDoubleClick;
