<?php
function get_all_todos()
{
    $get_all_tasks_query = "SELECT id, task, date_added, done FROM tasks WHERE done=0 ORDER BY date_added DESC";
    $response = $GLOBALS['conn']->query($get_all_tasks_query);

    if ($response && $response->num_rows > 0) {
        $groupedTasks = groupTasksByDate($response);

        foreach ($groupedTasks as $date => $tasks) {
            echo '<h2 class="date-heading">' . formatDate($date) . '</h2>';
            echo '<ul class="my-list">';
            foreach ($tasks as $task) {
                echo "<li>".'<input type="checkbox" name="checkBoxList[]" value="'.$task["id"].'"><span>'.$task["task"]."</span></li>";
            }
            echo '</ul>';
        }
    } else {
        echo '<h2>Your ToDo list is empty!</h2>';
    }
}

function groupTasksByDate($response) {
    $groupedTasks = array();

    while ($row = $response->fetch_assoc()) {
        $date = date("Y-m-d", strtotime($row['date_added']));

        if (!isset($groupedTasks[$date])) {
            $groupedTasks[$date] = array();
        }

        $groupedTasks[$date][] = $row;
    }

    return $groupedTasks;
}

function formatDate($date) {
    $today = date("Y-m-d");
    $yesterday = date("Y-m-d", strtotime("-1 day", strtotime($today)));

    if ($date == $today) {
        return "Today";
    } elseif ($date == $yesterday) {
        return "Yesterday";
    } else {
        return date("F j, Y", strtotime($date));
    }
}
?>
