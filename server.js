//import and require mysql2;
const mysql2= require('mysql2');
const inquirer= require('inquirer');

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Connect to database
const db = mysql.createConnection(
  {
    host: '127.0.0.1',
    user: 'root',
    database: employee_db
  },
  console.log(`Connected to the employee_db database.`)
);
// GET request for movies
app.get('/api/employees', (req, res) => {
  // Inform the client
  res.json(`${req.method} request received to get employees`);
  // Log our request to the terminal
  console.info(`${req.method} request received to get employees`);
  //Query
  db.query('SELECT * FROM employees', function (err, results) {
      console.log(results);
  })
});
app.post('/api/add-movie', ({ body }, res) => {
  const params = [body.movie_name]
  db.query('INSERT INTO movies (movie_name) VALUES (?)', params, function (err, results) {
      if (err) {
          console.error(err);
      } else {
      res.json({
          message: "success",
          data: body
      })
      console.log(results);
      }
  });
});

app.delete('api/movie/:id', (req,res) => {
  res.json(`${req.method} request received to delete a movie`);
  console.info(`${req.method} request received to delete a movie`);
})
app.use((req, res) => {
  res.status(404).end();
});
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});