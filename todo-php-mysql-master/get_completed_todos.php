<?php
require_once('./db_connection.php');

function get_completed_todos() {
    $get_completed_tasks_query = $GLOBALS['conn']->prepare("SELECT id, task, date_added FROM tasks WHERE done = 1 ORDER BY date_added DESC");
    $get_completed_tasks_query->execute();
    $result = $get_completed_tasks_query->get_result();

    if ($result) {
        echo '<ul class="completed-tasks">';
        while ($row = $result->fetch_assoc()) {
            echo '<li class="completed-task">';
            echo '<input type="checkbox" disabled checked>';
            echo '<span class="task-name">' . htmlspecialchars($row['task']) . '</span>';
            echo '<span class="date"> ' . htmlspecialchars($row['date_added']) . '</span>';
            echo '</li>';
        }
        echo '</ul>';

        $result->free_result();
    } else {
        echo 'Error: ' . $get_completed_tasks_query->error;
    }

    $get_completed_tasks_query->close();
}

get_completed_todos();
?>
