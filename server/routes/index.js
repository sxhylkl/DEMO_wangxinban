const express       = require('express');
const fetch         = require('node-fetch');
const router        = express.Router();
const getBucketInfo = require('../model/getBucketInfo');
let gb = new getBucketInfo();
let STATUS = {};

/* GET login page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'login' });
});

/* GET client page. */
router.get('/client', function(req, res, next) {
  res.render('client', { user: 'user1' });
});

/* GET home page. */
router.get('/home', function(req, res, next) {
  res.render('home', { title: 'login' });
});

/* GET home page. */
router.get('/console', function(req, res, next) {
  res.render('console', { title: 'login' });
});


// ====================
// client side api
// ====================
router.get('/clientimglist/:id', function(req, res, next) {
  // let url = 'http://rsf.qbox.me/list?bucket=custom-demo-wangxinban';
  // let user = req.params.id;
  // gb.getBucketInfo(url).then(e => {
  //   res.send(e.items.filter(e => e.key.indexOf(user)>-1));
  // });
  res.send(req.params.id==undefined? []:STATUS[req.params.id]);
});

/* trigger new check */
router.get('/triggerreport', function(req, res, next) {
  report();
  res.send('done');
});

router.get('/forbiddenimg/:user/:id', function(req, res, next) {
  STATUS[req.params.user][req.params.id].status = 'forbidden';
  res.send('done');
});

router.get('/passimg/:user/:id', function(req, res, next) {
  STATUS[req.params.user][req.params.id].status = 'pass';
  res.send('done');
});


// ====================
// admin side api
// ====================

/* get status */
router.get('/getreport', function(req, res, next) {
  res.send(STATUS);
});

router.get('/resetconfig', function(req, res, next) {
  STATUS = {};
  report();
  res.send('done');
});


// router.get('/summaryreport', function(req, res, next) {
//   let total = 8;
//   res.send(STATUS);
// });



function report() {
  let q = [];
  let url = 'http://rsf.qbox.me/list?bucket=custom-demo-wangxinban';
  gb.getBucketInfo(url).then(imgs => {
    imgs.items.map(img => {
      q.push(fetch('http://p8jrba1ok.bkt.clouddn.com/' + encodeURIComponent(img.key) + '?qpulp').then(e => e.json()));
    });
    Promise.all(q).then(e => {
      for(let i=0; i<imgs.items.length; i++) {
        let url = 'http://p8jrba1ok.bkt.clouddn.com/' + encodeURIComponent(imgs.items[i].key);
        let user = imgs.items[i].key.split('/')[0];
        if(user in STATUS) {
          if(STATUS[user].findIndex(e => e.url == url) == -1) {
            STATUS[user].push({
              url: url,
              label: e[i].result.label,
              created: new Date().getTime(),
              status: 'new'
            });
          }
        } else {
          STATUS[user] = [];
          STATUS[user].push({
            url: url,
            label: e[i].result.label,
            created: new Date().getTime(),
            status: 'new'
          });
        }
      }
      console.log(STATUS);
    });
  });
}

report();

module.exports = router;
