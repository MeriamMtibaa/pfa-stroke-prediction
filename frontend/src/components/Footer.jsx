import { Heart, Mail, Share2 } from 'lucide-react'

function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 py-12 mt-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-white font-bold text-lg mb-4">StrokeAI</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              AI-powered clinical decision support for stroke risk assessment. 
              Built with explainable ML models optimized for healthcare.
            </p>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/" className="hover:text-sky-400 transition-colors">Dashboard</a>
              </li>
              <li>
                <a href="/about" className="hover:text-sky-400 transition-colors">Model Information</a>
              </li>
              <li>
                <a href="#" className="hover:text-sky-400 transition-colors">Documentation</a>
              </li>
              <li>
                <a href="#" className="hover:text-sky-400 transition-colors">API Reference</a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-4">Connect</h3>
            <div className="flex gap-4">
              <a 
                href="#" 
                className="w-10 h-10 rounded-lg bg-slate-800 hover:bg-slate-700 flex items-center justify-center transition-colors"
              >
                <Mail className="w-5 h-5" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 rounded-lg bg-slate-800 hover:bg-slate-700 flex items-center justify-center transition-colors"
              >
                <Share2 className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
        
        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-slate-400">
            © 2026 StrokeAI. Clinical Decision Support System.
          </p>
          <p className="text-sm text-slate-400 flex items-center gap-2">
            Made with <Heart className="w-4 h-4 text-red-500" fill="currentColor" /> for healthcare innovation
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
