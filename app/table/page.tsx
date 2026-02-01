'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import QRCode from 'qrcode';

const GRID_SIZE = 29;

interface TileGrid {
  [key: string]: boolean; // true = black, false = white
}

interface Pattern {
  name: string;
  description: string;
  grid: TileGrid;
}

// Pattern generation functions
const generateSymmetricalPattern = (): TileGrid => {
  const grid: TileGrid = {};
  const center = Math.floor(GRID_SIZE / 2);
  
  for (let row = 0; row < GRID_SIZE; row++) {
    for (let col = 0; col < GRID_SIZE; col++) {
      // Mirror across both axes
      const distX = Math.abs(col - center);
      const distY = Math.abs(row - center);
      const dist = Math.sqrt(distX * distX + distY * distY);
      
      // Create concentric rings
      const ringPattern = Math.floor(dist / 2) % 3;
      grid[`${row}-${col}`] = ringPattern === 0 || ringPattern === 2;
    }
  }
  return grid;
};

const generateMandalaPattern = (): TileGrid => {
  const grid: TileGrid = {};
  const center = Math.floor(GRID_SIZE / 2);
  
  for (let row = 0; row < GRID_SIZE; row++) {
    for (let col = 0; col < GRID_SIZE; col++) {
      const dx = col - center;
      const dy = row - center;
      const angle = Math.atan2(dy, dx);
      const dist = Math.sqrt(dx * dx + dy * dy);
      
      // Radial symmetry with 8 sections
      const section = Math.floor((angle + Math.PI) / (Math.PI / 4)) % 8;
      const ring = Math.floor(dist / 2);
      
      grid[`${row}-${col}`] = (section % 2 === 0 && ring % 2 === 0) || 
                              (section % 2 === 1 && ring % 3 === 0);
    }
  }
  return grid;
};

const generateSpiralPattern = (): TileGrid => {
  const grid: TileGrid = {};
  let row = Math.floor(GRID_SIZE / 2);
  let col = Math.floor(GRID_SIZE / 2);
  let dir = 0; // 0: right, 1: down, 2: left, 3: up
  let steps = 1;
  let stepsTaken = 0;
  let turnsAtCurrentLength = 0;
  let filled = 0;
  
  const dirs = [[0, 1], [1, 0], [0, -1], [-1, 0]];
  
  while (filled < GRID_SIZE * GRID_SIZE) {
    if (row >= 0 && row < GRID_SIZE && col >= 0 && col < GRID_SIZE) {
      grid[`${row}-${col}`] = filled % 3 !== 0;
      filled++;
    } else {
      filled++;
    }
    
    stepsTaken++;
    row += dirs[dir][0];
    col += dirs[dir][1];
    
    if (stepsTaken === steps) {
      stepsTaken = 0;
      dir = (dir + 1) % 4;
      turnsAtCurrentLength++;
      
      if (turnsAtCurrentLength === 2) {
        steps++;
        turnsAtCurrentLength = 0;
      }
    }
  }
  
  return grid;
};

const generateCheckerPattern = (): TileGrid => {
  const grid: TileGrid = {};
  const blockSize = 2;
  
  for (let row = 0; row < GRID_SIZE; row++) {
    for (let col = 0; col < GRID_SIZE; col++) {
      const blockRow = Math.floor(row / blockSize);
      const blockCol = Math.floor(col / blockSize);
      grid[`${row}-${col}`] = (blockRow + blockCol) % 2 === 0;
    }
  }
  return grid;
};

const generateMazePattern = (): TileGrid => {
  const grid: TileGrid = {};
  
  for (let row = 0; row < GRID_SIZE; row++) {
    for (let col = 0; col < GRID_SIZE; col++) {
      // Create maze-like walls
      const isWall = (row % 4 === 0 && col % 2 === 0) || 
                     (col % 4 === 0 && row % 2 === 0) ||
                     (row % 7 === 3 && col % 5 === 2);
      grid[`${row}-${col}`] = isWall;
    }
  }
  return grid;
};

