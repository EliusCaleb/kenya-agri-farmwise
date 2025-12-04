import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Play } from 'lucide-react';

const HeroSection = () => {
  return (
    <section className="relative min-h-screen hero-gradient overflow-hidden pt-16">
      {/* Background Pattern */}
      <div className="absolute inset-0 pattern-dots opacity-30" />
      
      {/* Decorative Elements */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-pulse-slow" />
      <div className="absolute bottom-1/4 left-0 w-80 h-80 bg-secondary/20 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }} />

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between min-h-[calc(100vh-4rem)] py-12 gap-12">
          {/* Left Content */}
          <div className="flex-1 text-center lg:text-left max-w-2xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-foreground/10 border border-primary-foreground/20 text-primary-foreground/90 text-sm mb-6 animate-fade-in">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              Now serving 10,000+ farmers across Kenya
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground leading-tight mb-6 animate-fade-in" style={{ animationDelay: '0.1s' }}>
              Empowering Kenyan Farmers Through{' '}
              <span className="text-gradient">Technology</span>
            </h1>
            
            <p className="text-lg md:text-xl text-primary-foreground/80 mb-8 animate-fade-in" style={{ animationDelay: '0.2s' }}>
              Connect with buyers, detect crop diseases with AI, access real-time market prices, 
              and get expert agricultural advice — all in one platform.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <Link to="/signup">
                <Button variant="hero" size="xl" className="w-full sm:w-auto">
                  Start Free Today
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
              <Button variant="heroOutline" size="xl" className="w-full sm:w-auto">
                <Play className="w-5 h-5" />
                Watch Demo
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="mt-12 flex flex-col sm:flex-row items-center gap-6 justify-center lg:justify-start animate-fade-in" style={{ animationDelay: '0.4s' }}>
              <div className="flex -space-x-3">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div
                    key={i}
                    className="w-10 h-10 rounded-full border-2 border-primary bg-secondary flex items-center justify-center text-xs font-bold text-secondary-foreground"
                  >
                    {String.fromCharCode(64 + i)}
                  </div>
                ))}
              </div>
              <div className="text-primary-foreground/80 text-sm">
                <span className="text-primary-foreground font-semibold">4.9/5</span> from 2,000+ farmer reviews
              </div>
            </div>
          </div>

          {/* Right Content - App Preview */}
          <div className="flex-1 max-w-lg animate-fade-in" style={{ animationDelay: '0.5s' }}>
            <div className="relative">
              {/* Phone Mockup */}
              <div className="relative mx-auto w-72 md:w-80">
                <div className="bg-card rounded-[3rem] p-3 shadow-elevated">
                  <div className="bg-background rounded-[2.5rem] overflow-hidden">
                    {/* Status Bar */}
                    <div className="bg-primary px-6 py-2 flex justify-between items-center text-primary-foreground text-xs">
                      <span>9:41</span>
                      <div className="flex gap-1">
                        <span>📶</span>
                        <span>🔋</span>
                      </div>
                    </div>
                    {/* App Content Preview */}
                    <div className="p-4 space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center">
                          <span className="text-2xl">👨‍🌾</span>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Welcome back,</p>
                          <p className="font-semibold text-foreground">John Kamau</p>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-2">
                        <div className="bg-muted p-3 rounded-xl">
                          <span className="text-2xl">🌾</span>
                          <p className="text-xs text-muted-foreground mt-1">Disease Scan</p>
                        </div>
                        <div className="bg-muted p-3 rounded-xl">
                          <span className="text-2xl">📊</span>
                          <p className="text-xs text-muted-foreground mt-1">Market Prices</p>
                        </div>
                        <div className="bg-muted p-3 rounded-xl">
                          <span className="text-2xl">🤝</span>
                          <p className="text-xs text-muted-foreground mt-1">Find Buyers</p>
                        </div>
                        <div className="bg-muted p-3 rounded-xl">
                          <span className="text-2xl">🌤️</span>
                          <p className="text-xs text-muted-foreground mt-1">Weather</p>
                        </div>
                      </div>

                      <div className="bg-secondary/30 p-3 rounded-xl border border-secondary">
                        <p className="text-xs font-medium text-foreground">🔔 Price Alert</p>
                        <p className="text-xs text-muted-foreground">Maize prices up 7% in Nakuru</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Floating Cards */}
                <div className="absolute -left-8 top-1/4 bg-card p-3 rounded-xl shadow-elevated animate-float">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-secondary/30 flex items-center justify-center">
                      <span className="text-lg">✅</span>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-foreground">Disease Detected</p>
                      <p className="text-xs text-muted-foreground">94% accuracy</p>
                    </div>
                  </div>
                </div>

                <div className="absolute -right-8 bottom-1/4 bg-card p-3 rounded-xl shadow-elevated animate-float" style={{ animationDelay: '1s' }}>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-accent/30 flex items-center justify-center">
                      <span className="text-lg">📈</span>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-foreground">KES 45/kg</p>
                      <p className="text-xs text-secondary">+7.1% today</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Wave Divider */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" className="w-full h-auto fill-background">
          <path d="M0,64L48,69.3C96,75,192,85,288,80C384,75,480,53,576,48C672,43,768,53,864,58.7C960,64,1056,64,1152,58.7C1248,53,1344,43,1392,37.3L1440,32L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z" />
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;
