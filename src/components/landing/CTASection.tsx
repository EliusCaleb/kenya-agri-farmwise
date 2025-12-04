import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, MessageCircle } from 'lucide-react';

const CTASection = () => {
  return (
    <section className="py-20 bg-muted/50 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 pattern-grid opacity-50" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 animate-fade-in">
            Ready to Transform Your Farming Business?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 animate-fade-in" style={{ animationDelay: '0.1s' }}>
            Join thousands of Kenyan farmers already using AgriConnect to increase yields, 
            find better markets, and grow their income.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <Link to="/signup">
              <Button variant="accent" size="xl" className="w-full sm:w-auto">
                Get Started for Free
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
            <a
              href="https://wa.me/254700000000"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="outline" size="xl" className="w-full sm:w-auto">
                <MessageCircle className="w-5 h-5" />
                Chat with AgriBot
              </Button>
            </a>
          </div>

          {/* Support Info */}
          <p className="text-sm text-muted-foreground mt-8 animate-fade-in" style={{ animationDelay: '0.3s' }}>
            No credit card required • Free tier available • Support in English & Swahili
          </p>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
