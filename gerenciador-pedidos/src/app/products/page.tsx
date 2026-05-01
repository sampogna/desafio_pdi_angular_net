import Link from "next/link";
import prisma from "@/prisma/lib/prisma";

export default async function Products() {
    const allProducts = await prisma.product.findMany({});
    console.log("All products:", allProducts);
    return (
        <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
            <main className="flex flex-1 w-full max-w-3xl flex-col items-center py-32 px-16 bg-white dark:bg-black sm:items-start">
                <div className="flex w-full justify-between items-center mb-6">
                    <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
                        Products
                    </h1>
                    <Link href="/products/new">
                        <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                            Adicionar Produto
                        </button>
                    </Link>
                </div>
                <div className="flex w-full">
                    <table className="table-auto">
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Produto</th>
                                <th>Qtd.</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {allProducts.map((product) => (
                                <tr key={product.id}>
                                    <td className="p-10">{product.id}</td>
                                    <td className="p-10">{product.productName}</td>
                                    <td className="p-10">{product.quantity}</td>
                                    <td className="flex gap-4 p-10 items-center">
                                        <Link href={`/products/${product.id}/edit`}>
                                            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                                Editar
                                            </button>
                                        </Link>
                                        <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                                            Excluir
                                        </button>
                                    </td>
                                </tr>
                            ))}

                        </tbody>
                    </table>
                </div>
            </main>
        </div>
    );
}