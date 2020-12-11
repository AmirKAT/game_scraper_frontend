const express = require('express')
const router = express.Router();

const pool = require('../../config/db')
router.get('/',async(req,res)=>{
  try {
    // Selecting all rows in product table
      const results = await pool.query('select * from product');
      return res.json(results.rows);
  } catch (error) {
      res.json({error:error})
  }
})

// Search function to get specific rows from product table
router.get('/search/:query',async(req,res)=>{
  try {
       
    // Selecting all rows from product table with case insensitive search query
      const results = await pool.query("select * from product where title ilike '%' || $1 || '%'",[req.params.query])
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
