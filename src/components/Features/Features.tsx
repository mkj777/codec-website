import styles from './Features.module.css';
import {
  ScanIcon,
  LibraryIcon,
  SparkleIcon,
  BoltIcon,
  ShieldIcon,
  SlidersIcon,
} from '../Icons';

interface FeatureItem {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const features: FeatureItem[] = [
  {
    icon: <ScanIcon size={22} />,
    title: 'Auto Detection',
    description: 'Finds games from Steam, Epic, GOG, and more. No manual setup needed.',
  },
  {
    icon: <LibraryIcon size={22} />,
    title: 'Unified Library',
    description: 'All your games in one place. Sort, filter, and organize however you like.',
  },
  {
    icon: <SparkleIcon size={22} />,
    title: 'Clean Interface',
    description: 'Minimal design that stays out of your way. Just you and your games.',
  },
  {
    icon: <BoltIcon size={22} />,
    title: 'Lightweight',
    description: 'Launches fast, uses minimal resources. Gets out of your way.',
  },
  {
    icon: <ShieldIcon size={22} />,
    title: 'Privacy First',
    description: 'Your data stays local. No accounts, no tracking, no cloud required.',
  },
  {
    icon: <SlidersIcon size={22} />,
    title: 'Customizable',
    description: 'Custom art, manual entries, launch options. Make it yours.',
  },
];

export function Features() {
  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    card.style.setProperty('--mouse-x', `${x}%`);
    card.style.setProperty('--mouse-y', `${y}%`);
  };

  return (
    <section className={styles.features} id="features">
      <div className={styles.container}>
        <div className={`${styles.header} animate-on-scroll`}>
          <h2 className={styles.title}>Simple by design</h2>
          <p className={styles.subtitle}>
            A lightweight library that gets out of your way.
          </p>
        </div>
        <div className={`${styles.grid} animate-children`}>
          {features.map((feature, index) => (
            <article 
              key={index} 
              className={styles.card}
              onMouseMove={handleMouseMove}
            >
              <div className={styles.iconWrapper}>
                {feature.icon}
              </div>
              <h3 className={styles.cardTitle}>{feature.title}</h3>
              <p className={styles.cardDescription}>{feature.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
