const express = require('express');
const router = express.Router();
const conn = require('../lib/db')


router.get('/', (req, res) => {


  if(!req.session.idrole) {
     res.redirect('/login');
  }

  conn.query('SELECT * FROM rooms', (err,result) => {


      if(err) throw err;
      let user = req.session.fullname
      res.render('pages/client/index', {title: 'welcome client', user, trn: req.flash('trnsc'),data: result, mesg: req.flash('success') } );

  } )

});


router.get('/transaction/:idrooms', (req,res) =>{

  if(!req.session.idrole) {
    res.redirect('/login')
    return false
  }
  
const id = req.params.idrooms;
const iduser = req.session.iduser
const name = req.session.fullname;
if(!req.session.idrole) {

    res.redirect('login')
  
}
let room = (`SELECT * FROM rooms INNER JOIN category ON rooms.idcat = category.idcat WHERE ${id}`)
const user = req.session.fullname;

conn.query(room, (err,result) => {

  if(err) throw err;
    res.render('pages/client/transaction', {title: 'Transaction', user, data: result,iduser,name})

  

})
})

router.post('/transactionpost', (req,res) => {

  let day = req.body.day
  let price = req.body.price;
  let total = day * price;


  let transaction = {
    iduser: req.body.iduser,
    idroom: req.body.idroom,
    date_booking: req.body.date_booking,
    day: req.body.day,
    total: total
    
  }  

  conn.query(`INSERT INTO transaction SET ? `, transaction, (err, rows) => {

    if(err) throw err
 

    console.log(rows);
    req.flash('trnsc', 'Transaction Success.., Thanks for boking')
    res.redirect('/')

  })






})





module.exports = router;
