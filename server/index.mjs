import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mysql from "mysql2/promise";
import "dotenv/config";
// Create the connection to database
const connection = await mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

const app = express();
app.use(cors());
app.use(bodyParser.json());

const port = 8000;

app.get("/", (req, res) => {
  res.send(`hello world!`);
});

app.get("/todolist", async (req, res) => {
  try {
    const results = await connection.query("SELECT * FROM todolist");
    res.status(200).json({
      message: "get todolist successfully!",
      data: results[0],
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      message: "Something went wrong!",
    });
  }
});

app.get("/todolist/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const results = await connection.query(
      "SELECT * FROM todolist WHERE id = ?",
      id
    );
    if (results[0].length === 0) {
      res.status(404).json({
        message: `todo id = ${id} not found!`,
        data: [],
      });
    }
    res.status(200).json({
      message: `get todo id = ${id} successfully!`,
      data: results[0],
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      message: "Something went wrong!",
    });
  }
});

app.post("/todolist", async (req, res) => {
  try {
    const { todo } = req.body;
    const results = await connection.query(
      "INSERT INTO todolist SET todo = ?",
      todo
    );

    // console.log(results[0]);

    res.status(200).json({
      message: "create new todo successfully!",
      data: {
        id: results[0].insertId,
        todo: todo,
      },
    });
  } catch (error) {
    console.log(error.message);
  }
});

app.delete("/todolist/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const results = await connection.query(
      "DELETE FROM todolist WHERE id = ?",
      id
    );
    if (results[0].affectedRows === 0) {
      res.status(404).json({
        message: "todo not found!",
      });
    }
    res.status(200).json({
      message: `delete todo id = ${id} successfully!`,
    });
  } catch (error) {
    console.log(error.message);
  }
});

app.put("/todolist/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { todo } = req.body;
    const results = await connection.query(
      "UPDATE todolist SET todo = ? WHERE id = ?",
      [todo, id]
    );
    if (results[0].affectedRows === 0) {
      res.status(404).json({
        message: "todo not found!",
      });
    }
    res.status(200).json({
      message: `update todo id = ${id} successfully!`,
      data: {
        todo: todo,
      },
    });
  } catch (error) {
    console.log(error.message);
  }
});

app.listen(port, (req, res) => {
  console.log(`The server is running at http://localhost:${port}`);
});
