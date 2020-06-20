import React from 'react';

import { Link } from 'gatsby';
import styles from './LastestPost.module.scss';
import type { Edges } from '../../../types';

type Props = {
  edges: Edges
};

const LatestPost = ({ edges }: Props) => (
  <div className={styles['latest-post']}>
    <p>New Articles</p>
    <ul>
      {edges.map((edge) => (
        <li>
          <Link
            to={edge.node.fields.slug}
            key={edge.node.fields.slug}
            href={edge.node.fields.slug}
          >
            {edge.node.frontmatter.title}
          </Link>
        </li>
      ))}
    </ul>
  </div>
);

export default LatestPost;
