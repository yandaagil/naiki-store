import AdminProductsView from "@/components/views/admin/products"
import productServices from "@/services/product"
import { useEffect, useState } from "react"

const AdminProductsPage = () => {
  const [products, setProducts] = useState([])

  const getAllProducts = async () => {
    const { data } = await productServices.getAllProducts()
    setProducts(data.data)
  }

  useEffect(() => {
    getAllProducts()
  }, [])

  return (
    <main className="flex min-h-screen">
      <AdminProductsView products={products} />
    </main>
  )
}

export default AdminProductsPage