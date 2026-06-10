export interface Product {
    id: number;
    category: string;
    subcategory: string;
    name: string;
    description: string;
    base_price: number;
    isglobalshippingavailable: boolean | null; // Assumes Laravel Model has boolean cast
    warrantytime: string;
    spec_title_1: string;
    spec_value_1: string;
    spec_title_2: string;
    spec_value_2: string;
    spec_title_3: string;
    spec_value_3: string;
    benchmark_label: string;
    benchmark_score: number;
    default_images: string; // If this is a JSON string of image URLs, you'll need to JSON.parse() it
    is_featured: boolean | null;               // Assumes Laravel Model has boolean cast
    created_at: string | null;                 // CHANGED: Arrives as an ISO string over the wire
    product_variants?: any[];
}

export interface ProductShort {
    id: number;
    name: string;
    base_price: number;
    category: string;
    default_images: string;
}

export interface ProductProp {
    product: Product;
}

export interface ListProductsShort {
    products: ProductShort[];
    currentCategory?: string | null;
}