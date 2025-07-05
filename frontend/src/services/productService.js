import axios from 'axios'

const API_BASE_URL = 'http://127.0.0.1:8000'

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    },
    withCredentials: true
})

// Get all products

export const fetchProducts = async()=>{
    try{
        const response = await api.get('/api/products/')

        const tranformedProducts = response.data.products.map(product=>({
            id: product.uid,
            name: product.name,
            price: parseFloat(product.price),
            stock: product.stock,
            category: product.category?.name || 'Unknown',
            brand: product.brand,
            status: product.stock === 0 ? 'Out of Stock' : product.stock <= 5 ? 'Low Stock' : 'Active',
            image_url: product.image_url
        }));

        return {success: true, products: tranformedProducts};
    } catch(error){
        console.error('Error fetching products:', error);
        error: error.response?.data?.error || error.message || 'Network error' 
    }
}

export const createProduct = async(productData)=>{
    try{
        const response = await api.post('/api/products/',productData)
        console.log(response.data);
        
        const tranformedProduct = {
            id: response.data.product.uid,
            name: response.data.product.name,
            price: parseFloat(response.data.product.price),
            stock: response.data.product.stock,
            category: response.data.product.category?.name || 'Unknown',
            brand: response.data.product.brand,
            status: response.data.product.stock === 0 ? 'Out of Stock' : response.data.product.stock <= 5 ? 'Low Stock' : 'Active',
            image_url: response.data.product.image_url
        }
       

        return {success: true, products: tranformedProduct};
    } catch(error){
        console.error('Error fetching products:', error);
        return { 
            success: false, 
            error: error.response?.data?.error || error.message || 'Network error' 
        };
    }
}