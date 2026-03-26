export default function Products() {
    return (
        <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
            <main className="flex flex-1 w-full max-w-3xl flex-col items-center py-32 px-16 bg-white dark:bg-black sm:items-start">
                <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
                    Products
                </h1>
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
                            <tr>
                                <td className="p-10">1</td>
                                <td className="p-10">Product 1</td>
                                <td className="p-10">2</td>
                                <td className="flex gap-4 p-10 items-center">
                                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                        Editar
                                    </button>
                                    <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                                        Excluir
                                    </button>
                                </td>
                            </tr>
                            <tr>
                                <td className="p-10">2</td>
                                <td className="p-10">Product 2</td>
                                <td className="p-10">1</td>
                                <td className="flex gap-4 p-10 items-center">
                                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                        Editar
                                    </button>
                                    <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                                        Excluir
                                    </button>
                                </td>
                            </tr>

                        </tbody>
                    </table>
                </div>
            </main>
        </div>
    );
}