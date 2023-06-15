import React, { Fragment } from 'react';
import App from 'next/app';
import 'shaka-player/dist/controls.css'; /* Shaka player CSS import */
import '../public/styles/index.css';
class MyApp extends App {

  render() {
    const { Component, pageProps } = this.props;

    return (
      <Fragment>
        <Component {...pageProps}/>
      </Fragment>
    );
  }
}

export default MyApp;