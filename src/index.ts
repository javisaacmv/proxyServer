
import express from 'express';
import proxy from 'express-http-proxy'

const app = express();
const port = 3000;


app.use('/*', proxy('https://auth.hml.caradhras.io'));

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
