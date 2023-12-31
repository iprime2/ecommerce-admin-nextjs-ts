import { NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs'
import prismadb from '@/lib/prismadb'

export async function POST(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const { userId } = auth()
    const { storeId } = params
    const body = await req.json()

    const { name, billboardId } = body

    if (!userId) {
      return new NextResponse('Unauthenticated', { status: 401 })
    }

    if (!name) {
      return new NextResponse('Category Name is required', { status: 400 })
    }

    if (!billboardId) {
      return new NextResponse('Billboard Id is required', { status: 400 })
    }

    if (!storeId) {
      return new NextResponse('Store Id is required', { status: 400 })
    }

    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: params.storeId,
        userId,
      },
    })

    if (!storeByUserId) {
      return new NextResponse('Unauthorized', { status: 403 })
    }

    const category = await prismadb.category.create({
      data: {
        name,
        billboardId,
        storeId,
      },
    })

    return NextResponse.json(category)
  } catch (error) {
    console.log('[CATEGORIES_POST]', error)
    return new NextResponse('Internal error', { status: 500 })
  }
}

export async function GET(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const { storeId } = params

    if (!storeId) {
      return new NextResponse('Store Id is required', { status: 400 })
    }

    const categories = await prismadb.category.findMany({
      where: {
        storeId: storeId,
      },
    })

    return NextResponse.json(categories)
  } catch (error) {
    console.log('[CATEGORIES_POST]', error)
    return new NextResponse('Internal error', { status: 500 })
  }
}
