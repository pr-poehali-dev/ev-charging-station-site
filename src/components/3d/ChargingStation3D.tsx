import React, { useState, useRef } from 'react';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

interface ChargingStation3DProps {
  name: string;
  power: string;
  type: string;
  price: string;
  image: string;
  delay?: number;
}

const ChargingStation3D: React.FC<ChargingStation3DProps> = ({ 
  name, 
  power, 
  type, 
  price, 
  image, 
  delay = 0 
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 10;
    const rotateY = -(x - centerX) / 10;
    
    cardRef.current.style.transform = `
      perspective(1000px) 
      rotateX(${rotateX}deg) 
      rotateY(${rotateY}deg) 
      translateZ(${isHovered ? 50 : 20}px)
    `;
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (cardRef.current) {
      cardRef.current.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
    }
  };

  return (
    <div className="perspective-1000">
      <Card
        ref={cardRef}
        className={`
          relative overflow-hidden cursor-pointer transition-all duration-500 ease-out
          bg-gradient-to-br from-slate-900/90 to-blue-900/80 backdrop-blur-xl
          border border-cyan-500/30 hover:border-cyan-400/60
          shadow-2xl hover:shadow-cyan-500/25
          transform-gpu will-change-transform
          animate-float
        `}
        style={{ 
          animationDelay: `${delay}ms`,
          transformStyle: 'preserve-3d'
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {/* 3D Glow Effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* Floating Elements */}
        <div className="absolute top-4 right-4 z-10">
          <div className="w-3 h-3 bg-cyan-400 rounded-full animate-ping" />
          <div className="w-3 h-3 bg-cyan-400 rounded-full absolute top-0" />
        </div>

        {/* Main Content */}
        <div className="relative z-10 p-6">
          {/* Station Image with 3D effect */}
          <div className="relative mb-6 group">
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg opacity-25 group-hover:opacity-50 transition-opacity duration-300" />
            <img 
              src={image}
              alt={name}
              className="relative w-full h-48 object-cover rounded-lg transform transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-lg" />
          </div>

          {/* Station Info */}
          <div className="space-y-4">
            <div>
              <h3 className="text-xl font-bold text-white mb-2 transform transition-transform duration-300 hover:translate-x-2">
                {name}
              </h3>
              <div className="flex items-center space-x-2">
                <Badge className="bg-gradient-to-r from-cyan-500 to-blue-500 text-black font-semibold">
                  {power}
                </Badge>
                <Badge variant="outline" className="border-cyan-400 text-cyan-400">
                  {type}
                </Badge>
              </div>
            </div>

            {/* Tech Specs */}
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="flex items-center space-x-2">
                <Icon name="Zap" size={16} className="text-yellow-400" />
                <span className="text-gray-300">Fast Charge</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Shield" size={16} className="text-green-400" />
                <span className="text-gray-300">CE Certified</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Wifi" size={16} className="text-blue-400" />
                <span className="text-gray-300">IoT Ready</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Clock" size={16} className="text-purple-400" />
                <span className="text-gray-300">24/7 Support</span>
              </div>
            </div>

            {/* Price and Action */}
            <div className="flex justify-between items-center pt-4 border-t border-cyan-500/30">
              <div>
                <span className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                  {price}
                </span>
              </div>
              <div className="flex space-x-2">
                <button className="p-2 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-400 transition-colors">
                  <Icon name="Eye" size={16} />
                </button>
                <button className="p-2 rounded-lg bg-green-500/20 hover:bg-green-500/30 text-green-400 transition-colors">
                  <Icon name="ShoppingCart" size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 3D Depth Layers */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent" />
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-400/50 to-transparent" />
          <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-transparent via-cyan-400/30 to-transparent" />
          <div className="absolute top-0 right-0 w-1 h-full bg-gradient-to-b from-transparent via-blue-400/30 to-transparent" />
        </div>

        {/* Hover Overlay */}
        <div className={`
          absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-blue-500/5 to-purple-500/5
          transition-opacity duration-500 ${isHovered ? 'opacity-100' : 'opacity-0'}
        `} />
      </Card>
    </div>
  );
};

export default ChargingStation3D;