const generateSnowflakePattern = (): TileGrid => {
  const grid: TileGrid = {};
  const center = Math.floor(GRID_SIZE / 2);
  
  for (let row = 0; row < GRID_SIZE; row++) {
    for (let col = 0; col < GRID_SIZE; col++) {
      const dx = col - center;
      const dy = row - center;
      const angle = Math.atan2(dy, dx);
      const dist = Math.sqrt(dx * dx + dy * dy);
      
      // 6-fold symmetry for snowflake
      const section = Math.floor((angle + Math.PI) / (Math.PI / 3)) % 6;
      const onAxis = Math.abs(dx) < 2 || Math.abs(dy) < 2 || Math.abs(dx - dy) < 2 || Math.abs(dx + dy) < 2;
      const inRing = dist > 5 && dist < 7 || dist > 10 && dist < 12;
      
      grid[`${row}-${col}`] = onAxis || (section % 2 === 0 && inRing);
    }
  }
  return grid;
};

const imageToGrid = (imageData: ImageData): TileGrid => {
  const grid: TileGrid = {};
  const { width, height, data } = imageData;
  
  for (let row = 0; row < GRID_SIZE; row++) {
    for (let col = 0; col < GRID_SIZE; col++) {
      // Map grid position to image position
      const x = Math.floor((col / GRID_SIZE) * width);
      const y = Math.floor((row / GRID_SIZE) * height);
      const idx = (y * width + x) * 4;
      
      // Get RGB values
      const r = data[idx];
      const g = data[idx + 1];
      const b = data[idx + 2];
      const a = data[idx + 3];
      
      // Calculate brightness (weighted average)
      const brightness = (r * 0.299 + g * 0.587 + b * 0.114);
      
      // For white logos on transparent/black background:
      // If the pixel is bright AND opaque, make tile BLACK (inverted for display)
      // This works for white line art logos
      const isOpaque = a > 128;
      const isBright = brightness > 128;
      
      // Invert: bright pixels become black tiles for better visibility
      grid[`${row}-${col}`] = isOpaque && isBright;
    }
  }
  
  return grid;
};

const generatePixelPig = (): TileGrid => {
  const grid: TileGrid = {};
  
  // Initialize all white
  for (let row = 0; row < GRID_SIZE; row++) {
    for (let col = 0; col < GRID_SIZE; col++) {
      grid[`${row}-${col}`] = false;
    }
  }
  
  // Center the pig - bigger and better design
  const offsetRow = 4;
  const offsetCol = 4;
  
  // Improved pig pixel art pattern (21x21 centered)
  const pigPattern = [
    '                     ',
    '       #####         ',
    '      #######        ',
    '     #########       ',
    '    ###########      ',
    '   #############     ',
    '  ###############    ',
    '  ###############    ',
    ' #################   ',
    ' #### ### ### ####   ',
    ' #### ### ### ####   ',
    ' #################   ',
    ' #################   ',
    '  ###############    ',
    '  #### ####### ####  ',
    '   ###         ###   ',
    '   ###         ###   ',
    '    ##         ##    ',
    '    ##         ##    ',
    '    ##         ##    ',
    '                     ',
  ];
  
  for (let r = 0; r < pigPattern.length; r++) {
    for (let c = 0; c < pigPattern[r].length; c++) {
      const row = r + offsetRow;
      const col = c + offsetCol;
      if (row < GRID_SIZE && col < GRID_SIZE) {
        grid[`${row}-${col}`] = pigPattern[r][c] === '#';
      }
    }
  }
  
  return grid;
};

const generatePixelHeart = (): TileGrid => {
  const grid: TileGrid = {};
  
  // Initialize all white
  for (let row = 0; row < GRID_SIZE; row++) {
    for (let col = 0; col < GRID_SIZE; col++) {
      grid[`${row}-${col}`] = false;
    }
  }
  
  // Center the heart
  const offsetRow = 6;
  const offsetCol = 6;
  
  // Heart pixel art pattern (17x17 centered)
  const heartPattern = [
    '                 ',
    '   ###   ###     ',
    '  ##### #####    ',
    ' ##############  ',
    ' ##############  ',
    '  ############   ',
    '  ############   ',
    '   ##########    ',
    '   ##########    ',
    '    ########     ',
    '    ########     ',
    '     ######      ',
    '     ######      ',
    '      ####       ',
    '      ####       ',
    '       ##        ',
    '                 ',
  ];
  
  for (let r = 0; r < heartPattern.length; r++) {
    for (let c = 0; c < heartPattern[r].length; c++) {
      const row = r + offsetRow;
      const col = c + offsetCol;
      if (row < GRID_SIZE && col < GRID_SIZE) {
        grid[`${row}-${col}`] = heartPattern[r][c] === '#';
      }
    }
  }
  
  return grid;
};

