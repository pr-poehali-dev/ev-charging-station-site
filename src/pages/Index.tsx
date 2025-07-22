import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';

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
      image: '/img/aafed544-0a3d-411b-a8e3-e6fee7642142.jpg'
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
      image: '/img/aafed544-0a3d-411b-a8e3-e6fee7642142.jpg'
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
      image: '/img/aafed544-0a3d-411b-a8e3-e6fee7642142.jpg'
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
      <nav className="fixed top-0 w-full z-50 backdrop-blur-sm bg-black/30 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-lg flex items-center justify-center">
              <Icon name="Zap" size={20} className="text-white" />
            </div>
            <span className="text-2xl font-bold text-white">
              EcoCharge
            </span>
          </div>
          <div className="hidden md:flex space-x-8">
            <button 
              onClick={() => setActiveTab('catalog')}
              className="hover:text-blue-400 transition-colors text-white"
            >
              Каталог
            </button>
            <button 
              onClick={() => setActiveTab('projects')}
              className="hover:text-blue-400 transition-colors text-white"
            >
              Проекты
            </button>
            <button 
              onClick={() => setActiveTab('info')}
              className="hover:text-blue-400 transition-colors text-white"
            >
              О заводе
            </button>
            <button 
              onClick={() => setActiveTab('contacts')}
              className="hover:text-blue-400 transition-colors text-white"
            >
              Контакты
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section - ЧИСТЫЙ БЕЗ МЕРЦАЮЩИХ КРУГОВ */}
      <section className="relative min-h-screen flex items-center justify-center pt-20">        
        <div className="relative z-10 text-center max-w-6xl mx-auto px-6">
          <div className="mb-8">
            <Badge className="mb-6 bg-blue-600 text-white font-semibold px-4 py-2">
              Завод будущего
            </Badge>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight text-white">
            Зарядные станции
            <br />
            <span className="text-4xl md:text-6xl text-blue-400">
              нового поколения
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto">
            Производим высокотехнологичные зарядные станции для электромобилей 
            с полной сертификацией и расширенной гарантией до 7 лет
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Button 
              size="lg" 
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-6 text-lg"
              onClick={() => setActiveTab('catalog')}
            >
              Смотреть каталог
              <Icon name="ArrowRight" size={20} className="ml-2" />
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white px-8 py-6 text-lg transition-all"
              onClick={() => setActiveTab('contacts')}
            >
              <Icon name="Phone" size={20} className="mr-2" />
              Связаться с нами
            </Button>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-12 bg-slate-800 border border-slate-700">
            <TabsTrigger value="catalog" className="text-lg text-white data-[state=active]:bg-blue-600">Каталог</TabsTrigger>
            <TabsTrigger value="projects" className="text-lg text-white data-[state=active]:bg-blue-600">Проекты</TabsTrigger>
            <TabsTrigger value="info" className="text-lg text-white data-[state=active]:bg-blue-600">О заводе</TabsTrigger>
            <TabsTrigger value="contacts" className="text-lg text-white data-[state=active]:bg-blue-600">Контакты</TabsTrigger>
          </TabsList>

          {/* Catalog Tab - ИСПРАВЛЕННЫЕ КАРТОЧКИ */}
          <TabsContent value="catalog" className="space-y-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4 text-white">Продукция</h2>
              <p className="text-xl text-gray-300">Полный спектр зарядного оборудования для электротранспорта</p>
            </div>
            
            <div className="space-y-12">
              {products.map((product, index) => (
                <Card key={product.id} className="bg-slate-800/50 border-slate-700 hover:border-blue-500/50 transition-all">
                  <div className={`grid md:grid-cols-2 gap-8 p-8 ${index % 2 !== 0 ? 'md:grid-cols-2' : ''}`}>
                    {/* Изображение */}
                    <div className={`${index % 2 !== 0 ? 'order-2 md:order-1' : 'order-1'}`}>
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="w-full h-80 object-cover rounded-xl"
                      />
                    </div>
                    
                    {/* Контент */}
                    <div className={`flex flex-col justify-center ${index % 2 !== 0 ? 'order-1 md:order-2' : 'order-2'}`}>
                      <CardHeader className="p-0 pb-6">
                        <CardTitle className="text-3xl text-white mb-2">{product.name}</CardTitle>
                        <CardDescription className="text-lg text-gray-300">
                          {product.type} • {product.power}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="p-0">
                        <div className="space-y-4 mb-8">
                          <div className="flex justify-between items-center border-b border-slate-700 pb-2">
                            <span className="text-gray-400 text-lg">Разъемы:</span>
                            <span className="text-white font-semibold">{product.connectors}</span>
                          </div>
                          <div className="flex justify-between items-center border-b border-slate-700 pb-2">
                            <span className="text-gray-400 text-lg">Гарантия:</span>
                            <Badge className="bg-green-600 text-white">{product.warranty}</Badge>
                          </div>
                          <div className="flex justify-between items-start border-b border-slate-700 pb-2">
                            <span className="text-gray-400 text-lg">Сертификация:</span>
                            <span className="text-blue-400 text-right max-w-48">{product.certification}</span>
                          </div>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-3xl font-bold text-blue-400">{product.price}</span>
                          <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3">
                            Заказать
                          </Button>
                        </div>
                      </CardContent>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Projects Tab */}
          <TabsContent value="projects" className="space-y-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4 text-white">Реализованные проекты</h2>
              <p className="text-xl text-gray-300">Более 200 объектов по всей России</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project, index) => (
                <Card key={index} className="bg-slate-800/50 border-slate-700">
                  <CardHeader>
                    <CardTitle className="text-xl text-white flex items-center">
                      <Icon name="MapPin" size={20} className="mr-2 text-blue-400" />
                      {project.name}
                    </CardTitle>
                    <CardDescription className="text-gray-300">{project.location}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Станций:</span>
                        <Badge className="bg-blue-600">{project.stations}</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Мощность:</span>
                        <span className="text-white">{project.power}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Завершен:</span>
                        <span className="text-blue-400">{project.completed}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Info Tab */}
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
                  для электромобилей. Мы используем передовые технологии и строгие 
                  стандарты качества.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-400">200+</div>
                    <div className="text-gray-400">Проектов</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-400">5000+</div>
                    <div className="text-gray-400">Станций</div>
                  </div>
                </div>
              </div>
            </div>

            <Card className="bg-slate-800/50 border-slate-700 mt-12">
              <CardHeader>
                <CardTitle className="text-2xl text-center text-white">Гарантия и сертификация</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="text-xl font-semibold mb-4 text-blue-400">Гарантийные обязательства</h4>
                    <ul className="space-y-2 text-gray-300">
                      <li>• Расширенная гарантия до 7 лет</li>
                      <li>• Техническая поддержка 24/7</li>
                      <li>• Бесплатное сервисное обслуживание</li>
                      <li>• Замена оборудования в течение 48 часов</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold mb-4 text-blue-400">Сертификация</h4>
                    <ul className="space-y-2 text-gray-300">
                      <li>• CE (Европейское соответствие)</li>
                      <li>• ISO 9001:2015 (Система качества)</li>
                      <li>• IEC 61851 (Международный стандарт)</li>
                      <li>• RoHS (Экологическая безопасность)</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Contacts Tab */}
          <TabsContent value="contacts" className="space-y-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4 text-white">Контакты</h2>
              <p className="text-xl text-gray-300">Свяжитесь с нами для консультации и расчета стоимости</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <Card className="bg-slate-800/50 border-slate-700">
                <CardContent className="pt-6 text-center">
                  <Icon name="Phone" size={48} className="mx-auto mb-4 text-blue-400" />
                  <h3 className="text-xl font-semibold mb-2 text-white">Телефон</h3>
                  <p className="text-gray-300">+7 (495) 123-45-67</p>
                  <p className="text-gray-300">+7 (800) 555-01-23</p>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/50 border-slate-700">
                <CardContent className="pt-6 text-center">
                  <Icon name="Mail" size={48} className="mx-auto mb-4 text-blue-400" />
                  <h3 className="text-xl font-semibold mb-2 text-white">Email</h3>
                  <p className="text-gray-300">info@ecocharge.ru</p>
                  <p className="text-gray-300">sales@ecocharge.ru</p>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/50 border-slate-700">
                <CardContent className="pt-6 text-center">
                  <Icon name="MapPin" size={48} className="mx-auto mb-4 text-blue-400" />
                  <h3 className="text-xl font-semibold mb-2 text-white">Адрес</h3>
                  <p className="text-gray-300">г. Москва, ул. Инновационная, 42</p>
                  <p className="text-gray-300">Технопарк "Будущее"</p>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-center text-white">Заявка на консультацию</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center text-gray-300">
                  <p className="mb-4">Оставьте заявку, и наш менеджер свяжется с вами в течение часа</p>
                  <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold">
                    <Icon name="Send" size={20} className="mr-2" />
                    Получить консультацию
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Footer */}
      <footer className="bg-slate-900 border-t border-slate-800 py-8">
        <div className="max-w-7xl mx-auto px-6 text-center text-gray-400">
          <p>&copy; 2024 EcoCharge. Все права защищены.</p>
          <p className="mt-2">Завод производителя зарядных станций для электромобилей</p>
        </div>
      </footer>
    </div>
  );
}