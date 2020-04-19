var search = document.querySelector('.Autocomplete');

search.addEventListener('input', _.debounce((e) => {
  // Make Ajax call for autocomplete
  console.log(e.target.value);
}, 500));
