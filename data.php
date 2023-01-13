<?php
header("Content-type: text/plain; charset=UTF-8");

// POST変数を取得
$datetimeStart = date("Y-m-d H:i:s", strtotime($_POST['datetimeStart']));
$datetimeEnd = date("Y-m-d H:i:s", strtotime($_POST['datetimeEnd']));

// データベース接続のための値
define('HOSTNAME', 'localhost');
define('DATABASE', 'sailing');
define('USERNAME', 'aida');
define('PASSWORD', 'a8119002');

try {
  /// DB接続を試みる
  $db  = new PDO('mysql:host=' . HOSTNAME . ';dbname=' . DATABASE, USERNAME, PASSWORD);
  // テーブルに登録するselect文を変数に格納　VALUESはプレースフォルダーで空の値を入れとく
  $sql = "SELECT direction, speed, wave, time(datetime) as dates from test_windy_data WHERE datetime between :datetimeStart AND :datetimeEnd order by datetime;";
  //値が空のままSQL文をセット
  $stmt = $db->prepare($sql);
  // 挿入する値を配列に格納
  $stmt->bindParam(':datetimeStart',  $datetimeStart);
  $stmt->bindParam(':datetimeEnd',  $datetimeEnd);
  //挿入する値が入った変数をexecuteにセットしてSQLを実行
  $stmt->execute();
  $records = $stmt->fetchAll();
  // foreach文で配列の中身を一行ずつ多次元配列dataに入れていく
  $data = [];
  foreach ($records as $record) {
    $data[] = [$record['dates'], $record['direction'], $record['speed'], $record['wave']];
  }
  // MySQLを使った処理が終わると、接続は不要なので切断する
  $db = null;
  //jsに送る
  echo json_encode($data);
  exit;
} catch (PDOException $e) {
  $isConnect = false;
  echo "MySQL への接続に失敗しました。";
}
