/**
 * Returns the value of an attribute with a specified keyName.
 * @param {Object} object - object for which the value is to be determined.
 * @param {String} keyName - keyName of the attribute.
 */
export function getAttribute(object, keyName) {
  try {
    const value = object.attributes.find(
      (attribute) => attribute.key === keyName
    ).value;
    return value.stringValue ? value.stringValue : value.intValue;
  } catch (error) {
    // attribute does not exist, returning undefined
  }
}

/**
 * Returns the variable accessed by a given db statement.
 * The variable contains either the item number or the key number of a given db statement.
 * @param {Object} dbStatement - db statement for which accessed variable is to be determined.
 */
export function getVariableFromDbStatement(dbStatement) {
  return dbStatement.Item
    ? dbStatement.Item.number
    : dbStatement.Key
    ? dbStatement.Key.number
    : null;
}

/**
 * Determines whether a span represents a call to a single database.
 * @param {Object} span - span for which determination is conducted.
 */
export function isRequestToSingleDatabase(span) {
  return attributeExists(span, "db.name");
}

/**
 * Determines whether a span represents a batchWrite operation.
 * @param {Object} span - span for which determination is conducted.
 */
export function isBatchWrite(span) {
  return span.attributes.some(
    (attribute) =>
      attribute.key === "db.operation" &&
      attribute.value.stringValue === "BatchWriteItem"
  );
}

/**
 * Determines whether a span represents a HTTP request.
 * @param {Object} span - span for which determination is conducted.
 */
export function isHttpRequest(span) {
  return attributeExists(span, "net.peer.name");
}

/**
 * Returns whether an attribute with a specified keyName exists within a given object.
 * @param {Object} object - object for which attribute existence is to be determined.
 * @param {String} keyName - keyName of the attribute.
 */
function attributeExists(object, keyName) {
  return object.attributes.some((attribute) => attribute.key === keyName);
}
