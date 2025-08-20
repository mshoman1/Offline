"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { X, Filter } from "lucide-react"

interface FilterSidebarProps {
  show: boolean
  brands: string[]
  usages: string[]
  selectedBrands: string[]
  selectedUsages: string[]
  onBrandChange: (brands: string[]) => void
  onUsageChange: (usages: string[]) => void
  onClearAll: () => void
}

export default function FilterSidebar({
  show,
  brands,
  usages,
  selectedBrands,
  selectedUsages,
  onBrandChange,
  onUsageChange,
  onClearAll,
}: FilterSidebarProps) {
  const handleBrandToggle = (brand: string) => {
    if (selectedBrands.includes(brand)) {
      onBrandChange(selectedBrands.filter((b) => b !== brand))
    } else {
      onBrandChange([...selectedBrands, brand])
    }
  }

  const handleUsageToggle = (usage: string) => {
    if (selectedUsages.includes(usage)) {
      onUsageChange(selectedUsages.filter((u) => u !== usage))
    } else {
      onUsageChange([...selectedUsages, usage])
    }
  }

  if (!show) return null

  return (
    <div className="w-full lg:w-80 space-y-4">
      <Card className="shadow-lg border-amber-200/50">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3 bg-gradient-to-r from-amber-50 to-rose-50 rounded-t-lg">
          <CardTitle className="text-lg arabic-font text-amber-800 font-semibold flex items-center gap-2">
            <Filter className="h-5 w-5" />
            الفلاتر
          </CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearAll}
            className="text-amber-600 hover:text-amber-800 hover:bg-amber-100 arabic-font transition-colors"
          >
            <X className="h-4 w-4 ml-1" />
            مسح الكل
          </Button>
        </CardHeader>

        <CardContent className="space-y-6 p-4">
          <div>
            <h3 className="font-semibold mb-3 arabic-font text-amber-800 border-b border-amber-200 pb-2">البراند</h3>
            <div className="flex flex-wrap gap-2">
              {brands.map((brand) => (
                <Button
                  key={brand}
                  variant={selectedBrands.includes(brand) ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleBrandToggle(brand)}
                  className={`arabic-font transition-all duration-200 ${
                    selectedBrands.includes(brand)
                      ? "bg-amber-600 hover:bg-amber-700 text-white border-amber-600"
                      : "border-amber-300 text-amber-700 hover:bg-amber-50 hover:border-amber-400"
                  }`}
                >
                  {brand}
                  {selectedBrands.includes(brand) && <X className="h-3 w-3 mr-1" />}
                </Button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-3 arabic-font text-amber-800 border-b border-amber-200 pb-2">الاستخدام</h3>
            <div className="flex flex-wrap gap-2">
              {usages.map((usage) => (
                <Button
                  key={usage}
                  variant={selectedUsages.includes(usage) ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleUsageToggle(usage)}
                  className={`arabic-font transition-all duration-200 ${
                    selectedUsages.includes(usage)
                      ? "bg-amber-600 hover:bg-amber-700 text-white border-amber-600"
                      : "border-amber-300 text-amber-700 hover:bg-amber-50 hover:border-amber-400"
                  }`}
                >
                  {usage}
                  {selectedUsages.includes(usage) && <X className="h-3 w-3 mr-1" />}
                </Button>
              ))}
            </div>
          </div>

          {(selectedBrands.length > 0 || selectedUsages.length > 0) && (
            <div className="pt-4 border-t border-amber-200">
              <div className="flex items-center justify-between">
                <span className="text-sm arabic-font text-amber-700">
                  الفلاتر المفعلة: {selectedBrands.length + selectedUsages.length}
                </span>
                <Badge variant="secondary" className="bg-amber-100 text-amber-800">
                  {selectedBrands.length + selectedUsages.length}
                </Badge>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
