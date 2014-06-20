var getSingleProperty = require('../connection/utils').getSingleProperty;

var needSlaveOk = ['primaryPreferred', 'secondary', 'secondaryPreferred', 'nearest'];

/**
 * Creates a new Pool instance
 * @class
 * @param {string} preference A string describing the preference (primary|primaryPreferred|secondary|secondaryPreferred|nearest)
 * @param {object} tags The tags object
 * @param {object} [options] Additional read preference options
 * @property {string} preference The preference string (primary|primaryPreferred|secondary|secondaryPreferred|nearest)
 * @property {object} tags The tags object
 * @property {object} options Additional read preference options
 * @return {ReadPreference}
 */
var ReadPreference = function(preference, tags, options) {

  /**
   * This needs slaveOk bit set
   * @method
   * @return {boolean}
   */
  this.slaveOk = function() {
    return needSlaveOk.indexOf(preference) != -1;
  }

  /**
   * Are the two read preference equal
   * @method
   * @return {boolean}
   */
  this.equals = function(readPreference) {
    return readPreference.preference == preference;
  }

  // Define properties
  getSingleProperty(this, 'preference', preference);
  getSingleProperty(this, 'tags', tags || {});
  getSingleProperty(this, 'options', options);
}

/**
 * Primary read preference
 * @method
 * @return {ReadPreference}
 */
ReadPreference.primary = new ReadPreference('primary');
/**
 * Primary Preferred read preference
 * @method
 * @return {ReadPreference}
 */
ReadPreference.primaryPreferred = new ReadPreference('primaryPreferred');
/**
 * Secondary read preference
 * @method
 * @return {ReadPreference}
 */
ReadPreference.secondary = new ReadPreference('secondary');
/**
 * Secondary Preferred read preference
 * @method
 * @return {ReadPreference}
 */
ReadPreference.secondaryPreferred = new ReadPreference('secondaryPreferred');
/**
 * Nearest read preference
 * @method
 * @return {ReadPreference}
 */
ReadPreference.nearest = new ReadPreference('nearest');

module.exports = ReadPreference;