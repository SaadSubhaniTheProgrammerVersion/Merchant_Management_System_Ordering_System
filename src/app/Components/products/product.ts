export interface Product {
    id: string;
    name: string;
    type: string;
    categoryId: string[];
    price: number;
    image: string;
}

// export interface Category {
//     name: string;
//     id: string;
//     products: Product[];
// }