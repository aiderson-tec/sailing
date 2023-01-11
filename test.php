<?php
// データベース接続のための値
define('HOSTNAME', 'localhost');
define('DATABASE', 'sailing');
define('USERNAME', 'aida');
define('PASSWORD', 'a8119002');

try {
  // DB接続を試みる
  $db = new PDO('mysql:host=' . HOSTNAME . ';dbname=' . DATABASE, USERNAME, PASSWORD);
  // テーブルに登録するselect文を変数に格納
  // 20時間前までのデータで試験的に行なっている
  $sql = "select direction, speed, wave, latposition, lngposition from test_windy_data where datetime between subtime(current_timestamp(), '20:00:00') and current_timestamp();";
  // SQLを実行する
  $statement = $db->query($sql);
  $records = $statement->fetchAll();
  // foreach文で配列の中身を一行ずつ多次元配列dataに入れていく
  $data = [];
  foreach ($records as $record) {
    $data[] = [$record['direction'], $record['speed'], $record['latposition'], $record['lngposition']];
  }
  // MySQLを使った処理が終わると、接続は不要なので切断する
  $db = null;
  //jsに送る
  echo json_encode($data);
  exit;
} catch (PDOException $e) {
  $isConnect = false;
  $msg = "MySQL への接続に失敗しました。";
}
