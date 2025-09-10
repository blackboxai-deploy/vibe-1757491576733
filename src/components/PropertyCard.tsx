"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Property } from '@/types';

interface PropertyCardProps {
  property: Property;
}

export default function PropertyCard({ property }: PropertyCardProps) {
  const formatPrice = (price: number) => {
    return `$${price.toLocaleString()}`;
  };

  return (
    <motion.div
      className="overflow-hidden rounded-2xl border border-gray-200 shadow-lg bg-white group hover:shadow-xl transition-all duration-300"
      whileHover={{ y: -8 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Property Image */}
      <div className="relative h-64 overflow-hidden">
        <Image
          src={property.image}
          alt={property.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute top-4 left-4">
          <span className="bg-purple-700 text-white px-3 py-1 rounded-full text-sm font-medium">
            {property.type}
          </span>
        </div>
        <div className="absolute top-4 right-4">
          <span className="bg-white/90 backdrop-blur-sm text-purple-700 px-3 py-1 rounded-full text-sm font-bold">
            {formatPrice(property.price)}
          </span>
        </div>
      </div>

      {/* Property Details */}
      <div className="p-6">
        <div className="mb-3">
          <h3 className="font-bold text-xl text-gray-900 mb-1 group-hover:text-purple-700 transition-colors">
            {property.title}
          </h3>
          <p className="text-gray-600 text-sm">
            {property.city} • {property.type}
          </p>
        </div>

        {/* Property Features */}
        <div className="flex items-center gap-4 mb-4 text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <span className="text-lg">🛏</span>
            <span>{property.beds} bed{property.beds !== 1 ? 's' : ''}</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-lg">🛁</span>
            <span>{property.baths} bath{property.baths !== 1 ? 's' : ''}</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-lg">📐</span>
            <span>{property.area.toLocaleString()} sqft</span>
          </div>
        </div>

        {/* Action Button - Now with proper navigation */}
        <Link href={`/property/${property.id}`}>
          <motion.button
            className="w-full py-3 bg-purple-700 text-white font-semibold rounded-lg hover:bg-purple-800 transition-all duration-200 focus:ring-4 focus:ring-purple-200 focus:outline-none"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            View Details
          </motion.button>
        </Link>
      </div>
    </motion.div>
  );
}