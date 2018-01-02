'use strict';

const express = require('express');
const router = express.Router();
const knex = require('../knex')

router.get('/' , (req, res, next)=>{
knex('messages').select('id', 'name', 'message')
.then((result) => {
  res.status(200).send(result)
})
.catch((err) => {
  res.status(404).send(err)
});
});

router.get('/:id', (req, res, next)=>{
  let id = req.params.id;
knex('messages').select('id', 'name', 'message').where('id', id)
.then((result) => {
  res.status(200).send(result[0])
})
.catch((err) => {
  res.status(404).send(err)
});
});

router.post('/', (req, res, next)=>{
  let body = req.body;
  knex('messages').insert(body, ['name', 'message'])
  .then((result)=> {
    res.status(200).send(result[0])
  })
  .catch((err) => {
    res.status(404).send(err)
  });
});

router.patch('/:id', (req,res,next)=>{
  let id = req.params.id;
  let body = req.body;
  knex('messages').update(body, ['id', 'name', 'message']).where('id', id)
  .then((result) => {
    res.status(200).send(result[0])
  })
  .catch((err) => {
    res.status(404).send(err)
  });
});

router.delete('/:id', (req,res,next)=>{
  let id = req.params.id;
  knex('messages').where('id', id).returning(['id', 'name', 'message']).del()
  .then((result) => {
    res.status(200).send(result[0])
  })
  .catch((err) => {
    res.status(404).send(err)
  });
});


module.exports = router;
