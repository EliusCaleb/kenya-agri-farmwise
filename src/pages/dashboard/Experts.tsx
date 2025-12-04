import { Star, MessageSquare, Video, Clock, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { mockExperts } from '@/lib/mockData';

const Experts = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-foreground">
          Expert Consultation
        </h1>
        <p className="text-muted-foreground">
          Get personalized advice from certified agricultural experts
        </p>
      </div>

      {/* Expert Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockExperts.map((expert) => (
          <div
            key={expert.id}
            className="bg-card rounded-2xl border border-border overflow-hidden hover:shadow-elevated transition-all duration-200"
          >
            {/* Header */}
            <div className="relative h-20 primary-gradient">
              <div className="absolute -bottom-10 left-1/2 -translate-x-1/2">
                <div className="w-20 h-20 rounded-full border-4 border-card bg-muted flex items-center justify-center text-3xl overflow-hidden">
                  <img
                    src={expert.image}
                    alt={expert.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none';
                      (e.target as HTMLImageElement).parentElement!.innerHTML = '👨‍⚕️';
                    }}
                  />
                </div>
              </div>
              {/* Availability Badge */}
              <div className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-medium ${
                expert.available
                  ? 'bg-secondary/20 text-secondary border border-secondary/30'
                  : 'bg-muted text-muted-foreground border border-border'
              }`}>
                {expert.available ? 'Available' : 'Busy'}
              </div>
            </div>

            {/* Content */}
            <div className="pt-14 p-6 text-center">
              <h3 className="text-lg font-semibold text-foreground">{expert.name}</h3>
              <p className="text-muted-foreground mb-3">{expert.specialization}</p>
              
              {/* Rating */}
              <div className="flex items-center justify-center gap-1 mb-4">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(expert.rating)
                          ? 'fill-accent text-accent'
                          : 'text-muted'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-foreground font-medium ml-1">{expert.rating}</span>
                <span className="text-sm text-muted-foreground">({expert.reviews} reviews)</span>
              </div>

              {/* Languages */}
              <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground mb-4">
                <Globe className="w-4 h-4" />
                {expert.languages.join(', ')}
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <Button
                  variant={expert.available ? 'accent' : 'outline'}
                  className="flex-1"
                  disabled={!expert.available}
                >
                  <MessageSquare className="w-4 h-4" />
                  Chat
                </Button>
                <Button
                  variant="outline"
                  className="flex-1"
                  disabled={!expert.available}
                >
                  <Video className="w-4 h-4" />
                  Video
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Info Card */}
      <div className="bg-muted/50 rounded-2xl p-6 border border-border">
        <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
          <Clock className="w-5 h-5 text-primary" />
          How Expert Consultation Works
        </h3>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">1</div>
            <div>
              <p className="font-medium text-foreground">Select an Expert</p>
              <p className="text-sm text-muted-foreground">Choose based on specialization and availability</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">2</div>
            <div>
              <p className="font-medium text-foreground">Start a Conversation</p>
              <p className="text-sm text-muted-foreground">Chat or schedule a video call</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">3</div>
            <div>
              <p className="font-medium text-foreground">Get Advice</p>
              <p className="text-sm text-muted-foreground">Receive personalized recommendations</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Experts;
