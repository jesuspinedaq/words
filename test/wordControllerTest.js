var chai = require('chai');
var chaiHttp = require('chai-http');
var mongoose = require("mongoose");

var server = require('../server');
var Word = require('../model/word');

var should = chai.should();
chai.use(chaiHttp);

describe('Word test', function(done){
  //Word.collection.drop();
  // before(function(done){
  //   Word.collection.drop(function(){
  //     done();
  //   });
  // });

  beforeEach((done) => {
    Word.remove({}, (err) => { 
       done();         
    }); 
  });
  // afterEach(function(done){
  //   Word.collection.drop();
  //   done();
  // });
  
  it('Should list ALL words on /words GET', function(done){
    chai.request(server)
      .get('/words')
      .end(function(err, res){
        res.should.be.status(200);
        res.body.should.have.property('words');
        res.body.words.should.be.a('array');
        done();
      });
  });

  it('Should list SINGLE word on /words/<id> GET', function(done){
    let newWord = new Word({
      word:'Put away',
      meaning: 'meaning',
      category:'Frasal verbs',
      subCategory: 'comunication'
    });
  
    newWord.save(function(err){
      chai.request(server)
        .get('/words/' + newWord._id)
        .end(function(err,res){
          res.should.be.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('word');
          res.body.should.have.property('meaning');
          res.body.should.have.property('category');
          res.body.should.have.property('subCategory');
          done();
        });
    });
  });

  it('Should add SINGLE word on /words POST', function(done){
    let newWord = new Word({
      word:'Put away',
      meaning: 'meaning',
      category:'Frasal verbs',
      subCategory: 'comunication'
    });

    chai.request(server)
      .post('/words', newWord)
      .end(function(err, res){
        res.should.be.status(200);
        res.body.should.have.a.property('message');
        done();
      });
  });

  it('Should update SINGLE word on /words PUT', function(done){
    let newWord = new Word({
      word:'Put away',
      meaning: 'meaning',
      category:'Frasal verbs',
      subCategory: 'comunication'
    });

    let modifiedWord ={
      word:'-----',
      meaning: '----',
      category:'----',
      subCategory: '-----'
    }

    newWord.save(function(err){
      chai.request(server)
        .put('/words/' + newWord._id, modifiedWord)
        .end(function(err, res){
          res.should.be.status(200);
          res.body.should.have.a.property('message');
          done();
        });
    });
  });

  it('Should delete SINGLE word on /words/<id> DELETE', function(done){
    let newWord = new Word({
      word:'Put away',
      meaning: 'meaning',
      category:'Frasal verbs',
      subCategory: 'comunication'
    });

    newWord.save(function(err){
      chai.request(server)
        .delete('/words/' + newWord._id)
        .end(function(err, res){
          res.should.be.status(200);
          res.body.should.have.a.property('message');
          done();
        });
    });
  });
});