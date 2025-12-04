import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'Joseph Mwangi',
    role: 'Maize Farmer, Nakuru',
    content: 'AgriConnect helped me identify a disease that would have destroyed my entire harvest. The AI detection is incredibly accurate!',
    rating: 5,
    image: '👨‍🌾',
  },
  {
    name: 'Grace Wanjiku',
    role: 'Vegetable Farmer, Kiambu',
    content: 'I used to sell to middlemen at low prices. Now I connect directly with restaurants in Nairobi and earn 40% more.',
    rating: 5,
    image: '👩‍🌾',
  },
  {
    name: 'Peter Ochieng',
    role: 'Coffee Farmer, Nyeri',
    content: 'The market price feature is a game-changer. I now know exactly when and where to sell my coffee for the best returns.',
    rating: 5,
    image: '👨‍🌾',
  },
];

const TestimonialsSection = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-1 rounded-full bg-primary/20 text-primary text-sm font-medium mb-4">
            Testimonials
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Trusted by Farmers Across Kenya
          </h2>
          <p className="text-muted-foreground text-lg">
            Hear from farmers who have transformed their businesses with AgriConnect.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.name}
              className="bg-card p-6 rounded-2xl border border-border relative animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Quote Icon */}
              <Quote className="absolute top-4 right-4 w-8 h-8 text-muted-foreground/20" />
              
              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-accent text-accent" />
                ))}
              </div>

              {/* Content */}
              <p className="text-foreground mb-6 leading-relaxed">
                "{testimonial.content}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center text-2xl">
                  {testimonial.image}
                </div>
                <div>
                  <div className="font-semibold text-foreground">
                    {testimonial.name}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {testimonial.role}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
