const express = require('express');
const router = express.Router();
const conn = require('../lib/db')

router.get('/', (req, res) => {

    res.render('pages/login/index', {title: 'InnApps', message: req.flash('error'),reg: req.flash('register'), msg: req.flash('logingagal')});


});

router.post('/loginpost', (req, res) => {

    const username = req.body.username;
    const pass= req.body.password;

    if(username === "" || pass === "") {
        req.flash('error', 'Username/password tidak boleh kosong!');
        console.log('masuakn username/password!');
         res.redirect('/login');
         return false
    }

   const cek = (`SELECT * FROM users WHERE username ="${username}" AND password = "${pass}"`);

    conn.query(cek, (err, result) => {

        if(err) throw err;

        if(result <= 0 ) {
            req.flash('logingagal', 'Username/Password anda salah!');
             res.redirect('/login');
             return false
        }  else {

           
            const idrole = result[0].idrole;
            const iduser = result[0].iduser;
            const user = result[0].fullname;

                req.session.idrole = idrole;
                req.session.iduser = iduser;
                req.session.fullname = user;
                if(req.session.idrole === 2 ) {
                    req.flash('success', 'Welcome InnApps')
                     res.redirect('/');
                }
        
         }

    })
    
});

router.get('/register', (req,res) => {

    res.render('pages/login/register',  {title: 'register' } );


})

router.post('/regpost', (req,res) =>  {

    let data = {
        fullname: req.body.fullname,
        noktp: req.body.noktp,
        email: req.body.email,
        idrole: req.body.idrole,
        nohp: req.body.nohp,
        address: req.body.address,
        username: req.body.username,
        password: req.body.password

    }


    conn.query('INSERT INTO users SET ? ' , data,  (err, result) => {

        if(err) throw err

        req.flash('register', 'Register Success..')
        res.redirect('/login');

    } )



})


router.get('/logout', (req, res) => {

    req.session.destroy((err)=>{})

     res.redirect('/login');


});



module.exports = router;