"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

interface Product {
    id: number;
    productName: string;
    quantity: string | null;
    price: number | null;
}

interface ProductFormProps {
    mode: "create" | "edit";
    product?: Product;
}

export default function ProductForm({ mode, product }: ProductFormProps) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const [formData, setFormData] = useState({
        productName: product?.productName || "",
        quantity: product?.quantity || "",
        price: product?.price?.toString() || "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const payload = {
                productName: formData.productName,
                quantity: formData.quantity || null,
                price: formData.price ? parseFloat(formData.price) : null,
            };

            const url =
                mode === "create"
                    ? "/api/products"
                    : `/api/products/${product?.id}`;

            const method = mode === "create" ? "POST" : "PUT";

            const response = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                const errorData = await response.json();
                setError(
                    errorData.error ||
                        "Erro ao salvar o produto. Tente novamente."
                );
                return;
            }

            // Redirect to products page on success
            router.push("/products");
        } catch (err) {
            setError("Erro ao conectar com o servidor. Tente novamente.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="w-full max-w-md">
            {error && (
                <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                    {error}
                </div>
            )}

            <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">
                    Nome do Produto *
                </label>
                <input
                    type="text"
                    name="productName"
                    value={formData.productName}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Ex: Notebook"
                />
            </div>

            <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">
                    Quantidade
                </label>
                <input
                    type="text"
                    name="quantity"
                    value={formData.quantity}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Ex: 10"
                />
            </div>

            <div className="mb-6">
                <label className="block text-gray-700 font-bold mb-2">
                    Preço
                </label>
                <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    step="0.01"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Ex: 2999.99"
                />
            </div>

            <div className="flex gap-4">
                <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 bg-green-500 hover:bg-green-700 disabled:bg-gray-400 text-white font-bold py-2 px-4 rounded transition-colors"
                >
                    {loading
                        ? "Salvando..."
                        : mode === "create"
                          ? "Criar Produto"
                          : "Atualizar Produto"}
                </button>
                <button
                    type="button"
                    onClick={() => router.push("/products")}
                    className="flex-1 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded transition-colors"
                >
                    Cancelar
                </button>
            </div>
        </form>
    );
}
