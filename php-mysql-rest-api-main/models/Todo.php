<?php

class Todo
{
    private $id;
    private $task;
    private $dateAdded;
    private $done = false;
    private $dbConnection;
    private $dbTable = 'tasks';

    public function __construct($dbConnection)
    {
        $this->dbConnection = $dbConnection;
    }

    public function getId()
    {
        return $this->id;
    }

    public function getTask()
    {
        return $this->task;
    }

    public function getDateAdded()
    {
        return $this->dateAdded;
    }

    public function getDone()
    {
        return $this->done;
    }

    public function setId($id)
    {
        $this->id = $id;
    }

    public function setTask($task)
    {
        $this->task = $task;
    }

    public function setDateAdded($dateAdded)
    {
        $this->dateAdded = $dateAdded;
    }

    public function setDone($done)
    {
        $this->done = $done;
    }

    public function create()
    {
        $query = "INSERT INTO " . $this->dbTable . "(task, date_added, done) VALUES (?, NOW(), false)";
        $stmt = $this->dbConnection->prepare($query);
        $stmt->bind_param("s", $this->task);
        
        if ($stmt->execute()) {
            return true;
        }

        // Print an error message
        printf("Error: %s", $stmt->error);
        return false;
    }

    public function readOne()
    {
        $query = "SELECT * FROM " . $this->dbTable . " WHERE id=?";
        $stmt = $this->dbConnection->prepare($query);
        $stmt->bind_param("i", $this->id);
        
        if ($stmt->execute()) {
            $result = $stmt->get_result();
            
            if ($result->num_rows == 1) {
                $row = $result->fetch_assoc();
                $this->id = $row['id'];
                $this->task = $row['task'];
                $this->dateAdded = $row['date_added'];
                $this->done = $row['done'];
                return true;
            }
        }

        return false;
    }
    public function readAll()
    {
        $query = "SELECT * FROM " . $this->dbTable . " WHERE done = false ";
        $stmt = $this->dbConnection->prepare($query);
        
        if ($stmt->execute()) {
            $result = $stmt->get_result();
            $todos = [];
    
            while ($row = $result->fetch_assoc()) {
                $todos[] = $row;
            }
    
            return $todos;
        }
    
        return [];
    }
    
  
    public function update()
    {
        $query = "UPDATE " . $this->dbTable . " SET done=1 WHERE id=?";
        $stmt = $this->dbConnection->prepare($query);
        $stmt->bind_param("i", $this->id);

        if ($stmt->execute()) {
            return true;
        }

        return false;
    }

    public function delete()
    {
        $query = "DELETE FROM " . $this->dbTable . " WHERE id=?";
        $stmt = $this->dbConnection->prepare($query);
        $stmt->bind_param("i", $this->id);

        if ($stmt->execute()) {
            return true;
        }

        return false;
    }
}
