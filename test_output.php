  <?php
  if (isset($_POST['show'])) {
    // データベース接続のための値
    define('HOSTNAME', 'localhost');
    define('DATABASE', 'sailing');
    define('USERNAME', 'aida');
    define('PASSWORD', 'a8119002');

    try {
      /// DB接続を試みる
      $db  = new PDO('mysql:host=' . HOSTNAME . ';dbname=' . DATABASE, USERNAME, PASSWORD);
      $msg = "MySQL への接続確認が取れました。";
      $alert = "<script type='text/javascript'>alert('" . $msg . "');</script>";
      echo $alert;
      // テーブルに登録するINSERT INTO文を変数に格納　VALUESはプレースフォルダーで空の値を入れとく
      $sql = "select direction, speed, wave, latposition, lngposition from test_windy_data where datetime between subtime(current_timestamp(), '00:05:00') and current_timestamp();";
      // SQLを実行する
      $statement = $db->query($sql);
      // foreach文で配列の中身を一行ずつ出力
      foreach ($statement as $row) {
        // データベースのフィールド名で出力
        $alert2 = "<script type='text/javascript'>alert('" . $row['direction'] . "');</script>";
        echo $alert2;
        }
      } catch (PDOException $e) {
      $isConnect = false;
      $msg = "MySQL への接続に失敗しました。";
      }
    }
/*
  
    //配列の初期化
    /*$windData = array();
    while ($row = $sth->fetch(PDO::FETCH_ASSOC)) { //結果を配列で取得
    $windData[] = array(
      'direction' => $row['direction'],
      'speed' => $row['speed'],
      'wave' => $row['wave'],
      'latposition' => $row['latposition'],
      'lngposition' => $row['lngposition']
    );
*/
    /*
  //PHPの配列をJSON形式のデータに変換
  //$json = json_encode($windData);
  // MySQLを使った処理が終わると、接続は不要なので切断する
  $db = null;

  //アラートを出す
    $alert = "<script type='text/javascript'>alert('" . $direction . "');</script>";
    echo $alert;*/

/*
echo <<<EOM
    <script>
    var sampleArea = document.getElementById("sampleArea");
    //JavaScriptへ渡す
    var array = <? php echo $json; ?>;

    array.forEach(elm => {
      alert(elm['name'] + 'さんの出身地は' + elm['pref'] + 'です。<br>');
    })
  </script>
  EOM;
/** JavaScript出力終了 */
  /*}*/
?>