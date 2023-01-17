// コードの数え方
// Ctrl + Shift + P
// VSCodeCounter: Count lines in workspace


// 関数、変数
// マップ表示用の変数
//相模原
var mapPositionSagami = {
  lat: 35.5664357,
  lng: 139.4030089
};
var optsSagami = {
  zoom: 13.5,
  mapTypeId: 'terrain',
  center: mapPositionSagami,
};

//八景
var mapPositionHakkei = {
  lat: 35.361344,
  lng: 139.662262
};
var optsHakkei = {
  zoom: 13.5,
  mapTypeId: 'terrain',
  center: mapPositionHakkei,
};

// 赤坂
var mapPositionAkasaka = {
  lat: 35.6701333,
  lng: 139.7291589
};
var optsAkasaka = {
  zoom: 13.5,
  mapTypeId: 'terrain',
  center: mapPositionAkasaka,
};

var mapPositionHayama = {
  lat: 35.2833399,
  lng: 139.550035
};
var optsHayama = {
  zoom: 13.5,
  mapTypeId: 'terrain',
  center: mapPositionHayama,
};

// マップ表示用の関数
function showIcon(map, opts) {
  $.ajax({
    type: "post",
    url: "test.php",
    // 通信が成功した場合　
    success: function (data, dataType) {
      var json = JSON.parse(data);
      var areaMap = new google.maps.Map(document.getElementById(map), opts);
      json.forEach(function (value) {
        var kakudo = Number(value[0]);
        var windSpeed = value[1];
        var latPosition = Number(value[2]);
        var lngPosition = Number(value[3]);
        var windDirection = kakudo;
        if (kakudo >= 180) {
          windDirection -= 180;
        } else {
          windDirection += 180;
        }

        var arrowPosition = {
          lat: latPosition,
          lng: lngPosition
        };

        var markerOptions = {
          map: areaMap,
          position: arrowPosition,
          icon: {
            path: google.maps.SymbolPath.FORWARD_OPEN_ARROW,
            strokeColor: 'red',
            scale: 7,
            rotation: parseInt(windDirection),
          },
          label: {
            text: windSpeed + 'm\n' + kakudo + '°',
            fontFamily: 'sans-serif',
            fontWeight: 'bold',
            fontSize: '12px'
          }
        };

        var marker = new google.maps.Marker(markerOptions);
      });
    },
    // 通信が失敗した場合
    error: function () {
      alert('失敗です。');
    }
  });
}


//index.html用
//index スクロールすると現れる
$(window).scroll(function () {
  var scrollAnimationElm = document.querySelectorAll('.discribe');
  var scrollAnimationFunc = function () {
    for (var i = 0; i < scrollAnimationElm.length; i++) {
      var triggerMargin = 100;
      if (window.innerHeight > scrollAnimationElm[i].getBoundingClientRect().top + triggerMargin) {
        scrollAnimationElm[i].classList.add('on');
      }
    }
  }
  window.addEventListener('load', scrollAnimationFunc);
  window.addEventListener('scroll', scrollAnimationFunc);
});

//index スクロールすると消える
$(window).scroll(function () {
  var scrollAnimationElm = document.querySelectorAll('.discribe');
  var scrollAnimationFunc = function () {
    for (var i = 0; i < scrollAnimationElm.length; i++) {
      var triggerMargin = 500;
      if (window.innerHeight > scrollAnimationElm[i].getBoundingClientRect().top + triggerMargin) {
        scrollAnimationElm[i].classList.add('off');
      }
    }
  }
  window.addEventListener('load', scrollAnimationFunc);
  window.addEventListener('scroll', scrollAnimationFunc);
});


//input.html用
//inputのデータをデータベースに
function send() {
  navigator.geolocation.getCurrentPosition(success, fail);
}

