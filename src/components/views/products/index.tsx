import { Product } from "@/types/product.type"
import { convertIDR } from "@/utils/currency"
import Image from "next/image"

type ProductsViewProps = {
  products: Product[]
}

const ProductsView = ({ products }: ProductsViewProps) => {
  return (
    <div className="w-full">
      <div className="mb-6 sticky top-[65px] bg-white z-10">
        <h2 className="font-semibold text-2xl">Shoes ({products.length})</h2>
      </div>
      <div className="flex flex-row gap-6">
        <div className="w-48 space-y-3 sticky top-[97px]">
          <h4 className="font-semibold">Gender</h4>
          <ul className="space-y-1">
            <li>
              <label htmlFor="men" className="flex items-center justify-start gap-2 cursor-pointer">
                <input type="checkbox" name="men" id="men" className="checkbox checkbox-sm" />
                <span>Men</span>
              </label>
            </li>
            <li>
              <label htmlFor="women" className="flex items-center justify-start gap-2 cursor-pointer">
                <input type="checkbox" name="women" id="women" className="checkbox checkbox-sm" />
                <span>Women</span>
              </label>
            </li>
            <li>
              <label htmlFor="unisex" className="flex items-center justify-start gap-2 cursor-pointer">
                <input type="checkbox" name="unisex" id="unisex" className="checkbox checkbox-sm" />
                <span>Unisex</span>
              </label>
            </li>
          </ul>
        </div>
        <div className="flex flex-wrap gap-y-14 w-full">
          {products.map((product) =>
            <div key={product.id} className="flex flex-col basis-1/2 lg:basis-1/3 px-4">
              <div className="cursor-pointer flex flex-col">
                <Image
                  src={product.image}
                  alt={product.name}
                  priority={true}
                  width={400}
                  height={400}
                  className="cursor-pointer aspect-square"
                  style={{
                    objectFit: 'cover',
                  }}
                />
                <p className="font-medium mt-3">{product.name}</p>
                <span className="text-gray-500 font-medium capitalize">{product.category}</span>
                <span className="mt-3 font-medium">{convertIDR(product.price)}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProductsView