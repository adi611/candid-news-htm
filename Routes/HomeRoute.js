const { default: axios } = require('axios');
const { response } = require('express');
const express=require('express');
const routes=express.Router();
const pynode = require('@fridgerator/pynode');
pynode.dlOpen('libpython3.6m.so');
routes.get('/',(req,res,next)=>{
    axios.get('https://newsapi.org/v2/top-headlines?country=in&apiKey=347c0101326d4ec4a3a45e285163fb2f').then(response=>{
// res.send(response.data.articles);
res.status(202).render('home',{
    articles:response.data.articles
})
    }).catch(e=>{
        console.log(e)
    })
})

routes.post('/verify',(req,res,next)=>{
    const newstitle=req.body.newstitle;

pynode.startInterpreter();
pynode.appendSysPath('./');
pynode.openFile('fakeNewsClassifier.py')
pynode.call('predict_news',newstitle,(err, result) => {
    if (err) return console.log('error : ', err)
    res.status(202).render('Prediction',{
        prediction:result,
    })
})
})

module.exports=routes;