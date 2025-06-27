import React, { useState } from 'react';
import { Gift, Youtube, Upload, Smartphone, CheckCircle, ArrowRight, Users, Shield, Clock } from 'lucide-react';

type Step = 'landing' | 'task' | 'form' | 'thankyou';

function App() {
  const [currentStep, setCurrentStep] = useState<Step>('landing');
  const [formData, setFormData] = useState({
    screenshot: null as File | null,
    paymentNumber: ''
  });

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFormData(prev => ({ ...prev, screenshot: file }));
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (formData.screenshot && formData.paymentNumber.trim()) {
      setCurrentStep('thankyou');
    }
  };

  const openYouTubeChannel = () => {
    // Replace with actual YouTube channel URL
    window.open('https://www.youtube.com/channel/YOUR_CHANNEL_ID?sub_confirmation=1', '_blank');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex flex-col">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center gap-2">
            <Gift className="h-8 w-8 text-blue-600" />
            <h1 className="text-xl font-bold text-gray-900">Reward Task</h1>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8 flex-1">
        {/* Landing Section */}
        {currentStep === 'landing' && (
          <div className="text-center space-y-8 animate-fade-in">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium">
                <Gift className="h-4 w-4" />
                Limited Time Offer
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight">
                🎁 Complete Task &<br />
                <span className="text-blue-600">Get 100 Rupees</span>
              </h1>
              
              <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                Subscribe to our YouTube channel and earn instant rewards through JazzCash or EasyPaisa. 
                It's that simple!
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md mx-auto border border-gray-100">
              <div className="space-y-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Gift className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">₨100 Reward</h3>
                  <p className="text-gray-600">Instant payment via mobile wallet</p>
                </div>
                
                <button
                  onClick={() => setCurrentStep('task')}
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 transform hover:scale-105 hover:shadow-lg flex items-center justify-center gap-2"
                >
                  Open Task
                  <ArrowRight className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Task Section */}
        {currentStep === 'task' && (
          <div className="max-w-2xl mx-auto space-y-8 animate-slide-up">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto">
                <Youtube className="h-8 w-8 text-red-600" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900">📌 Your Task</h2>
              <p className="text-lg text-gray-600">Subscribe to our YouTube channel to unlock your reward</p>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
              <div className="space-y-6">
                <div className="text-center space-y-4">
                  <h3 className="text-xl font-semibold text-gray-900">Subscribe to our YouTube Channel</h3>
                  <p className="text-gray-600">Click the button below to open our channel and subscribe</p>
                  
                  <button
                    onClick={openYouTubeChannel}
                    className="bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-xl transition-colors duration-200 flex items-center gap-2 mx-auto"
                  >
                    <Youtube className="h-5 w-5" />
                    Subscribe Now
                  </button>
                </div>

                <div className="border-t pt-6">
                  <p className="text-center text-gray-600 mb-4">
                    After subscribing, return to this page and click below:
                  </p>
                  
                  <button
                    onClick={() => setCurrentStep('form')}
                    className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 transform hover:scale-105"
                  >
                    I Have Subscribed ✓
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Submission Form */}
        {currentStep === 'form' && (
          <div className="max-w-2xl mx-auto space-y-8 animate-slide-up">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                <Upload className="h-8 w-8 text-blue-600" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900">Submit Your Proof</h2>
              <p className="text-lg text-gray-600">Upload screenshot and provide payment details</p>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Upload Screenshot of Subscription *
                  </label>
                  <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-xl hover:border-blue-400 transition-colors">
                    <div className="space-y-1 text-center">
                      <Upload className="mx-auto h-12 w-12 text-gray-400" />
                      <div className="flex text-sm text-gray-600">
                        <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none">
                          <span>Upload a file</span>
                          <input
                            id="file-upload"
                            name="file-upload"
                            type="file"
                            accept="image/*"
                            className="sr-only"
                            onChange={handleFileUpload}
                            required
                          />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                      </div>
                      <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                      {formData.screenshot && (
                        <p className="text-sm text-green-600 font-medium">
                          ✓ {formData.screenshot.name}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                <div>
                  <label htmlFor="payment-number" className="block text-sm font-medium text-gray-700 mb-2">
                    Your JazzCash or EasyPaisa Number *
                  </label>
                  <div className="relative">
                    <Smartphone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="tel"
                      id="payment-number"
                      placeholder="03XXXXXXXXX"
                      value={formData.paymentNumber}
                      onChange={(e) => setFormData(prev => ({ ...prev, paymentNumber: e.target.value }))}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      required
                    />
                  </div>
                  <p className="mt-1 text-xs text-gray-500">
                    We'll send ₨100 to this number within 24 hours
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={!formData.screenshot || !formData.paymentNumber.trim()}
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 transform hover:scale-105 disabled:transform-none disabled:hover:scale-100"
                >
                  Submit for Verification
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Thank You Message */}
        {currentStep === 'thankyou' && (
          <div className="max-w-2xl mx-auto text-center space-y-8 animate-fade-in">
            <div className="space-y-4">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle className="h-12 w-12 text-green-600" />
              </div>
              
              <h2 className="text-4xl font-bold text-gray-900">🎉 Thank You!</h2>
              <p className="text-xl text-gray-600 leading-relaxed">
                We have received your submission. Our team will verify your subscription and 
                send you <span className="font-semibold text-green-600">₨100</span> within 24 hours.
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">What happens next?</h3>
                <div className="space-y-3 text-left">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-bold text-blue-600">1</span>
                    </div>
                    <p className="text-gray-600">We verify your YouTube subscription</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-bold text-blue-600">2</span>
                    </div>
                    <p className="text-gray-600">Payment is processed to your mobile wallet</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <CheckCircle className="h-3 w-3 text-green-600" />
                    </div>
                    <p className="text-gray-600">You receive ₨100 within 24 hours</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer - How It Works */}
      <footer className="bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-4 py-12">
          <div className="text-center space-y-8">
            <h3 className="text-2xl font-bold">How It Works</h3>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="space-y-4">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mx-auto">
                  <Users className="h-6 w-6" />
                </div>
                <h4 className="font-semibold">1. Subscribe</h4>
                <p className="text-gray-300 text-sm">
                  Subscribe to our YouTube channel to support our content
                </p>
              </div>
              
              <div className="space-y-4">
                <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center mx-auto">
                  <Upload className="h-6 w-6" />
                </div>
                <h4 className="font-semibold">2. Submit Proof</h4>
                <p className="text-gray-300 text-sm">
                  Upload screenshot and provide your mobile wallet number
                </p>
              </div>
              
              <div className="space-y-4">
                <div className="w-12 h-12 bg-orange-600 rounded-full flex items-center justify-center mx-auto">
                  <Clock className="h-6 w-6" />
                </div>
                <h4 className="font-semibold">3. Get Rewarded</h4>
                <p className="text-gray-300 text-sm">
                  Receive ₨100 in your account within 24 hours after verification
                </p>
              </div>
            </div>

            <div className="border-t border-gray-800 pt-8">
              <div className="flex items-center justify-center gap-2 text-gray-400">
                <Shield className="h-4 w-4" />
                <span className="text-sm">Secure and verified process</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;