

/**
 * Copyright 2016 Evernote Corporation. All rights reserved.
 */

/**
 * A receipt component to display on in-progress checkout pages
 */
define(['require','resolve!i18n','IncentiveTimeUnit','IncentiveType','react','stringAffixer','css!IncentiveRibbonComponent'],function (require) {
  

  var i18n = require('resolve!i18n');
  var IncentiveTimeUnit = require('IncentiveTimeUnit');
  var IncentiveType = require('IncentiveType');
  var React = require('react');
  var StringAffixer = require('stringAffixer');

  require('css!IncentiveRibbonComponent');

  var cssPrefixed = StringAffixer.getCssPrefixer('IncentiveRibbonComponent');

  var RibbonSide = React.createClass({
    displayName: 'RibbonSide',

    propTypes: {
      className: React.PropTypes.string
    },

    render: function render() {
      return React.createElement(
        'div',
        { className: this.props.className },
        React.createElement('div', { className: cssPrefixed('ribbon-half', 'top') }),
        React.createElement('div', { className: cssPrefixed('ribbon-half', 'bottom') })
      );
    }
  });

  var IncentiveRibbonComponent = React.createClass({
    displayName: 'IncentiveRibbonComponent',

    propTypes: {
      /**
       * Incentive data used to render the message and decide whether to show the ribbon.
       */
      incentiveSkuData: React.PropTypes.object,

      /**
       * Incentive type used to render the message and decide whether to show the ribbon.
       */
      incentiveType: React.PropTypes.string,

      /**
       * A message to display in the ribbon. Either pass this prop or incentiveType and
       * incentiveSkuData. Usually used to display something like "EXCLUSIVE OFFER" rather
       * than actual incentive text.
       */
      message: React.PropTypes.string,

      /**
       * Controls whether a "ribbon" (side of this component styled with two skewed
       * rectangles) appears on the `left` side, `right` side, or both sides (`center`).
       */
      ribbonSide: React.PropTypes.oneOf(['left', 'center', 'right']).isRequired,

      /**
       * An optional class to add to the root element of this component.
       */
      wrapperClass: React.PropTypes.string
    },

    isShowRibbon: function isShowRibbon() {
      // The message overrules any incentive data passed.
      return this.props.message || this.props.incentiveSkuData;
    },

    getMessage: function getMessage() {
      if (this.isShowRibbon()) {
        if (this.props.message) {
          return this.props.message;
        } else {
          // Generate a message from incentive data, if valid.
          if (this.props.incentiveType === IncentiveType.SAVINGS) {
            var percentSaved = this.props.incentiveSkuData.percentSaved;
            return i18n.L('CheckoutInfoPane.incentive.ribbon.savings', [percentSaved]);
          } else if (this.props.incentiveType === IncentiveType.BONUS) {
            return i18n.plurr('CheckoutInfoPane.incentive.ribbon.bonus', {
              N: this.props.incentiveSkuData.timeLength,
              TIMEUNIT: IncentiveTimeUnit.getValue(this.props.incentiveSkuData.timeUnit)
            });
          } else if (this.props.incentiveType === IncentiveType.TRIAL) {
            return i18n.plurr('CheckoutInfoPane.incentive.ribbon.trial', {
              N: this.props.incentiveSkuData.timeLength,
              TIMEUNIT: IncentiveTimeUnit.getValue(this.props.incentiveSkuData.timeUnit)
            });
          }
        }
      }
      // Ribbon shouldn't be shown.
      return null;
    },

    render: function render() {
      if (this.isShowRibbon()) {
        return React.createElement(
          'div',
          { className: this.props.wrapperClass },
          React.createElement(
            'div',
            { className: cssPrefixed('container', this.props.ribbonSide) },
            React.createElement(RibbonSide, { className: cssPrefixed('left-side') }),
            React.createElement(
              'div',
              { className: cssPrefixed('main') },
              this.getMessage()
            ),
            React.createElement(RibbonSide, { className: cssPrefixed('right-side') })
          )
        );
      }
      return null;
    }
  });

  return IncentiveRibbonComponent;
});