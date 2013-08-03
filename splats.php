[

<?php

if ($handle = opendir('upload')) {
    /* This is the correct way to loop over the directory. */
    while (false !== ($entry = readdir($handle))) {
    	  if (substr($entry, -5) == '.json') {
	      readfile('upload/' . $entry);
	      echo ",";
	  }
    }

    closedir($handle);
}

?>

]