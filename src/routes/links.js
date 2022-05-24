const express = require('express');
const res = require('express/lib/response');
const router = express.Router();

const pool = require('../datebase');

router.get('/add', (req, res) => {
    res.render('links/add'); 
});

router.post('/add',(req, res) => {
    const { title, url, description } = req.body;
    const newLink = {
        title,
        url,
        description
    };
    pool.query('INSERT INTO links set ?', [newLink], (error, results, fields) =>{
        if(error){
            console.log(error);
            return res.status(500).send('error');
        }
        // return res.status(200).send('recibido');
    });
    req.flash('success', 'Link guardado correctamente');
    res.redirect('/links');
});

router.get('/', async(req, res) => {
    const links = await pool.query('SELECT * FROM links');
    console.log(links);
    res.render('links/list', {links});
});

router.get('/delete/:id', async(req, res) => {
    const { id } = req.params;
    await pool.query('DELETE FROM links WHERE ID = ?', [id]);
    req.flash('success', 'Link removido correctamente') 
    res.redirect('/links');
});

router.get('/edit/:id', async(req, res) => {
    const { id } = req.params;
    const links = await pool.query('SELECT * FROM links WHERE id = ?', [id]);
    res.render('links/edit', {link: links[0]});
});

router.post('/edit/:id', async(req,res)=>{
    const { id } = req.params;
    const { title , description, url } = req.body;
    const newLink = {
        title,
        description,
        url
    };
    req.flash('success', 'Link actualizado correctamente')
    await pool.query('UPDATE links set ? WHERE id = ?', [newLink, id]);
    res.redirect('/links');
})

module.exports = router;               