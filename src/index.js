require("dotenv").config();

const port = process.env.PORT || 3333;

const app = express();
app.use(express.json());
app.listen(port, () => {
  console.log("Listening on port: " + port);
});

const cors = require('cors');
app.use(cors());
