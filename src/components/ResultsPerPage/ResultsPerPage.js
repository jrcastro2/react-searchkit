/*
 * This file is part of React-SearchKit.
 * Copyright (C) 2018 CERN.
 *
 * React-SearchKit is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Dropdown } from 'semantic-ui-react';
import { ShouldRender } from '@app/components/ShouldRender';

export default class ResultsPerPage extends Component {
  constructor(props) {
    super(props);

    this.options = props.values;
    this.defaultValue = props.defaultValue;
    this.updateQuerySize = this.props.updateQuerySize;
    this.setInitialState = props.setInitialState;
    this.renderElement = props.renderElement || this._renderElement;
  }

  componentDidMount() {
    if (this.props.currentSize === -1) {
      this.setInitialState({
        size: this.defaultValue,
      });
    }
  }

  _renderElement(currentSize, values, onChange) {
    return (
      <Dropdown
        inline
        compact
        options={values}
        value={currentSize}
        onChange={(e, { value }) => onChange(value)}
      />
    );
  }

  _mapOptions = options => {
    return options.map((element, index) => {
      return { key: index, text: element.text, value: element.value };
    });
  };

  onChange = value => {
    if (value === this.props.currentSize) return;
    this.updateQuerySize(value);
  };

  render() {
    const { loading, currentSize, totalResults, values } = this.props;
    return (
      <ShouldRender
        condition={!loading && totalResults > 0 && currentSize !== -1}
      >
        {this.renderElement(
          currentSize,
          this._mapOptions(values),
          this.onChange
        )}
      </ShouldRender>
    );
  }
}

ResultsPerPage.propTypes = {
  currentSize: PropTypes.number.isRequired,
  loading: PropTypes.bool.isRequired,
  totalResults: PropTypes.number.isRequired,
  values: PropTypes.array.isRequired,
  defaultValue: PropTypes.number.isRequired,
  renderElement: PropTypes.func,
};

ResultsPerPage.defaultProps = {
  renderElement: null,
};