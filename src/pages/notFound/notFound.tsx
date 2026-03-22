import { Link } from 'react-router-dom';
import SeoHead from '../../shared/components/seoHead';

export function NotFound() {
  return (
    <>
      <SeoHead
        title="90s Shop | Page not found"
        description="The page you are looking for does not exist or has been moved."
        noIndex
      />

      <div className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center bg-[#F4F6F8] px-4 text-center">
        <h1 className="font-sans text-7xl font-bold tracking-tight text-[#1A1F36] md:text-8xl">
          404
        </h1>
        <p className="mt-4 max-w-md font-sans text-lg font-normal text-[#697386] md:text-xl">
          Oops! Page not found
        </p>
        <Link
          to="/"
          className="mt-10 font-sans text-sm text-[#4FADC0] underline underline-offset-4 transition-opacity hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4FADC0]"
        >
          Return to Home
        </Link>
      </div>
    </>
  );
}

export default NotFound;
