import prisma from "@/prisma/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const productId = parseInt(params.id, 10);
        const body = await request.json();
        const { productName, quantity, price } = body;

        if (!productName || productName.trim() === "") {
            return NextResponse.json(
                { error: "Nome do produto é obrigatório" },
                { status: 400 }
            );
        }

        const product = await prisma.product.update({
            where: { id: productId },
            data: {
                productName,
                quantity: quantity || null,
                price: price ? parseFloat(price) : null,
            },
        });

        return NextResponse.json(product, { status: 200 });
    } catch (error) {
        console.error("Error updating product:", error);
        if (error instanceof Error && error.message.includes("not found")) {
            return NextResponse.json(
                { error: "Produto não encontrado" },
                { status: 404 }
            );
        }
        return NextResponse.json(
            { error: "Erro ao atualizar o produto" },
            { status: 500 }
        );
    }
}
