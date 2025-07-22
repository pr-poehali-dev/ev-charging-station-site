import React, { useEffect, useRef, useState } from 'react';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

const Scene3D: React.FC = () => {
  const sceneRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (sceneRef.current) {
        const rect = sceneRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;
        setMousePosition({ x: x - 0.5, y: y - 0.5 });
      }
    };

    const scene = sceneRef.current;
    if (scene) {
      scene.addEventListener('mousemove', handleMouseMove);
      return () => scene.removeEventListener('mousemove', handleMouseMove);
    }
  }, []);

  return (
    <div 
      ref={sceneRef}
      className="relative w-full h-screen overflow-hidden bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900"
    >
      {/* Background Particles */}
      <div className="absolute inset-0">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      {/* 3D Station Models */}
      <div 
        className="absolute inset-0 flex items-center justify-center"
        style={{
          transform: `rotateX(${mousePosition.y * 20}deg) rotateY(${mousePosition.x * 30}deg)`,
          transformStyle: 'preserve-3d',
          transition: 'transform 0.1s ease-out'
        }}
      >
        {/* Main Central Station */}
        <div 
          className="relative transform-3d animate-3d-rotate"
          style={{ 
            transformOrigin: 'center center',
            animationDuration: '30s'
          }}
        >
          <div className="relative w-80 h-96 mx-auto">
            {/* Station Base */}
            <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-slate-800 to-slate-700 rounded-lg transform perspective-1000 rotateX-90 shadow-2xl" />
            
            {/* Main Station Body */}
            <div className="absolute inset-x-4 top-8 bottom-20 bg-gradient-to-b from-slate-700 via-slate-600 to-slate-700 rounded-xl shadow-2xl transform-3d">
              {/* Screen */}
              <div className="absolute top-8 left-4 right-4 h-24 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-lg shadow-inner flex items-center justify-center">
                <div className="text-black font-bold text-lg">E-PROM</div>
              </div>
              
              {/* LED Indicators */}
              <div className="absolute top-36 left-1/2 transform -translate-x-1/2 flex space-x-2">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
                <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
                <div className="w-3 h-3 bg-cyan-400 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
              </div>
              
              {/* Charging Cables */}
              <div className="absolute bottom-8 left-6 right-6">
                <div className="flex justify-between">
                  <div className="w-8 h-16 bg-gradient-to-b from-yellow-400 to-yellow-600 rounded-full shadow-lg" />
                  <div className="w-8 h-16 bg-gradient-to-b from-green-400 to-green-600 rounded-full shadow-lg" />
                </div>
              </div>
            </div>
            
            {/* Side Panels */}
            <div className="absolute -left-2 top-8 bottom-20 w-8 bg-gradient-to-b from-slate-600 to-slate-700 transform-3d rotateY-90 origin-left shadow-xl" />
            <div className="absolute -right-2 top-8 bottom-20 w-8 bg-gradient-to-b from-slate-600 to-slate-700 transform-3d rotateY-90 origin-right shadow-xl" />
          </div>
          
          {/* Floating Info Badges */}
          <div className="absolute -top-16 left-1/2 transform -translate-x-1/2">
            <Badge className="bg-gradient-to-r from-cyan-500 to-blue-500 text-black font-bold px-4 py-2 text-lg animate-bounce">
              350 kW
            </Badge>
          </div>
          
          <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 flex space-x-4">
            <Badge variant="outline" className="border-green-400 text-green-400 animate-pulse">
              <Icon name="Zap" size={16} className="mr-1" />
              Active
            </Badge>
            <Badge variant="outline" className="border-cyan-400 text-cyan-400 animate-pulse" style={{ animationDelay: '0.5s' }}>
              <Icon name="Wifi" size={16} className="mr-1" />
              Connected
            </Badge>
          </div>
        </div>

        {/* Orbiting Smaller Stations */}
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="absolute w-32 h-40 animate-3d-rotate"
            style={{
              animationDuration: `${15 + i * 5}s`,
              animationDirection: i % 2 === 0 ? 'normal' : 'reverse',
              transform: `translateZ(${200 + i * 100}px) rotateY(${i * 120}deg) translateX(300px)`
            }}
          >
            <div className="w-full h-full bg-gradient-to-b from-slate-600 to-slate-700 rounded-lg shadow-2xl relative">
              <div className="absolute top-2 left-2 right-2 h-8 bg-gradient-to-r from-cyan-400 to-blue-500 rounded opacity-80" />
              <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-4 h-8 bg-yellow-400 rounded-full" />
              
              <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-cyan-500 text-black text-xs">
                  {22 + i * 50} kW
                </Badge>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Floating Text Elements */}
      <div className="absolute top-1/4 left-8 transform-3d">
        <h2 
          className="text-4xl font-bold text-white mb-4 transform"
          style={{
            transform: `translateZ(${50 + mousePosition.x * 20}px)`,
            textShadow: '0 0 20px rgba(6, 182, 212, 0.5)'
          }}
        >
          Зарядные станции будущего
        </h2>
        <p 
          className="text-xl text-cyan-400 transform"
          style={{
            transform: `translateZ(${30 + mousePosition.y * 15}px)`
          }}
        >
          Инновационные технологии E-PROM
        </p>
      </div>

      {/* Interactive Elements */}
      <div className="absolute bottom-8 right-8 space-y-4">
        <div className="flex items-center space-x-2 text-white bg-black/40 backdrop-blur-sm rounded-lg p-3">
          <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
          <span>Станций активно: 1,247</span>
        </div>
        <div className="flex items-center space-x-2 text-white bg-black/40 backdrop-blur-sm rounded-lg p-3">
          <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse" />
          <span>Средняя мощность: 185 kW</span>
        </div>
        <div className="flex items-center space-x-2 text-white bg-black/40 backdrop-blur-sm rounded-lg p-3">
          <div className="w-3 h-3 bg-cyan-400 rounded-full animate-pulse" />
          <span>Время зарядки: 25 мин</span>
        </div>
      </div>

      {/* Corner Effects */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-radial from-cyan-500/20 to-transparent animate-pulse" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-radial from-blue-500/20 to-transparent animate-pulse" style={{ animationDelay: '1s' }} />
    </div>
  );
};

export default Scene3D;