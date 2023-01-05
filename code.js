//マップ表示のためのデータ
var mapPosition = { lat: 35.361344, lng: 139.662262 };
var opts1 = {
  zoom: 13.5,
  mapTypeId: 'terrain',
  center: mapPosition,
};

//マップ表示
function initMap() {
  var map = new google.maps.Map(document.getElementById('map'), opts1);
}

//アイコン表示 
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

//マップ表示のためのデータ
var mapPosition = { lat: 35.362528, lng: 139.653631 };
var opts1 = {
  zoom: 13.5,
  mapTypeId: 'terrain',
  center: mapPosition,
};

//マップ表示
function initMap() {
  var map = new google.maps.Map(document.getElementById('map2'), opts1);
}

//アイコン表示 
function testshowIcon() {
  var direction = 0;
  var windSpeed = 3;
  var latPosition = 35.362745502151;
  var lngPosition = 139.64707275353;

  var map = new google.maps.Map(document.getElementById('map2'), opts1);

  var arrowPosition = { lat: latPosition, lng: lngPosition };
  var markerOptions = {
    map: map,
    position: arrowPosition,
    icon: {
      path: google.maps.SymbolPath.FORWARD_OPEN_ARROW,
      strokeColor: 'red',
      scale: 7,
      rotation: parseInt(direction),
    },
    label: {
      text: windSpeed + 'm\n' + direction + '°',
      fontFamily: 'sans-serif',
      fontWeight: 'bold',
      fontSize: '12px'
    }
  };

  var marker = new google.maps.Marker(markerOptions);
}


//inputのデータをデータベースに
// ボタンクリック時
/*$(document).ready(function () {
  $('#send').click(function () {
    // 位置情報の取得可否により分岐
    navigator.geolocation.getCurrentPosition(success, fail);
  });
});*/
function send() {
  navigator.geolocation.getCurrentPosition(success,fail);
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
    url: "server_side.php",
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