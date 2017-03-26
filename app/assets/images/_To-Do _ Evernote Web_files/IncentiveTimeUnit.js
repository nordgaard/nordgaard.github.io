/**
 * Copyright 2016 Evernote Corporation. All rights reserved.
 */

/**
 * An enumeration of Incentive time units (corresponding to IncentiveTimeUnit in
 * CommerceInternal.thrift)
 */
define([],function() {
  

  var IncentiveTimeUnit = {
    DAYS: 'DAYS',
    WEEKS: 'WEEKS',
    MONTHS: 'MONTHS',
    YEARS: 'YEARS',
    getValue: function(timeUnit) {
      switch (timeUnit) {
        case IncentiveTimeUnit.DAYS:
          return 1;
        case IncentiveTimeUnit.WEEKS:
          return 2;
        case IncentiveTimeUnit.MONTHS:
          return 3;
        case IncentiveTimeUnit.YEARS:
          return 4;
        default:
          return undefined;
      }
    }
  };

  return IncentiveTimeUnit;
});
