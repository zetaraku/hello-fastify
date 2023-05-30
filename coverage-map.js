/**
 * Coverage mapping for node-tap
 * @see https://node-tap.org/docs/coverage/coverage-map/
 */
module.exports = (testFile) => testFile.replace(/\.(?:test|spec)\.(?<ext>js|ts)$/, '.$<ext>');
