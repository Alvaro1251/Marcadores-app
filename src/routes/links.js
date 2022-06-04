const express = require('express');
const { is } = require('express/lib/request');
const res = require('express/lib/response');
const { addListener } = require('../datebase');
const router = express.Router();

const db = require('../datebase');
const { isLoggedIn } = require('../lib/auth');

router.get('/add', isLoggedIn, (req, res) => {
    res.render('links/add'); 
});

router.post('/add', isLoggedIn, (req, res) => {
    const { title, url, description } = req.body;
    const newLink = {
        title,
        url,
        description,
        user_id: req.user.id
    };
    db.query('INSERT INTO links set ?', [newLink], (error, results, fields) =>{
        if(error){
            console.log(error);
            return res.status(500).send('error');
        }
        // return res.status(200).send('recibido');
    });
    req.flash('success', 'Link guardado correctamente');
    res.redirect('/links');
});

router.get('/', isLoggedIn, async(req, res) => {
    const links = await db.query('SELECT * FROM links WHERE user_id = ?', [req.user.id]);
    console.log(links);
    res.render('links/list', {links});
});

router.get('/delete/:id', isLoggedIn, async(req, res) => {
    const { id } = req.params;
    await db.query('DELETE FROM links WHERE ID = ?', [id]);
    req.flash('success', 'Link removido correctamente') 
    res.redirect('/links');
});

router.get('/edit/:id', isLoggedIn, async(req, res) => {
    const { id } = req.params;
    const links = await db.query('SELECT * FROM links WHERE id = ?', [id]);
    res.render('links/edit', {link: links[0]});
});

router.post('/edit/:id', isLoggedIn, async(req,res)=>{
    const { id } = req.params;
    const { title , description, url } = req.body;
    const newLink = {
        title,
        description,
        url
    };
    req.flash('success', 'Link actualizado correctamente')
    await db.query('UPDATE links set ? WHERE id = ?', [newLink, id]);
    res.redirect('/links');
})

module.exports = router;               