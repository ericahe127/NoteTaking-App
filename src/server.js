import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import config from "./config.js"
import cors from "cors";

const db = new pg.Client(config.database);

const app = express();
const port = 4000;
db.connect();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("public"));

app.get('/api/notes', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM note');
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/api/addNote', async (req, res) => {
//   const { id, title, content } = req.body;
  console.log(req.body);
  try {
    const result = await db.query('INSERT INTO note (title, content) VALUES ($1, $2) RETURNING *', [req.body.title, req.body.content]);
    // console.log("inserted " + result.rows[0]);
    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.delete('/api/deleteNote/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await db.query('DELETE FROM note WHERE id = $1 RETURNING *', [id]);
    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/api/getMaxId', async (req, res) => {
  try {
    const result = await db.query('SELECT MAX(id) FROM note');
    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});