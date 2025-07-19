'use client';

import React, { useState, useEffect } from 'react';
import { Calendar, MapPin, Plane, Hotel, Activity, Shield, Star, Users, Phone, Globe, CreditCard, Clock, Award, Heart, Stethoscope, Camera, CheckCircle, AlertCircle, Search, Filter, User, Settings, Bell, MessageCircle, FileText, Video } from 'lucide-react';

const MedicalTourismApp = () => {
  const [currentView, setCurrentView] = useState('home');
  const [selectedDestination, setSelectedDestination] = useState('');
  const [selectedProcedure, setProcedure] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [userProfile, setUserProfile] = useState({
    name: '',
    age: '',
    medicalHistory: [],
    preferences: {
      language: 'English',
      currency: 'USD',
      dietaryRestrictions: []
    }
  });
  const [bookingData, setBookingData] = useState({
    procedure: '',
    destination: '',
    dates: '',
    companions: 0,
    insurance: false
  });

  // Sample data
  const destinations = [
    { id: 1, name: 'Morocco', flag: '🇲🇦', savings: '60-80%', specialties: ['Dental', 'Cosmetic'] },
    { id: 2, name: 'Tunisia', flag: '🇹🇳', savings: '50-70%', specialties: ['Cardiac', 'Orthopedic'] },
    { id: 3, name: 'Egypt', flag: '🇪🇬', savings: '65-85%', specialties: ['Eye Surgery', 'Dental'] },
    { id: 4, name: 'Turkey', flag: '🇹🇷', savings: '70-90%', specialties: ['Hair Transplant', 'Cosmetic'] },
    { id: 5, name: 'Mexico', flag: '🇲🇽', savings: '55-75%', specialties: ['Bariatric', 'Dental'] }
  ];

  const procedures = [
    { id: 1, name: 'Dental Implants', icon: <Globe className="w-6 h-6" />, category: 'Dental', avgPrice: '$800-2000' },
    { id: 2, name: 'Rhinoplasty', icon: <Camera className="w-6 h-6" />, category: 'Cosmetic', avgPrice: '$2000-4000' },
    { id: 3, name: 'LASIK Surgery', icon: <Globe className="w-6 h-6" />, category: 'Eye Surgery', avgPrice: '$1000-2500' },
    { id: 4, name: 'Hip Replacement', icon: <Heart className="w-6 h-6" />, category: 'Orthopedic', avgPrice: '$8000-15000' },
    { id: 5, name: 'Gastric Bypass', icon: <Stethoscope className="w-6 h-6" />, category: 'Bariatric', avgPrice: '$4000-8000' },
    { id: 6, name: 'IVF Treatment', icon: <Heart className="w-6 h-6" />, category: 'Fertility', avgPrice: '$3000-6000' }
  ];

  const doctors = [
    {
      id: 1,
      name: 'Dr. Ahmed Hassan',
      specialty: 'Dental Surgeon',
      location: 'Cairo, Egypt',
      rating: 4.9,
      experience: '15 years',
      languages: ['English', 'Arabic', 'French'],
      certifications: ['JCI', 'ISO 9001'],
      price: '$800-1500',
      image: '/api/placeholder/120/120'
    },
    {
      id: 2,
      name: 'Dr. Maria Rodriguez',
      specialty: 'Plastic Surgeon',
      location: 'Cancun, Mexico',
      rating: 4.8,
      experience: '12 years',
      languages: ['English', 'Spanish'],
      certifications: ['JCI', 'ISAPS'],
      price: '$2000-4000',
      image: '/api/placeholder/120/120'
    },
    {
      id: 3,
      name: 'Dr. Mehmet Özkan',
      specialty: 'Hair Transplant Specialist',
      location: 'Istanbul, Turkey',
      rating: 4.9,
      experience: '18 years',
      languages: ['English', 'Turkish', 'German'],
      certifications: ['JCI', 'ISHRS'],
      price: '$1500-3000',
      image: '/api/placeholder/120/120'
    }
  ];

  // Navigation Component
  const Navigation = () => (
    <nav className="bg-white shadow-lg border-b-2 border-blue-500">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-2">
            <Heart className="w-8 h-8 text-blue-600" />
            <span className="text-2xl font-bold text-gray-800">MediTravel</span>
          </div>
          <div className="hidden md:flex space-x-6">
            <button 
              onClick={() => setCurrentView('home')}
              className={`flex items-center space-x-1 px-3 py-2 rounded-lg ${currentView === 'home' ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:text-blue-600'}`}
            >
              <MapPin className="w-4 h-4" />
              <span>Home</span>
            </button>
            <button 
              onClick={() => setCurrentView('search')}
              className={`flex items-center space-x-1 px-3 py-2 rounded-lg ${currentView === 'search' ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:text-blue-600'}`}
            >
              <Search className="w-4 h-4" />
              <span>Search</span>
            </button>
            <button 
              onClick={() => setCurrentView('doctors')}
              className={`flex items-center space-x-1 px-3 py-2 rounded-lg ${currentView === 'doctors' ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:text-blue-600'}`}
            >
              <Stethoscope className="w-4 h-4" />
              <span>Doctors</span>
            </button>
            <button 
              onClick={() => setCurrentView('booking')}
              className={`flex items-center space-x-1 px-3 py-2 rounded-lg ${currentView === 'booking' ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:text-blue-600'}`}
            >
              <Calendar className="w-4 h-4" />
              <span>Book Now</span>
            </button>
          </div>
          <div className="flex items-center space-x-4">
            <Bell className="w-6 h-6 text-gray-600 cursor-pointer" />
            <MessageCircle className="w-6 h-6 text-gray-600 cursor-pointer" />
            <User className="w-6 h-6 text-gray-600 cursor-pointer" />
          </div>
        </div>
      </div>
    </nav>
  );

  // Home Component
  const Home = () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-600 to-purple-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                World-Class Healthcare at Affordable Prices
              </h1>
              <p className="text-xl mb-8 opacity-90">
                Combine your medical treatment with a memorable vacation. Save 50-90% on procedures while exploring beautiful destinations.
              </p>
              <div className="flex space-x-4">
                <button 
                  onClick={() => setCurrentView('search')}
                  className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                >
                  Find Treatment
                </button>
                <button className="border border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors">
                  Learn More
                </button>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="bg-white rounded-2xl p-8 shadow-2xl">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Quick Quote</h3>
                <div className="space-y-4">
                  <select className="w-full p-3 border rounded-lg text-gray-600">
                    <option>Select Procedure</option>
                    {procedures.map(proc => (
                      <option key={proc.id} value={proc.name}>{proc.name}</option>
                    ))}
                  </select>
                  <select className="w-full p-3 border rounded-lg text-gray-600">
                    <option>Select Destination</option>
                    {destinations.map(dest => (
                      <option key={dest.id} value={dest.name}>{dest.flag} {dest.name}</option>
                    ))}
                  </select>
                  <button className="w-full bg-blue-600 text-white p-3 rounded-lg font-semibold hover:bg-blue-700">
                    Get Quote
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
            Everything You Need in One Platform
          </h2>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { icon: <Plane className="w-8 h-8" />, title: 'Flight Booking', desc: 'Best deals on international flights' },
              { icon: <Hotel className="w-8 h-8" />, title: 'Recovery Hotels', desc: 'Medical-friendly accommodations' },
              { icon: <Stethoscope className="w-8 h-8" />, title: 'Verified Doctors', desc: 'Board-certified specialists' },
              { icon: <Shield className="w-8 h-8" />, title: 'Full Insurance', desc: 'Comprehensive medical coverage' }
            ].map((feature, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                <div className="text-blue-600 mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Destinations */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
            Top Medical Tourism Destinations
          </h2>
          <div className="grid md:grid-cols-5 gap-6">
            {destinations.map(dest => (
              <div key={dest.id} className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 hover:shadow-lg transition-shadow cursor-pointer">
                <div className="text-4xl text-center mb-4">{dest.flag}</div>
                <h3 className="text-xl font-semibold text-center text-gray-800 mb-2">{dest.name}</h3>
                <p className="text-green-600 font-semibold text-center mb-3">Save {dest.savings}</p>
                <div className="text-sm text-gray-600 text-center">
                  {dest.specialties.join(', ')}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  // Search Component
  const Search = () => (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Find Your Perfect Treatment</h1>
        
        {/* Search Filters */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="grid md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Procedure</label>
              <select 
                value={selectedProcedure}
                onChange={(e) => setProcedure(e.target.value)}
                className="w-full p-3 border rounded-lg"
              >
                <option value="">All Procedures</option>
                {procedures.map(proc => (
                  <option key={proc.id} value={proc.name}>{proc.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Destination</label>
              <select 
                value={selectedDestination}
                onChange={(e) => setSelectedDestination(e.target.value)}
                className="w-full p-3 border rounded-lg"
              >
                <option value="">All Destinations</option>
                {destinations.map(dest => (
                  <option key={dest.id} value={dest.name}>{dest.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Price Range</label>
              <select className="w-full p-3 border rounded-lg">
                <option>Any Price</option>
                <option>Under $2,000</option>
                <option>$2,000 - $5,000</option>
                <option>$5,000 - $10,000</option>
                <option>Over $10,000</option>
              </select>
            </div>
            <div className="flex items-end">
              <button className="w-full bg-blue-600 text-white p-3 rounded-lg font-semibold hover:bg-blue-700">
                <Search className="w-5 h-5 inline mr-2" />
                Search
              </button>
            </div>
          </div>
        </div>

        {/* Procedure Categories */}
        <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          {procedures.map(proc => (
            <div key={proc.id} className="bg-white rounded-lg p-4 shadow hover:shadow-lg transition-shadow cursor-pointer">
              <div className="text-blue-600 mb-2">{proc.icon}</div>
              <h3 className="font-semibold text-gray-800 mb-1">{proc.name}</h3>
              <p className="text-sm text-gray-600 mb-2">{proc.category}</p>
              <p className="text-sm text-green-600 font-semibold">{proc.avgPrice}</p>
            </div>
          ))}
        </div>

        {/* Comparison Tool */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Price Comparison</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4">Procedure</th>
                  <th className="text-left py-3 px-4">USA/Canada</th>
                  <th className="text-left py-3 px-4">Morocco</th>
                  <th className="text-left py-3 px-4">Turkey</th>
                  <th className="text-left py-3 px-4">Mexico</th>
                  <th className="text-left py-3 px-4">Savings</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="py-3 px-4 font-semibold">Dental Implants</td>
                  <td className="py-3 px-4">$4,000</td>
                  <td className="py-3 px-4 text-green-600">$1,200</td>
                  <td className="py-3 px-4 text-green-600">$800</td>
                  <td className="py-3 px-4 text-green-600">$1,000</td>
                  <td className="py-3 px-4 text-green-600 font-semibold">Up to 80%</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4 font-semibold">Rhinoplasty</td>
                  <td className="py-3 px-4">$8,000</td>
                  <td className="py-3 px-4 text-green-600">$3,500</td>
                  <td className="py-3 px-4 text-green-600">$2,500</td>
                  <td className="py-3 px-4 text-green-600">$3,000</td>
                  <td className="py-3 px-4 text-green-600 font-semibold">Up to 70%</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-semibold">Hip Replacement</td>
                  <td className="py-3 px-4">$40,000</td>
                  <td className="py-3 px-4 text-green-600">$12,000</td>
                  <td className="py-3 px-4 text-green-600">$10,000</td>
                  <td className="py-3 px-4 text-green-600">$15,000</td>
                  <td className="py-3 px-4 text-green-600 font-semibold">Up to 75%</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );

  // Doctors Component
  const Doctors = () => (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Verified Medical Professionals</h1>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {doctors.map(doctor => (
            <div key={doctor.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className="p-6">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
                    <User className="w-8 h-8 text-gray-500" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800">{doctor.name}</h3>
                    <p className="text-gray-600">{doctor.specialty}</p>
                    <p className="text-sm text-gray-500 flex items-center">
                      <MapPin className="w-4 h-4 mr-1" />
                      {doctor.location}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2 mb-3">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`w-4 h-4 ${i < Math.floor(doctor.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                    ))}
                  </div>
                  <span className="font-semibold">{doctor.rating}</span>
                  <span className="text-gray-500">• {doctor.experience}</span>
                </div>
                
                <div className="mb-4">
                  <p className="text-sm text-gray-600 mb-2">Languages:</p>
                  <div className="flex space-x-1">
                    {doctor.languages.map(lang => (
                      <span key={lang} className="bg-blue-100 text-blue-600 text-xs px-2 py-1 rounded">{lang}</span>
                    ))}
                  </div>
                </div>
                
                <div className="mb-4">
                  <p className="text-sm text-gray-600 mb-2">Certifications:</p>
                  <div className="flex space-x-1">
                    {doctor.certifications.map(cert => (
                      <span key={cert} className="bg-green-100 text-green-600 text-xs px-2 py-1 rounded flex items-center">
                        <Award className="w-3 h-3 mr-1" />
                        {cert}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="flex items-center justify-between mb-4">
                  <span className="text-lg font-bold text-green-600">{doctor.price}</span>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-1">
                    <Video className="w-4 h-4" />
                    <span>Consult</span>
                  </button>
                </div>
                
                <button className="w-full bg-gray-100 text-gray-800 py-2 rounded-lg hover:bg-gray-200 font-semibold">
                  View Profile
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Trust & Safety */}
        <div className="mt-12 bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Trust & Safety Features</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="flex items-start space-x-3">
              <Shield className="w-6 h-6 text-green-600 mt-1" />
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">Verified Credentials</h3>
                <p className="text-gray-600">All doctors undergo rigorous verification of licenses and certifications.</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <CheckCircle className="w-6 h-6 text-green-600 mt-1" />
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">Patient Reviews</h3>
                <p className="text-gray-600">Real reviews from verified patients who completed treatments.</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <Phone className="w-6 h-6 text-green-600 mt-1" />
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">24/7 Support</h3>
                <p className="text-gray-600">Round-the-clock medical concierge and emergency assistance.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Booking Component
  const Booking = () => (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Book Your Medical Journey</h1>
        
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Booking Form */}
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Treatment Details</h2>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Select Procedure</label>
                  <select 
                    value={bookingData.procedure}
                    onChange={(e) => setBookingData({...bookingData, procedure: e.target.value})}
                    className="w-full p-3 border rounded-lg"
                  >
                    <option value="">Choose procedure...</option>
                    {procedures.map(proc => (
                      <option key={proc.id} value={proc.name}>{proc.name}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Destination</label>
                  <select 
                    value={bookingData.destination}
                    onChange={(e) => setBookingData({...bookingData, destination: e.target.value})}
                    className="w-full p-3 border rounded-lg"
                  >
                    <option value="">Choose destination...</option>
                    {destinations.map(dest => (
                      <option key={dest.id} value={dest.name}>{dest.flag} {dest.name}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Travel Dates</label>
                  <input 
                    type="date"
                    value={bookingData.dates}
                    onChange={(e) => setBookingData({...bookingData, dates: e.target.value})}
                    className="w-full p-3 border rounded-lg"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Companions</label>
                  <select 
                    value={bookingData.companions}
                    onChange={(e) => setBookingData({...bookingData, companions: parseInt(e.target.value)})}
                    className="w-full p-3 border rounded-lg"
                  >
                    <option value={0}>Traveling alone</option>
                    <option value={1}>1 companion</option>
                    <option value={2}>2 companions</option>
                    <option value={3}>3+ companions</option>
                  </select>
                </div>
                
                <div className="flex items-center space-x-2">
                  <input 
                    type="checkbox"
                    id="insurance"
                    checked={bookingData.insurance}
                    onChange={(e) => setBookingData({...bookingData, insurance: e.target.checked})}
                    className="w-5 h-5"
                  />
                  <label htmlFor="insurance" className="text-sm text-gray-700">
                    Add medical tourism insurance
                  </label>
                </div>
              </div>
            </div>
            
            {/* Package Inclusions */}
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Package Includes</h2>
              <div className="space-y-4">
                {[
                  { icon: <Plane className="w-5 h-5" />, title: 'Round-trip Flights', desc: 'Economy class tickets with medical baggage allowance' },
                  { icon: <Hotel className="w-5 h-5" />, title: 'Recovery Hotel', desc: '5-star medical-friendly accommodation' },
                  { icon: <Stethoscope className="w-5 h-5" />, title: 'Medical Treatment', desc: 'Complete procedure with certified specialists' },
                  { icon: <Car className="w-5 h-5" />, title: 'Transportation', desc: 'Airport transfers and medical appointments' },
                  { icon: <Activity className="w-5 h-5" />, title: 'Recovery Activities', desc: 'Gentle sightseeing and wellness activities' },
                  { icon: <Shield className="w-5 h-5" />, title: 'Medical Insurance', desc: 'Comprehensive coverage for treatment and recovery' },
                  { icon: <Phone className="w-5 h-5" />, title: '24/7 Concierge', desc: 'Dedicated medical tourism coordinator' },
                  { icon: <Globe className="w-5 h-5" />, title: 'Translation Services', desc: 'Professional medical interpreters' }
                ].map((item, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <div className="text-green-600">{item.icon}</div>
                    <div>
                      <h3 className="font-semibold text-gray-800">{item.title}</h3>
                      <p className="text-sm text-gray-600">{item.desc}</p>
                    </div>
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Price Estimation */}
          <div className="mt-8 p-6 bg-blue-50 rounded-lg">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Estimated Package Cost</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Medical Procedure</span>
                <span>$3,500</span>
              </div>
              <div className="flex justify-between">
                <span>Flights (2 passengers)</span>
                <span>$1,200</span>
              </div>
              <div className="flex justify-between">
                <span>Hotel (7 nights)</span>
                <span>$800</span>
              </div>
              <div className="flex justify-between">
                <span>Transportation & Activities</span>
                <span>$300</span>
              </div>
              <div className="flex justify-between">
                <span>Medical Insurance</span>
                <span>$200</span>
              </div>
              <div className="border-t pt-2 mt-2 flex justify-between font-bold text-lg">
                <span>Total Package</span>
                <span className="text-green-600">$6,000</span>
              </div>
              <p className="text-sm text-green-600">Save up to $15,000 compared to home country!</p>
            </div>
          </div>
          
          <div className="mt-8 flex space-x-4">
            <button className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
              Book Now
            </button>
            <button className="flex-1 border border-blue-600 text-blue-600 py-3 px-6 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
              Get Detailed Quote
            </button>
          </div>
        </div>
        
        {/* Additional Services */}
        <div className="mt-8 bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Additional Services</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-4 border rounded-lg hover:border-blue-500 transition-colors">
              <Video className="w-8 h-8 text-blue-600 mb-3" />
              <h3 className="font-semibold text-gray-800 mb-2">Pre-Treatment Consultation</h3>
              <p className="text-sm text-gray-600 mb-3">Video call with your assigned doctor</p>
              <p className="text-green-600 font-semibold">$50</p>
            </div>
            <div className="p-4 border rounded-lg hover:border-blue-500 transition-colors">
              <FileText className="w-8 h-8 text-blue-600 mb-3" />
              <h3 className="font-semibold text-gray-800 mb-2">Medical Records Transfer</h3>
              <p className="text-sm text-gray-600 mb-3">Secure transfer of your medical history</p>
              <p className="text-green-600 font-semibold">$75</p>
            </div>
            <div className="p-4 border rounded-lg hover:border-blue-500 transition-colors">
              <Globe className="w-8 h-8 text-blue-600 mb-3" />
              <h3 className="font-semibold text-gray-800 mb-2">Personal Translator</h3>
              <p className="text-sm text-gray-600 mb-3">Dedicated interpreter for your stay</p>
              <p className="text-green-600 font-semibold">$200/day</p>
            </div>
            <div className="p-4 border rounded-lg hover:border-blue-500 transition-colors">
              <Phone className="w-8 h-8 text-blue-600 mb-3" />
              <h3 className="font-semibold text-gray-800 mb-2">Post-Care Follow-up</h3>
              <p className="text-sm text-gray-600 mb-3">3-month telemedicine support</p>
              <p className="text-green-600 font-semibold">$150</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Profile Component
  const Profile = () => (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Your Medical Profile</h1>
        
        <div className="grid md:grid-cols-3 gap-8">
          {/* Profile Info */}
          <div className="md:col-span-2">
            <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Personal Information</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                  <input 
                    type="text"
                    value={userProfile.name}
                    onChange={(e) => setUserProfile({...userProfile, name: e.target.value})}
                    className="w-full p-3 border rounded-lg"
                    placeholder="Enter your full name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Age</label>
                  <input 
                    type="number"
                    value={userProfile.age}
                    onChange={(e) => setUserProfile({...userProfile, age: e.target.value})}
                    className="w-full p-3 border rounded-lg"
                    placeholder="Enter your age"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Language</label>
                  <select 
                    value={userProfile.preferences.language}
                    onChange={(e) => setUserProfile({
                      ...userProfile, 
                      preferences: {...userProfile.preferences, language: e.target.value}
                    })}
                    className="w-full p-3 border rounded-lg"
                  >
                    <option>English</option>
                    <option>French</option>
                    <option>Spanish</option>
                    <option>German</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Currency</label>
                  <select 
                    value={userProfile.preferences.currency}
                    onChange={(e) => setUserProfile({
                      ...userProfile, 
                      preferences: {...userProfile.preferences, currency: e.target.value}
                    })}
                    className="w-full p-3 border rounded-lg"
                  >
                    <option>USD</option>
                    <option>EUR</option>
                    <option>CAD</option>
                    <option>GBP</option>
                  </select>
                </div>
              </div>
            </div>
            
            {/* Medical History */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Medical History</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Allergies</label>
                  <textarea 
                    className="w-full p-3 border rounded-lg h-20"
                    placeholder="List any known allergies..."
                  ></textarea>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Current Medications</label>
                  <textarea 
                    className="w-full p-3 border rounded-lg h-20"
                    placeholder="List current medications..."
                  ></textarea>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Previous Surgeries</label>
                  <textarea 
                    className="w-full p-3 border rounded-lg h-20"
                    placeholder="List any previous surgeries..."
                  ></textarea>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Dietary Restrictions</label>
                  <div className="grid grid-cols-2 gap-2">
                    {['Vegetarian', 'Vegan', 'Gluten-Free', 'Diabetic', 'Halal', 'Kosher'].map(diet => (
                      <label key={diet} className="flex items-center space-x-2">
                        <input type="checkbox" className="w-4 h-4" />
                        <span className="text-sm">{diet}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Quick Actions */}
          <div>
            <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 flex items-center justify-center space-x-2">
                  <FileText className="w-4 h-4" />
                  <span>Upload Medical Records</span>
                </button>
                <button className="w-full bg-green-600 text-white p-3 rounded-lg hover:bg-green-700 flex items-center justify-center space-x-2">
                  <Video className="w-4 h-4" />
                  <span>Schedule Consultation</span>
                </button>
                <button className="w-full bg-purple-600 text-white p-3 rounded-lg hover:bg-purple-700 flex items-center justify-center space-x-2">
                  <MessageCircle className="w-4 h-4" />
                  <span>Contact Support</span>
                </button>
              </div>
            </div>
            
            {/* Security Features */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Security & Privacy</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">Two-Factor Authentication</span>
                  <div className="w-10 h-6 bg-green-500 rounded-full flex items-center justify-end px-1">
                    <div className="w-4 h-4 bg-white rounded-full"></div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">Data Encryption</span>
                  <CheckCircle className="w-5 h-5 text-green-600" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">HIPAA Compliant</span>
                  <CheckCircle className="w-5 h-5 text-green-600" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">GDPR Compliant</span>
                  <CheckCircle className="w-5 h-5 text-green-600" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Dashboard Component
  const Dashboard = () => (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Your Medical Journey Dashboard</h1>
        
        {/* Current Bookings */}
        <div className="grid lg:grid-cols-3 gap-8 mb-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Current Booking</h2>
              <div className="border-l-4 border-blue-500 pl-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Dental Implants in Morocco</h3>
                <p className="text-gray-600 mb-4">Dr. Ahmed Hassan • Casablanca Dental Center</p>
                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-5 h-5 text-blue-600" />
                    <span>March 15-22, 2025</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-5 h-5 text-blue-600" />
                    <span>Casablanca, Morocco</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Users className="w-5 h-5 text-blue-600" />
                    <span>2 travelers</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CreditCard className="w-5 h-5 text-blue-600" />
                    <span>$4,500 total</span>
                  </div>
                </div>
                <div className="flex space-x-3">
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                    View Details
                  </button>
                  <button className="border border-blue-600 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-50">
                    Contact Coordinator
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Quick Stats */}
          <div>
            <div className="bg-gradient-to-br from-blue-500 to-purple-600 text-white rounded-xl p-6 mb-4">
              <h3 className="text-lg font-semibold mb-2">Estimated Savings</h3>
              <p className="text-3xl font-bold">$12,500</p>
              <p className="text-sm opacity-80">vs. home country treatment</p>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-4">
              <h4 className="font-semibold text-gray-800 mb-3">Treatment Progress</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Consultation</span>
                  <CheckCircle className="w-5 h-5 text-green-600" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Travel Booked</span>
                  <CheckCircle className="w-5 h-5 text-green-600" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Pre-Treatment</span>
                  <Clock className="w-5 h-5 text-yellow-500" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Treatment</span>
                  <Clock className="w-5 h-5 text-gray-300" />
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Timeline */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Treatment Timeline</h2>
          <div className="space-y-6">
            {[
              { date: 'Feb 1', title: 'Initial Consultation', status: 'completed', desc: 'Video call with Dr. Hassan' },
              { date: 'Feb 15', title: 'Medical Records Reviewed', status: 'completed', desc: 'Treatment plan approved' },
              { date: 'Mar 1', title: 'Final Pre-Treatment Check', status: 'upcoming', desc: 'Blood work and X-rays' },
              { date: 'Mar 15', title: 'Departure Day', status: 'upcoming', desc: 'Flight to Casablanca' },
              { date: 'Mar 17', title: 'Treatment Begins', status: 'upcoming', desc: 'Dental implant procedure' },
              { date: 'Mar 22', title: 'Return Home', status: 'upcoming', desc: 'Recovery and follow-up care' }
            ].map((item, index) => (
              <div key={index} className="flex items-start space-x-4">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                  item.status === 'completed' ? 'bg-green-100 text-green-600' :
                  item.status === 'upcoming' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-400'
                }`}>
                  {item.status === 'completed' ? (
                    <CheckCircle className="w-6 h-6" />
                  ) : (
                    <Clock className="w-6 h-6" />
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <h3 className="font-semibold text-gray-800">{item.title}</h3>
                    <span className="text-sm text-gray-500">{item.date}</span>
                  </div>
                  <p className="text-gray-600">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Support & Resources */}
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Support Center</h2>
            <div className="space-y-4">
              <button className="w-full text-left p-4 border rounded-lg hover:border-blue-500 transition-colors">
                <div className="flex items-center space-x-3">
                  <Phone className="w-6 h-6 text-blue-600" />
                  <div>
                    <h3 className="font-semibold text-gray-800">24/7 Medical Concierge</h3>
                    <p className="text-sm text-gray-600">Get instant help with any concerns</p>
                  </div>
                </div>
              </button>
              <button className="w-full text-left p-4 border rounded-lg hover:border-blue-500 transition-colors">
                <div className="flex items-center space-x-3">
                  <MessageCircle className="w-6 h-6 text-green-600" />
                  <div>
                    <h3 className="font-semibold text-gray-800">Live Chat Support</h3>
                    <p className="text-sm text-gray-600">Chat with our support team</p>
                  </div>
                </div>
              </button>
              <button className="w-full text-left p-4 border rounded-lg hover:border-blue-500 transition-colors">
                <div className="flex items-center space-x-3">
                  <Video className="w-6 h-6 text-purple-600" />
                  <div>
                    <h3 className="font-semibold text-gray-800">Virtual Consultations</h3>
                    <p className="text-sm text-gray-600">Video calls with your doctor</p>
                  </div>
                </div>
              </button>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Resources</h2>
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 rounded-lg">
                <h3 className="font-semibold text-blue-800 mb-2">Travel Preparation Guide</h3>
                <p className="text-sm text-blue-600 mb-3">Everything you need to know before you travel</p>
                <button className="text-blue-600 hover:text-blue-700 text-sm font-semibold">
                  Read More →
                </button>
              </div>
              <div className="p-4 bg-green-50 rounded-lg">
                <h3 className="font-semibold text-green-800 mb-2">Recovery & Aftercare</h3>
                <p className="text-sm text-green-600 mb-3">Post-treatment care instructions and tips</p>
                <button className="text-green-600 hover:text-green-700 text-sm font-semibold">
                  View Guide →
                </button>
              </div>
              <div className="p-4 bg-purple-50 rounded-lg">
                <h3 className="font-semibold text-purple-800 mb-2">Insurance Claims</h3>
                <p className="text-sm text-purple-600 mb-3">How to file claims with your insurance</p>
                <button className="text-purple-600 hover:text-purple-700 text-sm font-semibold">
                  Learn More →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Main render logic
  const renderView = () => {
    switch (currentView) {
      case 'home':
        return <Home />;
      case 'search':
        return <Search />;
      case 'doctors':
        return <Doctors />;
      case 'booking':
        return <Booking />;
      case 'profile':
        return <Profile />;
      case 'dashboard':
        return <Dashboard />;
      default:
        return <Home />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      {renderView()}
      
      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Heart className="w-6 h-6 text-blue-400" />
                <span className="text-xl font-bold">MediTravel</span>
              </div>
              <p className="text-gray-400 mb-4">
                Your trusted partner for safe, affordable, and high-quality medical tourism experiences.
              </p>
              <div className="flex space-x-4">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm">f</span>
                </div>
                <div className="w-8 h-8 bg-blue-400 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm">t</span>
                </div>
                <div className="w-8 h-8 bg-blue-700 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm">in</span>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Services</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Medical Tourism</li>
                <li>Travel Booking</li>
                <li>Doctor Verification</li>
                <li>Insurance Coverage</li>
                <li>24/7 Support</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Destinations</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Morocco</li>
                <li>Tunisia</li>
                <li>Egypt</li>
                <li>Turkey</li>
                <li>Mexico</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact</h3>
              <div className="space-y-2 text-gray-400">
                <div className="flex items-center space-x-2">
                  <Phone className="w-4 h-4" />
                  <span>+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MessageCircle className="w-4 h-4" />
                  <span>support@meditravel.com</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4" />
                  <span>New York, NY 10001</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-8 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-400 mb-4 md:mb-0">
                © 2025 MediTravel. All rights reserved.
              </p>
              <div className="flex space-x-6 text-gray-400">
                <button className="hover:text-white">Privacy Policy</button>
                <button className="hover:text-white">Terms of Service</button>
                <button className="hover:text-white">HIPAA Compliance</button>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MedicalTourismApp;
              
