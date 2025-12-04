import { UserPlus, Camera, DollarSign, Handshake } from 'lucide-react';

const steps = [
  {
    number: '01',
    icon: UserPlus,
    title: 'Create Your Account',
    description: 'Sign up as a farmer or buyer in under 2 minutes. Add your location and crop preferences.',
  },
  {
    number: '02',
    icon: Camera,
    title: 'Scan Your Crops',
    description: 'Use our AI-powered disease detection. Just snap a photo and get instant diagnosis.',
  },
  {
    number: '03',
    icon: DollarSign,
    title: 'Check Market Prices',
    description: 'View real-time prices for your crops across different markets in Kenya.',
  },
  {
    number: '04',
    icon: Handshake,
    title: 'Connect & Sell',
    description: 'List your produce, connect with buyers, and close deals directly through the app.',
  },
];

const HowItWorksSection = () => {
  return (
    <section id="how-it-works" className="py-20 bg-muted/50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-1 rounded-full bg-accent/20 text-accent text-sm font-medium mb-4">
            How It Works
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Start in 4 Simple Steps
          </h2>
          <p className="text-muted-foreground text-lg">
            Getting started with AgriConnect is easy. Follow these steps to transform your farming business.
          </p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connection Line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-border -translate-y-1/2" />
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div
                key={step.number}
                className="relative text-center animate-fade-in"
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                {/* Step Number Badge */}
                <div className="relative z-10 inline-flex items-center justify-center w-20 h-20 rounded-full primary-gradient text-primary-foreground text-2xl font-bold mb-6 shadow-elevated">
                  <step.icon className="w-8 h-8" />
                </div>
                
                {/* Step Number */}
                <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full accent-gradient flex items-center justify-center text-accent-foreground text-sm font-bold shadow-glow">
                  {step.number.slice(-1)}
                </div>

                <h3 className="text-xl font-semibold text-foreground mb-2">
                  {step.title}
                </h3>
                <p className="text-muted-foreground">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
