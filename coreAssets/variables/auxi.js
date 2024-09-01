export const removeEmptyLines = (strings, ...values) => {
  return strings.reduce((result, string, i) => {
    let value = values[i] || '';
    if (value === '') {
      return result + string.trimRight();
    } else {
      return result + string + value;
    }
  }, '').split('\n').filter(line => line.trim() !== '').join('\n');
};