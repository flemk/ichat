<?php

// [!] Warning --------------
// script is extremly unsafe!

if (isset($_POST['id']) && !empty($_POST['id']) && isset($_POST['type']) && !empty($_POST['type'])) {
    $id = $_POST['id'];
    $type = $_POST['type'];
    $result = false;

    switch ($type) {
        case 'register':
            $filename = './online.txt';
            // read array from file
            $mode = 'r';
            $handler = fopen($filename, $mode);
            $contents = fread($handler, filesize($filename));
            fclose($handler);

            // evaluate array of file ($online)
            eval($contents);
            array_push($online, $id);

            // append id to output string
            $output = '';
            foreach ($online as $key => $value) {
                $output = $output . '"' . $value . '",';
            }

            // write output to file
            $mode = 'w+';
            $handler = fopen($filename, $mode);
            fwrite($handler, '$online=[' . $output . '];');
            fclose($handler);

            // result was fine
            $result = true;
            break;
        
        case 'message':
            if (isset($_POST['message']) && !empty($_POST['message']) && isset($_POST['file']) && !empty($_POST['file'])) {
                // write message to file
                $filename = $_POST['file'];
                $mode = 'w+';
                $message = $_POST['message'];
                $handler = fopen($filename, $mode);
                fwrite($handler, $message);
                fclose($handler);
                // result was fine
                $result = true;
            }
            break;

        default:
            break;
    }
    echo $result;
}

?>