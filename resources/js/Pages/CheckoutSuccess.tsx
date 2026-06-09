import React, { useEffect } from 'react';
import Navbar from "@/Components/Navbar";
import Footer from "@/Components/Footer";
import { Link } from '@inertiajs/react';

export default function CheckoutSuccess() {
    useEffect(() => {
        localStorage.removeItem('cart');
    }, []);

    return (
        <div className="bg-obscure-darker min-h-screen text-clarity-lighter font-sans flex flex-col">
            <Navbar />

            <main className="flex-grow flex flex-col items-center justify-center p-4">
                <div className="max-w-md w-full bg-obscure p-8 border border-obscure-lightest text-center flex flex-col items-center gap-8">
                    <h1 className="text-3xl font-black text-clarity-lighter uppercase tracking-tight">
                        TRANSACTION COMPLETE
                    </h1>

                    <div className="w-64 h-64 bg-obscure-lightest shrink-0 flex items-center justify-center border border-obscure-light overflow-hidden">
                        <img
                            src="https://placehold.co/400x400/1a1a1a/00f0ff?text=SUCCESS"
                            alt="Checkout Success"
                            className="w-full h-full object-cover"
                        />
                    </div>

                    <p className="text-clarity text-sm uppercase tracking-wider">
                        Your arsenal has been upgraded. Preparing for deployment.
                    </p>

                    <Link href="/" className="w-full">
                        <button className="w-full bg-emph hover:bg-emph-light text-clarity-lighter font-black py-4 px-8 text-sm uppercase tracking-widest transition-colors duration-300">
                            RETURN TO BASE
                        </button>
                    </Link>
                </div>
            </main>

            <Footer />
        </div>
    );
}