// 位置情報が取得できた場合
function success(pos) {
  const position = {
    lat: pos.coords.latitude,        // 緯度
    lon: pos.coords.longitude,   // 経度
  };
  const wind = {
    direction: $('#direction').val(),
    speed: $('#speed').val(),
    wave: $('#wave').val()
  }
  // サーバーサイドへPOSTする
  $.ajax({
    type: "post",
    url: "input.php",
    data: {
      "lat": position.lat,
      "lon": position.lon,
      "direction": wind.direction,
      "speed": wind.speed,
      "wave": wind.wave
    },
    // 通信が成功した場合　
    success: function (data, dataType) {
      alert(data); // サーバーサイドからの返答を表示させてみる
    },
    // 通信が失敗した場合
    error: function () {
      alert('失敗です。');
    }
  });
}
// 位置情報が取得できなかった場合
function fail(error) {
  if (error.code == 1) alert('位置情報を取得する時に許可がない')
  if (error.code == 2) alert('何らかのエラーが発生し位置情報が取得できなかった。')
  if (error.code == 3) alert('タイムアウト　制限時間内に位置情報が取得できなかった。')
}


// output.html用
// 初期のマップ表示
function initMap() {
  var map = new google.maps.Map(document.getElementById('map1'), optsSagami);
}

// ボタン押した後のマップとアイコン表示 
function output() {
  showIcon('map1', optsSagami);
}


// test.html用
//  初期のマップ表示
function initTestMap() {
  var map = new google.maps.Map(document.getElementById('map2'), optsAkasaka);
}

// データベースから出力
function test() {
  showIcon('map2', optsAkasaka);
}


