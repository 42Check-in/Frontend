import logout from '@/utils/logout';
import Router from 'next/router';
import React, { Component } from 'react';
import type { PropsWithChildren, ReactNode } from 'react';

import Error from './Error';

type ErrorBoundaryProps = PropsWithChildren<{}>;

interface ErrorBoundaryState {
  error: Error;
}

const errorBoundaryState: ErrorBoundaryState = {
  error: null,
};

export default class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = errorBoundaryState;
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    console.error(error);
    return { error };
  }

  private readonly resetState = (): void => {
    this.setState(errorBoundaryState);
  };

  private readonly setError = (error: Error): void => {
    this.setState({ error });
  };

  private readonly handleError = (event: ErrorEvent): void => {
    this.setError(event.error);
    event.preventDefault?.();
  };

  private readonly handleRejectedPromise = (event: PromiseRejectionEvent): void => {
    event?.promise?.catch?.(this.setError);
    event.preventDefault?.();
  };

  componentDidMount(): void {
    window.addEventListener('error', this.handleError);
    window.addEventListener('unhandledrejection', this.handleRejectedPromise);
    Router.events.on('routeChangeStart', this.resetState);
  }

  componentWillUnmount(): void {
    window.removeEventListener('error', this.handleError);
    window.removeEventListener('unhandledrejection', this.handleRejectedPromise);
    Router.events.off('routeChangeStart', this.resetState);
  }

  render(): ReactNode {
    const { error } = this.state;
    if (error !== null) {
      console.warn('ErrorBoundary: ', error);
      logout();
      return <Error />;
    }
    return this.props.children;
  }
}