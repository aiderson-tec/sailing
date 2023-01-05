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
      // テーブルに登録するselect文を変数に格納
      //10時間前までのデータで試験的に行なっている
      $sql = "select direction, speed, wave, latposition, lngposition from test_windy_data where datetime between subtime(current_timestamp(), '10:00:00') and current_timestamp();";
      // SQLを実行する
      $statement = $db->query($sql);
      // foreach文で配列の中身を一行ずつ出力
      $records = $statement->fetchAll();
      foreach ($records as $row) {
        "<script type='text/javascript'>alert('" . $row['direction'] . "');</script>";
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

  <html>

  <head>
    <meta charset="UTF-8">
    <link rel="stylesheet" href="style.css">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css">
    <script src="https://code.jquery.com/jquery-3.4.1.min.js"></script>
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <title>テスト出力画面</title>
  </head>

  <body style="margin: 0;">
    <!-- アイコン表示 -->
    <form action="test_output.php" method="POST">
      <input type="submit" value="Icon表示" name="show">
    </form>
    <br /><br />

    <div id="sampleArea">サンプル1</div>
    <br /><br />

    <!-- マップ -->
    <div id="map2" style="width:1000px; height:600px"></div>

    <script async defer src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAzB70xpfmp81NvE6UlsmiTxXJIFSIxiJs&callback=initMap">
    </script>
    <script type="text/javascript" src="code.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.6/umd/popper.min.js"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"></script>
    <script defer src="https://use.fontawesome.com/releases/v5.7.2/js/all.js"></script>
  </body>

  </html>