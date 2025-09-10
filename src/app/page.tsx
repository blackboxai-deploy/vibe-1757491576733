"use client";

import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import SearchFilter from '@/components/SearchFilter';
import PropertyCard from '@/components/PropertyCard';
import { PROPERTIES, COMPANY } from '@/data/properties';
import { FilterState, Property } from '@/types';

function useFilteredProperties(filters: FilterState): Property[] {
  return useMemo(() => {
    return PROPERTIES.filter((property) => {
      const matchQuery = filters.q 
        ? (property.title + " " + property.city + " " + property.type)
            .toLowerCase()
            .includes(filters.q.toLowerCase())
        : true;
      
      const matchType = filters.type ? property.type === filters.type : true;
      const matchPrice = filters.maxPrice ? property.price <= filters.maxPrice : true;
      
      return matchQuery && matchType && matchPrice;
    });
  }, [filters.q, filters.type, filters.maxPrice]);
}

export default function RealEstateSite() {
  const [filters, setFilters] = useState<FilterState>({
    q: "",
    type: "",
    maxPrice: 0,
  });

  const filteredProperties = useFilteredProperties(filters);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Header company={COMPANY} />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 py-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-4">
              Premium Real Estate in {COMPANY.city.split(',')[0]}
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-purple-100">
              {COMPANY.tagline}
            </p>
            <p className="text-lg mb-12 text-purple-200 max-w-2xl mx-auto">
              Discover luxury properties across the UAE. From modern villas to skyline apartments, 
              find your perfect home with our expert guidance.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <SearchFilter filters={filters} onFiltersChange={setFilters} />
          </motion.div>
        </div>
      </section>

      {/* Property Listings */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-900">
              Featured Properties
            </h2>
            <div className="text-sm text-gray-600">
              {filteredProperties.length} propert{filteredProperties.length !== 1 ? 'ies' : 'y'} found
            </div>
          </div>

          {filteredProperties.length === 0 ? (
            <motion.div
              className="text-center py-20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="text-6xl mb-4">🏠</div>
              <h3 className="text-2xl font-semibold text-gray-700 mb-2">
                No properties found
              </h3>
              <p className="text-gray-500 mb-6">
                Try adjusting your filters to see more properties
              </p>
              <button
                onClick={() => setFilters({ q: "", type: "", maxPrice: 0 })}
                className="bg-purple-700 text-white px-6 py-3 rounded-lg hover:bg-purple-800 transition-colors"
              >
                Clear Filters
              </button>
            </motion.div>
          ) : (
            <motion.div
              className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {filteredProperties.map((property, index) => (
                <motion.div
                  key={property.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <PropertyCard property={property} />
                </motion.div>
              ))}
            </motion.div>
          )}
        </motion.div>
      </section>

      {/* Company Information Section */}
      <section className="bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <motion.div
            className="text-center max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Why Choose {COMPANY.name}?
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              With years of expertise in the UAE real estate market, we provide personalized service 
              to help you find the perfect property. Our commitment to excellence and deep local knowledge 
              makes us your trusted partner in real estate.
            </p>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-4xl mb-4">🏆</div>
                <h3 className="text-xl font-semibold mb-2">Expert Guidance</h3>
                <p className="text-gray-600">Professional advice from experienced real estate specialists</p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-4">🌟</div>
                <h3 className="text-xl font-semibold mb-2">Premium Properties</h3>
                <p className="text-gray-600">Carefully curated selection of high-quality properties</p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-4">🤝</div>
                <h3 className="text-xl font-semibold mb-2">Personalized Service</h3>
                <p className="text-gray-600">Dedicated support throughout your property journey</p>
              </div>
            </div>
            
            <div className="mt-12 p-6 bg-purple-50 rounded-xl">
              <p className="text-sm text-gray-600 mb-2">Licensed Real Estate Company</p>
              <p className="font-semibold text-gray-800">License: {COMPANY.license}</p>
              <div className="mt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
                <a 
                  href={`tel:${COMPANY.phone}`}
                  className="bg-purple-700 text-white px-6 py-3 rounded-lg hover:bg-purple-800 transition-colors font-semibold"
                >
                  Call: {COMPANY.phone}
                </a>
                <a 
                  href={`mailto:${COMPANY.email}`}
                  className="border border-purple-700 text-purple-700 px-6 py-3 rounded-lg hover:bg-purple-50 transition-colors font-semibold"
                >
                  Email: {COMPANY.email}
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-purple-900 text-white">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">{COMPANY.name}</h3>
              <p className="text-purple-200 mb-4">{COMPANY.tagline}</p>
              <p className="text-sm text-purple-300">
                Licensed Real Estate Company in {COMPANY.city}
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Contact Information</h4>
              <p className="text-purple-200 mb-2">{COMPANY.phone}</p>
              <p className="text-purple-200 mb-2">{COMPANY.email}</p>
              <p className="text-purple-200">{COMPANY.city}</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Property Types</h4>
              <ul className="text-purple-200 space-y-2">
                <li>Luxury Villas</li>
                <li>Modern Apartments</li>
                <li>Waterfront Townhouses</li>
                <li>Investment Properties</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-purple-800 mt-8 pt-8 text-center">
            <p className="text-purple-300">
              © {new Date().getFullYear()} {COMPANY.name}. All rights reserved. | License: {COMPANY.license}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}