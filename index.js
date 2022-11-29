import express from 'express'
import bodyParser from 'body-parser'
import postRoutes from'./routes/posts.routes';

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.use(postRoutes);

const port = process.env.PORT || 3000;

app.get('/', (req, res) => res.status(200).send({
    message: 'This is my API.'
}));

app.listen(port, () => console.log(`Server is running on PORT ${port}`));