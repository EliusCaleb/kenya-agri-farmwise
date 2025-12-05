import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Leaf, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Logout = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const handleLogout = async () => {
      try {
        const { error } = await supabase.auth.signOut();
        
        if (error) {
          toast({
            title: "Error signing out",
            description: error.message,
            variant: "destructive",
          });
          navigate('/dashboard');
          return;
        }

        toast({
          title: "Signed out successfully",
          description: "You have been logged out of your account.",
        });
        
        navigate('/login');
      } catch (err) {
        console.error('Logout error:', err);
        navigate('/login');
      }
    };

    handleLogout();
  }, [navigate, toast]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center space-y-6">
        <div className="w-16 h-16 rounded-2xl accent-gradient flex items-center justify-center mx-auto">
          <Leaf className="w-10 h-10 text-accent-foreground" />
        </div>
        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-foreground">Signing out...</h1>
          <p className="text-muted-foreground">Please wait while we log you out.</p>
        </div>
        <Loader2 className="w-8 h-8 animate-spin text-primary mx-auto" />
      </div>
    </div>
  );
};

export default Logout;
