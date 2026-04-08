import { Eye, Heart, MessageCircle, Baby, Search, Glasses, TrendingDown, ShieldCheck, Phone, MapPin, Send, MessageSquare, Star, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useState } from "react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

const AnimatedSection = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => {
  const { ref, isVisible } = useScrollReveal(0.1);
  return (
    <div
      ref={ref}
      className={`transition-none ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}
      style={{ animationDelay: isVisible ? `${delay}ms` : undefined }}
    >
      {children}
    </div>
  );
};

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-md border-b border-border">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <a href="#" className="text-lg font-semibold text-foreground tracking-tight">
          Алина Шавалеева
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6 text-sm text-muted-foreground">
          <a href="#about" className="hover:text-foreground transition-colors">Обо мне</a>
          <a href="#approach" className="hover:text-foreground transition-colors">Мой подход</a>
          <a href="#services" className="hover:text-foreground transition-colors">Услуги</a>
          <a href="#faq" className="hover:text-foreground transition-colors">Вопросы</a>
          <a href="#contacts" className="hover:text-foreground transition-colors">Контакты</a>
        </nav>

        <Button asChild className="hidden md:inline-flex" size="sm">
          <a href="#contacts">Записаться на приём</a>
        </Button>

        {/* Mobile burger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Меню"
        >
          <span className={`block w-5 h-0.5 bg-foreground transition-transform ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block w-5 h-0.5 bg-foreground transition-opacity ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-5 h-0.5 bg-foreground transition-transform ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <nav className="md:hidden bg-background border-b border-border px-4 pb-4 flex flex-col gap-3 text-sm">
          <a href="#about" onClick={() => setMenuOpen(false)} className="text-muted-foreground hover:text-foreground py-1">Обо мне</a>
          <a href="#approach" onClick={() => setMenuOpen(false)} className="text-muted-foreground hover:text-foreground py-1">Мой подход</a>
          <a href="#services" onClick={() => setMenuOpen(false)} className="text-muted-foreground hover:text-foreground py-1">Услуги</a>
          <a href="#faq" onClick={() => setMenuOpen(false)} className="text-muted-foreground hover:text-foreground py-1">Вопросы</a>
          <a href="#contacts" onClick={() => setMenuOpen(false)} className="text-muted-foreground hover:text-foreground py-1">Контакты</a>
          <Button asChild size="sm" className="w-fit">
            <a href="#contacts" onClick={() => setMenuOpen(false)}>Записаться на приём</a>
          </Button>
        </nav>
      )}
    </header>
  );
};

