(function(){
  'use strict';

  var $input = $('input'),             ///added jQery with $
    $ul    =$('ul'),
    url   = 'https://yspuku7qvh9u4cr3.firebaseio.com/.json';

  //document.addEventListener('DOMContentLoaded', init); ////
  //$(init);
  $(document).ready(init); ////shorthand for commented out or it could be $(init);

  function init() {
   $input = $('input'),
   $ul    = $('ul');

  $input.change(getUpdateAndSplit);
  getUpdateAndSplit();
  }

  function getUpdateAndSplit(){
   var count = $input.val();  ////made input.val equal the jQery formula

   $ul.empty();
   $.get(url, function(res){
    var chunkedStudents = chunkData(res['c8-students'], count);
    $ul.append(createList(chunkedStudents));
   });
  };

  function chunkData(data, count){
   return _(data)
    .map(function(value){
      return value.firstName + ' ' + value.lastName[0] + '.';
    })
    .shuffle()
    .chunk(count)
    .value();
  }

  function createList(array) {
   //var docFragment = document.createDocumentFragment(); //////////commented out is the docFragment and is being replaced by jQeury
   var groupList = [];

   _.forEach(array, function(team){
   // var ol = document.createElement('ol');
    var $ol =  $('<ol></ol>');

    _.forEach(team, function(teamMember){
     // var li = document.createElement('li');
      var $li =  $('<li >' +  teamMember + '</li>');
     // var text = document.createTextNode(teamMember);
     // li.appendChild(text);
     //  ol.appendChild(li);
      $ol.append($li);
    })

   //docFragment.appendChild(ol);
   groupList.push($ol);

  });

  //return docFragment;
  return groupList;
  }
})();

  //function getJSON(url, cb) {         //////replaced by $.get(url, function(res){
   //var xhr = new XMLHttpRequest();
   //xhr.open('GET', url);

  //xhr.onload = function () {
    //if (this.status >= 200 && this.status < 400) {
      //cb(JSON.parse(this.response));
    //}
  //};

   //xhr.send()
  //}

