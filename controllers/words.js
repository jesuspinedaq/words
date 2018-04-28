var express = require('express');
var router = express.Router();
var Word = require('../model/word');

router.get('/:id', function(req, res){
  var id = req.params.id;
  Word.findById(id, function(err, word){
    if(err) return res.status(404).send(err);

    return res.status(200).send(word);
  });
});

router.get('/', function(req, res){
  Word.find({}, function(err, words){
    if(err) return res.status(500).send(err);

    return res.status(200).json({words: words});
  })
});

router.post('/', function(req, res){
  var newWord = new Word({
    word: req.body.word,
    meaning: req.body.meaning,
    category: req.body.category,
    subCategory: req.body.subCategory
  });

  newWord.save(function(err){
    if(err) return res.status(500).send(err);

    return res.status(200).json({message: 'Word was successfully saved'});
  });
});

router.put('/:id', function(req, res){
  var id = req.params.id;
  var newWord = {
    word: req.body.word,
    meaning: req.body.meaning,
    category: req.body.category,
    subCategory: req.body.subCategory
  };

  Word.findByIdAndUpdate(id, newWord, function(err){
    if(err) return res.status(500).send(err);

    return res.status(200).json({message: 'Word was successfully updated'});
  });
});

router.delete('/:id', function(req, res){
  const id = req.param.id;
  Word.findByIdAndRemove(id, function(err, word){
    if(err) return res.status(500).send(err);

    return res.status(200).json({message: "Word successfully deleted"});
  });
});

module.exports = router;

//Note from https://coursework.vschool.io/mongoose-crud/
//https://github.com/simonholmes/mongoose-default-connection/blob/master/model/db.js
//https://www.terlici.com/2014/08/25/best-practices-express-structure.html