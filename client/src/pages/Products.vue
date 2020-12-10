<template>
    <div class="row">
        <div class="container">
            <br/>
            <router-link class="btn btn-primary" to="/search"> Search Product</router-link>
            <br/> <br/>
            <table class="table table-hover">
                <thead>
                    <tr>
                    <th scope="col">Product # </th>
                    <th scope="col">Title</th>
                    <th scope="col">Genre</th>
                    <th scope="col">Price</th>
                      <th scope="col">Image </th>
                     
                    <th scope="col">Remove</th>
                    </tr>
                  <img :src="loader" style="width:500px;position:relative;top:50%;left:50%" v-if="!loading"/>
                    <div v-if="divisions.length == 0 && loading"  class="alert alert-danger" style="width:100%">{{error}}</div>
                </thead>
                 <tbody v-if="current.length > 0">
                    <tr v-for="(data,index) in current" :key="index">
                        <td data-column="">{{data.id}}</td>
                        <td data-column=" ">{{data.title}}</td>
                        <td data-column=" ">{{data.genre}}</td>
                        <td data-column=" ">{{data.price}} $</td>
                          <td data-column=""><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxCT-OnvZzD6sSOUYwj-ZaK4WvWG5o5NZZFw&usqp=CAU" style="width:250px;height:150px" alt="Product image"/></td>
                     
                        <td data-column=" "><a :href="''+data.link" class="btn btn-info border-5">Visit product</a></td>
                        <td data-column="delete"><button  class="btn btn-danger border-5" @click="deleteRecord(data.id)">Delete</button></td>
                    </tr>
                </tbody>
            </table>
            <hr/>
       <div class="col-sm-4 col-md-4 col-lg-4 text-center" style="text-align:center;margin:0 auto">
            <nav aria-label="Page navigation example">
            <ul class="pagination"  >
              
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
        
       
        this.fetchRecords(JSON.parse(this.$route.params.start), JSON.parse(this.$route.params.end))

	 
    },
    computed(){
        console.log('hahahah')
    },
    mounted(){
        console.log('mounted')
    },
    
    updated(){
        //   this.fetchRecords(JSON.parse(this.$route.params.start), JSON.parse(this.$route.params.end))
    },
	data(){
		return{
             
            perpage: 2,
            current:[],
            divisions:[],
            loading:false,
            loader:loader,
            pagination:[],
            error:'Sorry No records found'
		}
    },
    watch: {
        '$route' (to, from) {

          if (from.params.start !== to.params.start) {

            //console.log(from.params.start + '=>'+to.params.start)
            this.pagination = [];
            this.fetchRecords(to.params.start, (to.params.end))
             

          }
        }
      },
	methods:{
        chunkedArr() {
         for (let i = 0; i < this.divisions.length; i += 2){
                     
                    this.pagination.push({
                        start:i,end:i+2
                    })
                }
    },
		async fetchRecords(start,end){
            try {
                
                const response = await axios.get('http://localhost:5000/api/products',{headers: {
                    'Access-Control-Allow-Origin': '*'}});
                this.divisions = await response.data;
                // console.log(this.divisions);
                 console.log(this.divisions[start].title);
                for(var i=start,index=0;i<end;i++,index++){
                   this.current[index] = this.divisions[i];
                   
                }
               
            
                this.chunkedArr();
                 
                this.loading = true;

            } catch (error) {
                this.loading = true;
                this.error = 'Sorry something goes wrong ! Check server and DB connection '
                 
            } 
		},
		deleteRecord(id){
			   axios.delete(`http://localhost:5000/api/products/${id}`).then(res=>{
                       this.loading = false;
                       this.error = 'Sorry No records found'
					   this.fetchRecords();
				   }
			   ).catch(err=>{
				   console.log(err)
			   })
		}
	}
}
</script>
<style scoped>
</style>