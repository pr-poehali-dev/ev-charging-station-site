import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import Icon from '@/components/ui/icon';

// АНИМИРОВАННЫЙ СЧЕТЧИК
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

export default function Index() {
  const [activeTab, setActiveTab] = useState('catalog');

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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 backdrop-blur-sm bg-black/40 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-400 rounded-xl flex items-center justify-center shadow-lg">
              <Icon name="Zap" size={24} className="text-white" />
            </div>
            <span className="text-3xl font-bold text-white">
              EcoCharge
            </span>
          </div>
          <div className="hidden md:flex space-x-8">
            {['catalog', 'projects', 'info', 'contacts'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className="px-4 py-2 text-white hover:text-emerald-400 transition-colors font-medium"
              >
                {tab === 'catalog' ? 'Каталог' : 
                 tab === 'projects' ? 'Проекты' : 
                 tab === 'info' ? 'О заводе' : 'Контакты'}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-20">
        <div className="relative z-10 text-center max-w-6xl mx-auto px-6">
          <div className="mb-8">
            <Badge className="mb-6 bg-emerald-600 text-white font-bold px-6 py-3 text-lg">
              Завод будущего
            </Badge>
          </div>
          
          <h1 className="text-6xl md:text-8xl font-black mb-8 leading-tight">
            <span className="text-white">
              Зарядные станции
            </span>
            <br />
            <span className="text-5xl md:text-7xl text-emerald-400">
              нового поколения
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-5xl mx-auto leading-relaxed">
            Производим высокотехнологичные зарядные станции для электромобилей 
            с полной сертификацией и расширенной гарантией до 7 лет
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Button 
              size="lg" 
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-10 py-6 text-xl"
              onClick={() => setActiveTab('catalog')}
            >
              Смотреть каталог
              <Icon name="ArrowRight" size={24} className="ml-3" />
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="border-2 border-emerald-400 text-emerald-400 hover:bg-emerald-400 hover:text-white px-10 py-6 text-xl"
              onClick={() => setActiveTab('contacts')}
            >
              <Icon name="Phone" size={20} className="mr-3" />
              Связаться с нами
            </Button>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          {/* ИСПРАВЛЕННЫЕ ТАБЫ КАК НА СКРИНЕ */}
          <TabsList className="grid w-full grid-cols-4 mb-12 bg-gray-500/20 rounded-full p-1 h-14">
            <TabsTrigger 
              value="catalog" 
              className="rounded-full text-white data-[state=active]:bg-blue-500 data-[state=active]:text-white font-medium text-lg h-12"
            >
              📦 Каталог
            </TabsTrigger>
            <TabsTrigger 
              value="projects" 
              className="rounded-full text-white data-[state=active]:bg-orange-500 data-[state=active]:text-white font-medium text-lg h-12"
            >
              🏗️ Проекты
            </TabsTrigger>
            <TabsTrigger 
              value="info" 
              className="rounded-full text-white data-[state=active]:bg-red-500 data-[state=active]:text-white font-medium text-lg h-12"
            >
              🏭 О заводе
            </TabsTrigger>
            <TabsTrigger 
              value="contacts" 
              className="rounded-full text-white data-[state=active]:bg-gray-600 data-[state=active]:text-white font-medium text-lg h-12"
            >
              📞 Контакты
            </TabsTrigger>
          </TabsList>

          {/* КАТАЛОГ - КАК НА СКРИНЕ */}
          <TabsContent value="catalog" className="space-y-8">
            <div className="text-center mb-12">
              <h2 className="text-5xl font-bold mb-6 text-white flex items-center justify-center">
                <Icon name="Package" size={48} className="mr-4 text-blue-500" />
                Продукция
              </h2>
              <p className="text-xl text-gray-300">Полный спектр зарядного оборудования для электротранспорта</p>
            </div>
            
            <div className="space-y-8">
              {products.map((product, index) => (
                <Card 
                  key={product.id} 
                  className="bg-gray-400/20 backdrop-blur-sm border-gray-500/30 rounded-3xl overflow-hidden"
                >
                  <div className="grid md:grid-cols-2 gap-0">
                    {/* ИЗОБРАЖЕНИЕ */}
                    <div className="p-8">
                      <div className="relative rounded-2xl overflow-hidden h-80">
                        <img 
                          src={product.image} 
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                    
                    {/* КОНТЕНТ - ЧИТАЕМЫЙ */}
                    <div className="p-8 flex flex-col justify-center">
                      <div className="mb-6">
                        <h3 className="text-3xl font-bold text-white mb-2">{product.name}</h3>
                        <p className="text-lg text-gray-300 flex items-center">
                          <Icon name="Zap" size={20} className="mr-2 text-yellow-500" />
                          {product.type} • {product.power}
                        </p>
                      </div>

                      {/* ПРОГРЕСС-БАРЫ КАК НА СКРИНЕ */}
                      <div className="space-y-4 mb-6">
                        <div>
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-gray-400">Мощность</span>
                            <span className="text-blue-400 font-bold">{product.powerProgress}%</span>
                          </div>
                          <div className="w-full bg-gray-600 rounded-full h-3">
                            <div 
                              className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full transition-all duration-1000"
                              style={{ width: `${product.powerProgress}%` }}
                            />
                          </div>
                        </div>
                        
                        <div>
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-gray-400">Скорость зарядки</span>
                            <span className="text-cyan-400 font-bold">{product.speedProgress}%</span>
                          </div>
                          <div className="w-full bg-gray-600 rounded-full h-3">
                            <div 
                              className="bg-gradient-to-r from-cyan-500 to-cyan-600 h-3 rounded-full transition-all duration-1000"
                              style={{ width: `${product.speedProgress}%` }}
                            />
                          </div>
                        </div>
                        
                        <div>
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-gray-400">Надежность</span>
                            <span className="text-emerald-400 font-bold">{product.reliabilityProgress}%</span>
                          </div>
                          <div className="w-full bg-gray-600 rounded-full h-3">
                            <div 
                              className="bg-gradient-to-r from-emerald-500 to-emerald-600 h-3 rounded-full transition-all duration-1000"
                              style={{ width: `${product.reliabilityProgress}%` }}
                            />
                          </div>
                        </div>
                      </div>

                      {/* ХАРАКТЕРИСТИКИ */}
                      <div className="space-y-3 mb-6">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-400 flex items-center">
                            <Icon name="Plug" size={16} className="mr-2" />
                            Разъемы:
                          </span>
                          <span className="text-white font-medium">{product.connectors}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-400 flex items-center">
                            <Icon name="Shield" size={16} className="mr-2" />
                            Гарантия:
                          </span>
                          <Badge className="bg-emerald-600 text-white">{product.warranty}</Badge>
                        </div>
                        <div className="flex justify-between items-start">
                          <span className="text-gray-400 flex items-center">
                            <Icon name="Award" size={16} className="mr-2" />
                            Сертификация:
                          </span>
                          <span className="text-blue-400 text-right text-sm">{product.certification}</span>
                        </div>
                      </div>

                      {/* ЦЕНА И КНОПКА КАК НА СКРИНЕ */}
                      <div className="flex justify-between items-center">
                        <span className="text-3xl font-bold text-cyan-400">
                          {product.price}
                        </span>
                        <Button 
                          size="lg" 
                          className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-3 rounded-xl"
                        >
                          Заказать
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* ОСТАЛЬНЫЕ ТАБЫ УПРОЩЕННЫЕ */}
          <TabsContent value="projects" className="space-y-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4 text-white">Реализованные проекты</h2>
              <p className="text-xl text-gray-300">
                Более <AnimatedCounter end={200} suffix="+" /> объектов по всей России
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project, index) => (
                <Card key={index} className="bg-gray-400/20 backdrop-blur-sm border-gray-500/30 rounded-2xl p-6">
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold text-white flex items-center">
                      <Icon name="MapPin" size={20} className="mr-2 text-emerald-400" />
                      {project.name}
                    </h3>
                    <p className="text-gray-300">{project.location}</p>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Станций:</span>
                        <Badge className="bg-emerald-600">{project.stations}</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Мощность:</span>
                        <span className="text-white">{project.power}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Завершен:</span>
                        <span className="text-emerald-400">{project.completed}</span>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* О ЗАВОДЕ */}
          <TabsContent value="info" className="space-y-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4 text-white">О заводе EcoCharge</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <img 
                  src="/img/e399ca81-72e7-4bd0-8841-a9000e867945.jpg" 
                  alt="Завод EcoCharge"
                  className="w-full h-64 object-cover rounded-2xl"
                />
              </div>
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-white">Лидер в производстве зарядной инфраструктуры</h3>
                <p className="text-gray-300 text-lg leading-relaxed">
                  Завод EcoCharge — современное высокотехнологичное предприятие, 
                  специализирующееся на разработке и производстве зарядных станций 
                  для электромобилей.
                </p>
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center p-4 bg-emerald-600/20 rounded-xl">
                    <div className="text-3xl font-bold text-emerald-400">
                      <AnimatedCounter end={200} suffix="+" />
                    </div>
                    <div className="text-gray-300">Проектов</div>
                  </div>
                  <div className="text-center p-4 bg-blue-600/20 rounded-xl">
                    <div className="text-3xl font-bold text-blue-400">
                      <AnimatedCounter end={5000} suffix="+" />
                    </div>
                    <div className="text-gray-300">Станций</div>
                  </div>
                </div>
              </div>
            </div>

            <Card className="bg-gray-400/20 backdrop-blur-sm border-gray-500/30 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-center text-white mb-8">Гарантия и сертификация</h3>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-xl font-bold text-emerald-400 mb-4">Гарантийные обязательства</h4>
                  <ul className="space-y-2 text-gray-300">
                    <li>• Расширенная гарантия до 7 лет</li>
                    <li>• Техническая поддержка 24/7</li>
                    <li>• Бесплатное сервисное обслуживание</li>
                    <li>• Замена оборудования в течение 48 часов</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-xl font-bold text-blue-400 mb-4">Сертификация</h4>
                  <ul className="space-y-2 text-gray-300">
                    <li>• CE (Европейское соответствие)</li>
                    <li>• ISO 9001:2015 (Система качества)</li>
                    <li>• IEC 61851 (Международный стандарт)</li>
                    <li>• RoHS (Экологическая безопасность)</li>
                  </ul>
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* КОНТАКТЫ */}
          <TabsContent value="contacts" className="space-y-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4 text-white">Контакты</h2>
              <p className="text-xl text-gray-300">Свяжитесь с нами для консультации и расчета стоимости</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <Card className="bg-gray-400/20 backdrop-blur-sm border-gray-500/30 rounded-2xl p-6 text-center">
                <Icon name="Phone" size={48} className="mx-auto mb-4 text-emerald-400" />
                <h3 className="text-xl font-bold mb-2 text-white">Телефон</h3>
                <p className="text-gray-300">+7 (495) 123-45-67</p>
                <p className="text-gray-300">+7 (800) 555-01-23</p>
              </Card>

              <Card className="bg-gray-400/20 backdrop-blur-sm border-gray-500/30 rounded-2xl p-6 text-center">
                <Icon name="Mail" size={48} className="mx-auto mb-4 text-blue-400" />
                <h3 className="text-xl font-bold mb-2 text-white">Email</h3>
                <p className="text-gray-300">info@ecocharge.ru</p>
                <p className="text-gray-300">sales@ecocharge.ru</p>
              </Card>

              <Card className="bg-gray-400/20 backdrop-blur-sm border-gray-500/30 rounded-2xl p-6 text-center">
                <Icon name="MapPin" size={48} className="mx-auto mb-4 text-red-400" />
                <h3 className="text-xl font-bold mb-2 text-white">Адрес</h3>
                <p className="text-gray-300">г. Москва, ул. Инновационная, 42</p>
                <p className="text-gray-300">Технопарк "Будущее"</p>
              </Card>
            </div>

            <Card className="bg-gray-400/20 backdrop-blur-sm border-gray-500/30 rounded-2xl p-8 text-center">
              <h3 className="text-2xl font-bold text-white mb-4">Заявка на консультацию</h3>
              <p className="text-gray-300 mb-6">
                Оставьте заявку, и наш менеджер свяжется с вами в течение часа
              </p>
              <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-8 py-4">
                <Icon name="Send" size={20} className="mr-2" />
                Получить консультацию
              </Button>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Footer */}
      <footer className="bg-black/40 border-t border-gray-600 py-8">
        <div className="max-w-7xl mx-auto px-6 text-center text-gray-400">
          <p>&copy; 2024 EcoCharge. Все права защищены.</p>
          <p className="mt-2">Завод производителя зарядных станций для электромобилей</p>
        </div>
      </footer>
    </div>
  );
}