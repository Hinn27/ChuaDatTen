const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { notFound, errorHandler } = require('./src/middlewares/errorMiddleware');
const routes = require('./src/routes');

dotenv.config();

const supabase = require('./src/config/supabase');

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api', routes);

// Error Middlewares
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
