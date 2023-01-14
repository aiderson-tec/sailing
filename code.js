// コードの数え方
// Ctrl + Shift + P
// VSCodeCounter: Count lines in workspace

// 地図表示用の関数
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

        var arrowPosition = { lat: latPosition, lng: lngPosition };
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

// output.html用
// マップ表示のためのデータ
var mapPosition = { lat: 35.361344, lng: 139.662262 };
var opts1 = {
  zoom: 13.5,
  mapTypeId: 'terrain',
  center: mapPosition,
};

// 初期のマップ表示
function initMap() {
  var map = new google.maps.Map(document.getElementById('map1'), opts1);
}

// ボタン押した後のマップとアイコン表示 
function output() {
  showIcon('map1', opts1);
}


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


// test.html用
// マップ表示のためのデータ
var mapPosition2 = { lat: 35.6701333, lng: 139.7291589 };
var opts2 = {
  zoom: 13.5,
  mapTypeId: 'terrain',
  center: mapPosition2,
};

//  初期のマップ表示
function initTestMap() {
  var map = new google.maps.Map(document.getElementById('map2'), opts2);
}

// データベースから出力
function test() {
  showIcon('map2', opts2);
}


// data.html用
// 表の表示
function show() {
  const date = {
    year: $('#year').val(),
    month: $('#month').val(),
    date: $('#date').val()
  }
  //変数の整形
  var datetimeStart = date.year + '-' + date.month + '-' + date.date + ' 00:00:00';
  var datetimeEnd = date.year + '-' + date.month + '-' + date.date + ' 23:59:59';
  // サーバーサイドへPOSTする
  $.ajax({
    type: "post",
    url: "data.php",
    data: {
      "datetimeStart": datetimeStart,
      "datetimeEnd": datetimeEnd
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
          for (var j = 0; j < json[i].length; j++) {
            var row_td = document.createElement('td');
            row_td.innerHTML = json[i][j];
            row_td.id = 'data_body';
            row_tr.appendChild(row_td);
          }
        }

        //headとbodyをtableに入れる
        table.appendChild(thead);
        table.appendChild(tbody);

        // tableをareaに入れる
        table_area.appendChild(table);
      }
    },// 通信が失敗した場合
    error: function () {
      alert('失敗です。');
    }
  });
}