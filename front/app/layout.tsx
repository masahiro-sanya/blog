import { getTagList, getWriter } from '@/libs/microcms';
import { LIMIT } from '@/constants';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Nav from '@/components/Nav';
import './globals.css';
import styles from './layout.module.css';
import Profile from '@/components/Profile';

export const metadata = {
  metadataBase: new URL(process.env.BASE_URL || 'http://localhost:3000'),
  title: 'Blog',
  description: 'A blog blog presented by microCMS',
  openGraph: {
    title: 'blog Blog',
    description: 'A blog blog presented by microCMS',
    images: '/ogp.png',
  },
  alternates: {
    canonical: '/',
  },
};

type Props = {
  children: React.ReactNode;
};

export default async function RootLayout({ children }: Props) {
  console.log('Getting tag list...');
  const tags = await getTagList({
    limit: LIMIT,
  }).catch((error) => {
    console.error('Error in getTagList:', error);
    return { contents: [] };
  });
  console.log('Tag list response:', tags);

  console.log('Getting writer...');
  const writer = await getWriter().catch((error) => {
    console.error('Error in getWriter:', error);
    return null;
  });
  console.log('Writer response:', writer);

  return (
    <html lang="ja">
      <body>
        <Header />
        <Nav tags={tags?.contents || []} />
        {writer && <Profile writer={writer} />}
        <main className={styles.main}>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
