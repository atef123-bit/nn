import React, { useState } from 'react';
import { Calendar, Clock, Heart, Activity, Cake, Sun, Moon, Timer, Sparkles, Share2, Download, BarChart3, Calculator, Calendar as CalendarIcon, Gift, Hourglass, Baby, Skull, Trophy, PartyPopper } from 'lucide-react';

interface AgeData {
  years: number;
  months: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function App() {
  const [birthDate, setBirthDate] = useState<string>('');
  const [ageData, setAgeData] = useState<AgeData | null>(null);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [showStats, setShowStats] = useState(false);

  const calculateAge = () => {
    const birth = new Date(birthDate);
    const now = new Date();
    
    const diffTime = Math.abs(now.getTime() - birth.getTime());
    const years = Math.floor(diffTime / (1000 * 60 * 60 * 24 * 365.25));
    const months = Math.floor((diffTime % (1000 * 60 * 60 * 24 * 365.25)) / (1000 * 60 * 60 * 24 * 30.44));
    const days = Math.floor((diffTime % (1000 * 60 * 60 * 24 * 30.44)) / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diffTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diffTime % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diffTime % (1000 * 60)) / 1000);

    setAgeData({ years, months, days, hours, minutes, seconds });
  };

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const getZodiacSign = () => {
    if (!birthDate) return '';
    const date = new Date(birthDate);
    const month = date.getMonth() + 1;
    const day = date.getDate();
    
    // Simple zodiac calculation
    const signs = ['Capricorn', 'Aquarius', 'Pisces', 'Aries', 'Taurus', 'Gemini', 
                  'Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpio', 'Sagittarius'];
    const cutoffDates = [20, 19, 20, 20, 20, 21, 22, 22, 22, 23, 22, 21];
    
    let signIndex = month - 1;
    if (day < cutoffDates[month - 1]) {
      signIndex = signIndex === 0 ? 11 : signIndex - 1;
    }
    
    return signs[signIndex];
  };

  const getLifeExpectancy = () => {
    // Average global life expectancy (simplified)
    return 73;
  };

  const shareResults = () => {
    if (ageData) {
      const text = `My age: ${ageData.years} years, ${ageData.months} months, and ${ageData.days} days!`;
      if (navigator.share) {
        navigator.share({
          title: 'My Age Calculation',
          text: text,
        });
      }
    }
  };

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gradient-to-br from-blue-50 to-purple-50'}`}>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-10">
            <div className="flex justify-center items-center gap-2 mb-4">
              <Calendar className="w-10 h-10 text-purple-600" />
              <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
                Age Calculator Pro
              </h1>
            </div>
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              {theme === 'light' ? <Moon className="w-6 h-6" /> : <Sun className="w-6 h-6" />}
            </button>
          </div>

          {/* Input Section */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8">
            <div className="flex flex-col md:flex-row gap-4 items-center">
              <input
                type="date"
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
                className="flex-1 p-3 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700"
              />
              <button
                onClick={calculateAge}
                className="w-full md:w-auto px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
              >
                <Calculator className="w-5 h-5" />
                Calculate Age
              </button>
            </div>
          </div>

          {/* Results Section */}
          {ageData && (
            <div className="space-y-6">
              {/* Main Age Display */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-purple-50 dark:bg-gray-700 rounded-lg">
                    <Cake className="w-6 h-6 mx-auto mb-2 text-purple-600" />
                    <div className="text-3xl font-bold text-purple-600">{ageData.years}</div>
                    <div className="text-gray-600 dark:text-gray-300">Years</div>
                  </div>
                  <div className="text-center p-4 bg-pink-50 dark:bg-gray-700 rounded-lg">
                    <CalendarIcon className="w-6 h-6 mx-auto mb-2 text-pink-600" />
                    <div className="text-3xl font-bold text-pink-600">{ageData.months}</div>
                    <div className="text-gray-600 dark:text-gray-300">Months</div>
                  </div>
                  <div className="text-center p-4 bg-blue-50 dark:bg-gray-700 rounded-lg">
                    <Timer className="w-6 h-6 mx-auto mb-2 text-blue-600" />
                    <div className="text-3xl font-bold text-blue-600">{ageData.days}</div>
                    <div className="text-gray-600 dark:text-gray-300">Days</div>
                  </div>
                </div>
              </div>

              {/* Additional Stats */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
                <button
                  onClick={() => setShowStats(!showStats)}
                  className="w-full flex items-center justify-between p-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <BarChart3 className="w-5 h-5 text-purple-600" />
                    <span className="font-semibold">Detailed Statistics</span>
                  </div>
                  <Sparkles className="w-5 h-5 text-yellow-500" />
                </button>

                {showStats && (
                  <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="stat-card">
                      <Heart className="w-5 h-5 text-red-500" />
                      <div className="text-sm">Heartbeats</div>
                      <div className="font-bold">{(ageData.years * 31536000 * 1.2).toLocaleString()}</div>
                    </div>
                    <div className="stat-card">
                      <Activity className="w-5 h-5 text-green-500" />
                      <div className="text-sm">Breaths Taken</div>
                      <div className="font-bold">{(ageData.years * 31536000 * 16).toLocaleString()}</div>
                    </div>
                    <div className="stat-card">
                      <Baby className="w-5 h-5 text-blue-500" />
                      <div className="text-sm">Zodiac Sign</div>
                      <div className="font-bold">{getZodiacSign()}</div>
                    </div>
                    <div className="stat-card">
                      <Hourglass className="w-5 h-5 text-purple-500" />
                      <div className="text-sm">Life Progress</div>
                      <div className="font-bold">
                        {Math.round((ageData.years / getLifeExpectancy()) * 100)}%
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4 justify-center">
                <button
                  onClick={shareResults}
                  className="action-button bg-blue-500 hover:bg-blue-600"
                >
                  <Share2 className="w-5 h-5" />
                  Share Results
                </button>
                <button
                  onClick={() => window.print()}
                  className="action-button bg-green-500 hover:bg-green-600"
                >
                  <Download className="w-5 h-5" />
                  Save Report
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;