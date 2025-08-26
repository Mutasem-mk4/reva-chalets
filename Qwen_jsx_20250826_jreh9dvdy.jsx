import { 
  Home, 
  Mountain, 
  Star, 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Calendar,
  ChevronRight,
  Image as ImageIcon,
  Users,
  Sparkles
} from 'lucide-react';

const App = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-md z-50 shadow-lg border-b border-amber-100">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Mountain className="w-8 h-8 text-amber-600" />
              <span className="text-2xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                Reva Chalets
              </span>
            </div>
            <div className="hidden md:flex space-x-8">
              <a href="#home" className="text-gray-700 hover:text-amber-600 transition-colors font-medium">Home</a>
              <a href="#chalets" className="text-gray-700 hover:text-amber-600 transition-colors font-medium">Chalets</a>
              <a href="#about" className="text-gray-700 hover:text-amber-600 transition-colors font-medium">About</a>
              <a href="#contact" className="text-gray-700 hover:text-amber-600 transition-colors font-medium">Contact</a>
            </div>
            <button className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-2 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg">
              Book Now
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-800 px-4 py-2 rounded-full text-sm font-medium">
                <Sparkles className="w-4 h-4" />
                Premium Jordanian Experience
              </div>
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Experience the 
                <span className="bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 bg-clip-text text-transparent"> Magic of Jordan</span>
              </h1>
              <p className="text-xl text-gray-700 leading-relaxed">
                Discover extraordinary accommodations from the ancient wonders of Petra to the serene shores of the Dead Sea. 
                Immerse yourself in authentic Jordanian hospitality and breathtaking landscapes.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-gradient-to-r from-amber-600 to-orange-600 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl flex items-center justify-center gap-2">
                  Explore Chalets
                  <ChevronRight className="w-5 h-5" />
                </button>
                <button className="border-2 border-amber-600 text-amber-600 hover:bg-amber-600 hover:text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300">
                  View Gallery
                </button>
              </div>
              <div className="flex items-center gap-8 pt-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-amber-600">150+</div>
                  <div className="text-sm text-gray-600">Happy Guests</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-amber-600">12</div>
                  <div className="text-sm text-gray-600">Unique Chalets</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-amber-600">4.9</div>
                  <div className="text-sm text-gray-600">Rating</div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-video rounded-3xl overflow-hidden shadow-2xl transform rotate-2 hover:rotate-0 transition-transform duration-500">
                <img 
                  src="https://placehold.co/800x600/ff9900/ffffff?text=Jordan+Chalets" 
                  alt="Luxury chalet in Jordan" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-xl">
                <div className="flex items-center gap-3">
                  <Star className="w-6 h-6 text-amber-500 fill-amber-500" />
                  <div>
                    <div className="font-semibold text-gray-900">Exceptional</div>
                    <div className="text-sm text-gray-600">4.9/5 from 230 reviews</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Chalets */}
      <section id="chalets" className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Available Chalets</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Explore our curated selection of luxury accommodations across Jordan's most stunning locations
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Petra Heritage Chalet",
                location: "Petra",
                price: "$249",
                image: "https://placehold.co/600x400/ff9900/ffffff?text=Petra+Chalet",
                features: ["Mountain View", "Private Pool", "Traditional Design"]
              },
              {
                title: "Dead Sea Retreat",
                location: "Dead Sea",
                price: "$299",
                image: "https://placehold.co/600x400/0099ff/ffffff?text=Dead+Sea+Retreat",
                features: ["Sea View", "Spa Access", "Infinity Pool"]
              },
              {
                title: "Wadi Rum Desert Lodge",
                location: "Wadi Rum",
                price: "$199",
                image: "https://placehold.co/600x400/cc6600/ffffff?text=Wadi+Rum+Lodge",
                features: ["Desert View", "Stargazing", "Bedouin Experience"]
              }
            ].map((chalet, index) => (
              <div key={index} className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="relative">
                  <img 
                    src={chalet.image} 
                    alt={chalet.title}
                    className="w-full h-64 object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold text-amber-600">
                    {chalet.price}/night
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-xl font-bold text-gray-900">{chalet.title}</h3>
                    <div className="flex items-center gap-1">
                      <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
                      <span className="text-sm font-medium text-gray-700">4.8</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mb-4 text-gray-600">
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm">{chalet.location}</span>
                  </div>
                  <div className="space-y-2 mb-6">
                    {chalet.features.map((feature, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm text-gray-600">
                        <div className="w-1.5 h-1.5 bg-amber-400 rounded-full"></div>
                        {feature}
                      </div>
                    ))}
                  </div>
                  <button className="w-full bg-amber-600 hover:bg-amber-700 text-white py-3 rounded-xl font-semibold transition-colors">
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <button className="border-2 border-amber-600 text-amber-600 hover:bg-amber-600 hover:text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 inline-flex items-center gap-2">
              <ImageIcon className="w-5 h-5" />
              View All Chalets
            </button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-6 bg-gradient-to-br from-amber-50 to-orange-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl">
                <img 
                  src="https://placehold.co/600x800/996633/ffffff?text=Reva+Farms+Team" 
                  alt="Reva Farms Jordan Team" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-2xl shadow-xl">
                <div className="flex items-center gap-3">
                  <Users className="w-8 h-8 text-amber-600" />
                  <div>
                    <div className="font-bold text-gray-900">Since 2023</div>
                    <div className="text-sm text-gray-600">Trusted by travelers</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="space-y-6">
              <h2 className="text-4xl font-bold text-gray-900">About Reva Farms Jordan</h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                Reva Farms Jordan is a premier destination for luxury accommodations across the Kingdom of Jordan, 
                offering a curated selection of beautiful properties in the country's most stunning locations. 
                Our mission is to connect travelers with authentic Jordanian experiences, from the ancient wonders 
                of Petra to the serene shores of the Dead Sea.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Founded in 2023, we've quickly established ourselves as Jordan's most trusted platform for both 
                property owners and guests. We personally verify each property to ensure it meets our high standards 
                of comfort, authenticity, and cultural significance, allowing you to experience the true magic of 
                Jordanian hospitality.
              </p>
              <div className="grid grid-cols-2 gap-6 pt-4">
                <div className="bg-white/70 backdrop-blur-sm p-4 rounded-xl">
                  <div className="text-2xl font-bold text-amber-600">100%</div>
                  <div className="text-sm text-gray-600">Verified Properties</div>
                </div>
                <div className="bg-white/70 backdrop-blur-sm p-4 rounded-xl">
                  <div className="text-2xl font-bold text-amber-600">24/7</div>
                  <div className="text-sm text-gray-600">Guest Support</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Contact Us</h2>
            <p className="text-xl text-gray-600">We're here to help you plan your perfect Jordanian getaway</p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div className="bg-gradient-to-r from-amber-600 to-orange-600 p-8 rounded-2xl text-white">
                <h3 className="text-2xl font-bold mb-6">Get in Touch</h3>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-white/20 p-3 rounded-lg">
                      <MapPin className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="font-semibold">Address</div>
                      <div className="text-amber-100">King Hussein Business Park, Amman, Jordan 11953</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="bg-white/20 p-3 rounded-lg">
                      <Phone className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="font-semibold">Phone</div>
                      <div className="text-amber-100">+962 6 580 0100</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="bg-white/20 p-3 rounded-lg">
                      <Mail className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="font-semibold">Email</div>
                      <div className="text-amber-100">info@revafarmsjordan.com</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="bg-white/20 p-3 rounded-lg">
                      <Clock className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="font-semibold">Working Hours</div>
                      <div className="text-amber-100">Sunday-Thursday: 9am-5pm</div>
                      <div className="text-amber-100">Friday-Saturday: Closed</div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-amber-50 to-orange-50 p-6 rounded-2xl">
                <div className="flex items-center gap-3">
                  <Calendar className="w-6 h-6 text-amber-600" />
                  <div>
                    <div className="font-semibold text-gray-900">Ready to Book?</div>
                    <div className="text-gray-700">Contact us today to reserve your dream chalet</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 p-8 rounded-2xl">
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                    <input 
                      type="text" 
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                      placeholder="Your first name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                    <input 
                      type="text" 
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                      placeholder="Your last name"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input 
                    type="email" 
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    placeholder="your.email@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                  <textarea 
                    rows="5"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    placeholder="Tell us about your dream Jordanian getaway..."
                  ></textarea>
                </div>
                <button 
                  type="submit"
                  className="w-full bg-gradient-to-r from-amber-600 to-orange-600 text-white py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <Mountain className="w-8 h-8 text-amber-400" />
                <span className="text-2xl font-bold">Reva Chalets</span>
              </div>
              <p className="text-gray-400 mb-6 leading-relaxed">
                Experience the magic of Jordan with our luxury chalets and authentic hospitality. 
                From Petra to the Dead Sea, we offer the finest accommodations in the Kingdom.
              </p>
              <div className="flex space-x-4">
                <div className="w-10 h-10 bg-amber-600 rounded-full flex items-center justify-center hover:bg-amber-500 transition-colors cursor-pointer">
                  <span className="font-bold">f</span>
                </div>
                <div className="w-10 h-10 bg-amber-600 rounded-full flex items-center justify-center hover:bg-amber-500 transition-colors cursor-pointer">
                  <span className="font-bold">t</span>
                </div>
                <div className="w-10 h-10 bg-amber-600 rounded-full flex items-center justify-center hover:bg-amber-500 transition-colors cursor-pointer">
                  <span className="font-bold">in</span>
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <div className="space-y-2">
                <a href="#home" className="block text-gray-400 hover:text-white transition-colors">Home</a>
                <a href="#chalets" className="block text-gray-400 hover:text-white transition-colors">Chalets</a>
                <a href="#about" className="block text-gray-400 hover:text-white transition-colors">About</a>
                <a href="#contact" className="block text-gray-400 hover:text-white transition-colors">Contact</a>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <div className="space-y-2">
                <a href="#" className="block text-gray-400 hover:text-white transition-colors">FAQ</a>
                <a href="#" className="block text-gray-400 hover:text-white transition-colors">Booking Policy</a>
                <a href="#" className="block text-gray-400 hover:text-white transition-colors">Privacy Policy</a>
                <a href="#" className="block text-gray-400 hover:text-white transition-colors">Terms & Conditions</a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Reva Chalets. All rights reserved. | Crafted with ❤️ for Jordan</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;