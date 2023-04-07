import { Caveat } from 'next/font/google';
import Link from 'next/link';

const caveat = Caveat({ subsets: ['latin'] });

export default function Layout({ children }) {
  return (
    <div>
      <header>
        <div>
          <Link href="/" className="ml-2 block p-2">
            <div className="text-3xl font-bold">
              <span className={caveat.className}>TabTime</span>
            </div>
          </Link>
        </div>
      </header>
      <main>{children}</main>
    </div>
  );
}
