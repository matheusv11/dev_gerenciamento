const express= require('express');
const router= express.Router();
const mongoose= require('mongoose');
require('../models/categoria');
const categoria= mongoose.model('categorias');

router.get('/', (req,res)=>{
  res.render('admin/index');
});

router.get('/posts', (req,res)=>{
  res.send('Parte de posts');
})

router.get('/admin/categorias', (req,res)=>{
  categoria.find().sort({nome: 'asc'}).then((categorias) => {
    res.render('./admin/categorias', {categorias: categorias})
  }).catch((erro) => {
    req.flash('error_msg','Houve erro na categoria')
    res.redirect('/admin')
  })

});

router.get('/admin/categorias/add', (req,res)=>{
  res.render('./admin/addcategorias');
});



router.post('/admin/categorias/nova', (req,res)=>{
  var erros= [];
  if (!req.body.nome || typeof req.body.nome== undefined || req.body.nome == null) {
    erros.push({text: 'Nome invalido'})
  }
  if (!req.body.slug || typeof req.body.slug== undefined || req.body.slug == null) {
    erros.push({text: 'Slug invalido'})
  }
if (req.body.nome.length <2) {
  erros.push({text: 'Nome muito pequeno'})
}

if (erros.length>0) {
  res.render('./admin/addcategorias',{erros: erros})
}else {
  const novaCategoria = {
    nome: req.body.nome,
    slug: req.body.slug
  }

    new categoria(novaCategoria).save().then(()=>{
        req.flash('success_msg','Categoria criada')
        res.redirect('/admin/categorias')
        console.log('Salvou')
    }).catch((erro)=>{
      req.flash('error_msg','Houve erro')
      console.log('Nao salvou: ' + erro);
      res.redirect('/admin')
    })
}

})
router.get('/admin/categorias/edit/:id',(req,res)=>{
  categoria.findOne({_id:req.params.id}).then((categoria)=>{
    res.render('admin/editcategoria',{categoria: categoria})
  }).catch((erro)=>{
    req.flash('error_msg','Isto nao existe')
    res.redirect('/admin/categorias')
  })
})

router.post('/admin/categorias/edit', (req,res)=>{
  categoria.findOne({_id: req.body.id}).then((categoria)=>{
    categoria.nome= req.body.nome
    categoria.slug= req.body.slug
    categoria.save().then(()=>{
      req.flash('success_msg','Editado com sucesso')
      res.redirect('/admin/categorias')
    }).catch((erro)=>{
      req.flash('error_msg', 'Deu erro')
      res.redirect('/admin/categorias')
    })
  }).catch((erro)=>{
    req.flash('error_msg','Ouve erro')
    res.redirect('/admin/categorias')
  })
})

router.post('/admin/categorias/deletar', (req,res)=>{
  categoria.remove({_id: req.body.id}).then(()=>{
    req.flash('success_msg','Deletado')
    res.redirect('/admin/categorias')
  }).catch((erro)=>{
    req.flash('error_msg', 'Ocorreu erro')
    res.redirect('/admin/categorias')
  })
})

router.get()
module.exports= router;
