import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import Icon from '@/components/ui/icon';

interface Photo {
  id: number;
  title: string;
  price: number;
  image: string;
  description: string;
  category: string;
}

interface CartItem extends Photo {
  quantity: number;
}

const photos: Photo[] = [
  {
    id: 1,
    title: "Misty Mountains",
    price: 12000,
    image: "https://cdn.poehali.dev/projects/5035e56f-57e1-4799-9176-6915ec9cbea2/files/beb348c6-055d-46f5-8833-5a86797da529.jpg",
    description: "Dramatic landscape photography capturing the essence of nature",
    category: "Landscape"
  },
  {
    id: 2,
    title: "Portrait Study",
    price: 15000,
    image: "https://cdn.poehali.dev/projects/5035e56f-57e1-4799-9176-6915ec9cbea2/files/d1f0c78f-f8b6-40ed-ad2b-4edf0d446e42.jpg",
    description: "Minimalist black and white portrait with dramatic lighting",
    category: "Portrait"
  },
  {
    id: 3,
    title: "Geometric Forms",
    price: 10000,
    image: "https://cdn.poehali.dev/projects/5035e56f-57e1-4799-9176-6915ec9cbea2/files/daabbb51-ffdf-48a9-a9a9-79f7662e00f3.jpg",
    description: "Abstract architectural composition with bold geometry",
    category: "Architecture"
  }
];

