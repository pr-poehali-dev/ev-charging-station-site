import React from 'react';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

interface FloatingElementProps {
  position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  delay?: number;
}

const FloatingElement: React.FC<FloatingElementProps> = ({ position, delay = 0 }) => {
  const getPositionClasses = () => {
    switch (position) {
      case 'top-left':
        return 'top-8 left-8';
      case 'top-right':
        return 'top-8 right-8';
      case 'bottom-left':
        return 'bottom-8 left-8';
      case 'bottom-right':
        return 'bottom-8 right-8';
    }
  };

  return (
    <div 
      className={`absolute ${getPositionClasses()} z-20 animate-float`}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="bg-black/60 backdrop-blur-xl border border-cyan-500/30 rounded-xl p-4 hover:border-cyan-400/60 transition-all duration-300 group cursor-pointer">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
            <Icon name="Zap" size={16} className="text-black" />
          </div>
          <div>
            <div className="text-sm font-semibold text-white">Live Status</div>
            <div className="text-xs text-cyan-400">1,247 активных станций</div>
          </div>
        </div>
      </div>
    </div>
  );
};

interface StatsBadgeProps {
  icon: string;
  label: string;
  value: string;
  delay?: number;
}

const StatsBadge: React.FC<StatsBadgeProps> = ({ icon, label, value, delay = 0 }) => {
  return (
    <div 
      className="bg-black/40 backdrop-blur-sm border border-cyan-500/20 rounded-lg p-3 hover:border-cyan-400/50 transition-all duration-300 hover:scale-105 cursor-pointer animate-float"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex items-center space-x-2">
        <div className="w-3 h-3 bg-cyan-400 rounded-full animate-pulse" />
        <div className="text-sm">
          <div className="text-cyan-400 font-medium">{value}</div>
          <div className="text-gray-300 text-xs">{label}</div>
        </div>
      </div>
    </div>
  );
};

interface InteractiveOverlayProps {
  children: React.ReactNode;
}

const InteractiveOverlay: React.FC<InteractiveOverlayProps> = ({ children }) => {
  return (
    <div className="absolute inset-0 pointer-events-none">
      <div className="absolute top-4 right-4 pointer-events-auto">
        <div className="space-y-3">
          <StatsBadge 
            icon="Zap" 
            label="Активных станций" 
            value="1,247" 
            delay={0} 
          />
          <StatsBadge 
            icon="Activity" 
            label="Средняя мощность" 
            value="185 kW" 
            delay={200} 
          />
          <StatsBadge 
            icon="Clock" 
            label="Среднее время зарядки" 
            value="25 мин" 
            delay={400} 
          />
        </div>
      </div>
      
      <div className="absolute bottom-4 left-4 pointer-events-auto">
        <Badge className="bg-gradient-to-r from-green-500 to-blue-500 text-black font-semibold px-4 py-2 animate-bounce">
          <Icon name="Wifi" size={16} className="mr-2" />
          Система мониторинга активна
        </Badge>
      </div>

      {children}
    </div>
  );
};

export { FloatingElement, StatsBadge, InteractiveOverlay };