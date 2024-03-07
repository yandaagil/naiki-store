import AdminLayout from '@/components/layouts/admin'
import Button from '@/components/ui/button'
import React, { useEffect, useState } from 'react'
import { Pencil, Plus, Trash } from 'lucide-react'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import { Product } from '@/types/product.type'
import { convertIDR } from '@/utils/currency'
import ModalAddProduct from './modalAddProduct'
import ModalUpdateProduct from './modalUpdateProduct'
import ModalDeleteProduct from './modalDeleteProduct'

type AdminProductsProps = {
  products: Product[]
}

const AdminProductsView = ({ products }: AdminProductsProps) => {
  const [productsData, setProductsData] = useState<Product[]>([])
  const [updatedProduct, setUpdatedProduct] = useState<Product | {}>({})
  const [deletedProduct, setDeletedProduct] = useState<Product | {}>({})
  const session: any = useSession()

  useEffect(() => {
    setProductsData(products)
  }, [products])

  const handleAddModal = () => {
    const addModal = document.getElementById('add') as HTMLDialogElement;
    if (addModal) addModal.showModal();
  }

  const handleUpdateModal = (product: Product) => {
    const updateModal = document.getElementById('update') as HTMLDialogElement
    if (updateModal) {
      updateModal.showModal()
      setUpdatedProduct(product)
    }
  }

  const handleDeleteModal = (product: Product) => {
    const deleteModal = document.getElementById('delete') as HTMLDialogElement
    if (deleteModal) {
      deleteModal.showModal()
      setDeletedProduct(product)
    }
  }

  return (
    <>
      <AdminLayout>
        <h1 className='text-2xl font-bold'>Product Management</h1>
        <Button type='button' className='btn-sm font-medium' onClick={handleAddModal}>
          <Plus size={16} />
          Add Product
        </Button>
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
                    <td className='align-top'>
                      <div className="relative w-[100px] h-[100px]">
                        <Image
                          src={product.image} alt={product.name}
                          sizes="100px"
                          fill
                          className="object-cover"
                          priority={true}
                        />
                      </div>
                    </td>
                    <td className='align-top'>{product.name}</td>
                    <td className='align-top capitalize'>{product.category}</td>
                    <td className='align-top text-end'>{convertIDR(product.price)}</td>
                    <td className='align-top'>
                      <ul>
                        {product.stock.map((stock: any, index: number) => {
                          return (
                            <li key={index}>{stock.size}</li>
                          )
                        })}
                      </ul>
                    </td>
                    <td className='align-top'>
                      <ul>
                        {product.stock.map((stock: any, index: number) => {
                          return (
                            <li key={index}>{stock.qty}</li>
                          )
                        })}
                      </ul>
                    </td>
                    <td className='flex gap-2'>
                      <Button type='button' className='btn-sm'><Pencil size={16} onClick={() => handleUpdateModal(product)} /></Button>
                      <Button type='button' className='btn-sm btn-ghost text-red-600'><Trash size={16} onClick={() => handleDeleteModal(product)} /></Button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </AdminLayout>
      <ModalAddProduct id='add' setProductsData={setProductsData} session={session} />
      <ModalUpdateProduct
        id='update'
        updatedProduct={updatedProduct}
        session={session}
        setProductsData={setProductsData}
      />
      <ModalDeleteProduct id='delete' deletedProduct={deletedProduct} setProductsData={setProductsData} />
    </>
  )
}

export default AdminProductsView