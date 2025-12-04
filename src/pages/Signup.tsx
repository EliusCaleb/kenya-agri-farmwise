import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Leaf, Mail, Lock, Eye, EyeOff, ArrowLeft, User, Phone, Tractor, ShoppingBag } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [step, setStep] = useState(1);
  const [role, setRole] = useState<'farmer' | 'buyer' | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    county: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Mock registration - Replace with Firebase Auth
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: 'Account Created!',
        description: 'Welcome to AgriConnect. Let\'s get started!',
      });
      navigate('/dashboard');
    }, 1500);
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {/* Back Link */}
          <button
            onClick={() => step > 1 ? setStep(step - 1) : navigate('/')}
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            {step > 1 ? 'Back' : 'Back to home'}
          </button>

          {/* Logo */}
          <div className="flex items-center gap-2 mb-8">
            <div className="w-12 h-12 rounded-xl primary-gradient flex items-center justify-center">
              <Leaf className="w-7 h-7 text-primary-foreground" />
            </div>
            <span className="text-2xl font-bold text-foreground">AgriConnect</span>
          </div>

          {/* Step 1: Role Selection */}
          {step === 1 && (
            <div className="animate-fade-in">
              <h1 className="text-3xl font-bold text-foreground mb-2">Join AgriConnect</h1>
              <p className="text-muted-foreground mb-8">
                First, tell us who you are
              </p>

              <div className="grid gap-4">
                <button
                  onClick={() => { setRole('farmer'); setStep(2); }}
                  className={`p-6 rounded-2xl border-2 transition-all duration-200 text-left ${
                    role === 'farmer'
                      ? 'border-primary bg-primary/5'
                      : 'border-border hover:border-primary/50 hover:bg-muted/50'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-xl bg-secondary/20 flex items-center justify-center">
                      <Tractor className="w-7 h-7 text-secondary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg text-foreground">I'm a Farmer</h3>
                      <p className="text-muted-foreground text-sm">
                        Sell your produce and access farming tools
                      </p>
                    </div>
                  </div>
                </button>

                <button
                  onClick={() => { setRole('buyer'); setStep(2); }}
                  className={`p-6 rounded-2xl border-2 transition-all duration-200 text-left ${
                    role === 'buyer'
                      ? 'border-primary bg-primary/5'
                      : 'border-border hover:border-primary/50 hover:bg-muted/50'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-xl bg-accent/20 flex items-center justify-center">
                      <ShoppingBag className="w-7 h-7 text-accent" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg text-foreground">I'm a Buyer</h3>
                      <p className="text-muted-foreground text-sm">
                        Source fresh produce directly from farmers
                      </p>
                    </div>
                  </div>
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Registration Form */}
          {step === 2 && (
            <div className="animate-fade-in">
              <h1 className="text-3xl font-bold text-foreground mb-2">Create your account</h1>
              <p className="text-muted-foreground mb-8">
                {role === 'farmer' ? 'Start selling your produce today' : 'Connect with farmers across Kenya'}
              </p>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      id="name"
                      type="text"
                      placeholder="John Kamau"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="farmer@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+254 7XX XXX XXX"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="••••••••"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      className="pl-10 pr-10"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Must be at least 8 characters
                  </p>
                </div>

                <Button type="submit" variant="accent" size="lg" className="w-full" disabled={isLoading}>
                  {isLoading ? 'Creating account...' : 'Create Account'}
                </Button>

                <p className="text-xs text-center text-muted-foreground">
                  By signing up, you agree to our{' '}
                  <a href="#" className="text-primary hover:underline">Terms of Service</a>
                  {' '}and{' '}
                  <a href="#" className="text-primary hover:underline">Privacy Policy</a>
                </p>
              </form>
            </div>
          )}

          {/* Sign In Link */}
          <p className="text-center mt-8 text-muted-foreground">
            Already have an account?{' '}
            <Link to="/login" className="text-primary font-medium hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>

      {/* Right Side - Image */}
      <div className="hidden lg:flex flex-1 primary-gradient items-center justify-center p-12 relative overflow-hidden">
        <div className="absolute inset-0 pattern-dots opacity-20" />
        <div className="relative z-10 text-center text-primary-foreground max-w-lg">
          <div className="text-6xl mb-6">{role === 'buyer' ? '🛒' : '👨‍🌾'}</div>
          <h2 className="text-3xl font-bold mb-4">
            {role === 'buyer'
              ? 'Source Fresh Produce Directly'
              : 'Sell More, Earn More'}
          </h2>
          <p className="text-primary-foreground/80 text-lg">
            {role === 'buyer'
              ? 'Connect with verified farmers and get the freshest produce at the best prices.'
              : 'Join 10,000+ farmers already using AgriConnect to grow their businesses.'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
