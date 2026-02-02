'use client';

import { useState, useEffect, useRef } from 'react';

interface AssetData {
  symbol: string;
  name: string;
  price: number;
  change24h: number;
  sparkline: number[];
  type: 'crypto';
  color: string;
  icon: React.ReactNode;
}

// Mini sparkline component for each ticker item
function MiniSparkline({ data, isPositive }: { data: number[]; isPositive: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!data || data.length === 0 || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    ctx.clearRect(0, 0, rect.width, rect.height);

    const min = Math.min(...data);
    const max = Math.max(...data);
    const range = max - min || 1;

    const lineColor = isPositive ? '#22c55e' : '#ef4444';

    ctx.beginPath();
    data.forEach((price, i) => {
      const x = (i / (data.length - 1)) * rect.width;
      const y = rect.height - ((price - min) / range) * rect.height * 0.8 - rect.height * 0.1;
      
      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    });

    ctx.strokeStyle = lineColor;
    ctx.lineWidth = 1.5;
    ctx.stroke();
  }, [data, isPositive]);

  return (
    <canvas
      ref={canvasRef}
      className="w-12 h-6"
      style={{ width: '48px', height: '24px' }}
    />
  );
}

// Asset icons
const BitcoinIcon = () => (
  <svg className="w-3 h-3 text-white" viewBox="0 0 24 24" fill="currentColor">
    <path d="M23.638 14.904c-1.602 6.43-8.113 10.34-14.542 8.736C2.67 22.05-1.244 15.525.362 9.105 1.962 2.67 8.475-1.243 14.9.358c6.43 1.605 10.342 8.115 8.738 14.546zm-6.35-4.613c.24-1.59-.974-2.45-2.64-3.03l.54-2.153-1.315-.33-.525 2.107c-.345-.087-.7-.167-1.053-.25l.53-2.12-1.315-.33-.54 2.153c-.286-.065-.566-.13-.84-.2l.001-.003-1.815-.453-.35 1.407s.974.223.954.237c.535.136.63.494.614.778l-.614 2.466c.037.009.085.023.14.043-.046-.011-.094-.023-.143-.035l-.86 3.45c-.065.16-.23.4-.6.31.013.02-.955-.238-.955-.238l-.652 1.514 1.713.427c.318.08.63.163.936.24l-.546 2.19 1.314.328.54-2.164c.36.097.708.187 1.05.27l-.537 2.148 1.315.33.546-2.183c2.246.424 3.934.253 4.645-1.777.573-1.636-.028-2.58-1.21-3.194.86-.198 1.508-.765 1.68-1.937z"/>
  </svg>
);

const DogeIcon = () => (
  <svg className="w-3 h-3 text-white" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm-.908 18.917v-2.08h-2.25v-2.083h2.25v-5.5h-2.25V7.17h2.25V5.083h2.084V7.17h1.5c3.09 0 4.833 2.09 4.833 4.917 0 2.826-1.743 4.916-4.833 4.916h-1.5v2.084h-2.084v-.17zm2.084-4.334h1.5c1.717 0 2.75-1.083 2.75-2.75s-1.033-2.75-2.75-2.75h-1.5v5.5z"/>
  </svg>
);

