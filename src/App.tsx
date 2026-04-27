import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Camera, Image as ImageIcon, Send, Star, X, Share2, MessageCircle, ArrowRight, Instagram, Twitter } from 'lucide-react';
import { ARTWORKS, MOCK_REVIEWS, Artwork, Review } from './data';

function Hero() {
  return (
    <section className="relative min-h-[70vh] flex flex-col items-center justify-center text-center px-4 overflow-hidden bg-slate-50">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 bg-slate-50/50">
        <div className="absolute top-[-10%] right-[-5%] w-[50%] h-[50%] rounded-full bg-indigo-100 blur-[100px] opacity-60"></div>
        <div className="absolute bottom-[-10%] left-[-5%] w-[50%] h-[50%] rounded-full bg-blue-50 blur-[100px] opacity-60"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-4xl mx-auto pt-20"
      >
        <span className="text-sm font-bold tracking-widest uppercase text-indigo-600 mb-6 block">Art Portfolio</span>
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 text-slate-900">
          Mohamed Sabry <span className="text-indigo-600">Art</span>
        </h1>
        <p className="text-lg md:text-xl text-slate-500 font-medium max-w-2xl mx-auto mb-10 leading-relaxed text-balance">
          Exploring the unspoken through strokes and shadows. A curated collection of charcoal, oils, and digital visions.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a href="#gallery" className="px-8 py-3.5 bg-slate-900 text-white rounded-xl font-semibold shadow-xl shadow-slate-200 hover:bg-slate-800 transition-colors inline-block w-full sm:w-auto">
            View Gallery
          </a>
          <a href="#commission" className="px-8 py-3.5 bg-white text-slate-900 font-semibold rounded-xl shadow-sm border border-slate-200 hover:border-indigo-300 transition-colors inline-block w-full sm:w-auto">
            Request Commission
          </a>
        </div>
      </motion.div>
    </section>
  );
}

