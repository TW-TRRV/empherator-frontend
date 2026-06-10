import React, { useState, FormEvent } from 'react';
import { Head, useForm, router } from '@inertiajs/react';
import Navbar from "@/Components/Navbar";
import Footer from "@/Components/Footer";
import { FaTrash, FaSearch } from 'react-icons/fa';

interface Product {
    id: number;
    name: string;
    category: string;
    subcategory: string;
    base_price: number;
}

interface Props {
    products: Product[];
    filters: { search?: string };
}

export default function AdminProducts({ products, filters }: Props) {
    const [searchTerm, setSearchTerm] = useState(filters.search || '');

    const { data, setData, post, processing, errors, reset } = useForm({
        category: '',
        subcategory: '',
        name: '',
        description: '',
        base_price: '',
        isglobalshippingavailable: true,
        warrantytime: '',
        spec_title_1: '',
        spec_value_1: '',
        spec_title_2: '',
        spec_value_2: '',
        spec_title_3: '',
        spec_value_3: '',
        benchmark_label: '',
        benchmark_score: '',
        primary_image: '',
        gallery_images: ['', '', '', ''],
        is_featured: false,
        variants: [] as any[],
    });

    const handleSearch = (e: FormEvent) => {
        e.preventDefault();
        router.get('/admin/products', { search: searchTerm }, { preserveState: true });
    };

    const handleGalleryChange = (index: number, value: string) => {
        const newGallery = [...data.gallery_images];
        newGallery[index] = value;
        setData('gallery_images', newGallery);
    };

    const addVariant = () => {
        setData('variants', [...data.variants, {
            sku: '',
            variant_name: '',
            price_override: '',
            stock_quantity: 0,
            primary_image: '',
            gallery_images: ['', '', '', ''],
        }]);
    };

    const removeVariant = (index: number) => {
        const newVariants = [...data.variants];
        newVariants.splice(index, 1);
        setData('variants', newVariants);
    };

    const handleVariantChange = (index: number, field: string, value: any) => {
        const newVariants = [...data.variants];
        newVariants[index][field] = value;
        setData('variants', newVariants);
    };

    const handleVariantGalleryChange = (vIndex: number, gIndex: number, value: string) => {
        const newVariants = [...data.variants];
        newVariants[vIndex].gallery_images[gIndex] = value;
        setData('variants', newVariants);
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        post('/admin/products', {
            onSuccess: () => reset(),
        });
    };

    const handleDelete = (id: number) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            router.delete(`/admin/products/${id}`);
        }
    };

    return (
        <div className="min-h-screen flex flex-col bg-obscure-darker font-sans text-clarity-lighter">
            <Head title="Admin - Products" />
            <Navbar />

            <main className="flex-1 container mx-auto px-4 py-8 mt-20">
                <h1 className="text-3xl font-bold mb-8 text-emph-lighter uppercase tracking-widest">Product Management</h1>

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Left Column: Product List */}
                    <div className="w-full lg:w-1/2 bg-obscure p-6 border border-obscure-lightest">
                        <h2 className="text-xl font-bold mb-4 text-clarity uppercase tracking-widest">Product List</h2>

                        {/* Search Bar */}
                        <form onSubmit={handleSearch} className="mb-6 flex">
                            <input
                                type="text"
                                placeholder="Search by name, category..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="flex-1 h-10 bg-obscure-darker border border-obscure-lightest px-3 text-sm text-clarity-lighter focus:outline-none focus:border-emph-light"
                            />
                            <button
                                type="submit"
                                className="h-10 px-4 bg-emph-lighter hover:bg-emph-light text-obscure-darker font-bold flex items-center justify-center transition-colors"
                            >
                                <FaSearch className="mr-2" /> SEARCH
                            </button>
                        </form>

                        {/* Table */}
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-sm">
                                <thead className="text-xs uppercase bg-obscure-darker text-clarity border-b border-obscure-lightest">
                                    <tr>
                                        <th className="px-4 py-3">ID</th>
                                        <th className="px-4 py-3">Name</th>
                                        <th className="px-4 py-3">Category</th>
                                        <th className="px-4 py-3">Price</th>
                                        <th className="px-4 py-3 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {products.length > 0 ? (
                                        products.map((product) => (
                                            <tr key={product.id} className="border-b border-obscure-lightest hover:bg-obscure-lighter transition-colors">
                                                <td className="px-4 py-3">{product.id}</td>
                                                <td className="px-4 py-3 font-medium text-clarity-lighter">{product.name}</td>
                                                <td className="px-4 py-3 text-clarity">{product.category} / {product.subcategory}</td>
                                                <td className="px-4 py-3">${product.base_price}</td>
                                                <td className="px-4 py-3 text-right">
                                                    <button
                                                        onClick={() => handleDelete(product.id)}
                                                        className="text-red-500 hover:text-red-400 transition-colors"
                                                        title="Delete Product"
                                                    >
                                                        <FaTrash />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan={5} className="px-4 py-8 text-center text-clarity">
                                                No products found.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Right Column: Add Product Form */}
                    <div className="w-full lg:w-1/2 bg-obscure p-6 border border-obscure-lightest">
                        <h2 className="text-xl font-bold mb-4 text-clarity uppercase tracking-widest">Add New Product</h2>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-[10px] font-bold text-clarity mb-1 uppercase tracking-widest">Category</label>
                                    <input type="text" required value={data.category} onChange={e => setData('category', e.target.value)} className="w-full h-10 bg-obscure-darker border border-obscure-lightest px-3 text-sm text-clarity-lighter focus:outline-none focus:border-emph-light" />
                                    {errors.category && <div className="text-red-500 text-xs mt-1">{errors.category}</div>}
                                </div>
                                <div>
                                    <label className="block text-[10px] font-bold text-clarity mb-1 uppercase tracking-widest">Subcategory</label>
                                    <input type="text" required value={data.subcategory} onChange={e => setData('subcategory', e.target.value)} className="w-full h-10 bg-obscure-darker border border-obscure-lightest px-3 text-sm text-clarity-lighter focus:outline-none focus:border-emph-light" />
                                </div>
                            </div>

                            <div>
                                <label className="block text-[10px] font-bold text-clarity mb-1 uppercase tracking-widest">Name</label>
                                <input type="text" required value={data.name} onChange={e => setData('name', e.target.value)} className="w-full h-10 bg-obscure-darker border border-obscure-lightest px-3 text-sm text-clarity-lighter focus:outline-none focus:border-emph-light" />
                            </div>

                            <div>
                                <label className="block text-[10px] font-bold text-clarity mb-1 uppercase tracking-widest">Description</label>
                                <textarea required value={data.description} onChange={e => setData('description', e.target.value)} className="w-full h-24 bg-obscure-darker border border-obscure-lightest p-3 text-sm text-clarity-lighter focus:outline-none focus:border-emph-light"></textarea>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-[10px] font-bold text-clarity mb-1 uppercase tracking-widest">Base Price</label>
                                    <input type="number" step="0.01" required value={data.base_price} onChange={e => setData('base_price', e.target.value)} className="w-full h-10 bg-obscure-darker border border-obscure-lightest px-3 text-sm text-clarity-lighter focus:outline-none focus:border-emph-light" />
                                </div>
                                <div>
                                    <label className="block text-[10px] font-bold text-clarity mb-1 uppercase tracking-widest">Warranty Time</label>
                                    <input type="text" required value={data.warrantytime} onChange={e => setData('warrantytime', e.target.value)} className="w-full h-10 bg-obscure-darker border border-obscure-lightest px-3 text-sm text-clarity-lighter focus:outline-none focus:border-emph-light" />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-[10px] font-bold text-clarity mb-1 uppercase tracking-widest">Benchmark Label</label>
                                    <input type="text" required value={data.benchmark_label} onChange={e => setData('benchmark_label', e.target.value)} className="w-full h-10 bg-obscure-darker border border-obscure-lightest px-3 text-sm text-clarity-lighter focus:outline-none focus:border-emph-light" />
                                </div>
                                <div>
                                    <label className="block text-[10px] font-bold text-clarity mb-1 uppercase tracking-widest">Benchmark Score</label>
                                    <input type="number" required value={data.benchmark_score} onChange={e => setData('benchmark_score', e.target.value)} className="w-full h-10 bg-obscure-darker border border-obscure-lightest px-3 text-sm text-clarity-lighter focus:outline-none focus:border-emph-light" />
                                </div>
                            </div>

                            <div className="grid grid-cols-3 gap-4 border border-obscure-lightest p-4">
                                <div className="col-span-3 text-[10px] font-bold text-clarity uppercase tracking-widest">Specifications</div>
                                <div>
                                    <input type="text" placeholder="Title 1" required value={data.spec_title_1} onChange={e => setData('spec_title_1', e.target.value)} className="w-full h-10 mb-2 bg-obscure-darker border border-obscure-lightest px-3 text-sm text-clarity-lighter focus:outline-none focus:border-emph-light" />
                                    <input type="text" placeholder="Value 1" required value={data.spec_value_1} onChange={e => setData('spec_value_1', e.target.value)} className="w-full h-10 bg-obscure-darker border border-obscure-lightest px-3 text-sm text-clarity-lighter focus:outline-none focus:border-emph-light" />
                                </div>
                                <div>
                                    <input type="text" placeholder="Title 2" required value={data.spec_title_2} onChange={e => setData('spec_title_2', e.target.value)} className="w-full h-10 mb-2 bg-obscure-darker border border-obscure-lightest px-3 text-sm text-clarity-lighter focus:outline-none focus:border-emph-light" />
                                    <input type="text" placeholder="Value 2" required value={data.spec_value_2} onChange={e => setData('spec_value_2', e.target.value)} className="w-full h-10 bg-obscure-darker border border-obscure-lightest px-3 text-sm text-clarity-lighter focus:outline-none focus:border-emph-light" />
                                </div>
                                <div>
                                    <input type="text" placeholder="Title 3" required value={data.spec_title_3} onChange={e => setData('spec_title_3', e.target.value)} className="w-full h-10 mb-2 bg-obscure-darker border border-obscure-lightest px-3 text-sm text-clarity-lighter focus:outline-none focus:border-emph-light" />
                                    <input type="text" placeholder="Value 3" required value={data.spec_value_3} onChange={e => setData('spec_value_3', e.target.value)} className="w-full h-10 bg-obscure-darker border border-obscure-lightest px-3 text-sm text-clarity-lighter focus:outline-none focus:border-emph-light" />
                                </div>
                            </div>

                            <div className="border border-obscure-lightest p-4 space-y-4">
                                <div className="text-[10px] font-bold text-clarity uppercase tracking-widest">Images (URLs)</div>
                                <div>
                                    <label className="block text-[10px] text-clarity mb-1">Primary Image</label>
                                    <input type="text" required value={data.primary_image} onChange={e => setData('primary_image', e.target.value)} className="w-full h-10 bg-obscure-darker border border-obscure-lightest px-3 text-sm text-clarity-lighter focus:outline-none focus:border-emph-light" />
                                </div>
                                <div>
                                    <label className="block text-[10px] text-clarity mb-1">Gallery Images (Max 4)</label>
                                    {data.gallery_images.map((url, index) => (
                                        <input
                                            key={index}
                                            type="text"
                                            required
                                            placeholder={`Gallery Image ${index + 1}`}
                                            value={url}
                                            onChange={e => handleGalleryChange(index, e.target.value)}
                                            className="w-full h-10 mb-2 bg-obscure-darker border border-obscure-lightest px-3 text-sm text-clarity-lighter focus:outline-none focus:border-emph-light"
                                        />
                                    ))}
                                </div>
                            </div>

                            <div className="flex items-center space-x-4">
                                <label className="flex items-center space-x-2 text-sm text-clarity-lighter">
                                    <input type="checkbox" checked={data.isglobalshippingavailable} onChange={e => setData('isglobalshippingavailable', e.target.checked)} className="bg-obscure-darker border-obscure-lightest" />
                                    <span>Global Shipping</span>
                                </label>
                                <label className="flex items-center space-x-2 text-sm text-clarity-lighter">
                                    <input type="checkbox" checked={data.is_featured} onChange={e => setData('is_featured', e.target.checked)} className="bg-obscure-darker border-obscure-lightest" />
                                    <span>Featured</span>
                                </label>
                            </div>

                                                        <div className="border border-obscure-lightest p-4 space-y-4">
                                <div className="flex justify-between items-center mb-2">
                                    <div className="text-[10px] font-bold text-clarity uppercase tracking-widest">Product Variants (Optional)</div>
                                    <button type="button" onClick={addVariant} className="bg-obscure-light hover:bg-obscure text-clarity-lighter text-xs px-3 py-1 rounded">Add Variant</button>
                                </div>
                                {data.variants.map((variant, vIndex) => (
                                    <div key={vIndex} className="border border-obscure-light p-4 relative mb-4">
                                        <button type="button" onClick={() => removeVariant(vIndex)} className="absolute top-2 right-2 text-red-500 hover:text-red-700">
                                            <FaTrash size={12} />
                                        </button>
                                        <div className="grid grid-cols-2 gap-4 mb-4">
                                            <div>
                                                <label className="block text-[10px] text-clarity mb-1">Variant Name</label>
                                                <input type="text" required value={variant.variant_name} onChange={e => handleVariantChange(vIndex, 'variant_name', e.target.value)} className="w-full h-8 bg-obscure-darker border border-obscure-lightest px-2 text-sm text-clarity-lighter focus:outline-none focus:border-emph-light" />
                                            </div>
                                            <div>
                                                <label className="block text-[10px] text-clarity mb-1">SKU</label>
                                                <input type="text" required value={variant.sku} onChange={e => handleVariantChange(vIndex, 'sku', e.target.value)} className="w-full h-8 bg-obscure-darker border border-obscure-lightest px-2 text-sm text-clarity-lighter focus:outline-none focus:border-emph-light" />
                                            </div>
                                            <div>
                                                <label className="block text-[10px] text-clarity mb-1">Price Override (Optional)</label>
                                                <input type="number" step="0.01" value={variant.price_override} onChange={e => handleVariantChange(vIndex, 'price_override', e.target.value)} className="w-full h-8 bg-obscure-darker border border-obscure-lightest px-2 text-sm text-clarity-lighter focus:outline-none focus:border-emph-light" />
                                            </div>
                                            <div>
                                                <label className="block text-[10px] text-clarity mb-1">Stock Quantity</label>
                                                <input type="number" required value={variant.stock_quantity} onChange={e => handleVariantChange(vIndex, 'stock_quantity', e.target.value)} className="w-full h-8 bg-obscure-darker border border-obscure-lightest px-2 text-sm text-clarity-lighter focus:outline-none focus:border-emph-light" />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-[10px] text-clarity mb-1">Primary Image</label>
                                            <input type="text" required value={variant.primary_image} onChange={e => handleVariantChange(vIndex, 'primary_image', e.target.value)} className="w-full h-8 mb-2 bg-obscure-darker border border-obscure-lightest px-2 text-sm text-clarity-lighter focus:outline-none focus:border-emph-light" />
                                        </div>
                                        <div>
                                            <label className="block text-[10px] text-clarity mb-1">Gallery Images</label>
                                            <div className="grid grid-cols-2 gap-2">
                                                {variant.gallery_images.map((url: string, gIndex: number) => (
                                                    <input key={gIndex} type="text" placeholder={"Gallery " + (gIndex + 1)} value={url} onChange={e => handleVariantGalleryChange(vIndex, gIndex, e.target.value)} className="w-full h-8 bg-obscure-darker border border-obscure-lightest px-2 text-sm text-clarity-lighter focus:outline-none focus:border-emph-light" />
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full h-12 bg-emph-lighter hover:bg-emph-light text-obscure-darker font-bold tracking-wider transition-colors disabled:opacity-50 mt-4"
                            >
                                CREATE PRODUCT
                            </button>
                        </form>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
