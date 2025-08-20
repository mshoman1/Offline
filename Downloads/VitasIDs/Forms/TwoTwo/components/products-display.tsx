"use client"

import { useState, useEffect, useMemo } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Filter, Grid, List, ChevronLeft, ChevronRight } from "lucide-react"
import ProductCard from "./product-card"
import FilterSidebar from "./filter-sidebar"

interface Product {
  name: string
  price: string
  description: string
  image: string
  brand: string
  usage: string
}

interface Brand {
  brand: string
  categories: {
    usage: string
    products: {
      name: string
      price: string
      description: string
      image: string
    }[]
  }[]
}

export default function ProductsDisplay() {
  const [products, setProducts] = useState<Product[]>([])
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedBrands, setSelectedBrands] = useState<string[]>([])
  const [selectedUsages, setSelectedUsages] = useState<string[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [showFilters, setShowFilters] = useState(false)
  const [loading, setLoading] = useState(true)

  const PRODUCTS_PER_PAGE = 15

  // Load products from JSON file
  useEffect(() => {
    const loadProducts = async () => {
      try {
        const response = await fetch("/products.json")
        if (response.ok) {
          const brandsData: Brand[] = await response.json()

          if (!brandsData || !Array.isArray(brandsData)) {
            console.error("Invalid data format in products.json")
            setLoading(false)
            return
          }

          // Transform the nested structure into a flat array of products
          const flatProducts: Product[] = []

          brandsData.forEach((brandData) => {
            if (brandData && brandData.categories && Array.isArray(brandData.categories)) {
              brandData.categories.forEach((category) => {
                if (category && category.products && Array.isArray(category.products)) {
                  category.products.forEach((product) => {
                    flatProducts.push({
                      ...product,
                      brand: brandData.brand,
                      usage: category.usage,
                    })
                  })
                }
              })
            }
          })

          setProducts(flatProducts)
          setFilteredProducts(flatProducts)
        } else {
          console.error("Failed to load products.json")
        }
      } catch (error) {
        console.error("Error loading products:", error)
      } finally {
        setLoading(false)
      }
    }

    loadProducts()
  }, [])

  // Register Service Worker for offline functionality
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/sw.js")
        .then((registration) => {
          console.log("[SW] Service Worker registered successfully:", registration)
        })
        .catch((error) => {
          console.log("[SW] Service Worker registration failed:", error)
        })
    }
  }, [])

  // Get unique brands and usages
  const brands = useMemo(() => {
    return Array.from(new Set(products.map((p) => p.brand))).sort()
  }, [products])

  const usages = useMemo(() => {
    return Array.from(new Set(products.map((p) => p.usage))).sort()
  }, [products])

  // Filter products
  useEffect(() => {
    let filtered = products

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.description.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    // Brand filter
    if (selectedBrands.length > 0) {
      filtered = filtered.filter((product) => selectedBrands.includes(product.brand))
    }

    // Usage filter
    if (selectedUsages.length > 0) {
      filtered = filtered.filter((product) => selectedUsages.includes(product.usage))
    }

    setFilteredProducts(filtered)
    setCurrentPage(1) // Reset to first page when filters change
  }, [products, searchTerm, selectedBrands, selectedUsages])

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE)
  const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE
  const endIndex = startIndex + PRODUCTS_PER_PAGE
  const currentProducts = filteredProducts.slice(startIndex, endIndex)

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center arabic-font">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">جاري تحميل المنتجات...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8 arabic-font" dir="rtl">
      {/* Header */}
      <header className="mb-8 text-center">
        <div className="mb-4">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-amber-600 via-rose-400 to-amber-500 bg-clip-text text-transparent mb-2">
            Luminous Touch
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-amber-400 to-rose-400 mx-auto rounded-full"></div>
        </div>
        <h2 className="text-3xl font-bold text-foreground mb-2">منتجات العناية بالبشرة</h2>
        <p className="text-muted-foreground text-lg">اكتشفي أفضل منتجات العناية بالبشرة من أشهر البراندات العالمية</p>
      </header>

      {/* Search and Controls */}
      <div className="mb-6 space-y-4">
        <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              type="text"
              placeholder="ابحثي عن المنتجات..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pr-10 arabic-font h-11"
            />
          </div>

          <div className="flex gap-2 justify-center sm:justify-end">
            <Button
              variant={showFilters ? "default" : "outline"}
              onClick={() => setShowFilters(!showFilters)}
              className="arabic-font flex-1 sm:flex-none"
            >
              <Filter className="h-4 w-4 ml-2" />
              فلترة
            </Button>

            <div className="flex border rounded-md">
              <Button variant={viewMode === "grid" ? "default" : "ghost"} size="sm" onClick={() => setViewMode("grid")}>
                <Grid className="h-4 w-4" />
              </Button>
              <Button variant={viewMode === "list" ? "default" : "ghost"} size="sm" onClick={() => setViewMode("list")}>
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Active Filters */}
        {(selectedBrands.length > 0 || selectedUsages.length > 0) && (
          <div className="flex flex-wrap gap-2 items-center">
            <span className="text-sm text-muted-foreground">الفلاتر النشطة:</span>
            {selectedBrands.map((brand) => (
              <Badge key={brand} variant="secondary" className="arabic-font">
                {brand}
                <button
                  onClick={() => setSelectedBrands((prev) => prev.filter((b) => b !== brand))}
                  className="mr-1 hover:text-destructive"
                >
                  ×
                </button>
              </Badge>
            ))}
            {selectedUsages.map((usage) => (
              <Badge key={usage} variant="secondary" className="arabic-font">
                {usage}
                <button
                  onClick={() => setSelectedUsages((prev) => prev.filter((u) => u !== usage))}
                  className="mr-1 hover:text-destructive"
                >
                  ×
                </button>
              </Badge>
            ))}
          </div>
        )}
      </div>

      {/* Filter Sidebar and Main Content */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Filter Sidebar */}
        <div className={`${showFilters ? "block" : "hidden"} lg:block`}>
          <FilterSidebar
            show={true}
            brands={brands}
            usages={usages}
            selectedBrands={selectedBrands}
            selectedUsages={selectedUsages}
            onBrandChange={setSelectedBrands}
            onUsageChange={setSelectedUsages}
            onClearAll={() => {
              setSelectedBrands([])
              setSelectedUsages([])
            }}
          />
        </div>

        {/* Main Content */}
        <div className="flex-1 min-w-0">
          {/* Results Info */}
          <div className="mb-4 flex justify-between items-center">
            <p className="text-muted-foreground arabic-font text-sm">
              عرض {startIndex + 1}-{Math.min(endIndex, filteredProducts.length)} من {filteredProducts.length} منتج
            </p>
          </div>

          {/* Products Grid/List */}
          {currentProducts.length === 0 ? (
            <Card className="p-8 text-center">
              <CardContent>
                <p className="text-muted-foreground arabic-font">لا توجد منتجات تطابق معايير البحث</p>
              </CardContent>
            </Card>
          ) : (
            <div
              className={
                viewMode === "grid"
                  ? "grid grid-cols-2 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-2 xs:gap-3 sm:gap-4 md:gap-5 lg:gap-6"
                  : "space-y-4"
              }
            >
              {currentProducts.map((product, index) => (
                <ProductCard key={`${product.brand}-${product.name}-${index}`} product={product} viewMode={viewMode} />
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-8 flex justify-center items-center gap-2">
              <Button variant="outline" onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
                <ChevronRight className="h-4 w-4" />
              </Button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <Button
                  key={page}
                  variant={currentPage === page ? "default" : "outline"}
                  onClick={() => handlePageChange(page)}
                  className="min-w-[40px]"
                >
                  {page}
                </Button>
              ))}

              <Button
                variant="outline"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
