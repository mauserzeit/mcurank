var order = document.location.href.split('?a=').pop(),
    results = document.getElementById('results'),
    share = document.getElementById('share'),
    saveimage = document.getElementById('saveimage'),
    copytext = document.getElementById('copytext'),
    items = [],
    output,

    renderList = function(){
      items = list.sort(function(a, b) {
        var c = order.indexOf(a.k),
            d = order.indexOf(b.k);
        return ((c === -1) ? 10000 : c) - ((d === -1) ? 10000 : d);
      });

      items = items.map(function(a){
        return a.t;
      });

      output = '<li>' + items.join('</li><li>') + '</li>';

      results.innerHTML = output;
    },

    copyUrl = function(){
      var sel,
          range = document.createRange();

      copytext.style.display = "block";
      copytext.contentEditable = true;
      copytext.readOnly = false;
      copytext.value = document.location.href;
      range.selectNodeContents(copytext);
      sel = window.getSelection();
      sel.removeAllRanges();
      sel.addRange(range);
      copytext.select();
      copytext.setSelectionRange(0, 999999);
      document.execCommand("copy");
      copytext.blur();
      copytext.style.display = "none";
      share.innerHTML = "Copied URL";
      setTimeout(function(){ share.innerHTML = "Share results"; }, 3000);
    },

    prepResultImage = function(){
      var canvas = document.getElementById('canvas');
      var ctx = canvas.getContext('2d');

      var data = '<svg xmlns="http://www.w3.org/2000/svg" width="720" height="1380" style="background:#000612;">' +
                  '<foreignObject width="100%" height="100%">' +
                  '<div xmlns="http://www.w3.org/1999/xhtml" style="text-align: center; padding: 16px; font-family: -apple-system, system-ui, BlinkMacSystemFont, \'Segoe UI\', Roboto, \'Helvetica Neue\', Arial, sans-serif;">' +
                  '<h1 style="color:#fff; font-size: 44px;">' + document.title + '</h1>' +
                  '<ol style="padding: 0; margin: 0 0 0 44px; max-width: 600px; font-size: 24px; line-height: 32px; text-align: left; color:#fff; display:inline-block;">' +
                  output +
                  '</ol>' +
                  '</div>' +
                  '</foreignObject>' +
                  '</svg>';

      data = encodeURIComponent(data);

      var img = new Image();

      img.onload = function() {
        ctx.drawImage(img, 0, 0);

        saveimage.href = canvas.toDataURL();
        saveimage.download = "result.png";
      }

      img.src = "data:image/svg+xml," + data;
    };

// Render the results into the <ol>
renderList();
prepResultImage();

