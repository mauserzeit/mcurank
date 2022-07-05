var oneTxt = document.querySelector('#one .text'),
    oneImg = document.querySelector('#one .image'),
    twoTxt = document.querySelector('#two .text'),
    twoImg = document.querySelector('#two .image'),
    completion = document.getElementById('completion'),

    items = [],
    
    totalJoin = (function(){
      var arr = [],
          total = 0;

      for(var i = 0; i < list.length; ++i) {
        arr.push(1);
      }

      while (arr.length > 1) {
        var a = arr.pop(),
            b = arr.pop(),
            c = a + b;
        total += c;
        arr.unshift(c);
      }

      return total;
    })(),


    prepItems = function(list) {
      list = list.map(function(item){
        return [item];
      });
      items = list.sort(function(){
        return Math.random() > 0.5;
      }).reverse();
    };

var listOne = [], listTwo = [], joined = [],
    joinRunningTotal = 0,

    nextItems = function(){
      var remaining = listOne.length + listTwo.length,
          temp = listOne;

      // Swap the list every time so items never show in the same location twice in a row
      listOne = listTwo;
      listTwo = temp;

      completion.style.width = Math.min(Math.floor(100 * (joinRunningTotal + joined.length) / totalJoin), 100) + "%";

      // If there are items left in the lists we're sorting, queue them up to get sorted
      if (remaining > 0) {
        if (listTwo.length === 0) {
          while(listOne.length) {
            joined.push(listOne.shift());
          }
          items.push(joined);
          joinRunningTotal += joined.length;
          nextItems();
          return;
        } else if (listOne.length === 0) {
          while(listTwo.length) {
            joined.push(listTwo.shift());
          }
          items.push(joined);
          joinRunningTotal += joined.length;
          nextItems();
        } else {
          var e1 = listOne[0],
              e2 = listTwo[0];
          oneImg.style.backgroundImage = e1.i ? "url(" + e1.i + ")" : "";
          oneTxt.innerHTML = e1.t;
          twoImg.style.backgroundImage = e2.i ? "url(" + e2.i + ")" : "";
          twoTxt.innerHTML = e2.t;
          return;
        }
      } else {
        if (items.length > 1) {
          listOne = items.shift();
          listTwo = items.shift();
          joined = [];
          nextItems();
          return;
        } else {
          // We're done, we only have one array left, and it's sorted
          var list = items[0].reverse().map(function(a){return a.k;}).join('');
          document.location = window.location.origin + '/result.html' + '?a=' + list;
        }
      }
    },

    selected = function(which) {
      switch(which) {
        case 'one':
          joined.push(listTwo.shift());
        break;
        case 'two':
          joined.push(listOne.shift());
        break;
      }

      nextItems();
    };

prepItems(window.list);
nextItems();

