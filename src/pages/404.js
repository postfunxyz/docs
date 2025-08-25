import React from 'react';
import {Redirect} from '@docusaurus/router';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

export default function NotFound() {
  const {siteConfig} = useDocusaurusContext();
  return <Redirect to="/docs/getting-started/what-is-postfun" />;
}