import { Heart, Mail, Share2 } from 'lucide-react'

function Footer() {
  return (
    <footer className="border-t border-[rgb(var(--border))] py-8 md:py-12 mt-12 md:mt-20" style={{ background: 'rgb(var(--card))' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-6 md:mb-8">
          <div>
            <h3 className="text-[rgb(var(--card-foreground))] font-bold text-base md:text-lg mb-3 md:mb-4">Stroke Prediction AI</h3>
            <p className="text-[rgb(var(--muted-foreground))] text-xs md:text-sm leading-relaxed">
              AI-powered clinical decision support for stroke risk assessment. 
              Built with explainable ML models optimized for healthcare.
            </p>
          </div>
          
          <div>
            <h3 className="text-[rgb(var(--card-foreground))] font-semibold text-sm md:text-base mb-3 md:mb-4">Quick Links</h3>
            <ul className="space-y-2 text-xs md:text-sm">
              <li>
                <a href="/" className="text-[rgb(var(--muted-foreground))] hover:text-[rgb(var(--accent))] transition-colors">Dashboard</a>
              </li>
              <li>
                <a href="/about" className="text-[rgb(var(--muted-foreground))] hover:text-[rgb(var(--accent))] transition-colors">Model Information</a>
              </li>
              <li>
                <a href="#" className="text-[rgb(var(--muted-foreground))] hover:text-[rgb(var(--accent))] transition-colors">Documentation</a>
              </li>
              <li>
                <a href="#" className="text-[rgb(var(--muted-foreground))] hover:text-[rgb(var(--accent))] transition-colors">API Reference</a>
              </li>
            </ul>
          </div>
          
          <div className="sm:col-span-2 lg:col-span-1">
            <h3 className="text-[rgb(var(--card-foreground))] font-semibold text-sm md:text-base mb-3 md:mb-4">Connect</h3>
            <div className="flex gap-3 md:gap-4">
              <a 
                href="#" 
                className="w-9 h-9 md:w-10 md:h-10 rounded-lg flex items-center justify-center transition-colors hover:shadow-md"
                style={{ background: 'rgba(var(--muted), 1)' }}
              >
                <Mail className="w-4 h-4 md:w-5 md:h-5 text-[rgb(var(--muted-foreground))]" />
              </a>
              <a 
                href="#" 
                className="w-9 h-9 md:w-10 md:h-10 rounded-lg flex items-center justify-center transition-colors hover:shadow-md"
                style={{ background: 'rgba(var(--muted), 1)' }}
              >
                <Share2 className="w-4 h-4 md:w-5 md:h-5 text-[rgb(var(--muted-foreground))]" />
              </a>
            </div>
          </div>
        </div>
        
        <div className="pt-6 md:pt-8 border-t border-[rgb(var(--border))] flex flex-col md:flex-row justify-between items-center gap-3 md:gap-4 text-center md:text-left">
          <p className="text-xs md:text-sm text-[rgb(var(--muted-foreground))]">
            © 2026 Stroke Prediction AI. Clinical Decision Support System.
          </p>
          <p className="text-xs md:text-sm text-[rgb(var(--muted-foreground))] flex items-center gap-2">
            Made with <Heart className="w-3 h-3 md:w-4 md:h-4 text-red-500" fill="currentColor" /> for healthcare innovation
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