function Gallery() {
  const [selectedArt, setSelectedArt] = useState<Artwork | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  
  const categories = ['All', 'Pencil', 'Colors', 'Oil Painting'];

  const filteredArtworks = ARTWORKS.filter(art => 
    activeCategory === 'All' ? true : art.category === activeCategory
  );

  // Map English to Arabic for display if requested, or keep sleek UI terms
  const categoryLabels: Record<string, string> = {
    'All': 'All Works',
    'Pencil': 'Pencil (رصاص)',
    'Colors': 'Colors (الوان)',
    'Oil Painting': 'Oil (لوحات زيت)'
  };

  return (
    <section id="gallery" className="py-24 px-4 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold mb-3 text-slate-900">Selected Works</h2>
          <p className="text-slate-500 font-medium">A showcase of recent creations and personal explorations.</p>
        </div>
        
        {/* Category Filters */}
        <div className="flex flex-wrap gap-2">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all ${
                activeCategory === category 
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200' 
                  : 'bg-white text-slate-500 hover:text-slate-900 hover:bg-slate-50 border border-slate-200'
              }`}
            >
              {categoryLabels[category]}
            </button>
          ))}
        </div>
      </div>

      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <AnimatePresence mode="popLayout">
          {filteredArtworks.map((art, i) => (
            <motion.div
              layout
              key={art.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4 }}
              className="group cursor-pointer flex flex-col bg-white rounded-3xl p-4 shadow-sm border border-slate-100 hover:shadow-md transition-shadow"
              onClick={() => setSelectedArt(art)}
            >
            <div className="relative overflow-hidden aspect-[3/4] bg-slate-200 mb-4 rounded-2xl">
              <img 
                src={art.imageUrl} 
                alt={art.title} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                <span className="bg-white/20 text-white px-4 py-2 rounded-xl text-sm font-medium backdrop-blur-md shadow-sm w-max">View Artwork</span>
              </div>
            </div>
            <h3 className="text-xl font-bold text-slate-900 px-2">{art.title}</h3>
            <span className="text-xs font-semibold text-indigo-600 uppercase tracking-widest mt-1 px-2 pb-2">{categoryLabels[art.category] || art.category}</span>
          </motion.div>
        ))}
        </AnimatePresence>
      </motion.div>

      <AnimatePresence>
        {selectedArt && (
          <ArtworkModal art={selectedArt} onClose={() => setSelectedArt(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}

function ArtworkModal({ art, onClose }: { art: Artwork, onClose: () => void }) {
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Mohamed Sabry Art: ${art.title}`,
          text: art.description || `Check out ${art.title} by Mohamed Sabry.`,
          url: window.location.href, // In app, you'd link to specific art URL
        });
      } catch (err) {
        console.error('Error sharing:', err);
      }
    } else {
      alert("Sharing is not supported on this browser context.");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/40 backdrop-blur-md"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white w-full max-w-5xl max-h-[90vh] overflow-hidden flex flex-col md:flex-row shadow-2xl rounded-3xl border border-slate-100"
      >
        <div className="w-full md:w-3/5 bg-slate-50 relative min-h-[40vh] md:min-h-0 flex items-center justify-center overflow-hidden">
          <img 
            src={art.imageUrl} 
            alt={art.title} 
            className="w-full h-full object-contain p-4 md:p-8 rounded-2xl"
          />
        </div>
        <div className="w-full md:w-2/5 p-8 flex flex-col relative overflow-y-auto">
          <button 
            onClick={onClose}
            className="absolute top-6 right-6 text-slate-400 hover:text-slate-900 transition-colors bg-slate-100 rounded-full p-2"
          >
            <X size={20} />
          </button>
          
          <div className="mt-8 flex-1">
            <span className="text-xs font-semibold tracking-widest uppercase text-indigo-600 block mb-2">{art.category}</span>
            <h2 className="text-3xl font-bold mb-4 text-slate-900">{art.title}</h2>
            <p className="text-slate-500 font-medium leading-relaxed mb-8">{art.description}</p>
            
            <div className="border-t border-slate-100 pt-6 mt-6">
              <button onClick={handleShare} className="flex items-center gap-2 text-sm font-semibold text-indigo-600 hover:text-indigo-700 uppercase tracking-wider mb-8 bg-indigo-50 px-4 py-2 rounded-xl w-max">
                <Share2 size={16} /> Share this artwork
              </button>
              
              {/* Note: In a real app, comments would be fetched/stored in a DB */}
              <h4 className="text-xl font-bold mb-4 text-slate-900 flex items-center gap-2">
                <MessageCircle size={20} className="text-indigo-400" />
                Discussion
              </h4>
              <p className="text-sm text-slate-500 font-medium italic bg-slate-50 p-4 rounded-2xl">Comments will appear here once connected to a backend.</p>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function Reviews() {
  const [reviews, setReviews] = useState<Review[]>(MOCK_REVIEWS);
  const [newReview, setNewReview] = useState({ name: '', text: '', rating: 5 });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReview.name || !newReview.text) return;
    
    const review: Review = {
      id: `rev-${Date.now()}`,
      name: newReview.name,
      rating: newReview.rating,
      text: newReview.text,
      date: new Date().toISOString().split('T')[0]
    };
    
    // This updates local state. Connect to Firebase here for persistence.
    setReviews([review, ...reviews]);
    setNewReview({ name: '', text: '', rating: 5 });
    alert("Thank you! Your review has been added locally.");
  };

  return (
    <section id="reviews" className="py-24 px-4 bg-slate-50 text-slate-900 border-y border-slate-100">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Client Expressions</h2>
          <p className="font-medium text-slate-500 max-w-2xl mx-auto">Hear from those who have trusted me with their vision and requested unique commissions.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Review List */}
          <div className="lg:col-span-2 space-y-6">
            {reviews.map((review) => (
              <div key={review.id} className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
                <div className="flex items-center gap-1 mb-4 text-orange-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} fill={i < review.rating ? "currentColor" : "none"} className={i >= review.rating ? "text-slate-200" : ""} />
                  ))}
                </div>
                <p className="text-lg font-medium text-slate-700 mb-6 leading-relaxed">"{review.text}"</p>
                <div className="flex justify-between items-center text-sm font-semibold text-slate-500">
                  <span className="uppercase tracking-widest text-indigo-600">— {review.name}</span>
                  <span>{review.date}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Add Review Form */}
          <div className="bg-indigo-50 p-8 rounded-3xl h-fit border border-indigo-100">
            <h3 className="text-2xl font-bold mb-6 text-slate-900">Leave an Impression</h3>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">Name</label>
                <input 
                  type="text" 
                  value={newReview.name}
                  onChange={e => setNewReview({...newReview, name: e.target.value})}
                  className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all font-medium"
                  placeholder="Your Name"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">Rating</label>
                <div className="flex gap-2 text-orange-400">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button 
                      key={star} 
                      type="button"
                      onClick={() => setNewReview({...newReview, rating: star})}
                    >
                      <Star size={24} fill={star <= newReview.rating ? "currentColor" : "none"} className={star > newReview.rating ? "text-slate-300" : ""} />
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">Review</label>
                <textarea 
                  value={newReview.text}
                  onChange={e => setNewReview({...newReview, text: e.target.value})}
                  rows={4}
                  className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all resize-none font-medium text-sm"
                  placeholder="Share your thoughts..."
                  required
                ></textarea>
              </div>
              <button 
                type="submit"
                className="w-full py-3.5 mt-2 bg-indigo-600 text-white rounded-xl font-semibold shadow-md shadow-indigo-200 hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2"
              >
                Submit Review
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

