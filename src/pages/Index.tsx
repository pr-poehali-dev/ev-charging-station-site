import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import Icon from '@/components/ui/icon';

// АНИМИРОВАННЫЙ СЧЕТЧИК - ЕБАШИТ ЦИФРЫ ВВЕРХ!
const AnimatedCounter = ({ end, duration = 2000, suffix = '' }) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );
    
    const element = document.getElementById(`counter-${end}`);
    if (element) observer.observe(element);
    
    return () => observer.disconnect();
  }, [end]);

  useEffect(() => {
    if (!isVisible) return;
    
    let startTime = null;
    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      setCount(Math.floor(progress * end));
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    
    requestAnimationFrame(animate);
  }, [isVisible, end, duration]);

  return (
    <span id={`counter-${end}`} className="inline-block">
      {count}{suffix}
    </span>
  );
};

// ЧАСТИЦЫ В HERO - КОСМИЧЕСКАЯ ХУЙНЯ!
const ParticleField = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(30)].map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 bg-gradient-to-r from-blue-400 to-cyan-300 rounded-full animate-pulse"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 3}s`,
            animationDuration: `${2 + Math.random() * 4}s`,
            boxShadow: `0 0 10px rgba(59, 130, 246, 0.8)`
          }}
        />
      ))}
      {/* НЕОНОВЫЕ ЛИНИИ */}
      {[...Array(5)].map((_, i) => (
        <div
          key={`line-${i}`}
          className="absolute h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent opacity-30 animate-pulse"
          style={{
            width: `${100 + Math.random() * 200}px`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 2}s`,
            animationDuration: `${3 + Math.random() * 2}s`
          }}
        />
      ))}
    </div>
  );
};

export default function Index() {
  const [activeTab, setActiveTab] = useState('catalog');
  const [scrollY, setScrollY] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // ПАРАЛЛАКС И МЫШЬ ОТСЛЕЖИВАНИЕ
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100
      });
    };
    
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const products = [
    {
      id: 1,
      name: 'EcoCharge Pro 150',
      power: '150 kW',
      type: 'DC Fast Charger',
      connectors: 'CCS2, CHAdeMO',
      price: 'от 2 500 000 ₽',
      warranty: '5 лет',
      certification: 'CE, RoHS, ISO 9001',
      image: '/img/aafed544-0a3d-411b-a8e3-e6fee7642142.jpg',
      powerProgress: 85,
      speedProgress: 92,
      reliabilityProgress: 95
    },
    {
      id: 2,
      name: 'EcoCharge Urban 22',
      power: '22 kW',
      type: 'AC Charger',
      connectors: 'Type 2',
      price: 'от 450 000 ₽',
      warranty: '3 года',
      certification: 'CE, RoHS',
      image: '/img/aafed544-0a3d-411b-a8e3-e6fee7642142.jpg',
      powerProgress: 65,
      speedProgress: 70,
      reliabilityProgress: 88
    },
    {
      id: 3,
      name: 'EcoCharge Station 350',
      power: '350 kW',
      type: 'Ultra Fast Charger',
      connectors: 'CCS2, CHAdeMO',
      price: 'от 4 200 000 ₽',
      warranty: '7 лет',
      certification: 'CE, RoHS, ISO 9001, IEC 61851',
      image: '/img/aafed544-0a3d-411b-a8e3-e6fee7642142.jpg',
      powerProgress: 100,
      speedProgress: 100,
      reliabilityProgress: 98
    }
  ];

  const projects = [
    {
      name: 'ТЦ Мега Химки',
      location: 'Москва',
      stations: 12,
      power: '150 kW',
      completed: '2024'
    },
    {
      name: 'Аэропорт Шереметьево',
      location: 'Москва',
      stations: 24,
      power: '350 kW',
      completed: '2024'
    },
    {
      name: 'Автодром Сочи',
      location: 'Сочи',
      stations: 8,
      power: '22-150 kW',
      completed: '2023'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-x-hidden">
      {/* Navigation - СТЕКЛЯННЫЙ ЭФФЕКТ */}
      <nav className="fixed top-0 w-full z-50 backdrop-blur-md bg-gradient-to-r from-black/40 via-slate-900/40 to-black/40 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/30 animate-pulse">
              <Icon name="Zap" size={24} className="text-white" />
            </div>
            <span className="text-3xl font-bold bg-gradient-to-r from-white via-blue-200 to-cyan-300 bg-clip-text text-transparent">
              EcoCharge
            </span>
          </div>
          <div className="hidden md:flex space-x-8">
            {['catalog', 'projects', 'info', 'contacts'].map((tab, index) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className="relative px-4 py-2 text-white hover:text-blue-400 transition-all duration-300 group"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <span className="relative z-10">
                  {tab === 'catalog' ? 'Каталог' : 
                   tab === 'projects' ? 'Проекты' : 
                   tab === 'info' ? 'О заводе' : 'Контакты'}
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-cyan-400/20 rounded-lg scale-0 group-hover:scale-100 transition-transform duration-300" />
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Hero Section - КОСМИЧЕСКАЯ СЕКЦИЯ С ПАРАЛЛАКСОМ */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
        {/* ПАРАЛЛАКС ЗАДНИЙ ФОН */}
        <div 
          className="absolute inset-0 bg-gradient-to-br from-slate-900/90 via-blue-900/50 to-slate-900/90"
          style={{
            transform: `translateY(${scrollY * 0.3}px)`
          }}
        />
        
        {/* ЧАСТИЦЫ И НЕОНОВЫЕ ЭФФЕКТЫ */}
        <ParticleField />
        
        {/* INTERACTIVE MOUSE GRADIENT */}
        <div
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{
            background: `radial-gradient(600px circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(59, 130, 246, 0.3), transparent 40%)`
          }}
        />
        
        <div className="relative z-10 text-center max-w-6xl mx-auto px-6">
          <div className="mb-8 animate-fade-in">
            <Badge className="mb-6 bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-600 text-white font-bold px-6 py-3 text-lg shadow-lg shadow-blue-500/40 animate-pulse border-0">
              ⚡ Завод будущего ⚡
            </Badge>
          </div>
          
          <h1 className="text-6xl md:text-8xl font-black mb-8 leading-tight animate-fade-in">
            <span className="bg-gradient-to-r from-white via-blue-200 to-cyan-300 bg-clip-text text-transparent drop-shadow-2xl">
              Зарядные станции
            </span>
            <br />
            <span className="text-5xl md:text-7xl bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-500 bg-clip-text text-transparent">
              нового поколения
            </span>
          </h1>
          
          <p className="text-xl md:text-3xl text-gray-200 mb-12 max-w-5xl mx-auto leading-relaxed animate-fade-in font-medium">
            Производим высокотехнологичные зарядные станции для электромобилей 
            с полной сертификацией и расширенной гарантией до 7 лет
          </p>
          
          <div className="flex flex-col sm:flex-row gap-8 justify-center items-center animate-fade-in">
            <Button 
              size="lg" 
              className="group bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-700 hover:from-blue-700 hover:via-cyan-400 hover:to-blue-800 text-white font-bold px-10 py-8 text-xl shadow-2xl shadow-blue-500/40 hover:shadow-blue-400/60 transition-all duration-300 hover:scale-110 border-0"
              onClick={() => setActiveTab('catalog')}
            >
              🚀 Смотреть каталог
              <Icon name="ArrowRight" size={24} className="ml-3 group-hover:translate-x-2 transition-transform" />
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="group border-2 border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black px-10 py-8 text-xl transition-all duration-300 hover:scale-110 backdrop-blur-sm bg-white/5 hover:shadow-2xl hover:shadow-cyan-400/40"
              onClick={() => setActiveTab('contacts')}
            >
              <Icon name="Phone" size={24} className="mr-3 group-hover:rotate-12 transition-transform" />
              📞 Связаться с нами
            </Button>
          </div>
        </div>
        
        {/* SCROLLING INDICATOR */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <Icon name="ChevronDown" size={32} className="text-blue-400" />
        </div>
      </section>

      {/* Main Content - С ПАРАЛЛАКСОМ */}
      <div 
        className="max-w-7xl mx-auto px-6 py-20"
        style={{
          transform: `translateY(${scrollY * 0.1}px)`
        }}
      >
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-12 bg-gradient-to-r from-slate-800/50 to-slate-700/50 backdrop-blur-md border border-slate-600 p-2 rounded-2xl">
            {[
              { value: 'catalog', label: '📦 Каталог' },
              { value: 'projects', label: '🏗️ Проекты' },
              { value: 'info', label: '🏭 О заводе' },
              { value: 'contacts', label: '📞 Контакты' }
            ].map((tab) => (
              <TabsTrigger 
                key={tab.value}
                value={tab.value} 
                className="text-lg text-white data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-cyan-500 data-[state=active]:text-white transition-all duration-300 hover:scale-105 rounded-xl font-semibold"
              >
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>

          {/* Catalog Tab - ОХУЕННЫЕ КАРТОЧКИ С 3D ЭФФЕКТАМИ */}
          <TabsContent value="catalog" className="space-y-8 animate-fade-in">
            <div className="text-center mb-16">
              <h2 className="text-5xl font-black mb-6 bg-gradient-to-r from-white to-blue-300 bg-clip-text text-transparent">
                🔥 Продукция
              </h2>
              <p className="text-2xl text-gray-300 font-medium">Полный спектр зарядного оборудования для электротранспорта</p>
            </div>
            
            <div className="space-y-16">
              {products.map((product, index) => (
                <Card 
                  key={product.id} 
                  className="group bg-gradient-to-br from-slate-800/40 via-slate-700/40 to-slate-800/40 backdrop-blur-xl border border-slate-600/50 hover:border-blue-500/80 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-blue-500/20 rounded-3xl overflow-hidden"
                >
                  <div className={`grid md:grid-cols-2 gap-12 p-10 ${index % 2 !== 0 ? 'md:grid-cols-2' : ''}`}>
                    {/* Изображение с HOVER 3D ЭФФЕКТОМ */}
                    <div className={`relative ${index % 2 !== 0 ? 'order-2 md:order-1' : 'order-1'}`}>
                      <div className="relative overflow-hidden rounded-2xl group-hover:scale-105 transition-transform duration-500">
                        <img 
                          src={product.image} 
                          alt={product.name}
                          className="w-full h-80 object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-blue-600/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        
                        {/* НЕОНОВАЯ РАМКА */}
                        <div className="absolute inset-0 border-2 border-transparent group-hover:border-blue-400 transition-colors duration-500 rounded-2xl opacity-0 group-hover:opacity-100" 
                             style={{ boxShadow: '0 0 20px rgba(59, 130, 246, 0.5)' }} />
                      </div>
                    </div>
                    
                    {/* Контент с АНИМАЦИЯМИ */}
                    <div className={`flex flex-col justify-center space-y-6 ${index % 2 !== 0 ? 'order-1 md:order-2' : 'order-2'}`}>
                      <CardHeader className="p-0">
                        <CardTitle className="text-4xl font-black text-white mb-3 group-hover:text-blue-300 transition-colors duration-300">
                          {product.name}
                        </CardTitle>
                        <CardDescription className="text-xl text-gray-300 font-semibold">
                          ⚡ {product.type} • {product.power}
                        </CardDescription>
                      </CardHeader>
                      
                      <CardContent className="p-0 space-y-6">
                        {/* ТЕХНИЧЕСКИЕ ХАРАКТЕРИСТИКИ С ПРОГРЕСС-БАРАМИ */}
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-400">Мощность</span>
                              <span className="text-blue-400 font-bold">{product.powerProgress}%</span>
                            </div>
                            <Progress value={product.powerProgress} className="h-3 bg-slate-700" />
                          </div>
                          
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-400">Скорость зарядки</span>
                              <span className="text-cyan-400 font-bold">{product.speedProgress}%</span>
                            </div>
                            <Progress value={product.speedProgress} className="h-3 bg-slate-700" />
                          </div>
                          
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-400">Надежность</span>
                              <span className="text-green-400 font-bold">{product.reliabilityProgress}%</span>
                            </div>
                            <Progress value={product.reliabilityProgress} className="h-3 bg-slate-700" />
                          </div>
                        </div>

                        {/* ОСНОВНЫЕ ХАРАКТЕРИСТИКИ */}
                        <div className="space-y-4">
                          <div className="flex justify-between items-center border-b border-slate-600/50 pb-3">
                            <span className="text-gray-400 text-lg">🔌 Разъемы:</span>
                            <span className="text-white font-bold">{product.connectors}</span>
                          </div>
                          <div className="flex justify-between items-center border-b border-slate-600/50 pb-3">
                            <span className="text-gray-400 text-lg">🛡️ Гарантия:</span>
                            <Badge className="bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold px-3 py-1">
                              {product.warranty}
                            </Badge>
                          </div>
                          <div className="flex justify-between items-start border-b border-slate-600/50 pb-3">
                            <span className="text-gray-400 text-lg">📜 Сертификация:</span>
                            <span className="text-blue-400 text-right max-w-48 font-semibold">{product.certification}</span>
                          </div>
                        </div>

                        <div className="flex justify-between items-center pt-4">
                          <span className="text-4xl font-black bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                            {product.price}
                          </span>
                          <Button 
                            size="lg" 
                            className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white font-bold px-8 py-4 text-lg transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-blue-500/40 border-0"
                          >
                            🛒 Заказать
                          </Button>
                        </div>
                      </CardContent>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Projects Tab - С АНИМИРОВАННЫМИ СЧЕТЧИКАМИ */}
          <TabsContent value="projects" className="space-y-8 animate-fade-in">
            <div className="text-center mb-16">
              <h2 className="text-5xl font-black mb-6 bg-gradient-to-r from-white to-blue-300 bg-clip-text text-transparent">
                🏗️ Реализованные проекты
              </h2>
              <p className="text-2xl text-gray-300 font-medium">
                Более <AnimatedCounter end={200} suffix="+" /> объектов по всей России
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project, index) => (
                <Card 
                  key={index} 
                  className="group bg-gradient-to-br from-slate-800/40 to-slate-700/40 backdrop-blur-xl border border-slate-600/50 hover:border-blue-500/80 transition-all duration-500 hover:scale-105 hover:shadow-xl hover:shadow-blue-500/20 rounded-2xl"
                >
                  <CardHeader>
                    <CardTitle className="text-2xl text-white flex items-center group-hover:text-blue-300 transition-colors">
                      <Icon name="MapPin" size={24} className="mr-3 text-blue-400 group-hover:scale-125 transition-transform" />
                      {project.name}
                    </CardTitle>
                    <CardDescription className="text-gray-300 text-lg font-semibold">📍 {project.location}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400 text-lg">⚡ Станций:</span>
                        <Badge className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold text-lg px-3 py-1">
                          <AnimatedCounter end={project.stations} />
                        </Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400 text-lg">🔋 Мощность:</span>
                        <span className="text-white font-bold text-lg">{project.power}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400 text-lg">✅ Завершен:</span>
                        <span className="text-blue-400 font-bold text-lg">{project.completed}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Info Tab - С АНИМИРОВАННЫМИ СТАТИСТИКАМИ */}
          <TabsContent value="info" className="space-y-8 animate-fade-in">
            <div className="text-center mb-16">
              <h2 className="text-5xl font-black mb-6 bg-gradient-to-r from-white to-blue-300 bg-clip-text text-transparent">
                🏭 О заводе EcoCharge
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-16 items-center mb-16">
              <div className="relative group">
                <div className="relative overflow-hidden rounded-3xl">
                  <img 
                    src="/img/e399ca81-72e7-4bd0-8841-a9000e867945.jpg" 
                    alt="Завод EcoCharge"
                    className="w-full h-80 object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-600/40 to-transparent" />
                </div>
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-blue-400 transition-colors duration-500 rounded-3xl" 
                     style={{ boxShadow: '0 0 30px rgba(59, 130, 246, 0.3)' }} />
              </div>
              
              <div className="space-y-8">
                <h3 className="text-3xl font-black text-white">🚀 Лидер в производстве зарядной инфраструктуры</h3>
                <p className="text-gray-300 text-xl leading-relaxed font-medium">
                  Завод EcoCharge — современное высокотехнологичное предприятие, 
                  специализирующееся на разработке и производстве зарядных станций 
                  для электромобилей. Мы используем передовые технологии и строгие 
                  стандарты качества.
                </p>
                
                {/* АНИМИРОВАННАЯ СТАТИСТИКА */}
                <div className="grid grid-cols-2 gap-8">
                  <div className="text-center p-6 bg-gradient-to-br from-blue-600/20 to-cyan-500/20 rounded-2xl backdrop-blur-sm border border-blue-500/30">
                    <div className="text-5xl font-black bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                      <AnimatedCounter end={200} suffix="+" />
                    </div>
                    <div className="text-gray-300 text-lg font-semibold">Проектов</div>
                  </div>
                  <div className="text-center p-6 bg-gradient-to-br from-cyan-600/20 to-blue-500/20 rounded-2xl backdrop-blur-sm border border-cyan-500/30">
                    <div className="text-5xl font-black bg-gradient-to-r from-cyan-400 to-blue-300 bg-clip-text text-transparent">
                      <AnimatedCounter end={5000} suffix="+" />
                    </div>
                    <div className="text-gray-300 text-lg font-semibold">Станций</div>
                  </div>
                </div>
              </div>
            </div>

            {/* КАРТОЧКА ГАРАНТИИ СО СТЕКЛЯННЫМ ЭФФЕКТОМ */}
            <Card className="bg-gradient-to-br from-slate-800/40 via-slate-700/40 to-slate-800/40 backdrop-blur-xl border border-slate-600/50 rounded-3xl overflow-hidden">
              <CardHeader>
                <CardTitle className="text-3xl font-black text-center bg-gradient-to-r from-white to-blue-300 bg-clip-text text-transparent">
                  🛡️ Гарантия и сертификация
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-12">
                  <div className="space-y-6">
                    <h4 className="text-2xl font-bold text-blue-400 mb-6">✅ Гарантийные обязательства</h4>
                    <div className="space-y-4">
                      {[
                        'Расширенная гарантия до 7 лет',
                        'Техническая поддержка 24/7',
                        'Бесплатное сервисное обслуживание',
                        'Замена оборудования в течение 48 часов'
                      ].map((item, idx) => (
                        <div key={idx} className="flex items-center space-x-3 text-gray-300 text-lg">
                          <div className="w-2 h-2 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full animate-pulse" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="space-y-6">
                    <h4 className="text-2xl font-bold text-cyan-400 mb-6">📜 Сертификация</h4>
                    <div className="space-y-4">
                      {[
                        'CE (Европейское соответствие)',
                        'ISO 9001:2015 (Система качества)',
                        'IEC 61851 (Международный стандарт)',
                        'RoHS (Экологическая безопасность)'
                      ].map((item, idx) => (
                        <div key={idx} className="flex items-center space-x-3 text-gray-300 text-lg">
                          <div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-full animate-pulse" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Contacts Tab - СТЕКЛЯННЫЕ КАРТОЧКИ */}
          <TabsContent value="contacts" className="space-y-8 animate-fade-in">
            <div className="text-center mb-16">
              <h2 className="text-5xl font-black mb-6 bg-gradient-to-r from-white to-blue-300 bg-clip-text text-transparent">
                📞 Контакты
              </h2>
              <p className="text-2xl text-gray-300 font-medium">Свяжитесь с нами для консультации и расчета стоимости</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-12">
              {[
                { icon: "Phone", title: "📞 Телефон", lines: ["+7 (495) 123-45-67", "+7 (800) 555-01-23"] },
                { icon: "Mail", title: "✉️ Email", lines: ["info@ecocharge.ru", "sales@ecocharge.ru"] },
                { icon: "MapPin", title: "📍 Адрес", lines: ["г. Москва, ул. Инновационная, 42", "Технопарк \"Будущее\""] }
              ].map((contact, index) => (
                <Card key={index} className="group bg-gradient-to-br from-slate-800/40 to-slate-700/40 backdrop-blur-xl border border-slate-600/50 hover:border-blue-500/80 transition-all duration-500 hover:scale-105 hover:shadow-xl hover:shadow-blue-500/20 rounded-2xl">
                  <CardContent className="pt-8 text-center">
                    <Icon name={contact.icon} size={56} className="mx-auto mb-6 text-blue-400 group-hover:scale-125 group-hover:text-cyan-300 transition-all duration-300" />
                    <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-blue-300 transition-colors">
                      {contact.title}
                    </h3>
                    <div className="space-y-2">
                      {contact.lines.map((line, idx) => (
                        <p key={idx} className="text-gray-300 text-lg font-medium">{line}</p>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* ФОРМА КОНСУЛЬТАЦИИ */}
            <Card className="bg-gradient-to-br from-slate-800/40 via-slate-700/40 to-slate-800/40 backdrop-blur-xl border border-slate-600/50 rounded-3xl overflow-hidden">
              <CardHeader>
                <CardTitle className="text-3xl font-black text-center bg-gradient-to-r from-white to-blue-300 bg-clip-text text-transparent">
                  🚀 Заявка на консультацию
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center space-y-6">
                  <p className="text-xl text-gray-300 font-medium">
                    Оставьте заявку, и наш менеджер свяжется с вами в течение часа
                  </p>
                  <Button 
                    size="lg" 
                    className="group bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-700 hover:from-blue-700 hover:via-cyan-400 hover:to-blue-800 text-white font-bold px-12 py-6 text-xl shadow-2xl shadow-blue-500/40 hover:shadow-blue-400/60 transition-all duration-300 hover:scale-110 border-0"
                  >
                    <Icon name="Send" size={24} className="mr-3 group-hover:translate-x-1 transition-transform" />
                    📨 Получить консультацию
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Footer - СТЕКЛЯННЫЙ */}
      <footer className="bg-gradient-to-r from-slate-900/50 via-slate-800/50 to-slate-900/50 backdrop-blur-md border-t border-slate-700 py-12">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-gray-400 text-lg">&copy; 2024 EcoCharge. Все права защищены.</p>
          <p className="mt-3 text-gray-500 font-semibold">🏭 Завод производителя зарядных станций для электромобилей ⚡</p>
        </div>
      </footer>
    </div>
  );
}