import Button from '@/components/ui/button'
import Input from '@/components/ui/input'
import Modal from '@/components/ui/modal'
import { deleteFile } from '@/lib/firebase/service'
import productServices from '@/services/product'
import { Product } from '@/types/product.type'
import { useSession } from 'next-auth/react'
import { Dispatch, FormEvent, SetStateAction, useState } from 'react'
import { toast } from 'sonner'

type PropTypes = {
  id: string
  deletedProduct: Product | any
  setProductsData: Dispatch<SetStateAction<Product[]>>
}

const ModalDeleteProduct = ({ id, deletedProduct, setProductsData }: PropTypes) => {
  const [isLoading, setIsLoading] = useState(false)
  const session: any = useSession()

  const handleDeleteProduct = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)

    const result = await productServices.deleteProduct(deletedProduct.id, session.data?.accessToken)

    if (result.status === 200) {
      setIsLoading(false)
      deleteFile(`/images/products/${deletedProduct.id}/${deletedProduct.image.split('%2F')[3].split('?')[0]}`, async (status: boolean) => {
        if (status) {
          const { data } = await productServices.getAllProducts()
          setProductsData(data.data)
          const deleteModal = document.getElementById('delete') as HTMLDialogElement;
          if (deleteModal) deleteModal.close();
          toast.success('Product has been deleted')
        }
      })
    } else {
      setIsLoading(false)
      toast.error('Failed to delete product')
    }
  }

  return (
    <Modal id={id} title="Delete Product">
      <form className="space-y-3" onSubmit={handleDeleteProduct}>
        <p className="py-4">Are you sure you want to delete <strong>{deletedProduct.name}</strong> ?</p>
        {isLoading ? (
          <Button className="btn btn-disabled btn-block">
            <span className="loading loading-spinner"></span>
            Loading
          </Button>
        ) : (
          <Button type='submit' className='btn-error btn-outline w-full'>Delete</Button>
        )}
      </form>
    </Modal>
  )
}

export default ModalDeleteProduct