// components/Footer.tsx
const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white text-center py-4">
      <p>&copy; 2025 Your Company. All Rights Reserved.</p>
      <div>
        <a href="/privacy-policy" className="text-blue-500 hover:underline">
          Privacy Policy
        </a>
        <span className="mx-2">|</span>
        <a href="/terms" className="text-blue-500 hover:underline">
          Terms of Service
        </a>
      </div>
    </footer>
  );
};

export default Footer;
