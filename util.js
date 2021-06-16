// /util.js

'use strict'

let util = {};

util.uniq = (array) => {
  return array.filter((elem, index, self) => self.indexOf(elem) === index);
};

util.commaSplit = (str) =>{
  return str.split(',');
};

util.plusSplit = (str) =>{
  return str.split('+');
};

util.getQueryFromSearchType = (searchType,searchValue) =>{
  let searchTypes = util.plusSplit(searchType);
  let searchQuery = [];
  searchTypes.forEach(type => {
    searchQuery.push({[type]:{$regex:searchValue}});
  });
   return searchQuery;
}

module.exports = util;
