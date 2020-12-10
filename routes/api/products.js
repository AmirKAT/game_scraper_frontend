const express = require('express')
const router = express.Router();
 
 
 

const pool = require('../../config/db')
router.get('/',async(req,res)=>{
  try {
    
      const results = await pool.query('select * from products');
      return res.json(results.rows);
  } catch (error) {
      res.json({error:error})
  }
})
router.delete('/:id',async(req,res)=>{
  try {
  
      const rees = await pool.query(`DELETE FROM products where id = ${req.params.id}`);
      return res.json(rees)
  } catch (error) {
      res.json({error:error})
  }
})


router.get('/search/:query',async(req,res)=>{
  try {
       
     
      const results = await pool.query('select * from products where title=$1' ,[req.params.query])
      return res.json(results.rows)
      if(results.rowCount > 0){
          return res.json(results.rows);
      }
      return res.json([])
      
  } catch (error) {
      res.json({error:error})
  }
})

module.exports=router
