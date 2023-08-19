import express from 'express';
import route from './route'
import throng from 'throng';

import './worker';


const app = express();
const port = 3000;

app.use(route)


app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
