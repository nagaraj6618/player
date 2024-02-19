const Express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const app = Express()
const PORT = 4000
require('dotenv').config()
const loginRoute = require('./routes/auth.js')
const fileRoute = require('./routes/fileRoutes.js')
const cookieParser = require('cookie-parser')



app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

app.use(Express.json())

mongoose.connect(process.env.DB_URL)
const db = mongoose.connection
db.on('error', (errorMessage) => console.log(errorMessage))
db.once('open', () => console.log(`Connected successfully to the database.`))

app.use(cookieParser())


app.use('/api/v1/dance', fileRoute)
app.use('/api/v1/auth', loginRoute)


app.get('/', (req, res) => {
   res.status(200).json({ message: 'working..' })
})


app.listen(PORT, () => {
   console.log(`http://localhost:${PORT}/api/v1`);
})