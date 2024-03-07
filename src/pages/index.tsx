import ProductsView from "@/components/views/products";
import productServices from "@/services/product";
import { useEffect, useState } from "react";

export default function Home() {
  const [products, setProducts] = useState([])

  const getAllProducts = async () => {
    const { data } = await productServices.getAllProducts()
    setProducts(data.data)
  }

  useEffect(() => {
    getAllProducts()
  }, [])

  return (
    <main className="flex min-h-screen p-12">
      <ProductsView products={products} />
    </main>
  )
}
