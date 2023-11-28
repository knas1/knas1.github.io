<?php
// Check Request Method
if ($_SERVER['REQUEST_METHOD'] != 'GET') {
    header('Allow: GET');
    http_response_code(405);
    echo json_encode('Method Not Allowed');
    return;
}
// Headers
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: GET');

include_once '../models/Todo.php';
include_once '../config/database.php';

// Instantiate Todo object
$todo = new Todo($mysqli);



// Read all ToDo items
$result = $todo->readAll();
if (! empty($result)) {
    echo json_encode($result);
} else {
    echo json_encode(
        array('message' => 'No todo items were found')
    );
}
