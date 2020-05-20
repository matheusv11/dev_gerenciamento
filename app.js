//Modulos
const express= require('express');
const app=express();
const handlebars= require('express-handlebars');
const bodyParser= require('body-parser');
const route_panel= require('./routes/route_panel');
const path = require('path');
const mongoose= require('mongoose');
const session = require('express-session');
const flash= require('connect-flash');


//Configs
  //Sessao
    app.use(session({
      secret: 'Aitocomdepressao',
      resave: true,
      saveUnitialized: true
    }))
    app.use(flash())
//Middleware
    app.use((req,res,next)=>{
      res.locals.success_msg= req.flash('success_msg')
      res.locals.error_msg= req.flash('error_msg')
      next()
    })
  //Body-parser
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());
  //handlebars
    app.engine('handlebars', handlebars({defaultLayout: 'main'}));
    app.set('view engine','handlebars');
  //Mongoose
    mongoose.Promise= global.Promise;
    mongoose.connect('mongodb://localhost/dev_app').then(()=> {
      console.log('Conectado ao mongo')
    }).catch((erro)=>{
      console.log('Erro: ' +erro)
    })
  //Public
  app.use(express.static('public'));

//Rotas
  // app.get('/', (req,res)=>{
  //   res.send('Principal');
  // });
  app.use('/',route_panel);//Prefixo

  // app.use('/route_panel',route_panel);//Prefixo
//Others
app.listen(80, () =>{
  console.log("Server rodando");
})
