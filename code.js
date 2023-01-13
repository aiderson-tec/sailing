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
  var map = new google.maps.Map(document.getElementById('map'), opts1);
}

// ボタン押した後のマップとアイコン表示 
function showIcon() {
  var kakudo = 0;
  var windSpeed = 3;
  var latPosition = 35.362745502151;
  var lngPosition = 139.64707275353;

  var map = new google.maps.Map(document.getElementById('map'), opts1);

  var arrowPosition = { lat: latPosition, lng: lngPosition };
  var markerOptions = {
    map: map,
    position: arrowPosition,
    icon: {
      path: google.maps.SymbolPath.FORWARD_OPEN_ARROW,
      strokeColor: 'red',
      scale: 7,
      rotation: parseInt(kakudo),
    },
    label: {
      text: windSpeed + 'm\n' + kakudo + '°',
      fontFamily: 'sans-serif',
      fontWeight: 'bold',
      fontSize: '12px'
    }
  };

  var marker = new google.maps.Marker(markerOptions);
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
      alert('失敗らしい');
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
  $.ajax({
    type: "post",
    url: "test.php",
    // 通信が成功した場合　
    success: function (data, dataType) {
      var json = JSON.parse(data);
      var map2 = new google.maps.Map(document.getElementById('map2'), opts2);
      json.forEach(function (value) {
        var kakudo = value[0];
        var windSpeed = value[1];
        var latPosition = Number(value[2]);
        var lngPosition = Number(value[3]);

        var arrowPosition = {
          lat: latPosition,
          lng: lngPosition
        };

        var arrowPosition = { lat: latPosition, lng: lngPosition };
        var markerOptions = {
          map: map2,
          position: arrowPosition,
          icon: {
            path: google.maps.SymbolPath.FORWARD_OPEN_ARROW,
            strokeColor: 'red',
            scale: 7,
            rotation: parseInt(kakudo),
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
      alert('失敗らしい');
    }
  });
}


// data.html用
// 表の表示
function show() {
  
}