export default function Index() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [activeSection, setActiveSection] = useState('gallery');

  const addToCart = (photo: Photo) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === photo.id);
      if (existing) {
        return prev.map(item =>
          item.id === photo.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...photo, quantity: 1 }];
    });
  };

  const removeFromCart = (photoId: number) => {
    setCart(prev => prev.filter(item => item.id !== photoId));
  };

  const getTotalPrice = () => {
    return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  const cartItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border/40 sticky top-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50">
        <div className="container mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img 
                src="https://cdn.poehali.dev/files/ab9e8470-03df-4d0f-848b-560bfd491f0c.jpg" 
                alt="KropKadr" 
                className="w-12 h-12 object-cover rounded-full"
              />
              <h1 className="font-serif text-3xl font-bold tracking-tight">KropKadr</h1>
            </div>
            <nav className="flex items-center gap-8">
              <button
                onClick={() => setActiveSection('gallery')}
                className={`text-sm font-light tracking-wide transition-colors ${
                  activeSection === 'gallery' ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                Галерея
              </button>
              <button
                onClick={() => setActiveSection('about')}
                className={`text-sm font-light tracking-wide transition-colors ${
                  activeSection === 'about' ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                О фотографе
              </button>
              <button
                onClick={() => setActiveSection('contact')}
                className={`text-sm font-light tracking-wide transition-colors ${
                  activeSection === 'contact' ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                Контакты
              </button>
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="relative">
                    <Icon name="ShoppingBag" size={20} />
                    {cartItemsCount > 0 && (
                      <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center text-xs">
                        {cartItemsCount}
                      </Badge>
                    )}
                  </Button>
                </SheetTrigger>
                <SheetContent className="w-full sm:max-w-lg">
                  <SheetHeader>
                    <SheetTitle className="font-serif text-2xl">Корзина</SheetTitle>
                  </SheetHeader>
                  <div className="mt-8 space-y-6">
                    {cart.length === 0 ? (
                      <p className="text-muted-foreground text-center py-12">Корзина пуста</p>
                    ) : (
                      <>
                        {cart.map(item => (
                          <div key={item.id} className="flex gap-4">
                            <img
                              src={item.image}
                              alt={item.title}
                              className="w-24 h-24 object-cover"
                            />
                            <div className="flex-1">
                              <h3 className="font-serif text-lg">{item.title}</h3>
                              <p className="text-sm text-muted-foreground mt-1">
                                {item.price.toLocaleString('ru-RU')} ₽
                              </p>
                              <p className="text-sm text-muted-foreground">
                                Количество: {item.quantity}
                              </p>
                            </div>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => removeFromCart(item.id)}
                            >
                              <Icon name="X" size={16} />
                            </Button>
                          </div>
                        ))}
                        <div className="pt-6 border-t">
                          <div className="flex justify-between items-center mb-6">
                            <span className="font-serif text-xl">Итого:</span>
                            <span className="font-serif text-2xl">
                              {getTotalPrice().toLocaleString('ru-RU')} ₽
                            </span>
                          </div>
                          <Button className="w-full" size="lg">
                            Оформить покупку
                          </Button>
                          <p className="text-xs text-muted-foreground text-center mt-4">
                            Мгновенная цифровая доставка после оплаты
                          </p>
                        </div>
                      </>
                    )}
                  </div>
                </SheetContent>
              </Sheet>
            </nav>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-16">
        {activeSection === 'gallery' && (
          <div className="animate-fade-in">
            <div className="max-w-3xl mb-20">
              <h2 className="font-serif text-5xl md:text-6xl font-bold mb-6 leading-tight">
                Коллекция работ
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Эксклюзивные авторские фотографии в высоком разрешении.
                Каждая работа — это уникальный взгляд на мир через объектив.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
              {photos.map((photo, index) => (
                <Card
                  key={photo.id}
                  className="group cursor-pointer border-0 shadow-none animate-fade-in overflow-hidden"
                  style={{ animationDelay: `${index * 100}ms` }}
                  onClick={() => setSelectedPhoto(photo)}
                >
                  <div className="aspect-[3/4] overflow-hidden bg-muted">
                    <img
                      src={photo.image}
                      alt={photo.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6">
                    <Badge variant="secondary" className="mb-3 font-light">
                      {photo.category}
                    </Badge>
                    <h3 className="font-serif text-2xl mb-2">{photo.title}</h3>
                    <p className="text-muted-foreground text-sm mb-4">
                      {photo.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="font-serif text-xl">
                        {photo.price.toLocaleString('ru-RU')} ₽
                      </span>
                      <Button
                        onClick={(e) => {
                          e.stopPropagation();
                          addToCart(photo);
                        }}
                        size="sm"
                      >
                        В корзину
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeSection === 'about' && (
          <div className="max-w-3xl mx-auto animate-fade-in">
            <h2 className="font-serif text-5xl md:text-6xl font-bold mb-8">О фотографе</h2>
            <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
              <p>
                Добро пожаловать в мою галерею. Я — фотограф, специализирующийся на
                создании уникальных визуальных историй через объектив.
              </p>
              <p>
                Каждая работа в этой коллекции — результат тщательного поиска идеального
                момента, света и композиции. Моя цель — не просто запечатлеть реальность,
                а создать произведение искусства, которое будет вдохновлять.
              </p>
              <p>
                Все фотографии доступны для покупки в высоком разрешении и
                предоставляются в цифровом формате сразу после оплаты.
              </p>
            </div>
          </div>
        )}

        {activeSection === 'contact' && (
          <div className="max-w-2xl mx-auto animate-fade-in">
            <h2 className="font-serif text-5xl md:text-6xl font-bold mb-8">Контакты</h2>
            <div className="space-y-8">
              <div>
                <h3 className="font-serif text-2xl mb-3">Email</h3>
                <a href="mailto:hello@atelier.photo" className="text-lg text-muted-foreground hover:text-foreground transition-colors">
                  hello@atelier.photo
                </a>
              </div>
              <div>
                <h3 className="font-serif text-2xl mb-3">Социальные сети</h3>
                <div className="flex gap-4">
                  <Button variant="outline" size="icon">
                    <Icon name="Instagram" size={20} />
                  </Button>
                  <Button variant="outline" size="icon">
                    <Icon name="Facebook" size={20} />
                  </Button>
                  <Button variant="outline" size="icon">
                    <Icon name="Twitter" size={20} />
                  </Button>
                </div>
              </div>
              <div className="pt-8 border-t">
                <p className="text-muted-foreground">
                  По вопросам сотрудничества, заказа индивидуальных фотосессий
                  или приобретения работ свяжитесь со мной удобным способом.
                </p>
              </div>
            </div>
          </div>
        )}
      </main>

      <Dialog open={!!selectedPhoto} onOpenChange={() => setSelectedPhoto(null)}>
        <DialogContent className="max-w-5xl p-0">
          {selectedPhoto && (
            <div className="grid md:grid-cols-2 gap-0">
              <div className="aspect-square bg-muted">
                <img
                  src={selectedPhoto.image}
                  alt={selectedPhoto.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-8 md:p-12 flex flex-col">
                <DialogHeader>
                  <Badge variant="secondary" className="w-fit mb-4 font-light">
                    {selectedPhoto.category}
                  </Badge>
                  <DialogTitle className="font-serif text-4xl mb-4">
                    {selectedPhoto.title}
                  </DialogTitle>
                </DialogHeader>
                <p className="text-muted-foreground text-lg mb-8 flex-1">
                  {selectedPhoto.description}
                </p>
                <div className="space-y-6">
                  <div className="flex items-baseline gap-2">
                    <span className="font-serif text-3xl">
                      {selectedPhoto.price.toLocaleString('ru-RU')} ₽
                    </span>
                    <span className="text-sm text-muted-foreground">
                      цифровая копия в высоком разрешении
                    </span>
                  </div>
                  <Button
                    onClick={() => {
                      addToCart(selectedPhoto);
                      setSelectedPhoto(null);
                    }}
                    size="lg"
                    className="w-full"
                  >
                    Добавить в корзину
                  </Button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <footer className="border-t border-border/40 mt-32">
        <div className="container mx-auto px-6 py-12">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-3">
              <img 
                src="https://cdn.poehali.dev/files/ab9e8470-03df-4d0f-848b-560bfd491f0c.jpg" 
                alt="KropKadr" 
                className="w-10 h-10 object-cover rounded-full"
              />
              <p className="font-serif text-2xl">KropKadr</p>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2024 Все права защищены
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}