const HeroSection = () => (
  <section className="pt-28 pb-16 md:pt-36 md:pb-24 px-4">
    <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-10 md:gap-16">
      <div className="flex-1 text-center md:text-left">
        <p className="text-primary font-medium text-sm mb-3 tracking-wide uppercase">Врач-офтальмолог · Москва</p>
        <h1 className="text-3xl md:text-5xl font-bold text-foreground leading-tight mb-5">
          Офтальмолог для всей семьи — <span className="text-primary">с первых дней жизни</span>
        </h1>
        <p className="text-muted-foreground text-base md:text-lg leading-relaxed mb-8 max-w-xl">
          Забочусь о зрении детей и взрослых в Москве. Доказательная медицина, бережный подход и внимание к каждому пациенту — от&nbsp;новорождённых до&nbsp;взрослых.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
          <Button asChild size="lg">
            <a href="#contacts">Записаться на приём</a>
          </Button>
          <Button asChild variant="outline" size="lg">
            <a href="#about">Узнать больше</a>
          </Button>
        </div>
      </div>
      <div className="flex-shrink-0">
        <div className="w-64 h-72 md:w-80 md:h-96 rounded-2xl bg-secondary flex items-center justify-center">
          <div className="text-center text-muted-foreground">
            <Eye className="w-16 h-16 mx-auto mb-3 text-primary opacity-40" />
            <p className="text-sm">Фото врача</p>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const AboutSection = () => (
  <section id="about" className="py-16 md:py-24 px-4 bg-card">
    <div className="max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16">
        <div className="flex-shrink-0">
          <div className="w-56 h-56 md:w-72 md:h-72 rounded-full bg-secondary flex items-center justify-center">
            <div className="text-center text-muted-foreground">
              <Eye className="w-12 h-12 mx-auto mb-2 text-primary opacity-40" />
              <p className="text-xs">Фото</p>
            </div>
          </div>
        </div>
        <div className="flex-1 text-center md:text-left">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-5">Обо мне</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Меня зовут <strong className="text-foreground">Шавалеева Алина Рустемовна</strong>. Я — врач-офтальмолог, принимаю пациентов всех возрастов, включая новорождённых. Работаю в Москве и специализируюсь на детской и взрослой офтальмологии.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Для меня важно не просто поставить диагноз, а объяснить каждому пациенту и родителю, что происходит, почему и какие шаги предпринять. Я придерживаюсь принципов доказательной медицины и постоянно повышаю квалификацию.
          </p>
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-2">Образование</h3>
            <ul className="text-muted-foreground text-sm leading-relaxed space-y-1">
              <li>🎓 РНИМУ им. Н.И. Пирогова — Лечебное дело (2020)</li>
              <li>🎓 РНИМУ им. Н.И. Пирогова — Офтальмология (2022)</li>
            </ul>
          </div>
          <div className="flex flex-wrap gap-3 justify-center md:justify-start">
            <span className="bg-accent text-accent-foreground text-sm px-4 py-2 rounded-full">Пациенты с 0 лет</span>
            <span className="bg-accent text-accent-foreground text-sm px-4 py-2 rounded-full">Доказательная медицина</span>
            <span className="bg-accent text-accent-foreground text-sm px-4 py-2 rounded-full">Москва</span>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const approachItems = [
  {
    icon: ShieldCheck,
    title: "Доказательная медицина",
    description: "Назначаю только те обследования и методы лечения, эффективность которых подтверждена научными исследованиями.",
  },
  {
    icon: Search,
    title: "Внимание к деталям",
    description: "Тщательная диагностика на современном оборудовании. Ничего не упущу, даже если жалоб пока нет.",
  },
  {
    icon: MessageCircle,
    title: "Понятный язык",
    description: "Объясняю диагноз и план лечения так, чтобы было понятно вам и вашему ребёнку. Без сложных терминов и запугивания.",
  },
  {
    icon: Baby,
    title: "Забота о малышах",
    description: "Работаю с детьми с рождения. Знаю, как провести осмотр бережно и без стресса — и для ребёнка, и для родителей.",
  },
];

const ApproachSection = () => (
  <section id="approach" className="py-16 md:py-24 px-4">
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">Мой подход</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Каждый пациент для меня — не просто случай, а человек со своей историей. Вот принципы, которыми я руководствуюсь в работе.
        </p>
      </div>
      <div className="grid sm:grid-cols-2 gap-5">
        {approachItems.map((item) => (
          <Card key={item.title} className="border-border/60 shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-6 flex gap-4">
              <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center flex-shrink-0">
                <item.icon className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-1">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  </section>
);

const ManifestoSection = () => (
  <section className="py-16 md:py-24 px-4 bg-primary/10">
    <div className="max-w-3xl mx-auto text-center">
      <div className="text-primary mb-6">
        <Heart className="w-10 h-10 mx-auto" />
      </div>
      <blockquote className="text-xl md:text-2xl font-medium text-foreground leading-relaxed italic mb-6">
        «Я верю, что хорошее зрение — это не роскошь, а&nbsp;право каждого. Моя задача — помочь вам видеть мир ясно, будь вам 3&nbsp;месяца или 70&nbsp;лет.»
      </blockquote>
      <p className="text-muted-foreground font-medium">
        — Алина Шавалеева, врач-офтальмолог
      </p>
    </div>
  </section>
);

const services = [
  { icon: Eye, title: "Диагностика зрения", description: "Комплексное обследование для детей и взрослых на современном оборудовании" },
  { icon: Baby, title: "Детская офтальмология", description: "Осмотр и лечение зрения у детей с первых дней жизни" },
  { icon: Glasses, title: "Подбор очков и линз", description: "Индивидуальный подбор средств коррекции зрения" },
  { icon: TrendingDown, title: "Лечение близорукости", description: "Современные методы контроля и замедления прогрессирования миопии" },
  { icon: ShieldCheck, title: "Профилактические осмотры", description: "Регулярные проверки для раннего выявления проблем со зрением" },
];

const ServicesSection = () => (
  <section id="services" className="py-16 md:py-24 px-4 bg-card">
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">Услуги</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Помогаю сохранить и улучшить зрение пациентам любого возраста
        </p>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {services.map((s) => (
          <Card key={s.title} className="border-border/60 shadow-sm text-center hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="w-14 h-14 rounded-2xl bg-accent flex items-center justify-center mx-auto mb-4">
                <s.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">{s.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{s.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  </section>
);

const faqItems = [
  {
    q: "С какого возраста нужно показывать ребёнка офтальмологу?",
    a: "Первый осмотр рекомендуется в 1 месяц жизни, затем в 3 месяца, 6 месяцев, 1 год и далее ежегодно. При наличии факторов риска (недоношенность, наследственность) — чаще. Ранняя диагностика позволяет вовремя выявить и скорректировать нарушения.",
  },
  {
    q: "Как понять, что у ребёнка проблемы со зрением?",
    a: "Обратите внимание, если ребёнок щурится, подносит предметы близко к глазам, часто трёт глаза, наклоняет голову при рассматривании, жалуется на головную боль или быстро устаёт при чтении. У малышей до года — если не следит за игрушкой, не фиксирует взгляд.",
  },
  {
    q: "Можно ли остановить прогрессирование близорукости?",
    a: "Полностью остановить — не всегда, но значительно замедлить — да. Существуют доказательные методы контроля миопии: специальные капли (атропин в малых дозах), ортокератологические линзы, мягкие дефокусные линзы. Подбираю метод индивидуально.",
  },
  {
    q: "Нужно ли приходить на профилактический осмотр, если жалоб нет?",
    a: "Обязательно. Многие заболевания глаз на ранних стадиях протекают бессимптомно. Ежегодный осмотр — это возможность выявить проблему до того, как она начнёт влиять на качество жизни.",
  },
  {
    q: "Как подготовить ребёнка к визиту к офтальмологу?",
    a: "Расскажите ребёнку, что доктор просто посмотрит глазки — без уколов и боли. Возьмите с собой любимую игрушку. Малышам не нужна особая подготовка. Главное — спокойный настрой родителей, дети это чувствуют.",
  },
];

const reviews = [
  {
    name: "Екатерина М.",
    child: "мама Миши, 3 года",
    text: "Алина Рустемовна — чудесный доктор! Сын боялся врачей, но здесь всё прошло спокойно и даже весело. Нашли начальную стадию астигматизма, сейчас корректируем. Очень благодарна за внимательность!",
    rating: 5,
  },
  {
    name: "Ольга Д.",
    child: "пациент, 34 года",
    text: "Впервые врач объяснил мне всё настолько понятно. Почему падает зрение, что делать, какие варианты лечения. Без запугивания, без лишних назначений. Рекомендую от всего сердца.",
    rating: 5,
  },
  {
    name: "Анна К.",
    child: "мама Софии, 8 месяцев",
    text: "Были на первом осмотре у Алины Рустемовны. Дочка даже не заплакала! Доктор всё рассказала, показала результаты, объяснила нормы для нашего возраста. Теперь только к ней.",
    rating: 5,
  },
  {
    name: "Марина В.",
    child: "мама Артёма, 7 лет",
    text: "У сына начала падать близорукость. Алина Рустемовна подобрала программу контроля миопии, за полгода прогрессирование почти остановилось. Профессионал и очень душевный человек.",
    rating: 5,
  },
];

const ReviewsSection = () => (
  <section id="reviews" className="py-16 md:py-24 px-4">
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">Отзывы пациентов</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Доверие — главное в отношениях между врачом и&nbsp;пациентом. Вот что говорят те, кто уже побывал на приёме.
        </p>
      </div>
      <div className="grid sm:grid-cols-2 gap-5">
        {reviews.map((r, i) => (
          <Card key={i} className="border-border/60 shadow-sm">
            <CardContent className="p-6">
              <div className="flex gap-1 mb-3">
                {Array.from({ length: r.rating }).map((_, j) => (
                  <Star key={j} className="w-4 h-4 fill-primary text-primary" />
                ))}
              </div>
              <div className="relative mb-4">
                <Quote className="absolute -top-1 -left-1 w-6 h-6 text-primary/20" />
                <p className="text-sm text-muted-foreground leading-relaxed pl-5">{r.text}</p>
              </div>
              <div>
                <p className="font-semibold text-foreground text-sm">{r.name}</p>
                <p className="text-xs text-muted-foreground">{r.child}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  </section>
);

const FAQSection = () => (
  <section id="faq" className="py-16 md:py-24 px-4">
    <div className="max-w-3xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">Частые вопросы</h2>
        <p className="text-muted-foreground">
          Отвечаю на вопросы, которые чаще всего задают мне пациенты и&nbsp;родители
        </p>
      </div>
      <Accordion type="single" collapsible className="space-y-3">
        {faqItems.map((item, i) => (
          <AccordionItem key={i} value={`faq-${i}`} className="bg-card rounded-xl border border-border/60 px-5">
            <AccordionTrigger className="text-left text-sm md:text-base font-medium hover:no-underline">
              {item.q}
            </AccordionTrigger>
            <AccordionContent className="text-sm text-muted-foreground leading-relaxed pb-4">
              {item.a}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  </section>
);

const ContactsSection = () => (
  <section id="contacts" className="py-16 md:py-24 px-4 bg-card">
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">Запись на приём</h2>
        <p className="text-muted-foreground">
          Свяжитесь со мной удобным для вас способом
        </p>
      </div>
      <div className="grid sm:grid-cols-3 gap-5">
        <Card className="border-border/60 shadow-sm hover:shadow-md transition-shadow">
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center mx-auto mb-4">
              <Send className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-semibold text-foreground mb-1">Telegram</h3>
            <p className="text-sm text-muted-foreground">Напишите в Telegram для быстрой записи</p>
          </CardContent>
        </Card>
        <Card className="border-border/60 shadow-sm hover:shadow-md transition-shadow">
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center mx-auto mb-4">
              <MessageSquare className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-semibold text-foreground mb-1">WhatsApp</h3>
            <p className="text-sm text-muted-foreground">Запись и консультация через WhatsApp</p>
          </CardContent>
        </Card>
        <Card className="border-border/60 shadow-sm hover:shadow-md transition-shadow">
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center mx-auto mb-4">
              <Phone className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-semibold text-foreground mb-1">Телефон</h3>
            <p className="text-sm text-muted-foreground">Позвоните для записи на приём</p>
          </CardContent>
        </Card>
      </div>
      <div className="mt-8 text-center">
        <div className="flex items-center justify-center gap-2 text-muted-foreground">
          <MapPin className="w-4 h-4" />
          <span className="text-sm">Москва · Адрес уточняйте при записи</span>
        </div>
      </div>
    </div>
  </section>
);

const Footer = () => (
  <footer className="py-10 px-4 border-t border-border">
    <div className="max-w-6xl mx-auto text-center">
      <p className="font-semibold text-foreground mb-2">Шавалеева Алина Рустемовна</p>
      <p className="text-sm text-muted-foreground mb-4">Врач-офтальмолог · Москва · Приём пациентов с 0 лет</p>
      <p className="text-xs text-muted-foreground max-w-lg mx-auto leading-relaxed">
        Информация на сайте носит ознакомительный характер и не является публичной офертой. Не&nbsp;заменяет очную консультацию специалиста. Имеются противопоказания, необходима консультация врача.
      </p>
    </div>
  </footer>
);

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <AboutSection />
        <ApproachSection />
        <ManifestoSection />
        <ServicesSection />
        <ReviewsSection />
        <FAQSection />
        <ContactsSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
