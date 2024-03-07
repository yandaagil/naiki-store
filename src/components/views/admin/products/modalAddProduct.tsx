import Button from '@/components/ui/button'
import Input from '@/components/ui/input'
import Modal from '@/components/ui/modal'
import Select from '@/components/ui/select'
import { uploadFile } from '@/lib/firebase/service'
import productServices from '@/services/product'
import { Product } from '@/types/product.type'
import { Minus, Plus } from 'lucide-react'
import Image from 'next/image'
import { Dispatch, FormEvent, SetStateAction, useState } from 'react'
import { toast } from 'sonner'

type PropTypes = {
  id: string
  setProductsData: Dispatch<SetStateAction<Product[]>>
  session: any
}

const ModalAddProduct = ({ id, setProductsData, session }: PropTypes) => {
  const [isLoading, setIsLoading] = useState(false)
  const [stockCount, setStockCount] = useState([{ size: '', qty: 0 }])
  const [changeImg, setChangeImg] = useState<any>({})
  const [uploadedImg, setUploadedImg] = useState<File | null>(null)

  const handleStock = (e: any, index: number, type: string) => {
    const newStockCount: any = [...stockCount]
    newStockCount[index][type] = e.target.value
    setStockCount(newStockCount)
  }

  const handleRemoveStock = (index: number) => {
    const newStockCount: any = [...stockCount]
    newStockCount.splice(index, 1)
    setStockCount(newStockCount)
  }

  const uploadImage = (id: string, form: any) => {
    const file = form.file.files[0]
    const newName = 'main.' + file.name.split('.')[1]
    if (file) {
      uploadFile(id, file, newName, 'products', async (status: boolean, newImageURL: string) => {
        if (status) {
          const data = { image: newImageURL }
          const result = await productServices.updateProduct(id, data, session.data.accessToken)
          if (result.status === 200) {
            setIsLoading(false)
            form.reset()
            const { data: { data } } = await productServices.getAllProducts()
            setProductsData(data)
            const addModal = document.getElementById('add') as HTMLDialogElement;
            if (addModal) addModal.close();
            toast.success('Product added successfully')
          } else {
            setIsLoading(false)
            toast.error('Failed to add product')
          }
        } else {
          setIsLoading(false)
          toast.error('Failed to add product')
        }
      })
    }
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsLoading(true)
    const form: any = event.target as HTMLFormElement
    const data = {
      name: form.name.value,
      price: form.price.value,
      category: form.category.value,
      status: form.status.value,
      stock: stockCount,
      file: ''
    }

    const result = await productServices.addProduct(data, session.data?.accessToken)

    if (result.status === 200) uploadImage(result.data.data.id, form)
  }

  return (
    <Modal id={id} title="Add Product">
      <form onSubmit={handleSubmit} className="space-y-3">
        <Input
          className='input input-bordered'
          type='text'
          id='name'
          labelFor='name'
          labelName='Name'
          name='name'
          autoComplete='off'
          placeholder='Insert Product Name'
        />
        <Input
          className='input input-bordered'
          type='number'
          id='price'
          labelFor='price'
          labelName='Price (Rp)'
          name='price'
          placeholder='Insert Product Price'
        />
        <Select
          labelFor='category'
          labelName='Category'
          name='category'
          id='category'
          options={[
            { value: 'men', label: 'Men' },
            { value: 'women', label: 'Women' }
          ]}
        />
        <Select
          labelFor='status'
          labelName='Status'
          name='status'
          id='status'
          options={[
            { value: 'true', label: 'Released' },
            { value: 'false', label: 'Not Released' }
          ]}
        />
        <div className="flex flex-col space-y-2">
          <span>Image</span>
          {uploadedImg &&
            <Image
              src={URL.createObjectURL(uploadedImg)}
              alt='product image'
              priority={true}
              width={200}
              height={200}
              className="aspect-square"
              style={{
                objectFit: 'cover',
              }}
            />
          }
          <label htmlFor='file'>
            <div className='flex items-center justify-center text-center rounded-xl border-2 border-dashed border-neutral h-20 text-sm cursor-pointer transition-colors hover:bg-gray-200'>
              {changeImg.name ? (
                <span>{changeImg.name}</span>
              ) : (
                <span>
                  Upload Image <br />
                  Max 1 MB
                </span>
              )}
            </div>
          </label>
          <input
            type='file'
            name='file'
            id='file'
            className='hidden'
            onChange={(e: any) => {
              e.preventDefault()
              setChangeImg(e.currentTarget.files[0])
              setUploadedImg(e.currentTarget.files[0])
            }}
          />
        </div>
        {changeImg.name &&
          <Button
            type='button'
            className='w-fit btn-sm font-medium btn-error btn-outline'
            onClick={() => {
              setChangeImg({})
              setUploadedImg(null)
            }}>
            Remove Image
          </Button>
        }
        {stockCount.map((item: { size: string; qty: number }, index: number) =>
          <div key={index} className='flex flex-row gap-3 items-end'>
            <Input
              className='input input-bordered'
              type='text'
              id={'size' + index}
              labelFor={'size' + index}
              labelName='Size'
              name='size'
              placeholder='Insert Size'
              onChange={(e) => handleStock(e, index, 'size')}
            />
            <Input
              className='input input-bordered'
              type='number'
              id={'qty' + index}
              labelFor={'qty' + index}
              labelName='Qty'
              name='qty'
              placeholder='Insert Qty'
              onChange={(e) => handleStock(e, index, 'qty')}
            />
            {index > 0 &&
              <Button type='button' className='btn-error btn-outline' onClick={() => handleRemoveStock(index)}>
                <Minus size={16} />
              </Button>
            }
          </div>
        )}
        <Button type='button' className='btn-sm font-medium' onClick={() => setStockCount([...stockCount, { size: '', qty: 0 }])}>
          <Plus size={16} />
          Add Stock
        </Button>

        {isLoading ? (
          <Button className="btn btn-disabled btn-block">
            <span className="loading loading-spinner"></span>
            Loading
          </Button>
        ) : (
          <Button type='submit' className='btn-primary w-full'>Add Product</Button>
        )}
      </form>
    </Modal>
  )
}

export default ModalAddProduct