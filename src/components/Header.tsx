"use client";

import React from 'react';
import Image from 'next/image';
import { Company } from '@/types';

interface HeaderProps {
  company: Company;
}

export default function Header({ company }: HeaderProps) {
  return (
    <header className="sticky top-0 bg-white shadow-md z-50 px-4 py-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center gap-3">
          <Image
            src={company.logo}
            alt={`${company.name} logo`}
            width={50}
            height={50}
            className="rounded-lg"
          />
          <div>
            <h1 className="font-bold text-lg text-purple-700">{company.name}</h1>
            <p className="text-sm text-gray-600 hidden sm:block">{company.tagline}</p>
          </div>
        </div>
        
        <div className="text-right">
          <a 
            href={`tel:${company.phone}`}
            className="text-sm font-semibold text-purple-700 hover:text-purple-800 transition-colors"
          >
            {company.phone}
          </a>
          <p className="text-xs text-gray-500 hidden sm:block">{company.city}</p>
        </div>
      </div>
    </header>
  );
}