<?php
$myfile = fopen("last.txt", "w") or die("Unable to open file!");
fwrite($myfile, $q = $_REQUEST["q"]);
fclose($myfile);
echo "";
?>
