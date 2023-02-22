export interface Order {
    _Id: string;
    user_d: string;
    product_id: string[];
    shipping_address: string;
    cost: number;
    status: string;
}