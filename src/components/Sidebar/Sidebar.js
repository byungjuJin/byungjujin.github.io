// @flow strict
import React from 'react';
import Author from './Author';
import Contacts from './Contacts';
import Copyright from './Copyright';
import LatestPost from './LatestPost';
import Menu from './Menu';
import styles from './Sidebar.module.scss';
import { useSiteMetadata, useLatestList } from '../../hooks';

type Props = {
  isIndex?: boolean,
};

const Sidebar = ({ isIndex }: Props) => {
  const { author, copyright, menu } = useSiteMetadata();
  const { edges } = useLatestList();

  return (
    <div className={styles['sidebar']}>
      <div className={styles['sidebar__inner']}>
        <Author author={author} isIndex={isIndex}/>
        <Menu menu={menu}/>
        <Contacts contacts={author.contacts}/>
        <Copyright copyright={copyright}/>
        { edges && <LatestPost edges={edges}/>}
      </div>
    </div>
  );
};

export default Sidebar;
