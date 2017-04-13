<?php 
$dat = fopen("data.txt", "r") or die("Unable to open file!");
echo "users = ".fread($dat,filesize("data.txt")+100).";";
?>
