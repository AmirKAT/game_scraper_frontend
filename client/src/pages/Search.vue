<template>
    <div class="row">
        <div class="container">
            <br/>
            <div class="mb-3">
              
            <label for="exampleFormControlInput1" class="form-label">Search Product </label>
                <input v-model="query" type="text" class="form-control" id="exampleFormControlInput1" placeholder="">
            </div>
            <div class="mb-3">
            <button class="btn btn-primary" @click="fetchRecords"> Search </button>
            </div>
            <div v-if="err" class="alert alert-danger">{{error}}</div>
            <br/> <br/>
                 <table class="table table-hover">
                <thead>
                    <tr>
                    <th scope="col">Product # </th>
                    <th scope="col">Title</th>
                    <th scope="col">Genre</th>
                    <th scope="col">Price</th>
                    <th scope="col">Image </th>
                    <th scope="col">View  </th>
 
                    </tr>
                  <img :src="loader" style="width:500px;position:relative;top:50%;left:50%" v-if="!loading"/>
                     
                </thead>
                 <tbody>
                    <tr v-for="(data,index) in divisions" :key="index">
                        <td data-column="">{{data.id}}</td>
                        <td data-column=" ">{{data.title}}</td>
                        <td data-column=" ">{{data.genre}}</td>
                        <td data-column=" ">{{data.price}} $</td>
                          <td data-column=""><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxCT-OnvZzD6sSOUYwj-ZaK4WvWG5o5NZZFw&usqp=CAU" style="width:250px;height:150px" alt="Product image"/></td>
                        <td data-column=" "><a :href="''+data.link" class="btn btn-info border-5">Visit product</a></td>
                        
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
import loader from '../assets/loader.gif'
export default {
    name:'Search',
     components:{
	},
	created(){
		 //this.fetchRecords();
	},
	data(){
		return{
            divisions:[],
            loading:true,
            loader:loader,
            query:'',
            error:'Sorry No records found',
            err:false,
		}
	},
	methods:{
          fetchRecords(){
              this.loading = false;
              axios.get(`http://localhost:5000/api/products/search/${this.query}`,{headers: {
                    'Access-Control-Allow-Origin': '*'}}).then(res=>{
                        
                        this.divisions = res.data;
                        this.loading = true;
                        if(this.divisions.length === 0){
                            this.err = true;
                        }else{
                            this.err = false;
                        }
                    }).catch(err=>console.log(err))
		},
	}
}
</script>
<style scoped>
</style>