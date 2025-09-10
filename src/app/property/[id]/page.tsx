"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import { PROPERTIES, COMPANY } from '@/data/properties';

interface PropertyDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function PropertyDetailPage({ params }: PropertyDetailPageProps) {
  const { id } = await params;
  const propertyId = parseInt(id);
  const property = PROPERTIES.find(p => p.id === propertyId);

  if (!property) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header company={COMPANY} />
        <div className="max-w-4xl mx-auto px-4 py-20 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Property Not Found</h1>
          <p className="text-gray-600 mb-8">Sorry, the property you're looking for doesn't exist.</p>
          <Link 
            href="/"
            className="bg-purple-700 text-white px-6 py-3 rounded-lg hover:bg-purple-800 transition-colors"
          >
            Back to Listings
          </Link>
        </div>
      </div>
    );
  }

  const formatPrice = (price: number) => `$${price.toLocaleString()}`;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header company={COMPANY} />
      
      {/* Property Hero Section */}
      <section className="relative">
        <div className="h-96 md:h-[500px] relative">
          <Image
            src={property.image}
            alt={property.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/30"></div>
          <div className="absolute bottom-8 left-8 text-white">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="bg-purple-700 px-3 py-1 rounded-full text-sm font-medium mb-2 inline-block">
                {property.type}
              </span>
              <h1 className="text-4xl md:text-5xl font-bold mb-2">{property.title}</h1>
              <p className="text-xl">{property.city}, UAE</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Property Details */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {/* Price and Basic Info */}
              <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
                <div className="flex flex-wrap items-center justify-between mb-6">
                  <div className="text-4xl font-bold text-purple-700 mb-2">
                    {formatPrice(property.price)}
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">Property Type</p>
                    <p className="font-semibold text-lg">{property.type}</p>
                  </div>
                </div>

                {/* Property Features */}
                <div className="grid grid-cols-3 gap-6 mb-8">
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <div className="text-3xl mb-2">🛏</div>
                    <div className="text-2xl font-bold text-purple-700">{property.beds}</div>
                    <div className="text-sm text-gray-600">Bedrooms</div>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <div className="text-3xl mb-2">🛁</div>
                    <div className="text-2xl font-bold text-purple-700">{property.baths}</div>
                    <div className="text-sm text-gray-600">Bathrooms</div>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <div className="text-3xl mb-2">📐</div>
                    <div className="text-2xl font-bold text-purple-700">{property.area.toLocaleString()}</div>
                    <div className="text-sm text-gray-600">Square Feet</div>
                  </div>
                </div>
              </div>

              {/* Property Description */}
              <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Property Description</h2>
                <div className="space-y-4 text-gray-600">
                  <p>
                    This magnificent {property.type.toLowerCase()} in {property.city} offers the perfect blend of luxury and comfort. 
                    With {property.beds} spacious bedrooms and {property.baths} well-appointed bathrooms, this property provides 
                    ample space for comfortable living.
                  </p>
                  <p>
                    Spanning {property.area.toLocaleString()} square feet, this property features modern design elements, 
                    high-quality finishes, and premium amenities. Located in one of {property.city}'s most desirable 
                    neighborhoods, it offers easy access to shopping, dining, and entertainment.
                  </p>
                  <p>
                    Perfect for families or investors looking for a premium property in the UAE, this 
                    {property.type.toLowerCase()} represents excellent value at {formatPrice(property.price)}.
                  </p>
                </div>
              </div>

              {/* Property Features */}
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Property Features</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {[
                    "Modern Kitchen with Premium Appliances",
                    "Spacious Living Areas", 
                    "Premium Flooring Throughout",
                    "Central Air Conditioning",
                    "High-Speed Internet Ready",
                    "Security System",
                    "Parking Space Included",
                    "Close to Shopping Centers",
                    "Near Public Transportation",
                    "Family-Friendly Neighborhood"
                  ].map((feature, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-purple-700 rounded-full"></div>
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="sticky top-8"
            >
              {/* Contact Form */}
              <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Contact Agent</h3>
                <div className="space-y-4">
                  <input
                    type="text"
                    placeholder="Your Name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                  <input
                    type="email"
                    placeholder="Your Email"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                  <input
                    type="tel"
                    placeholder="Your Phone"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                  <textarea
                    rows={4}
                    placeholder="Your Message"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                    defaultValue={`I'm interested in ${property.title} in ${property.city}.`}
                  />
                  <button
                    onClick={() => alert("Thank you for your interest! We will contact you soon.")}
                    className="w-full bg-purple-700 text-white py-3 rounded-lg hover:bg-purple-800 transition-colors font-semibold"
                  >
                    Send Message
                  </button>
                </div>
              </div>

              {/* Company Info */}
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <div className="text-center mb-6">
                  <Image
                    src={COMPANY.logo}
                    alt={COMPANY.name}
                    width={80}
                    height={80}
                    className="mx-auto rounded-lg mb-4"
                  />
                  <h4 className="text-xl font-bold text-purple-700">{COMPANY.name}</h4>
                  <p className="text-gray-600">{COMPANY.tagline}</p>
                </div>
                <div className="space-y-3 text-center">
                  <a 
                    href={`tel:${COMPANY.phone}`}
                    className="block bg-purple-700 text-white py-3 rounded-lg hover:bg-purple-800 transition-colors font-semibold"
                  >
                    Call: {COMPANY.phone}
                  </a>
                  <a 
                    href={`mailto:${COMPANY.email}`}
                    className="block border border-purple-700 text-purple-700 py-3 rounded-lg hover:bg-purple-50 transition-colors font-semibold"
                  >
                    Email Us
                  </a>
                  <p className="text-sm text-gray-500 mt-4">
                    Licensed: {COMPANY.license}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Back to Listings */}
        <div className="mt-12 text-center">
          <Link
            href="/"
            className="inline-flex items-center space-x-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-3 rounded-lg transition-colors"
          >
            <span>←</span>
            <span>Back to All Properties</span>
          </Link>
        </div>
      </section>
    </div>
  );
}