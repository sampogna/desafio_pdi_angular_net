import prisma from "@/prisma/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { productName, quantity, price } = body;

        if (!productName || productName.trim() === "") {
            return NextResponse.json(
                { error: "Nome do produto é obrigatório" },
                { status: 400 }
            );
        }

        const product = await prisma.product.create({
            data: {
                productName,
                quantity: quantity || null,
                price: price ? parseFloat(price) : null,
            },
        });

        return NextResponse.json(product, { status: 201 });
    } catch (error) {
        console.error("Error creating product:", error);
        return NextResponse.json(
            { error: "Erro ao criar o produto" },
            { status: 500 }
        );
    }
}
