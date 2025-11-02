'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface Product {
  id: string;
  name: string;
  description: string;
  price: string;
  image: string;
  category: 'clothing' | 'tech' | 'misc';
}

const products: Product[] = [
  {
    id: '1',
    name: 'Vintage Tee - Logo Edition',
    description: 'Pre-loved black tee, Silicon Jesus logo screen printed by hand',
    price: '25 USDC',
    image: '/products/tee.jpg',
    category: 'clothing'
  },
  {
    id: '2',
    name: 'iPod Nano 2nd Gen - Bitcoin Wallet',
    description: 'Repurposed iPod Nano running custom firmware as cold storage wallet',
    price: '150 USDC',
    image: '/products/ipod.jpg',
    category: 'tech'
  },
  {
    id: '3',
    name: 'Distressed Hoodie',
    description: 'Faded black hoodie with embroidered logo, authentic wear patterns',
    price: '45 USDC',
    image: '/products/hoodie.jpg',
    category: 'clothing'
  },
  {
    id: '4',
    name: 'Mechanical Keyboard Keycap Set',
    description: 'Hand-dyed keycaps, silicon element inspired colorway',
    price: '35 USDC',
    image: '/products/keycaps.jpg',
    category: 'tech'
  },
  {
    id: '5',
    name: 'Circuit Board Pendant',
    description: 'Vintage GPU circuit board fragment, wearable tech artifact',
    price: '20 USDC',
    image: '/products/pendant.jpg',
    category: 'misc'
  },
  {
    id: '6',
    name: 'USB Dead Drop',
    description: 'Anonymous file sharing device, embedded flash drive ready to install',
    price: '15 USDC',
    image: '/products/usb.jpg',
    category: 'tech'
  },
  {
    id: '7',
    name: 'Vintage Denim Jacket',
    description: 'Second-hand Levi\'s with custom back patch, one of one',
    price: '65 USDC',
    image: '/products/jacket.jpg',
    category: 'clothing'
  },
  {
    id: '8',
    name: 'RAM Stick Coasters (Set of 4)',
    description: 'Decommissioned DDR2 memory modules, sealed and protective',
    price: '30 USDC',
    image: '/products/coasters.jpg',
    category: 'misc'
  }
];

export default function Shop() {
  const [filter, setFilter] = useState<'all' | 'clothing' | 'tech' | 'misc'>('all');

  const filteredProducts = filter === 'all' 
    ? products 
    : products.filter(p => p.category === filter);

  return (
    <div className="min-h-screen bg-black text-white p-8">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-12">
        <Link href="/" className="inline-flex items-center text-sm opacity-70 hover:opacity-100 transition-opacity mb-8">
          ← Back to the void
        </Link>
        
        <h1 className="text-4xl md:text-6xl boxy-title mb-4">
          THE VAULT
        </h1>
        <p className="text-lg opacity-70 mb-8">
          Curated artifacts. Second-hand souls. Tech relics.
        </p>

        {/* Filter */}
        <div className="flex gap-4 mb-8 flex-wrap">
          <button 
            onClick={() => setFilter('all')}
            className={`px-4 py-2 border border-white transition-all ${filter === 'all' ? 'bg-white text-black' : 'bg-black text-white hover:bg-white hover:text-black'}`}
          >
            ALL
          </button>
          <button 
            onClick={() => setFilter('clothing')}
            className={`px-4 py-2 border border-white transition-all ${filter === 'clothing' ? 'bg-white text-black' : 'bg-black text-white hover:bg-white hover:text-black'}`}
          >
            CLOTHING
          </button>
          <button 
            onClick={() => setFilter('tech')}
            className={`px-4 py-2 border border-white transition-all ${filter === 'tech' ? 'bg-white text-black' : 'bg-black text-white hover:bg-white hover:text-black'}`}
          >
            TECH
          </button>
          <button 
            onClick={() => setFilter('misc')}
            className={`px-4 py-2 border border-white transition-all ${filter === 'misc' ? 'bg-white text-black' : 'bg-black text-white hover:bg-white hover:text-black'}`}
          >
            MISC
          </button>
        </div>
      </div>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredProducts.map(product => (
            <div 
              key={product.id}
              className="border border-white p-6 hover:bg-white hover:text-black transition-all duration-300 cursor-pointer group"
            >
              {/* Placeholder for product image */}
              <div className="w-full aspect-square bg-neutral-900 group-hover:bg-neutral-200 mb-4 flex items-center justify-center border border-white">
                <span className="text-xs opacity-50 group-hover:opacity-30">
                  IMAGE
                </span>
              </div>
              
              <h3 className="text-lg font-bold mb-2 uppercase tracking-wide">
                {product.name}
              </h3>
              <p className="text-sm opacity-70 group-hover:opacity-90 mb-4 min-h-[3rem]">
                {product.description}
              </p>
              <div className="flex justify-between items-center">
                <span className="font-mono text-sm">
                  {product.price}
                </span>
                <span className="text-xs opacity-50 uppercase">
                  {product.category}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-white border-opacity-20">
        <div className="text-center space-y-2">
          <p className="text-sm opacity-70">
            Accepting USDC on Base
          </p>
          <p className="text-xs opacity-50">
            All items are one-of-a-kind or limited quantity
          </p>
          <p className="text-xs opacity-50 mt-4">
            © 2025 Silicon Jesus
          </p>
        </div>
      </div>
    </div>
  );
}