const generateLabyrinthMaze = (): TileGrid => {
  const grid: TileGrid = {};
  
  // Initialize all white
  for (let row = 0; row < GRID_SIZE; row++) {
    for (let col = 0; col < GRID_SIZE; col++) {
      grid[`${row}-${col}`] = false;
    }
  }
  
  // Create a classic labyrinth maze pattern
  // Outer border
  for (let i = 0; i < GRID_SIZE; i++) {
    grid[`0-${i}`] = true;
    grid[`${GRID_SIZE - 1}-${i}`] = true;
    grid[`${i}-0`] = true;
    grid[`${i}-${GRID_SIZE - 1}`] = true;
  }
  
  // Create maze-like internal structure
  for (let row = 2; row < GRID_SIZE - 2; row += 4) {
    for (let col = 1; col < GRID_SIZE - 1; col++) {
      grid[`${row}-${col}`] = true;
      // Add gaps for passages
      if (col % 7 === 3) {
        grid[`${row}-${col}`] = false;
      }
    }
  }
  
  for (let col = 2; col < GRID_SIZE - 2; col += 4) {
    for (let row = 1; row < GRID_SIZE - 1; row++) {
      if (!grid[`${row}-${col}`]) {
        grid[`${row}-${col}`] = true;
      }
      // Add gaps for passages
      if (row % 7 === 2) {
        grid[`${row}-${col}`] = false;
      }
    }
  }
  
  // Add some internal walls for complexity
  for (let i = 5; i < GRID_SIZE - 5; i += 3) {
    for (let j = 5; j < GRID_SIZE - 5; j += 3) {
      grid[`${i}-${j}`] = true;
      grid[`${i + 1}-${j}`] = true;
      grid[`${i}-${j + 1}`] = true;
    }
  }
  
  return grid;
};

// Preset patterns will be populated after logo loads
let PRESET_PATTERNS: Pattern[] = [
  {
    name: 'Pixel Pig',
    description: 'Oink oink in 8-bit glory',
    grid: generatePixelPig()
  },
  {
    name: 'Pixel Heart',
    description: 'Love in binary form',
    grid: generatePixelHeart()
  },
  {
    name: 'The Labyrinth',
    description: 'Find your way through the maze',
    grid: generateLabyrinthMaze()
  },
  {
    name: 'The Silicon Mandala',
    description: 'Radial symmetry for inner peace',
    grid: generateMandalaPattern()
  },
  {
    name: 'Binary Snowflake',
    description: 'Six-fold crystalline structure',
    grid: generateSnowflakePattern()
  },
  {
    name: 'Chip Architecture Dreams',
    description: 'Circuit pathways to enlightenment',
    grid: generateMazePattern()
  },
  {
    name: 'Recursive Prophet',
    description: 'Spiraling towards infinity',
    grid: generateSpiralPattern()
  },
  {
    name: 'Jensen\'s Blocks',
    description: 'Geometric perfection in blocks',
    grid: generateCheckerPattern()
  }
];

