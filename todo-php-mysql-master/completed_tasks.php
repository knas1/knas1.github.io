<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link type="text/css" rel="stylesheet" href="./style.css">
    <title>Completed Tasks</title>
</head>
<body>
    <h1>Completed Tasks</h1>

    <?php require_once('./get_completed_todos.php'); ?>

    <a href="index.php" class="return-link">Return to ToDo List</a>
</body>
</html>
