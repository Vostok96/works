const express = require('express');
const db = require('./utils/database');
const Works = require('./models/works.models');


db.authenticate()
    .then(()=> console.log('Base de datos conectada'))
    .catch(()=> console.log(err));

db.sync()
    .then(()=> console.log("Base de datos sincronizada"))
    .catch((error)=>console.log(error));

const app = express();
app.use(express.json());
app.get("/", (req, res) => {
    res.send('Servidor funcionando')
});

app.post('/works', async(req, res) =>{
    try{
        const newWork = req.body;
        await Works.create(newWork);
        res.status(201).send();
    } catch (error){
        res.status(400).json(error);
    }
});

app.get('/works', async(req, res) => {
    try{
        const works = await Works.findAll();
        res.json(works);
    } catch (error) {
        res.status(400).json(error)
    }
});

app.get("/works/:id", async(req, res) =>{
    try{
        const { id } = req.params;
        console.log(req.params);
        const work = await Works.findByPk(id);
        res.json(work);
    } catch (error) {
        res.status(400).json(error);
    }
});

app.delete("/works/:id", async(req, res)=>{
    try{
        const{id} = req.params;
        await Works.destroy({
            where: {id}
        });
        res.status(204).send();
    }catch (error) {
        res.status(400).json(error);
    }
});

app.put('/works/:id', async (req, res) => {
    try{
        const {id} = req.params;
        const {completed} = req.body;
        await Works.update({completed}, {
            where: {id}
        });
        res.status(204).send();
    } catch (error) {
        res.status(400).json(error);
    }
});

app.listen(8000, () => {
    console.log("Servidor escuchando en el pto 8000")
});