// data.html用
// 表の表示
function show() {
  const date = {
    year: $('#year').val(),
    month: $('#month').val(),
    date: $('#date').val(),
    ocean: $('#ocean').val(),
  }
  //変数の整形
  var datetimeStart = date.year + '-' + date.month + '-' + date.date + ' 00:00:00';
  var datetimeEnd = date.year + '-' + date.month + '-' + date.date + ' 23:59:59';
  //マップの緯度経度情報
  var mapPos = [[35.296019, 139.482129, 35.264856, 139.560271], [35.295840, 139.521908, 35.283916, 139.555022], [35.285188, 139.482756, 35.248927, 139.538076], [35.284234, 139.536128, 35.256403, 139.561840], [35.378860, 139.647690, 35.327737, 139.714687], [35.577575, 139.385322, 35.558235, 139.411930], [35.688539, 139.694796, 35.665178, 139.734521]];
  if (date.ocean == 'hakkei') {
    var latStart = mapPos[0][0];
    var lngStart = mapPos[0][1];
    var latEnd = mapPos[0][2];
    var lngEnd = mapPos[0][3];
  } else if (date.ocean == 'hayama') {
    var latStart = mapPos[1][0];
    var lngStart = mapPos[1][1];
    var latEnd = mapPos[1][2];
    var lngEnd = mapPos[1][3];
  } else if (date.ocean == 'zushi') {
    var latStart = mapPos[2][0];
    var lngStart = mapPos[2][1];
    var latEnd = mapPos[2][2];
    var lngEnd = mapPos[2][3];
  } else if (date.ocean == 'morito') {
    var latStart = mapPos[3][0];
    var lngStart = mapPos[3][1];
    var latEnd = mapPos[3][2];
    var lngEnd = mapPos[3][3];
  } else if (date.ocean == 'oki') {
    var latStart = mapPos[4][0];
    var lngStart = mapPos[4][1];
    var latEnd = mapPos[4][2];
    var lngEnd = mapPos[4][3];
  } else if (date.ocean == 'sagami') {
    var latStart = mapPos[5][0];
    var lngStart = mapPos[5][1];
    var latEnd = mapPos[5][2];
    var lngEnd = mapPos[5][3];
  } else if (date.ocean == 'akasaka') {
    var latStart = mapPos[6][0];
    var lngStart = mapPos[6][1];
    var latEnd = mapPos[6][2];
    var lngEnd = mapPos[6][3];
  }

  // サーバーサイドへPOSTする
  $.ajax({
    type: "post",
    url: "data.php",
    data: {
      "datetimeStart": datetimeStart,
      "datetimeEnd": datetimeEnd,
      "latStart": latStart,
      "lngStart": lngStart,
      "latEnd": latEnd,
      "lngEnd": lngEnd
    },
    // 通信が成功した場合　
    success: function (data, dataType) {
      var json = JSON.parse(data);
      if (json.length === 0) {
        alert('データがありません。');
      } else {
        // tableのための準備
        var table_area = document.getElementById('table_area');
        var data_table = document.getElementById('data_table');
        table_area.removeChild(data_table);
        var th_list = ['時間', '風向(°)', '風速(m)', '波高(m)'];
        var table = document.createElement('table');
        table.id = 'data_table';

        //グラフのための準備
        var graph_list = [];
        var date_list = [];
        graph_list.splice(0);
        date_list.splice(0);

        // tableのhead部分
        var thead = document.createElement('thead');
        var row_tr = document.createElement('tr');
        thead.appendChild(row_tr);
        for (var i = 0; i < th_list.length; i++) {
          var row_th = document.createElement('th');
          row_th.innerHTML = th_list[i];
          row_th.id = 'data_head';
          row_tr.appendChild(row_th);
        }

        // tableのbody部分
        var tbody = document.createElement('tbody');
        for (var i = 0; i < json.length; i++) {
          row_tr = document.createElement('tr');
          tbody.appendChild(row_tr);
          for (var j = 0; j < 4; j++) {
            var row_td = document.createElement('td');
            row_td.innerHTML = json[i][j];
            row_td.id = 'data_body';
            row_tr.appendChild(row_td);
            //グラフの配列のための準備
            if (j == 1) {
              graph_list.push(json[i][j]);
            } else if (j == 0) {
              date_list.push(json[i][j]);
            }
          }
        }

        //headとbodyをtableに入れる
        table.appendChild(thead);
        table.appendChild(tbody);

        // tableをareaに入れる
        table_area.appendChild(table);

        //グラフを表示する
        var graph_area = document.getElementById('graph_area');
        var canvas = document.getElementById('graph');
        graph_area.removeChild(canvas);
        var graph = document.createElement('canvas');
        graph.id = 'graph';
        graph_area.appendChild(graph);
        var ctx = document.getElementById('graph');

        var data = {
          labels: date_list,
          datasets: [{
            label: '風向',
            data: graph_list,
            tension: 0.5,
            borderColor: 'rgba(128, 128, 128, 1)'
          }]
        };
        var options = {};

        var ex_chart = new Chart(ctx, {
          type: 'line',
          data: data,
          options: options
        });

        // マップを表示する
        if (date.ocean == 'hakkei') {
          var areaMap = new google.maps.Map(document.getElementById('map3'), optsHakkei);
        } else if (date.ocean == 'sagami') {
          var areaMap = new google.maps.Map(document.getElementById('map3'), optsSagami);
        } else if (date.ocean == 'akasaka') {
          var areaMap = new google.maps.Map(document.getElementById('map3'), optsAkasaka);
        } else {
          var areaMap = new google.maps.Map(document.getElementById('map3'), optsHayama);
        }

        // アイコンを表示する
        json.forEach(function (value) {
          var time = value[0];
          var kakudo = Number(value[1]);
          var windSpeed = value[2];
          var latPosition = Number(value[4]);
          var lngPosition = Number(value[5]);
          var windDirection = kakudo;
          if (kakudo >= 180) {
            windDirection -= 180;
          } else {
            windDirection += 180;
          }

          var arrowPosition = {
            lat: latPosition,
            lng: lngPosition
          };

          var markerOptions = {
            map: areaMap,
            position: arrowPosition,
            icon: {
              path: google.maps.SymbolPath.FORWARD_OPEN_ARROW,
              strokeColor: 'red',
              scale: 7,
              rotation: parseInt(windDirection),
            },
            label: {
              text: time + '\n' + windSpeed + 'm\n' + kakudo + '°',
              fontFamily: 'sans-serif',
              fontWeight: 'bold',
              fontSize: '12px'
            }
          };

          var marker = new google.maps.Marker(markerOptions);
        });

      }
    },// 通信が失敗した場合
    error: function () {
      alert('失敗です。');
    }
  });
}