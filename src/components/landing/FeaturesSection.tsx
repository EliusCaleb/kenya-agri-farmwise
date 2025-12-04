import { Leaf, BarChart3, Users, CloudSun, MessageSquare, ShieldCheck } from 'lucide-react';

const features = [
  {
    icon: Leaf,
    title: 'AI Crop Disease Detection',
    description: 'Upload a photo of your crop and get instant AI-powered diagnosis with treatment recommendations.',
    color: 'bg-secondary/20 text-secondary',
  },
  {
    icon: BarChart3,
    title: 'Real-Time Market Prices',
    description: 'Access live market prices across Kenya. Know when to sell and where to get the best rates.',
    color: 'bg-accent/20 text-accent',
  },
  {
    icon: Users,
    title: 'Connect with Buyers',
    description: 'List your produce and connect directly with verified buyers. No middlemen, better prices.',
    color: 'bg-primary/20 text-primary',
  },
  {
    icon: CloudSun,
    title: 'Weather Forecasts',
    description: 'Get 7-day weather forecasts and agricultural alerts tailored to your location.',
    color: 'bg-secondary/20 text-secondary',
  },
  {
    icon: MessageSquare,
    title: 'Expert Consultation',
    description: 'Chat with certified agricultural experts for personalized advice and guidance.',
    color: 'bg-accent/20 text-accent',
  },
  {
    icon: ShieldCheck,
    title: 'Secure Transactions',
    description: 'Safe and transparent transactions with buyer verification and payment protection.',
    color: 'bg-primary/20 text-primary',
  },
];

const FeaturesSection = () => {
  return (
    <section id="features" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-1 rounded-full bg-secondary/20 text-secondary text-sm font-medium mb-4">
            Features
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Everything You Need to Succeed
          </h2>
          <p className="text-muted-foreground text-lg">
            From disease detection to market access, we provide all the tools Kenyan farmers need to thrive.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="group bg-card p-6 rounded-2xl border border-border hover:shadow-elevated transition-all duration-300 hover:-translate-y-1 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={`w-14 h-14 rounded-xl ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <feature.icon className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">
                {feature.title}
              </h3>
              <p className="text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
