"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Eye } from "lucide-react"
import Image from "next/image"

interface Product {
  name: string
  price: string
  brand: string
  usage: string
  description: string
  image: string
}

interface ProductCardProps {
  product: Product
  viewMode: "grid" | "list"
}

export default function ProductCard({ product, viewMode }: ProductCardProps) {
  const [imageError, setImageError] = useState(false)

  const handleImageError = () => {
    setImageError(true)
  }

  if (viewMode === "list") {
    return (
      <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 border-0 shadow-md golden-shadow">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-48 h-48 md:h-auto relative bg-muted">
            {!imageError ? (
              <Image
                src={`/productsPicture/${product.image}` || "/placeholder.svg"}
                alt={product.name}
                fill
                className="object-contain p-2"
                onError={handleImageError}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-muted to-muted/50">
                <div className="text-center text-muted-foreground">
                  <div className="w-16 h-16 mx-auto mb-2 bg-primary/10 rounded-full flex items-center justify-center">
                    <Eye className="h-8 w-8 text-primary" />
                  </div>
                  <p className="text-sm arabic-font">صورة المنتج</p>
                </div>
              </div>
            )}
          </div>

          <div className="flex-1 p-6">
            <div className="mb-3">
              <h3 className="text-xl font-bold text-card-foreground arabic-font mb-2 leading-relaxed min-h-[3.5rem] flex items-center">
                {product.name}
              </h3>
              <div className="flex gap-2 mb-3">
                <Badge variant="outline" className="arabic-font text-sm px-3 py-1 rounded-full">
                  {product.brand}
                </Badge>
                <Badge variant="secondary" className="arabic-font text-sm px-3 py-1 rounded-full">
                  {product.usage}
                </Badge>
              </div>
            </div>

            <p className="text-muted-foreground text-base mb-4 arabic-font line-clamp-2 leading-relaxed">
              {product.description}
            </p>

            <div className="text-2xl font-bold text-primary arabic-font bg-primary/5 px-4 py-2 rounded-lg inline-block golden-shadow">
              {product.price} شيقل
            </div>
          </div>
        </div>
      </Card>
    )
  }

  return (
    <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-0 shadow-md bg-gradient-to-b from-card to-card/95 golden-shadow h-full flex flex-col">
      <div className="relative flex-shrink-0">
        <div className="aspect-square relative bg-muted min-h-[120px] xs:min-h-[140px] sm:min-h-[160px] md:min-h-[180px]">
          {!imageError ? (
            <Image
              src={`/productsPicture/${product.image}` || "/placeholder.svg"}
              alt={product.name}
              fill
              className="object-contain p-1 xs:p-2 sm:p-3"
              onError={handleImageError}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-muted to-muted/50">
              <div className="text-center text-muted-foreground">
                <div className="w-8 h-8 xs:w-12 xs:h-12 sm:w-16 sm:h-16 mx-auto mb-1 xs:mb-2 bg-primary/10 rounded-full flex items-center justify-center">
                  <Eye className="h-4 w-4 xs:h-6 xs:w-6 sm:h-8 sm:w-8 text-primary" />
                </div>
                <p className="text-xs arabic-font">صورة المنتج</p>
              </div>
            </div>
          )}
        </div>
      </div>

      <CardContent className="p-2 xs:p-3 sm:p-4 flex flex-col flex-grow">
        <div className="flex flex-wrap gap-1 mb-2">
          <Badge variant="outline" className="text-xs arabic-font px-1.5 xs:px-2 py-0.5 xs:py-1 rounded-full">
            {product.brand}
          </Badge>
          <Badge variant="secondary" className="text-xs arabic-font px-1.5 xs:px-2 py-0.5 xs:py-1 rounded-full">
            {product.usage}
          </Badge>
        </div>

        <h3 className="font-bold text-card-foreground arabic-font mb-2 text-xs xs:text-sm sm:text-base leading-tight min-h-[2rem] xs:min-h-[2.5rem] sm:min-h-[3rem] flex items-start">
          {product.name}
        </h3>

        <p className="text-muted-foreground text-xs arabic-font line-clamp-2 leading-tight min-h-[1.5rem] xs:min-h-[2rem] flex-grow mb-2">
          {product.description}
        </p>

        <div className="text-sm xs:text-base sm:text-lg font-bold text-primary arabic-font bg-primary/5 px-2 xs:px-3 py-1 xs:py-1.5 sm:py-2 rounded-lg text-center golden-shadow mt-auto">
          {product.price} شيقل
        </div>
      </CardContent>
    </Card>
  )
}
