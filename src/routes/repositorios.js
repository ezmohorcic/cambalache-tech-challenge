const Router = require('express')
const verifyToken = require('../helpers/verifyToken');

const { Usuario, Historial, Repositorio } = require('../db.js');

const router = Router();



//POST NEW REPO
router.post('/', verifyToken , async (req, res) =>
{
    const { idUsuario, lenguajes, nombre  } = req.body;
    console.log( idUsuario, lenguajes, nombre )
    try 
    {
        const existing = await Repositorio.findAll({ where:{ nombre } })
        if (existing.length) return res.status(409).json("Already created!");
        else
        {
            const repo = await Repositorio.create({ idUsuario, lenguajes, nombre});
            res.json(repo);
        }
    }
    catch (error) 
    {
        console.log(error)
        res.status(500).json("Error on Repository!");
    }
});



//GET ALL REPOS BY 'idUsuario'
router.get('/:idUsuario', verifyToken , async (req, res) =>
{
    const { idUsuario } = req.params;
    try 
    {
        const repos = await Repositorio.findAll( { where:{ idUsuario } } );
        !repos.length ? res.status(404).json("Not found!") : res.json(repos);
    }
    catch (error) 
    {
        console.log(error)
        res.status(500).json("Error on Repository!");
    }
});



//GET REPO BY 'id'
router.get('/', verifyToken , async (req, res) =>
{
    const { id } = req.query;
    try 
    {
        const repo = await Repositorio.findByPk( id );
        !repo ? res.status(404).json("Not found!") : res.json(repo);
    }
    catch (error) 
    {
        console.log(error)
        res.status(500).json("Error on Repository!");
    }
});



//PUT CHANGE NAME BY 'id'
router.put('/', verifyToken , async (req, res) =>
{
    const { id, nombre } = req.body;
    try 
    {
        const repo = await Repositorio.findByPk( id );
        if(!repo)res.status(404).json("Not found!");
        else 
        {
            repo.nombre=nombre;
            repo.save();
            res.json(repo);
        }
    }
    catch (error) 
    {
        console.log(error)
        res.status(500).json("Error on Repository!");
    }
});

module.exports =  router;