<template>
    <div class="row">
        <div class="container">
            <br/>
            <!-- Link to search page -->
            <router-link class="btn btn-primary" to="/search"> Search Product</router-link>
            <br/> <br/>
            <table class="table table-hover">
                <thead>
                    <tr>
                    <th scope="col">Product # </th>
                    <th scope="col">Title</th>
                    <th scope="col">Genre</th>
                    <th scope="col">Price</th>
                    <th scope="col">Image</th>
                    </tr>
                  <img :src="loader" style="width:500px;position:relative;top:50%;left:50%" v-if="!loading"/>
                    <div v-if="divisions.length == 0 && loading"  class="alert alert-danger" style="width:100%">{{error}}</div>
                </thead>
                 <!-- Iterating through all rows and columns in database and displaying them -->
                 <tbody v-if="current.length > 0">   
                    <tr v-for="(data,index) in current" :key="index">
                        <td data-column="">{{data.id}}</td>
                        <td data-column=" ">{{data.title}}</td>
                        <td data-column=" ">{{data.genre}}</td>
                        <td data-column=" ">{{data.price}}</td>
                        <td data-column=""><img :src="'' + data.image"></td>
                        <td data-column=" "><a :href="''+data.link" class="btn btn-info border-5">Visit product</a></td>
                    </tr>
                </tbody>
            </table>
            <hr/>
       <div class="col-sm-4 col-md-4 col-lg-4 text-center" style="">
            <nav aria-label="Page navigation example">
            <ul class="pagination">
            <!-- Pagination getting the first up to the last rows of data and putting them into pages -->
            <li v-for='(data,index) in pagination' :key='index' class="page-item" style=""><router-link :to="'/products/'+data.start+'/'+data.end" class="page-link" >{{index+1}}</router-link></li>
                
            </ul>   
            </nav>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
import loader from '../assets/loader.gif'
import products from '../routes/products';
export default {
    name:'Products',
    
    components:{
    },
    
	created(){
        // Getting all data from start to end from database       
        this.fetchRecords(JSON.parse(this.$route.params.start), JSON.parse(this.$route.params.end))
	 
    },

    computed(){
        console.log('')
    },

    mounted(){
        console.log('')
    },
    
    updated(){
        console.log('')
    },

    // displays 50 games per page
	data(){
		return{
             
            perpage: 50,
            current:[],
            divisions:[],
            loading:false,
            loader:loader,
            pagination:[],
            error:'No records found'
		}
    },

    watch: {
        '$route' (to, from) {

          if (from.params.start !== to.params.start) {

            this.pagination = [];
            this.fetchRecords(to.params.start, (to.params.end))
             
          }
        }
      },

	methods:{
        // sends 50 products at a time from the start to end of database to pagination array
        chunkedArr() {
         for (let i = 0; i < this.divisions.length; i += 50){
                     
                    this.pagination.push({
                        start:i,end:i+50
                    })
                }
    },

        // gets all products from start to end of database
		async fetchRecords(start,end){
            try {
                
                const response = await axios.get('http://localhost:5000/api/products',{headers: {
                    'Access-Control-Allow-Origin': '*'}});
                this.divisions = await response.data;

                 console.log(this.divisions[start].title);
                for(var i=start,index=0;i<end;i++,index++){
                   this.current[index] = this.divisions[i];
                   
                }
               
                this.chunkedArr();
                 
                this.loading = true;

            } catch (error) {
                this.loading = true;
                this.error = 'Error. Please check server and db connection'
                 
            } 
		},
	}
}
</script>
<style scoped>
</style>