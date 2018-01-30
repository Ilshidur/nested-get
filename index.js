function stringIsInteger(value) {
  return /^\d+$/.test(value);
}

function fromStringWithNumber(data, filter) {
  return data[filter];
}

function fromStringWithArray(data, filtersList) {
  return filtersList.map(field => get(data, field));
}

function fromObjectWithString(data, filter) {
  if (filter.includes('.')) {
    const [field, ...filterTail] = filter.split('.');
    const filteredData = fromObjectWithString(data, field);
    return get(filteredData, filterTail.join('.'));
  }
  let keepWholeObject = false;
  if (filter[0] === '~') {
    filter = filter.substring(1);
    keepWholeObject = true;
  }
  if (stringIsInteger(filter)) {
    const index = Number(filter);
    return get(data, index);
  }
  if (keepWholeObject) {
    return { [filter]: data[filter] };
  }
  return data[filter];
}

function fromObjectWithNumber(data, filter) {
  const keys = Object.keys(data);
  if (keys.length === 0 || keys.length <= filter) {
    return undefined;
  }
  const key = keys[filter];
  const value = data[key];
  return { [key]: value };
}

function fromObjectWithArray(data, filtersList) {
  return filtersList.map(field => get(data, field));
}

function fromArrayWithNumber(data, filter) {
  return data[filter];
}

function fromArrayWithString(data, filter) {
  if (filter === '*') {
    return data;
  }

  if (stringIsInteger(filter)) {
    const index = Number(filter);
    return get(data, index);
  }

  if (!filter.includes('.')) {
    return fromArrayWithString(data, ['*', filter].join('.'));
  }

  let [head, second, ...filterTail] = filter.split('.');
  if (head === '*') {
    if (second === '*') {
      // '*.*'
      if (filterTail.length > 0) {
        return get(data, filterTail.join('.'));
      }
      return data;
    }

    // '*.a' or '*.0'
    const newData = data.map(item => get(item, second));
    if (filterTail.length > 0) {
      return get(newData, filterTail.join('.'));
    }
    return newData;
  }

  let keepWholeObject = false;
  if (head[0] === '~') {
    head = head.substring(1);
    keepWholeObject = true;
  }

  const newData = keepWholeObject ? { [filter]: data[filter] } : data[head];
  const newFilter = [... (second) ? [second] : [], ...filterTail].join('.');
  if (newFilter.length > 0) {
    return get(newData, newFilter);
  }
  return newData;
}

function fromArrayWithArray(data, filtersList) {
  return filtersList.map(field => get(data, field));
}

function get(data, filter) {
  if (
    typeof filter === 'undefined' ||
    filter !== filter || // Check if NaN
    filter === null ||
    filter === '' ||
    Number(filter) === filter && filter % 1 !== 0 || // Check if filter is a float
    Number(filter) === filter && filter < 0
  ) {
    throw new Error('Invalid data');
  }

  if (typeof data === 'string') {

    if (typeof filter === 'number') {
      return fromStringWithNumber(data, filter);
    } else if (typeof filter === 'object' && Array.isArray(filter)) {
      return fromStringWithArray(data, filter);
    } else {
      throw new Error('Invalid filter');
    }

  } else if (typeof data === 'object' && !Array.isArray(data)) {
    // data = object

    if (typeof filter === 'number') {
      return fromObjectWithNumber(data, filter);
    } else if (typeof filter === 'string') {
      return fromObjectWithString(data, filter);
    } else if (typeof filter === 'object' && Array.isArray(filter)) {
      return fromObjectWithArray(data, filter);
    } else {
      throw new Error('Invalid filter');
    }

  } else if (typeof data === 'object') {
    // data = array

    if (typeof filter === 'number') {
      return fromArrayWithNumber(data, filter);
    } else if (typeof filter === 'string') {
      return fromArrayWithString(data, filter);
    } else if (typeof filter === 'object' && Array.isArray(filter)) {
      return fromArrayWithArray(data, filter);
    } else {
      throw new Error('Invalid filter');
    }

  } else {
    throw new Error('Invalid data');
  }
}

module.exports = get;