export default function TileTable() {
  const [urlInput, setUrlInput] = useState('');
  const [grid, setGrid] = useState<TileGrid>({});
  const [isQRMode, setIsQRMode] = useState(false);
  const [showExport, setShowExport] = useState(false);
  const [titleClicks, setTitleClicks] = useState(0);
  const [showPatterns, setShowPatterns] = useState(false);
  const [copied, setCopied] = useState(false);
  const [patterns, setPatterns] = useState<Pattern[]>(PRESET_PATTERNS);
  const [logoLoaded, setLogoLoaded] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [dragMode, setDragMode] = useState<'paint' | 'erase' | null>(null);
  const [showBorder, setShowBorder] = useState(true);
  const [highlightedRow, setHighlightedRow] = useState<number | null>(null);

  // Initialize empty grid
  useEffect(() => {
    const emptyGrid: TileGrid = {};
    for (let row = 0; row < GRID_SIZE; row++) {
      for (let col = 0; col < GRID_SIZE; col++) {
        emptyGrid[`${row}-${col}`] = false;
      }
    }
    setGrid(emptyGrid);
  }, []);

  // Load Silicon Jesus logo and convert to pattern
  useEffect(() => {
    const loadLogoPattern = async () => {
      // Try both logo files
      const logoFiles = ['/siliconjesus_logo.png', '/siliconjesus_logo2.png'];
      
      for (const logoFile of logoFiles) {
        try {
          console.log(`Attempting to load: ${logoFile}`);
          const img = document.createElement('img');
          img.crossOrigin = 'anonymous';
          img.src = logoFile;
          
          await new Promise((resolve, reject) => {
            img.onload = resolve;
            img.onerror = reject;
          });

          console.log(`Successfully loaded ${logoFile}, dimensions: ${img.width}x${img.height}`);

          // Create canvas to extract pixel data
          const canvas = document.createElement('canvas');
          canvas.width = img.width;
          canvas.height = img.height;
          const ctx = canvas.getContext('2d');
          
          if (!ctx) {
            console.error('Failed to get canvas context');
            continue;
          }
          
          ctx.drawImage(img, 0, 0);
          const imageData = ctx.getImageData(0, 0, img.width, img.height);
          const logoGrid = imageToGrid(imageData);

          // Count black tiles for debugging
          let blackCount = 0;
          for (let row = 0; row < GRID_SIZE; row++) {
            for (let col = 0; col < GRID_SIZE; col++) {
              if (logoGrid[`${row}-${col}`]) blackCount++;
            }
          }
          console.log(`Generated logo grid with ${blackCount} black tiles`);

          // Add logo pattern to the beginning of the patterns array
          const logoPattern: Pattern = {
            name: 'The Prophet Himself',
            description: 'Silicon Jesus pixel art incarnate',
            grid: logoGrid
          };

          setPatterns([logoPattern, ...PRESET_PATTERNS]);
          setLogoLoaded(true);
          return; // Success, exit the loop
        } catch (error) {
          console.error(`Error loading ${logoFile}:`, error);
          // Continue to next logo file
        }
      }
      
      // If all logos failed to load, just use the preset patterns
      console.warn('Failed to load any logo, using preset patterns only');
      setPatterns(PRESET_PATTERNS);
    };

    loadLogoPattern();
  }, []);

  const generateQRCode = async () => {
    if (!urlInput.trim()) return;

    try {
      // Generate QR code with medium error correction
      const qrMatrix = await QRCode.create(urlInput, {
        errorCorrectionLevel: 'M',
        version: 3 // Forces 29x29 size
      });

      const modules = qrMatrix.modules;
      const newGrid: TileGrid = {};

      for (let row = 0; row < GRID_SIZE; row++) {
        for (let col = 0; col < GRID_SIZE; col++) {
          const isDark = modules.data[row * GRID_SIZE + col] === 1;
          newGrid[`${row}-${col}`] = isDark;
        }
      }

      setGrid(newGrid);
      setIsQRMode(true);
    } catch (error) {
      console.error('QR generation error:', error);
      alert('Error generating QR code. Try a shorter URL.');
    }
  };

  const toggleTile = (row: number, col: number) => {
    setGrid(prev => ({
      ...prev,
      [`${row}-${col}`]: !prev[`${row}-${col}`]
    }));
  };

  const setTile = (row: number, col: number, value: boolean) => {
    setGrid(prev => ({
      ...prev,
      [`${row}-${col}`]: value
    }));
  };

  const handleMouseDown = (row: number, col: number) => {
    setIsDragging(true);
    // Determine mode based on current tile state
    const currentValue = grid[`${row}-${col}`];
    setDragMode(currentValue ? 'erase' : 'paint');
    toggleTile(row, col);
  };

  const handleMouseEnter = (row: number, col: number) => {
    if (isDragging && dragMode) {
      const newValue = dragMode === 'paint';
      setTile(row, col, newValue);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setDragMode(null);
  };

  // Add global mouse up listener
  useEffect(() => {
    const handleGlobalMouseUp = () => {
      setIsDragging(false);
      setDragMode(null);
    };
    
    window.addEventListener('mouseup', handleGlobalMouseUp);
    return () => window.removeEventListener('mouseup', handleGlobalMouseUp);
  }, []);

  const resetGrid = () => {
    const emptyGrid: TileGrid = {};
    for (let row = 0; row < GRID_SIZE; row++) {
      for (let col = 0; col < GRID_SIZE; col++) {
        emptyGrid[`${row}-${col}`] = false;
      }
    }
    setGrid(emptyGrid);
    setIsQRMode(false);
  };

  const invertGrid = () => {
    setGrid(prev => {
      const newGrid: TileGrid = {};
      for (let row = 0; row < GRID_SIZE; row++) {
        for (let col = 0; col < GRID_SIZE; col++) {
          newGrid[`${row}-${col}`] = !prev[`${row}-${col}`];
        }
      }
      return newGrid;
    });
  };

  const exportCoordinates = () => {
    const coordinates = [];
    for (let row = 0; row < GRID_SIZE; row++) {
      for (let col = 0; col < GRID_SIZE; col++) {
        if (grid[`${row}-${col}`]) {
          coordinates.push({ row: row + 1, col: col + 1, color: 'black' });
        }
      }
    }

    return {
      gridSize: GRID_SIZE,
      totalTiles: GRID_SIZE * GRID_SIZE,
      blackTiles: coordinates.length,
      whiteTiles: GRID_SIZE * GRID_SIZE - coordinates.length,
      coordinates
    };
  };

  const copyToClipboard = () => {
    const data = JSON.stringify(exportCoordinates(), null, 2);
    navigator.clipboard.writeText(data);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadJSON = () => {
    const data = JSON.stringify(exportCoordinates(), null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `tile-pattern-${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleTitleClick = () => {
    setTitleClicks(prev => prev + 1);
    if (titleClicks + 1 >= 3) {
      setShowPatterns(true);
    }
  };

  const loadPattern = (pattern: Pattern) => {
    setGrid(pattern.grid);
    setIsQRMode(false);
    setShowPatterns(false);
  };

  const generateRandomPattern = () => {
    const patternGenerators = [
      generateMandalaPattern,
      generateSpiralPattern,
      generateCheckerPattern,
      generateMazePattern,
      generateSnowflakePattern,
      generateSymmetricalPattern,
      generatePixelPig,
      generatePixelHeart,
      generateLabyrinthMaze
    ];
    const randomPattern = patternGenerators[Math.floor(Math.random() * patternGenerators.length)]();
    setGrid(randomPattern);
    setIsQRMode(false);
  };

  return (
    <div className="min-h-screen bg-black text-white p-4 md:p-8">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-8">
        <Link href="/" className="inline-flex items-center text-sm opacity-70 hover:opacity-100 transition-opacity mb-6">
          ← Back to the void
        </Link>
        
        <h1 
          className="text-4xl md:text-6xl boxy-title mb-4 cursor-default select-none"
          onClick={handleTitleClick}
        >
          TILE TABLE
        </h1>
        <p className="text-lg opacity-70 mb-6">
          Modular QR code generator. Paste a link, arrange physical tiles.
        </p>

        {/* URL Input */}
        <div className="mb-6">
          <div className="flex gap-2 flex-col sm:flex-row">
            <input
              type="url"
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              placeholder="https://example.com"
              className="flex-1 px-4 py-3 bg-black border border-white text-white font-mono focus:outline-none focus:bg-white focus:text-black transition-all"
              onKeyDown={(e) => e.key === 'Enter' && generateQRCode()}
            />
            <button
              onClick={generateQRCode}
              className="px-6 py-3 border border-white bg-black text-white hover:bg-white hover:text-black transition-all uppercase font-bold"
            >
              Generate QR
            </button>
          </div>
        </div>

        {/* Controls */}
        <div className="flex gap-2 flex-wrap mb-6">
          <button
            onClick={resetGrid}
            className="px-4 py-2 border border-white bg-black text-white hover:bg-white hover:text-black transition-all text-sm"
          >
            Reset
          </button>
          <button
            onClick={invertGrid}
            className="px-4 py-2 border border-white bg-black text-white hover:bg-white hover:text-black transition-all text-sm"
          >
            Invert
          </button>
          <button
            onClick={() => setShowExport(!showExport)}
            className="px-4 py-2 border border-white bg-black text-white hover:bg-white hover:text-black transition-all text-sm"
          >
            {showExport ? 'Hide Export' : 'Export Coordinates'}
          </button>
          {isQRMode && (
            <button
              onClick={() => setShowBorder(!showBorder)}
              className="px-4 py-2 border border-white bg-black text-white hover:bg-white hover:text-black transition-all text-sm"
            >
              Border: {showBorder ? 'ON' : 'OFF'}
            </button>
          )}
        </div>

        {/* Export Panel */}
        {showExport && (
          <div className="border border-white p-6 mb-6 bg-black">
            <h2 className="text-xl boxy-title mb-4">EXPORT DATA</h2>
            <div className="space-y-4">
              <div className="font-mono text-sm opacity-70">
                <p>Grid Size: {GRID_SIZE}x{GRID_SIZE}</p>
                <p>Black Tiles: {exportCoordinates().blackTiles}</p>
                <p>White Tiles: {exportCoordinates().whiteTiles}</p>
              </div>
              <div className="flex gap-2 flex-wrap">
                <button
                  onClick={copyToClipboard}
                  className="px-4 py-2 border border-white bg-black text-white hover:bg-white hover:text-black transition-all text-sm"
                >
                  {copied ? '✓ Copied!' : 'Copy JSON'}
                </button>
                <button
                  onClick={downloadJSON}
                  className="px-4 py-2 border border-white bg-black text-white hover:bg-white hover:text-black transition-all text-sm"
                >
                  Download JSON
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Pattern Library (Easter Egg) */}
        {showPatterns && (
          <div className="border border-white p-6 mb-6 bg-black">
            <h2 className="text-xl boxy-title mb-4">PATTERN LIBRARY</h2>
            <p className="text-sm opacity-70 mb-4">
              Aesthetic tile patterns for your table
            </p>
            
            <button
              onClick={generateRandomPattern}
              className="px-4 py-2 border border-white bg-white text-black hover:bg-black hover:text-white transition-all text-sm mb-4 uppercase font-bold"
            >
              Generate Random Pattern
            </button>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {patterns.map((pattern, idx) => (
                <div
                  key={idx}
                  className="border border-white p-4 hover:bg-white hover:text-black transition-all cursor-pointer group"
                  onClick={() => loadPattern(pattern)}
                >
                  <h3 className="font-bold mb-1 uppercase tracking-wide text-sm">
                    {pattern.name}
                  </h3>
                  <p className="text-xs opacity-70 group-hover:opacity-90">
                    {pattern.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Tile Grid */}
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-center mb-6">
          <div 
            className={`inline-grid gap-[2px] ${showBorder ? 'bg-white p-2 border-2 border-white' : 'bg-black'}`}
            style={{
              gridTemplateColumns: `repeat(${GRID_SIZE}, minmax(0, 1fr))`,
              aspectRatio: '1/1',
              maxWidth: 'min(90vw, 800px)',
              width: '100%'
            }}
            onMouseLeave={() => setHighlightedRow(null)}
          >
            {Array.from({ length: GRID_SIZE * GRID_SIZE }).map((_, index) => {
              const row = Math.floor(index / GRID_SIZE);
              const col = index % GRID_SIZE;
              const isBlack = grid[`${row}-${col}`];
              const isHighlighted = highlightedRow === row;

              return (
                <div
                  key={`${row}-${col}`}
                  onMouseDown={() => handleMouseDown(row, col)}
                  onMouseEnter={() => {
                    handleMouseEnter(row, col);
                    setHighlightedRow(row);
                  }}
                  onMouseUp={handleMouseUp}
                  className="tile cursor-pointer transition-all select-none"
                  style={{
                    backgroundColor: isBlack ? '#000' : '#fff',
                    boxShadow: isBlack 
                      ? 'inset 0 0 0 1px rgba(255,255,255,0.2), 2px 2px 4px rgba(0,0,0,0.3)'
                      : 'inset 0 0 0 1px rgba(0,0,0,0.1), inset 2px 2px 3px rgba(0,0,0,0.1)',
                    transform: isBlack ? 'translateY(-1px)' : 'translateY(0)',
                    aspectRatio: '1/1',
                    userSelect: 'none',
                    WebkitUserSelect: 'none',
                    outline: isHighlighted ? '3px solid #00ff00' : 'none',
                    outlineOffset: '-3px',
                    zIndex: isHighlighted ? 10 : 'auto'
                  }}
                  title={`Row ${row + 1}, Col ${col + 1}`}
                />
              );
            })}
          </div>
        </div>

        {/* Instructions */}
        <div className="text-center space-y-2 opacity-70 text-sm">
          <p>Click or drag to paint tiles</p>
          <p className="text-xs">
            {isQRMode ? 'QR Code loaded - test with your camera' : 'Generate a QR code or explore patterns'}
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-white border-opacity-20">
        <div className="text-center space-y-2">
          <p className="text-sm opacity-70">
            29x29 tile grid - Version 3 QR Code
          </p>
          <p className="text-xs opacity-50">
            © 2025 Silicon Jesus
          </p>
        </div>
      </div>
    </div>
  );
}

