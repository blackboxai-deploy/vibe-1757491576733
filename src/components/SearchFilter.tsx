"use client";

import React from 'react';
import { FilterState } from '@/types';

interface SearchFilterProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
}

export default function SearchFilter({ filters, onFiltersChange }: SearchFilterProps) {
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFiltersChange({ ...filters, q: e.target.value });
  };

  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onFiltersChange({ ...filters, type: e.target.value });
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFiltersChange({ ...filters, maxPrice: Number(e.target.value) });
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-white p-6 rounded-xl shadow-lg border">
      <div className="space-y-4">
        {/* Search Input */}
        <div>
          <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-2">
            Search Properties
          </label>
          <input
            id="search"
            type="text"
            placeholder="Search by city, title, or type..."
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
            value={filters.q}
            onChange={handleSearchChange}
          />
        </div>

        {/* Property Type Select */}
        <div>
          <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-2">
            Property Type
          </label>
          <select
            id="type"
            value={filters.type}
            onChange={handleTypeChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
          >
            <option value="">All Types</option>
            <option value="Apartment">Apartment</option>
            <option value="Villa">Villa</option>
            <option value="Townhouse">Townhouse</option>
          </select>
        </div>

        {/* Price Range Slider */}
        <div>
          <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-2">
            Maximum Price
          </label>
          <input
            id="price"
            type="range"
            min="0"
            max="2500000"
            step="50000"
            value={filters.maxPrice}
            onChange={handlePriceChange}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider-thumb"
          />
          <div className="flex justify-between text-sm text-gray-500 mt-1">
            <span>$0</span>
            <span>$2.5M</span>
          </div>
          {filters.maxPrice > 0 && (
            <div className="text-center mt-2">
              <span className="text-sm font-medium text-purple-700">
                Up to ${filters.maxPrice.toLocaleString()}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}