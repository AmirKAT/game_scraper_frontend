import {createRouter,createWebHistory} from 'vue-router'
import Home from '../pages/Home.vue';  
import Products from '../pages/Products' 
import Search from '../pages/Search.vue';
 
const routes = [
    {
        path: "/",
        component:Home
    },
    {
        path:'/products/:start/:end',
        component:Products
    },
     
    {
        path:'/search',
        component:Search
    }
     
    
     
     
]

const router = createRouter({
    history:createWebHistory(),routes 
})

export default router;