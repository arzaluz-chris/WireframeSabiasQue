import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Heart, Share2, Home, Bookmark, User, RefreshCw, Sparkles, Bell, Moon, Info, Star, Trash2 } from 'lucide-react';

const WireframeApp = () => {
  const [currentTab, setCurrentTab] = useState(0); // 0: Home, 1: Favorites, 2: Profile
  const [currentScreen, setCurrentScreen] = useState('splash');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [currentFactIndex, setCurrentFactIndex] = useState(0);
  const [favorites, setFavorites] = useState([]);
  const [isAnimating, setIsAnimating] = useState(false);

  // Datos exactos de FactProvider.m
  const facts = {
    ciencia: [
      'El corazón de un camarón está en su cabeza',
      'Los pulpos tienen tres corazones y sangre azul',
      'Un día en Venus equivale a 243 días terrestres',
      'El bambú puede crecer hasta 91 cm en un solo día',
      'Las abejas pueden reconocer rostros humanos'
    ],
    historia: [
      'Las pirámides de Giza eran blancas y brillantes originalmente',
      'Los vikingos llegaron a América 500 años antes que Colón',
      'El Imperio Romano duró más de 1000 años',
      'Cleopatra vivió más cerca del iPhone que de la construcción de las pirámides',
      'La Universidad de Oxford es más antigua que el Imperio Azteca'
    ],
    tecnologia: [
      'El primer mensaje de texto se envió en 1992',
      'Hay más dispositivos conectados a internet que personas en el mundo',
      'El 90% de los datos del mundo se crearon en los últimos 2 años',
      'La primera página web sigue activa desde 1991',
      'Un iPhone tiene más poder que las computadoras del Apollo 11'
    ]
  };

  const categoryConfig = {
    ciencia: {
      emoji: '🧬',
      gradient: 'from-emerald-400 to-cyan-400',
      bgLight: 'from-emerald-50 to-cyan-50',
      title: 'Ciencia y Naturaleza',
      count: 5,
      rating: '4.8'
    },
    historia: {
      emoji: '📜',
      gradient: 'from-amber-400 to-orange-400',
      bgLight: 'from-amber-50 to-orange-50',
      title: 'Historia y Cultura',
      count: 5,
      rating: '5.0'
    },
    tecnologia: {
      emoji: '🚀',
      gradient: 'from-violet-400 to-purple-400',
      bgLight: 'from-violet-50 to-purple-50',
      title: 'Tecnología y Futuro',
      count: 5,
      rating: '4.7'
    }
  };

  useEffect(() => {
    // Auto-transición del Splash como en SplashViewController.m
    if (currentScreen === 'splash') {
      const timer = setTimeout(() => {
        setCurrentScreen('home');
      }, 1600);
      return () => clearTimeout(timer);
    }
  }, [currentScreen]);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setCurrentFactIndex(0);
    setCurrentScreen('fact');
  };

  const handleNextFact = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentFactIndex((prevIndex) => (prevIndex + 1) % facts[selectedCategory].length);
      setIsAnimating(false);
    }, 200);
  };

  const toggleFavorite = () => {
    const currentFact = facts[selectedCategory][currentFactIndex];
    const existingIndex = favorites.findIndex(f => 
      f.fact === currentFact && f.category === selectedCategory
    );
    
    if (existingIndex > -1) {
      setFavorites(favorites.filter((_, i) => i !== existingIndex));
    } else {
      setFavorites([...favorites, {
        fact: currentFact,
        category: selectedCategory,
        emoji: categoryConfig[selectedCategory].emoji,
        date: new Date()
      }]);
    }
  };

  const isFavorite = () => {
    if (!selectedCategory) return false;
    const currentFact = facts[selectedCategory][currentFactIndex];
    return favorites.some(f => f.fact === currentFact && f.category === selectedCategory);
  };

  const removeFavorite = (index) => {
    setFavorites(favorites.filter((_, i) => i !== index));
  };

  const shareFact = () => {
    const currentFact = facts[selectedCategory][currentFactIndex];
    alert(`Compartir: ¿Sabías qué? ${currentFact}`);
  };

  // iPhone Frame Component
  const PhoneFrame = ({ children }) => (
    <div className="relative mx-auto" style={{ width: '390px', height: '844px' }}>
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900 to-gray-800 rounded-[50px] shadow-2xl">
        {/* Dynamic Island */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-7 bg-black rounded-b-3xl z-50" />
        {/* Screen */}
        <div className="absolute inset-[3px] bg-black rounded-[47px] overflow-hidden">
          <div className="w-full h-full bg-white rounded-[44px] overflow-hidden">
            {children}
          </div>
        </div>
      </div>
    </div>
  );

  // SplashViewController
  const SplashScreen = () => (
    <div className="h-full bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 flex flex-col items-center justify-center relative overflow-hidden">
      {/* Animated background elements */}
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-white/10 blur-xl animate-pulse"
          style={{
            width: `${100 + i * 30}px`,
            height: `${100 + i * 30}px`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${i * 0.5}s`,
            animationDuration: `${3 + i}s`
          }}
        />
      ))}
      
      <div className="relative z-10">
        <div className="w-36 h-36 bg-white/20 backdrop-blur-xl rounded-3xl flex items-center justify-center animate-bounce shadow-2xl mb-8">
          <Sparkles className="w-20 h-20 text-white" />
        </div>
        
        <h1 className="text-4xl font-bold text-white mb-3">¿Sabías qué?</h1>
        
        <button 
          onClick={() => setCurrentScreen('home')}
          className="mt-6 px-10 py-4 bg-white/20 backdrop-blur-md text-white rounded-full font-semibold shadow-xl hover:scale-105 transition-all duration-300 border border-white/30"
        >
          Explorar
        </button>
      </div>
    </div>
  );

  // HomeViewController
  const HomeScreen = () => (
    <div className="h-full flex flex-col bg-gray-50">
      {/* Header degradado */}
      <div className="bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 pt-14 pb-24 px-6">
        <p className="text-white/90 text-sm font-medium mb-1">Hola 👋</p>
        <h1 className="text-3xl font-bold text-white">Descubre Hoy</h1>
      </div>

      {/* Dato del día (flotante) */}
      <div className="mx-6 -mt-10 mb-6 bg-white rounded-2xl shadow-xl p-4 flex items-center gap-3">
        <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
          <span className="text-xl">💡</span>
        </div>
        <div className="flex-1">
          <p className="text-xs text-gray-500">Dato del día</p>
          <p className="text-sm font-semibold text-gray-800">El Sol es 400 veces más grande que la Luna</p>
        </div>
      </div>

      {/* Categorías */}
      <div className="flex-1 px-6 overflow-y-auto pb-20">
        <h2 className="text-lg font-bold text-gray-800 mb-4">Categorías Populares</h2>
        
        {Object.entries(categoryConfig).map(([key, config]) => (
          <button
            key={key}
            onClick={() => handleCategorySelect(key)}
            className={`w-full bg-gradient-to-r ${config.gradient} p-0.5 rounded-2xl shadow-lg mb-4 hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300`}
          >
            <div className="bg-white rounded-[19px] p-5 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className={`w-14 h-14 bg-gradient-to-br ${config.bgLight} rounded-2xl flex items-center justify-center`}>
                  <span className="text-3xl">{config.emoji}</span>
                </div>
                <div className="text-left">
                  <h3 className="text-lg font-bold text-gray-800">{config.title}</h3>
                  <p className="text-sm text-gray-500">{config.count} datos curiosos</p>
                  <div className="flex items-center mt-1">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`w-3 h-3 ${i < Math.floor(parseFloat(config.rating)) ? 'text-yellow-400 fill-current' : 'text-gray-300 fill-current'}`} 
                      />
                    ))}
                    <span className="text-xs text-gray-500 ml-1">{config.rating}</span>
                  </div>
                </div>
              </div>
              <div className={`bg-gradient-to-r ${config.gradient} rounded-full p-2`}>
                <ChevronRight className="w-5 h-5 text-white" />
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );

  // FactViewController
  const FactScreen = () => {
    if (!selectedCategory) return null;
    const config = categoryConfig[selectedCategory];
    const currentFact = facts[selectedCategory][currentFactIndex];

    return (
      <div className={`h-full flex flex-col bg-gradient-to-b ${config.bgLight}`}>
        {/* Header */}
        <div className={`bg-gradient-to-r ${config.gradient} pt-14 pb-6 px-6`}>
          <button 
            onClick={() => setCurrentScreen('home')}
            className="mb-4 text-white/90 hover:text-white flex items-center gap-2 font-medium"
          >
            <ChevronLeft className="w-5 h-5" />
            <span>Volver</span>
          </button>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                <span className="text-2xl">{config.emoji}</span>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white capitalize">{selectedCategory}</h2>
                <p className="text-white/80 text-sm">Dato #{currentFactIndex + 1}</p>
              </div>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-full px-3 py-1">
              <span className="text-white text-sm font-medium">
                {currentFactIndex + 1}/{facts[selectedCategory].length}
              </span>
            </div>
          </div>
        </div>

        {/* Fact Card */}
        <div className="flex-1 flex items-center justify-center px-6 py-8">
          <div className={`bg-white rounded-3xl shadow-2xl p-8 max-w-sm w-full transform transition-all duration-500 ${
            isAnimating ? 'scale-95 opacity-50' : 'scale-100 opacity-100'
          }`}>
            {/* Imagen placeholder */}
            <div className={`w-full h-36 bg-gradient-to-br ${config.gradient} rounded-2xl mb-6 opacity-30`} />
            
            <p className="text-lg text-gray-800 text-center leading-relaxed font-medium">
              {currentFact}
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="bg-white rounded-t-3xl shadow-lg p-6">
          <div className="flex gap-3 mb-3">
            <button 
              onClick={toggleFavorite}
              className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 rounded-2xl font-semibold flex items-center justify-center gap-2 transition-all"
            >
              <Heart className={`w-4 h-4 ${isFavorite() ? 'fill-pink-500 text-pink-500' : ''}`} />
              <span>Favorito</span>
            </button>
            <button 
              onClick={shareFact}
              className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 rounded-2xl font-semibold flex items-center justify-center gap-2 transition-all"
            >
              <Share2 className="w-4 h-4" />
              <span>Compartir</span>
            </button>
          </div>
          <button
            onClick={handleNextFact}
            className={`w-full bg-gradient-to-r ${config.gradient} text-white py-4 rounded-2xl font-bold shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all flex items-center justify-center gap-2`}
          >
            <RefreshCw className={`w-5 h-5 ${isAnimating ? 'animate-spin' : ''}`} />
            <span>Siguiente Dato Curioso</span>
          </button>
        </div>
      </div>
    );
  };

  // FavoritesViewController
  const FavoritesScreen = () => (
    <div className="h-full flex flex-col bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-pink-500 to-purple-600 pt-14 pb-8 px-6">
        <h1 className="text-3xl font-bold text-white">Favoritos</h1>
        <p className="text-white/90 text-sm mt-1">Tus datos curiosos guardados</p>
      </div>

      {/* Lista de favoritos */}
      <div className="flex-1 px-6 py-4 overflow-y-auto pb-20">
        {favorites.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-gray-400">
            <span className="text-5xl mb-4">❤️</span>
            <p className="text-center">
              No tienes favoritos aún<br/>
              Guarda tus datos curiosos favoritos
            </p>
          </div>
        ) : (
          <div className="bg-white rounded-xl overflow-hidden shadow-sm">
            {favorites.map((fav, index) => (
              <div 
                key={index}
                className={`p-4 flex items-start gap-3 ${
                  index < favorites.length - 1 ? 'border-b border-gray-100' : ''
                }`}
              >
                <span className="text-2xl mt-1">{fav.emoji}</span>
                <div className="flex-1">
                  <p className="text-gray-800 text-sm leading-relaxed">{fav.fact}</p>
                  <p className="text-xs text-gray-500 mt-1 capitalize">
                    {fav.category}
                  </p>
                </div>
                <button
                  onClick={() => removeFavorite(index)}
                  className="text-red-500 hover:text-red-600"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  // ProfileViewController
  const ProfileScreen = () => (
    <div className="h-full flex flex-col bg-gray-50 overflow-y-auto">
      {/* Header */}
      <div className="bg-gradient-to-r from-teal-500 to-blue-600 h-36" />
      
      {/* Avatar */}
      <div className="-mt-12 flex flex-col items-center mb-6">
        <div className="w-24 h-24 bg-purple-600 rounded-full border-3 border-white flex items-center justify-center text-3xl text-white font-bold shadow-lg">
          U
        </div>
        <h2 className="text-2xl font-bold mt-4">Usuario Demo</h2>
        <p className="text-sm text-gray-500">usuario@ejemplo.com</p>
      </div>

      {/* Estadísticas */}
      <div className="px-6 mb-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Estadísticas</h3>
        <div className="space-y-3">
          {[
            { emoji: '📚', title: 'Datos Leídos', value: '247' },
            { emoji: '❤️', title: 'Favoritos', value: favorites.length },
            { emoji: '🔥', title: 'Racha', value: '7 días' },
            { emoji: '⭐', title: 'Categoría Favorita', value: 'Ciencia' }
          ].map((stat, index) => (
            <div key={index} className="bg-white rounded-xl p-4 flex items-center gap-3 shadow-sm">
              <span className="text-2xl">{stat.emoji}</span>
              <div className="flex-1">
                <p className="text-xs text-gray-500">{stat.title}</p>
                <p className="text-xl font-bold">{stat.value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Configuración */}
      <div className="px-6 pb-24">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Configuración</h3>
        <div className="space-y-3">
          {[
            { icon: <Bell className="w-5 h-5" />, title: 'Notificaciones' },
            { icon: <Moon className="w-5 h-5" />, title: 'Modo Oscuro' },
            { icon: <Info className="w-5 h-5" />, title: 'Acerca de' },
            { icon: <Star className="w-5 h-5" />, title: 'Calificar App' }
          ].map((setting, index) => (
            <button
              key={index}
              onClick={() => alert('Esta función estará disponible próximamente')}
              className="w-full bg-white rounded-xl p-4 flex items-center gap-3 text-left hover:bg-gray-50 transition-colors shadow-sm"
            >
              <div className="text-gray-600">{setting.icon}</div>
              <span className="text-gray-800">{setting.title}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  // Tab Bar
  const TabBar = () => (
    <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200">
      <div className="flex justify-around py-2 pb-6">
        {[
          { icon: <Home className="w-5 h-5" />, label: 'Inicio', index: 0 },
          { icon: <Heart className="w-5 h-5" />, label: 'Favoritos', index: 1 },
          { icon: <User className="w-5 h-5" />, label: 'Perfil', index: 2 }
        ].map((tab) => (
          <button
            key={tab.index}
            onClick={() => {
              setCurrentTab(tab.index);
              if (tab.index === 0) setCurrentScreen('home');
            }}
            className={`flex flex-col items-center gap-1 py-2 px-3 rounded-xl transition-all ${
              currentTab === tab.index
                ? 'text-purple-600 bg-purple-50'
                : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            {tab.icon}
            <span className="text-xs font-medium">{tab.label}</span>
          </button>
        ))}
      </div>
    </div>
  );

  // Render principal
  const renderContent = () => {
    if (currentScreen === 'splash') {
      return <SplashScreen />;
    } else if (currentScreen === 'fact') {
      return <FactScreen />;
    } else {
      return (
        <div className="h-full relative">
          {currentTab === 0 && <HomeScreen />}
          {currentTab === 1 && <FavoritesScreen />}
          {currentTab === 2 && <ProfileScreen />}
          <TabBar />
        </div>
      );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 py-10">
      <div className="text-center mb-8 px-4">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
          Wireframe iOS - App "¿Sabías Qué?"
        </h1>
        <p className="text-gray-600">Réplica exacta de la aplicación en Objective-C</p>
      </div>

      <div className="flex justify-center items-start gap-10">
        <PhoneFrame>
          {renderContent()}
        </PhoneFrame>

        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-8 max-w-md">
          <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Arquitectura iOS Native
          </h2>

          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-gray-800 mb-3">📱 Estructura MVC</h3>
              <div className="bg-gray-50 rounded-lg p-4 space-y-2 text-sm">
                <p><strong>SceneDelegate:</strong> TabBarController</p>
                <p><strong>HomeViewController:</strong> Lista de categorías</p>
                <p><strong>FactViewController:</strong> Visualización de datos</p>
                <p><strong>FavoritesViewController:</strong> Gestión de favoritos</p>
                <p><strong>ProfileViewController:</strong> Perfil y estadísticas</p>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-gray-800 mb-3">🎨 Componentes UI</h3>
              <div className="bg-gray-50 rounded-lg p-4 space-y-2 text-sm">
                <p><strong>GradientView:</strong> CAGradientLayer</p>
                <p><strong>CardView:</strong> Vista personalizada</p>
                <p><strong>UIColor+App:</strong> Colores del tema</p>
                <p><strong>Auto Layout:</strong> Sin Storyboards</p>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-gray-800 mb-3">💾 Gestión de Datos</h3>
              <div className="bg-gray-50 rounded-lg p-4 space-y-2 text-sm">
                <p><strong>FactProvider:</strong> Fuente de datos</p>
                <p><strong>FactManager:</strong> Singleton para favoritos</p>
                <p><strong>NSNotificationCenter:</strong> Actualizaciones</p>
              </div>
            </div>

            <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-4 text-center">
              <p className="text-sm text-gray-600">
                iOS 13+ • UIKit • Objective-C • MVC
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WireframeApp;