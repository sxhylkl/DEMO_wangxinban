const fs        = require('fs');
const express   = require('express');
const fetch     = require('node-fetch');
const router    = express.Router();
let tracedata = '';
let TASKS = [];
let CUSTOM = [];

/* GET login page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'login' });
});

/* GET home page. */
router.get('/home', function(req, res, next) {
  res.render('home', { user: 'user1' });
});

/* GET home page. */
router.get('/list', function(req, res, next) {
  res.render('list', { user: 'user1' });
});

/* GET task page. */
router.get('/task', function(req, res, next) {
  res.render('task', { title: 'login' });
});

/* GET custom page. */
router.get('/custom', function(req, res, next) {
  res.render('custom', { title: 'login' });
});

/* GET home page. */
router.get('/console', function(req, res, next) {
  res.render('console', { title: 'login' });
});

// restful api
router.get('/tasklist', function(req, res, next) {
  res.send(TASKS);
});

router.post('/updatetasklist', function(req, res, next) {
  console.log(req.body.tasklist);
  TASKS = req.body.tasklist;
  res.send(TASKS);
});


// restful api
router.get('/customlist', function(req, res, next) {
  res.send(CUSTOM);
});

router.post('/updatecustomlist', function(req, res, next) {
  console.log(req.body.customlist);
  CUSTOM = req.body.customlist;
  res.send(CUSTOM);
});

router.get('/tracedata', function(req, res, next) {
  res.send(tracedata);
});


tracedata = fs.readFileSync('./public/mockdata/les-miserables.gexf', 'utf-8');

TASKS = [{
  taskid: 1,
  name: '北京视频网站监控任务',
  sitenum: 120,
  healthnum: 40,
  issuenum: 80,
  badnum: 12345,
  items: [{
    domain: 'www.youku.com',
    create: '2018-01-11',
    status: '健康',
    badnum: 3
  },{
    domain: 'www.56.com',
    create: '2018-03-11',
    status: '健康',
    badnum: 4
  },{
    domain: 'www.tudou.com',
    create: '2018-02-11',
    status: '健康',
    badnum: 5
  }]
},{
  taskid: 2,
  name: '上海视频网站监控任务',
  sitenum: 100,
  healthnum: 2,
  issuenum: 98,
  badnum: 223232,
  items: [{
    domain: 'www.panda.com',
    create: '2018-01-11',
    status: '健康',
    badnum: 3
  },{
    domain: 'www.bilibili.com',
    create: '2018-03-11',
    status: '健康',
    badnum: 4
  },{
    domain: 'www.iqiyi.com',
    create: '2018-02-11',
    status: '健康',
    badnum: 5
  }]
},{
  taskid: 3,
  name: '广州视频网站监控任务',
  sitenum: 130,
  healthnum: 22,
  issuenum: 108,
  badnum: 11111,
  items: [{
    domain: 'v.5room.com',
    create: '2018-01-11',
    status: '健康',
    badnum: 3
  },{
    domain: 'www.bilibili.com',
    create: '2018-03-11',
    status: '健康',
    badnum: 4
  },{
    domain: 'www.iqiyi.com',
    create: '2018-02-11',
    status: '健康',
    badnum: 5
  }]
},{
  taskid: 4,
  name: '深圳视频网站监控任务',
  sitenum: 80,
  healthnum: 2,
  issuenum: 78,
  badnum: 32323,
  items: [{
    domain: 'v.qq.com',
    create: '2018-01-11',
    status: '健康',
    badnum: 3
  },{
    domain: 'v.huawei.com',
    create: '2018-03-11',
    status: '健康',
    badnum: 4
  },{
    domain: 'www.xxx.com',
    create: '2018-02-11',
    status: '健康',
    badnum: 5
  }]
}];

CUSTOM = [{
  taskid: 1,
  name: '北京XX事件',
  sitenum: 120,
  imgnum: 40,
  videonum: 80,
  badnum: 12345,
  items: [{
    domain: 'www.youku.com',
    create: '2018-01-11',
    status: '健康',
    badnum: 3
  },{
    domain: 'www.56.com',
    create: '2018-03-11',
    status: '健康',
    badnum: 4
  },{
    domain: 'www.tudou.com',
    create: '2018-02-11',
    status: '健康',
    badnum: 5
  }]
},{
  taskid: 2,
  name: '中央XX事件',
  sitenum: 120,
  imgnum: 2,
  videonum: 98,
  badnum: 223232,
  items: [{
    domain: 'www.panda.com',
    create: '2018-01-11',
    status: '健康',
    badnum: 3
  },{
    domain: 'www.bilibili.com',
    create: '2018-03-11',
    status: '健康',
    badnum: 4
  },{
    domain: 'www.iqiyi.com',
    create: '2018-02-11',
    status: '健康',
    badnum: 5
  }]
},{
  taskid: 3,
  name: '上海XX事件',
  sitenum: 120,
  imgnum: 22,
  videonum: 108,
  badnum: 11111,
  items: [{
    domain: 'v.5room.com',
    create: '2018-01-11',
    status: '健康',
    badnum: 3
  },{
    domain: 'www.bilibili.com',
    create: '2018-03-11',
    status: '健康',
    badnum: 4
  },{
    domain: 'www.iqiyi.com',
    create: '2018-02-11',
    status: '健康',
    badnum: 5
  }]
},{
  taskid: 4,
  name: '西藏XX事件',
  sitenum: 120,
  imgnum: 2,
  videonum: 78,
  badnum: 32323,
  items: [{
    domain: 'v.qq.com',
    create: '2018-01-11',
    status: '健康',
    badnum: 3
  },{
    domain: 'v.huawei.com',
    create: '2018-03-11',
    status: '健康',
    badnum: 4
  },{
    domain: 'www.xxx.com',
    create: '2018-02-11',
    status: '健康',
    badnum: 5
  }]
}];

module.exports = router;
