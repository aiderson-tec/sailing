<?php
header("Content-type: text/plain; charset=UTF-8");

// POST変数を取得
$datetimeStart = date("Y-m-d H:i:s", strtotime($_POST['datetimeStart']));
$datetimeEnd = date("Y-m-d H:i:s", strtotime($_POST['datetimeEnd']));
$latStart = $_POST['latStart'];
$lngStart = $_POST['lngStart'];
$latEnd = $_POST['latEnd'];
$lngEnd = $_POST['lngEnd'];

// データベース接続のための値
define('HOSTNAME', 'localhost');
define('DATABASE', 'sailing');
define('USERNAME', 'aida');
define('PASSWORD', 'a8119002');

try {
  /// DB接続を試みる
  $db  = new PDO('mysql:host=' . HOSTNAME . ';dbname=' . DATABASE, USERNAME, PASSWORD);
  // テーブルに登録するselect文を変数に格納　VALUESはプレースフォルダーで空の値を入れとく
  $sql = "SELECT direction, speed, wave, latposition,  lngposition, time(datetime) AS dates FROM test_windy_data WHERE (datetime BETWEEN :datetimeStart AND :datetimeEnd) AND latposition <= :latStart AND latposition >= :latEnd AND lngposition >=  :lngStart AND lngposition <= :lngEnd ORDER BY datetime;";
  //値が空のままSQL文をセット
  $stmt = $db->prepare($sql);
  // 挿入する値を配列に格納
  $stmt->bindParam(':datetimeStart',  $datetimeStart);
  $stmt->bindParam(':datetimeEnd',  $datetimeEnd);
  $stmt->bindParam(':latStart',  $latStart);
  $stmt->bindParam(':lngStart',  $lngStart);
  $stmt->bindParam(':latEnd',  $latEnd);
  $stmt->bindParam(':lngEnd',  $lngEnd);
  //挿入する値が入った変数をexecuteにセットしてSQLを実行
  $stmt->execute();
  $records = $stmt->fetchAll();
  // foreach文で配列の中身を一行ずつ多次元配列dataに入れていく
  $data = [];
  foreach ($records as $record) {
    $data[] = [$record['dates'], $record['direction'], $record['speed'], $record['wave'], $record['latposition'], $record['lngposition']];
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
