import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X, Leaf } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-primary/95 backdrop-blur-md border-b border-primary-foreground/10">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 text-primary-foreground">
            <div className="w-10 h-10 rounded-xl accent-gradient flex items-center justify-center shadow-glow">
              <Leaf className="w-6 h-6 text-accent-foreground" />
            </div>
            <span className="text-xl font-bold">AgriConnect</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
              Features
            </a>
            <a href="#how-it-works" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
              How it Works
            </a>
            <a href="#pricing" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
              Pricing
            </a>
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-3">
            <Link to="/login">
              <Button variant="heroOutline" size="sm">
                Log In
              </Button>
            </Link>
            <Link to="/signup">
              <Button variant="hero" size="sm">
                Get Started
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-primary-foreground"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-primary-foreground/10 animate-fade-in">
            <div className="flex flex-col gap-4">
              <a href="#features" className="text-primary-foreground/80 hover:text-primary-foreground py-2">
                Features
              </a>
              <a href="#how-it-works" className="text-primary-foreground/80 hover:text-primary-foreground py-2">
                How it Works
              </a>
              <a href="#pricing" className="text-primary-foreground/80 hover:text-primary-foreground py-2">
                Pricing
              </a>
              <div className="flex flex-col gap-2 pt-4 border-t border-primary-foreground/10">
                <Link to="/login">
                  <Button variant="heroOutline" className="w-full">
                    Log In
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button variant="hero" className="w-full">
                    Get Started
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
