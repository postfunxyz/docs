import React, {useEffect} from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import styles from './index.module.css';

export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  
  useEffect(() => {
    // Redirect to documentation after a short delay
    const timer = setTimeout(() => {
      window.location.href = '/docs/getting-started/what-is-postfun';
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <Layout
      title={`Welcome to ${siteConfig.title}`}
      description="The marketplace for tradable social content">
      <div className={styles.heroBanner}>
        <div className="container">
          <img src="/img/logo.png" alt="postfun Logo" className={styles.logo} />
          <h1 className={styles.heroTitle}>postfun Documentation</h1>
          <p className={styles.heroSubtitle}>Transforming internet culture into liquid assets</p>
          <div className={styles.buttons}>
            <div className={styles.retroButton}>
              Redirecting to documentation...
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}