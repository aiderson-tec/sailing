<?php
header("Content-type: text/plain; charset=UTF-8");

//php接続確認用
//echo '<script>alert("ようこそのWebの世界へ")</script>';

// POST変数を取得
$boat_id = 1;
$direction = $_POST['direction'];
$speed = $_POST['speed'];
$wave = $_POST['wave'];
$lat = $_POST['lat'];
$lon = $_POST['lon'];

// データベース接続のための値
define('HOSTNAME', 'localhost');
define('DATABASE', 'sailing');
define('USERNAME', 'aida');
define('PASSWORD', 'a8119002');

try {
  /// DB接続を試みる
  $db  = new PDO('mysql:host=' . HOSTNAME . ';dbname=' . DATABASE, USERNAME, PASSWORD);
  // テーブルに登録するINSERT INTO文を変数に格納　VALUESはプレースフォルダーで空の値を入れとく
  $sql = "INSERT INTO test_windy_data (boat_id, direction, speed, wave, latposition, lngposition) VALUES (:boat_id, :direction, :speed, :wave, :latposition, :lngposition)";
  //値が空のままSQL文をセット
  $stmt = $db->prepare($sql);
  // 挿入する値を配列に格納
  //$params = array(':boat_id' => $boat_id, ':direction' => $direction, ':speed' => $speed, ':wave' => $wave, ':latposition' => $lat, ':lngposition' => $lon);
  $stmt->bindParam(':boat_id',  $boat_id);
  $stmt->bindParam(':direction', $direction);
  $stmt->bindParam(':speed', $speed);
  $stmt->bindParam(':wave',  $wave);
  $stmt->bindParam(':latposition', $lat);
  $stmt->bindParam(':lngposition', $lon);
  //挿入する値が入った変数をexecuteにセットしてSQLを実行
  $stmt->execute();
  //サーバ切断
  $db = null;
  //フロントサイドへてきとーに返しておく
  echo "これもらったよ。$direction,$speed,$wave,$lat,$lon";
} catch (PDOException $e) {
  $isConnect = false;
  echo "MySQL への接続に失敗しました。";
}
