import { useState, useRef } from 'react';
import { Upload, Camera, X, AlertTriangle, CheckCircle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { mockDiseases } from '@/lib/mockData';

const DiseaseDetection = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<typeof mockDiseases[0] | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
        setResult(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAnalyze = () => {
    setIsAnalyzing(true);
    // Simulate AI analysis - Replace with actual API call
    setTimeout(() => {
      const randomDisease = mockDiseases[Math.floor(Math.random() * mockDiseases.length)];
      setResult(randomDisease);
      setIsAnalyzing(false);
    }, 2500);
  };

  const clearImage = () => {
    setSelectedImage(null);
    setResult(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'High':
        return 'bg-destructive/10 text-destructive border-destructive/20';
      case 'Medium':
        return 'bg-accent/10 text-accent border-accent/20';
      default:
        return 'bg-secondary/10 text-secondary border-secondary/20';
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-foreground">
          AI Crop Disease Detection
        </h1>
        <p className="text-muted-foreground">
          Upload a photo of your crop to get instant AI-powered diagnosis
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Upload Section */}
        <div className="bg-card rounded-2xl border border-border p-6">
          <h2 className="text-lg font-semibold text-foreground mb-4">Upload Image</h2>
          
          {!selectedImage ? (
            <div
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-border rounded-xl p-8 text-center cursor-pointer hover:border-primary/50 hover:bg-muted/50 transition-colors"
            >
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
                <Upload className="w-8 h-8 text-muted-foreground" />
              </div>
              <p className="font-medium text-foreground mb-2">
                Click to upload or drag and drop
              </p>
              <p className="text-sm text-muted-foreground">
                PNG, JPG or WEBP (max. 10MB)
              </p>
            </div>
          ) : (
            <div className="relative">
              <img
                src={selectedImage}
                alt="Selected crop"
                className="w-full h-64 object-cover rounded-xl"
              />
              <button
                onClick={clearImage}
                className="absolute top-2 right-2 p-2 bg-background/80 backdrop-blur-sm rounded-full hover:bg-background transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          )}

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            className="hidden"
          />

          <div className="flex gap-3 mt-4">
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => fileInputRef.current?.click()}
            >
              <Upload className="w-4 h-4" />
              Choose File
            </Button>
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => fileInputRef.current?.click()}
            >
              <Camera className="w-4 h-4" />
              Take Photo
            </Button>
          </div>

          {selectedImage && (
            <Button
              variant="accent"
              size="lg"
              className="w-full mt-4"
              onClick={handleAnalyze}
              disabled={isAnalyzing}
            >
              {isAnalyzing ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Analyzing...
                </>
              ) : (
                'Analyze Crop'
              )}
            </Button>
          )}
        </div>

        {/* Results Section */}
        <div className="bg-card rounded-2xl border border-border p-6">
          <h2 className="text-lg font-semibold text-foreground mb-4">Analysis Results</h2>
          
          {isAnalyzing ? (
            <div className="flex flex-col items-center justify-center h-64">
              <Loader2 className="w-12 h-12 text-primary animate-spin mb-4" />
              <p className="font-medium text-foreground">Analyzing your crop...</p>
              <p className="text-sm text-muted-foreground">This may take a few seconds</p>
            </div>
          ) : result ? (
            <div className="space-y-6">
              {/* Disease Name & Confidence */}
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-xl font-bold text-foreground">{result.name}</h3>
                  <p className="text-muted-foreground">Detected with {result.confidence}% confidence</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getSeverityColor(result.severity)}`}>
                  {result.severity} Severity
                </span>
              </div>

              {/* Progress Bar */}
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-muted-foreground">Confidence</span>
                  <span className="font-medium text-foreground">{result.confidence}%</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full accent-gradient transition-all duration-500"
                    style={{ width: `${result.confidence}%` }}
                  />
                </div>
              </div>

              {/* Symptoms */}
              <div>
                <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-accent" />
                  Symptoms
                </h4>
                <ul className="space-y-1">
                  {result.symptoms.map((symptom, i) => (
                    <li key={i} className="text-muted-foreground text-sm flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />
                      {symptom}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Treatment */}
              <div>
                <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-secondary" />
                  Recommended Treatment
                </h4>
                <ul className="space-y-1">
                  {result.treatment.map((item, i) => (
                    <li key={i} className="text-muted-foreground text-sm flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-secondary mt-2 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Prevention */}
              <div className="p-4 rounded-xl bg-muted/50">
                <h4 className="font-semibold text-foreground mb-2">Prevention Tips</h4>
                <ul className="space-y-1">
                  {result.prevention.map((tip, i) => (
                    <li key={i} className="text-sm text-muted-foreground">
                      • {tip}
                    </li>
                  ))}
                </ul>
              </div>

              <Button variant="outline" className="w-full">
                Get Expert Consultation
              </Button>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-64 text-center">
              <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
                <Upload className="w-8 h-8 text-muted-foreground" />
              </div>
              <p className="font-medium text-foreground mb-2">No analysis yet</p>
              <p className="text-sm text-muted-foreground">
                Upload a photo of your crop and click "Analyze" to get results
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DiseaseDetection;
