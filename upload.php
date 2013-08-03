<?php

if ($_FILES["photo"]["error"] > 0) 
{
  echo "Return code : " . $_FILES["photo"]["error"] . "<br>";
}
else 
{
  move_uploaded_file($_FILES["photo"]["tmp_name"], "upload/" . $_FILES["photo"]["name"]);
  echo "Stored in upload/" . $_FILES["photo"]["name"];

  $json = "{'name':'" . $_POST["animal"] . "','lon':'" . $_POST["longitude"] . "','lat':'" . $_POST["latitude"] . "','img':'upload/" . $_FILES["photo"]["name"] . "'}";
  file_put_contents("upload/" . $_FILES["photo"]["name"] . ".json", $json);
}

?>