export default function BitcoinTicker() {
  const [assets, setAssets] = useState<AssetData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        // Fetch Bitcoin and Dogecoin data from CoinGecko using markets endpoint (single request, more reliable)
        const response = await fetch(
          'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin,dogecoin&order=market_cap_desc&sparkline=true&price_change_percentage=24h'
        );

        if (!response.ok) {
          throw new Error(`API error: ${response.status}`);
        }

        const data = await response.json();
        
        const newAssets: AssetData[] = [];

        // Process each coin from the response
        for (const coin of data) {
          if (coin.id === 'bitcoin') {
            newAssets.push({
              symbol: 'BTC',
              name: 'Bitcoin',
              price: coin.current_price,
              change24h: coin.price_change_percentage_24h || 0,
              sparkline: coin.sparkline_in_7d?.price || [],
              type: 'crypto',
              color: '#f7931a',
              icon: <BitcoinIcon />,
            });
          } else if (coin.id === 'dogecoin') {
            newAssets.push({
              symbol: 'DOGE',
              name: 'Dogecoin',
              price: coin.current_price,
              change24h: coin.price_change_percentage_24h || 0,
              sparkline: coin.sparkline_in_7d?.price || [],
              type: 'crypto',
              color: '#c2a633',
              icon: <DogeIcon />,
            });
          }
        }

        setAssets(newAssets);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch market data:', error);
        setLoading(false);
      }
    };

    fetchAllData();
    const interval = setInterval(fetchAllData, 60000);
    
    return () => clearInterval(interval);
  }, []);

  const formatPrice = (price: number) => {
    if (price === 0) return '—';
    
    // For low-value assets like DOGE, show more decimal places
    const decimals = price < 1 ? 4 : price < 100 ? 2 : 0;
    
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    }).format(price);
  };

  const formatChange = (change: number) => {
    if (change === 0) return '—';
    const sign = change >= 0 ? '+' : '';
    return `${sign}${change.toFixed(2)}%`;
  };

  // Create ticker items for all assets - interleaved so BTC and DOGE alternate
  const tickerItems: { id: string; asset: AssetData; segment: number[] }[] = [];
  
  // Create 4 items per asset, but interleave them
  for (let i = 0; i < 4; i++) {
    for (const asset of assets) {
      const segmentSize = Math.max(1, Math.floor((asset.sparkline?.length || 1) / 4));
      const startIdx = i * segmentSize;
      const segment = asset.sparkline?.slice(startIdx, startIdx + segmentSize) || [];
      
      tickerItems.push({
        id: `${asset.symbol}-${i}`,
        asset,
        segment,
      });
    }
  }

  const TickerItem = ({ item }: { item: { id: string; asset: AssetData; segment: number[] } }) => (
    <div className="flex items-center gap-2 px-4 border-r border-white/10">
      {/* Asset icon */}
      <div 
        className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
        style={{ backgroundColor: item.asset.color }}
      >
        {item.asset.icon}
      </div>
      
      {/* Symbol */}
      <span className="text-white/70 text-xs font-medium whitespace-nowrap">
        {item.asset.symbol}
      </span>
      
      {/* Mini sparkline */}
      {item.segment.length > 0 && (
        <MiniSparkline data={item.segment} isPositive={item.asset.change24h >= 0} />
      )}
      
      {/* Price */}
      <span className="text-white font-semibold text-sm whitespace-nowrap">
        {formatPrice(item.asset.price)}
      </span>
      
      {/* Change badge */}
      <span
        className={`text-xs font-medium px-1.5 py-0.5 rounded whitespace-nowrap ${
          item.asset.change24h >= 0
            ? 'text-green-400 bg-green-500/20'
            : 'text-red-400 bg-red-500/20'
        }`}
      >
        {formatChange(item.asset.change24h)}
      </span>
    </div>
  );

  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-12 bg-black/90 backdrop-blur-md border-b border-white/10 overflow-hidden">
      {loading ? (
        <div className="h-full flex items-center justify-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-full bg-[#f7931a]/50 animate-pulse" />
            <div className="w-16 h-4 bg-white/10 rounded animate-pulse" />
          </div>
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-full bg-[#c2a633]/50 animate-pulse" />
            <div className="w-16 h-4 bg-white/10 rounded animate-pulse" />
          </div>
        </div>
      ) : assets.length > 0 && tickerItems.length > 0 ? (
        <div className="ticker-wrapper h-full items-center">
          <div className="animate-ticker flex items-center">
            {/* Double the items for seamless loop */}
            {tickerItems.map((item) => (
              <TickerItem key={`first-${item.id}`} item={item} />
            ))}
            {tickerItems.map((item) => (
              <TickerItem key={`second-${item.id}`} item={item} />
            ))}
          </div>
        </div>
      ) : (
        <div className="h-full flex items-center justify-center">
          <span className="text-white/50 text-sm">Unable to load market data</span>
        </div>
      )}
    </div>
  );
}
