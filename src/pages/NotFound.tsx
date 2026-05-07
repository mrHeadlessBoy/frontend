
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <section className="flex flex-col items-center justify-center text-center text-black gap-4 p-8">
      <h1 className="text-6xl font-bold">404 - Not Found</h1>
      <h2 className="text-2xl font-bold">I geuss you're lost, my visitor</h2>
      <p className="text-lg text-black/70">Unfortunely, The page you’re looking for doesn’t exist.</p>
      <p className="text-lg text-black/70">don't worry, I'll guide you back {":)"} </p>
      <Link to="/" className="text-blue-600 hover:underline">
        exit path
      </Link>
    </section>
  );
};

export default NotFound;