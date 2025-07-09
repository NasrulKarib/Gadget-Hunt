import { api } from './BaseAPI'

export const fetchCategories = async()=>{
    const response = await api.get('/api/categories/')
    const transformedCateogories = response.data.categories.map(cat=>({
        id: cat.id,
        name: cat.name,
        description: cat.description
    }));

    return {
        success: true,
        categories: transformedCateogories
    }
}