function CommissionForm() {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Commission request recorded! In a full implementation, this data and image would be uploaded to Firebase Storage and Firestore backend.");
    setImagePreview(null);
    if(fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <section id="commission" className="py-24 px-4 max-w-6xl mx-auto">
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <span className="text-sm font-bold tracking-widest uppercase text-indigo-600 mb-4 block">Let's Create</span>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-slate-900">Request a Commission</h2>
          <p className="text-slate-500 font-medium leading-relaxed mb-8 text-lg">
            Turn your cherished memories, photos, or ideas into a timeless piece of art. Upload an image, describe your vision, and let's collaborate.
          </p>
          <ul className="space-y-6 mb-8">
            <li className="flex items-start gap-4">
              <div className="mt-1 p-3 bg-indigo-50 rounded-2xl text-indigo-600">
                <ImageIcon size={20} />
              </div>
              <div>
                <strong className="block text-slate-900 font-bold mb-1">1. Submit Reference</strong>
                <span className="text-sm text-slate-500 font-medium">Provide a clear, high-resolution original image.</span>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <div className="mt-1 p-3 bg-slate-100 rounded-2xl text-slate-600">
                <MessageCircle size={20} />
              </div>
              <div>
                <strong className="block text-slate-900 font-bold mb-1">2. Discuss Details</strong>
                <span className="text-sm text-slate-500 font-medium">We'll review dimensions, medium, timeframe, and pricing.</span>
              </div>
            </li>
          </ul>
        </div>

        <div className="bg-white p-8 md:p-10 shadow-xl shadow-slate-200/50 rounded-3xl border border-slate-100">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">Name</label>
                <input type="text" required className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 font-medium" placeholder="Your Name" />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">Email</label>
                <input type="email" required className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 font-medium" placeholder="your@email.com" />
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">Reference Image</label>
              <div 
                className="border-2 border-dashed border-slate-200 rounded-2xl p-8 flex flex-col items-center justify-center cursor-pointer hover:border-indigo-300 bg-slate-50 transition-colors group"
                onClick={() => fileInputRef.current?.click()}
              >
                {imagePreview ? (
                  <div className="relative w-full aspect-video">
                    <img src={imagePreview} alt="Preview" className="w-full h-full object-contain rounded-xl" />
                    <button 
                      type="button"
                      onClick={(e) => { e.stopPropagation(); setImagePreview(null); }}
                      className="absolute top-2 right-2 bg-white text-slate-900 shadow-md rounded-full p-1.5 hover:bg-slate-100 transition-colors"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="p-3 bg-white rounded-full shadow-sm text-slate-400 group-hover:text-indigo-500 group-hover:shadow-md transition-all mb-4">
                      <Camera size={24} />
                    </div>
                    <p className="text-sm font-semibold text-slate-600 mb-1">Click to upload photo</p>
                    <p className="text-xs font-medium text-slate-400">JPG, PNG up to 10MB</p>
                  </>
                )}
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={handleImageChange} 
                  accept="image/*" 
                  className="hidden" 
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">Additional Details</label>
              <textarea rows={3} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 resize-none font-medium" placeholder="Medium preferences, dimensions, etc."></textarea>
            </div>
            <button type="submit" className="w-full py-4 mt-2 bg-slate-900 text-white rounded-xl font-semibold shadow-xl shadow-slate-200 hover:bg-slate-800 transition-colors flex items-center justify-center gap-2">
              <Send size={18} /> Request Commission
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-white border-t border-slate-100 py-8 px-8 text-center sm:text-left flex flex-col sm:flex-row justify-between items-center shrink-0 text-sm font-medium text-slate-400 gap-6">
      <div className="flex flex-col sm:flex-row gap-6 items-center">
        <span>Available for Commissions</span>
        <span className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
          Online Now
        </span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <p>&copy; {new Date().getFullYear()} Mohamed Sabry Art.</p>
        <a href="https://wa.me/+201040407170" target="_blank" rel="noopener noreferrer" className="text-xs hover:text-indigo-600 transition-colors">
          Created by @a_elmosalamy
        </a>
      </div>
      <div className="flex gap-6 uppercase tracking-widest text-xs">
        <a href="https://www.instagram.com/___sabry14?igsh=MXY0eTZ0cjJ4azc1dg==" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-600 transition-colors">Instagram</a>
        <a href="#" className="hover:text-indigo-600 transition-colors">Behance</a>
        <a href="#" className="hover:text-indigo-600 transition-colors">ArtStation</a>
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <div className="min-h-screen bg-[#fdfdfd] text-[#2d3436] flex flex-col overflow-x-hidden font-sans">
      <header className="h-20 border-b border-slate-100 flex items-center justify-between px-6 sm:px-12 sticky top-0 z-40 bg-white shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-bold italic text-xl shadow-lg shadow-indigo-100">MS</div>
          <h1 className="text-2xl font-semibold tracking-tight text-slate-900 hidden sm:block">
            Mohamed Sabry <span className="text-indigo-600">Art</span>
          </h1>
        </div>
        <nav className="hidden md:flex gap-8 font-medium text-slate-500">
          <a href="#gallery" className="hover:text-slate-900 transition-colors">Gallery</a>
          <a href="#commission" className="hover:text-slate-900 transition-colors">Commission</a>
          <a href="#reviews" className="hover:text-slate-900 transition-colors">Reviews</a>
        </nav>
        <a href="#commission" className="px-6 py-2.5 bg-indigo-600 text-white rounded-full font-medium shadow-md shadow-indigo-200 hover:bg-indigo-700 transition-colors text-sm">
          Get a Drawing
        </a>
      </header>
      
      <main className="flex-1 shrink-0">
        <Hero />
        <Gallery />
        <Reviews />
        <CommissionForm />
      </main>
      <Footer />
    </div>
  );
}

