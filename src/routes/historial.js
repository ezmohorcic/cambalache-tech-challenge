const Router = require('express')
const verifyToken = require('../helpers/verifyToken');

const { Usuario, Historial, Repositorio } = require('../db.js');

const router = Router();


//POST NEW HISTORIAL
router.post('/', verifyToken , async (req, res) =>
{
    const { idUsuario, tipo  } = req.body;
    try 
    {
        const log = await Historial.create( { where:{ idUsuario, tipo } } );
        res.json(log);
    }
    catch (error) 
    {
        console.log(error)
        res.status(500).json("Error on historial!");
    }
});


//GET ALL HISTORY FROM 'idUsuario'
router.get('/:idUsuario', verifyToken , async (req, res) =>
{
    const { idUsuario } = req.params;
    try 
    {
        const logs = await Historial.findAll( { where:{ idUsuario } } );
        !logs.length ? res.status(404).json("Not found!") : res.json(logs);
    }
    catch (error) 
    {
        console.log(error)
        res.status(500).json("Error on historial!");
    }
});

module.exports =  router;