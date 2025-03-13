export default function Footer() {
    return (
      <footer className="bg-gray-100 text-center text-sm">
        <div className="mb-4 space-x-4 py-4">
          <a href="#">About Mahindra</a><span>|</span><a href="#">Privacy Policy</a><span>|</span><a href="#">Contact</a><span>|</span><a href="#">Sign In/Sign Up</a>
        </div>
  
        <div className="flex justify-center space-x-4 mb-4">
          <a href="#"><img src="/icons/facebook.png" alt="Facebook" width={20} /></a>
          <a href="#"><img src="/icons/instagram.png" alt="Instagram" width={20} /></a>
          <a href="#"><img src="/icons/linkedin.png" alt="LinkedIn" width={20} /></a>
          <a href="#"><img src="/icons/youtube.png" alt="YouTube" width={20} /></a>
          <a href="#"><img src="/icons/twitter.png" alt="Twitter" width={20} /></a>
        </div>
        <div className="bg-red-500 text-white h-12 grid place-items-center">
          <p>Copyright&copy; 2025 Mahindra & Mahindra Pvt Ltd. All Rights Reserved.</p>
        </div>
      </footer>
    );
  }
  