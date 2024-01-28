import AdminLayout from '@/components/layouts/admin'
import Button from '@/components/ui/button'
import React, { useEffect, useState } from 'react'
import { Pencil, Trash } from 'lucide-react'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import { Product } from '@/types/product.type'
import { convertIDR } from '@/utils/currency'

type AdminProductsProps = {
  products: Product[]
}

const AdminProductsView = ({ products }: AdminProductsProps) => {
  const [productsData, setproductsData] = useState<Product[]>([])
  const session: any = useSession()

  useEffect(() => {
    setproductsData(products)
  }, [products])

  return (
    <>
      <AdminLayout>
        <h1 className='text-2xl font-bold'>User Management</h1>
        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr>
                <th rowSpan={2}>#</th>
                <th rowSpan={2}>Image</th>
                <th rowSpan={2}>Name</th>
                <th rowSpan={2}>Category</th>
                <th rowSpan={2}>Price</th>
                <th colSpan={2} className='text-center'>Stock</th>
                <th rowSpan={2}>Action</th>
              </tr>
              <tr>
                <th className='text-center'>Size</th>
                <th className='text-center'>Qty (Pcs)</th>
              </tr>
            </thead>
            <tbody>
              {productsData.map((product: Product, index: number) => {
                return (
                  <tr key={index}>
                    <th className='align-top'>{index + 1}</th>
                    <td>
                      <Image
                        src={product.image}
                        alt={product.name}
                        width={100}
                        height={100}
                      />
                    </td>
                    <td className='align-top'>{product.name}</td>
                    <td className='align-top'>{product.category}</td>
                    <td className='align-top text-end'>{convertIDR(product.price)}</td>
                    <td key={index}>
                      {product.stock.map((stock: any, index: number) => {
                        return (
                          <tr key={index}>
                            <td>{stock.size}</td>
                          </tr>
                        )
                      })}
                    </td>
                    <td key={index}>
                      {product.stock.map((stock: any, index: number) => {
                        return (
                          <tr key={index}>
                            <td>{stock.qty}</td>
                          </tr>
                        )
                      })}
                    </td>
                    <td className='flex gap-2'>
                      <Button type='button' className='btn-sm'><Pencil size={16} /></Button>
                      <Button type='button' className='btn-sm btn-ghost text-red-600'><Trash size={16} /></Button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </AdminLayout>
    </>
  )
}

export default AdminProductsView