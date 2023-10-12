export const SortAlphaAsc = function(a, b) {
  var textA = a.title.toUpperCase();
  var textB = b.title.toUpperCase();
  return (textA < textB) ? 1 : (textA > textB) ? -1 : 0;
};

export const SortAlphaDesc = function(a, b) {
  var textA = a.title.toUpperCase();
  var textB = b.title.toUpperCase();
  return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
};

export const SortPlayedDateAsc = function (a, b) {
  if (a.date === '' && b.date === '') {
    return SortAlphaDesc(a, b);
  } else if (a.date === '') {
    return 1;
  } else if (b.date === '') {
    return -1;
  }
  return (new Date(a.date) < new Date(b.date)) ?
    1 : (new Date(a.date) > new Date(b.date)) ? -1 : 0;
};

export const SortPlayedDateDesc = function(a, b) {
  if (a.date === '' && b.date === '') {
    return SortAlphaDesc(a, b);
  } else if (a.date === '') {
    return 1;
  } else if (b.date === '') {
    return -1;
  }
  return (new Date(a.date) < new Date(b.date)) ?
    -1 : (new Date(a.date) > new Date(b.date)) ? 1 : 0;
};

export const Shuffle = function(a) {
  var j;
  var x;
  var i;
  for (i = a.length; i; i--) {
    j = Math.floor(Math.random() * i);
    x = a[i - 1];
    a[i - 1] = a[j];
    a[j] = x;
  }
  return a;
};
