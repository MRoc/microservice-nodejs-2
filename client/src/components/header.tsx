"use client";

import Link from 'next/link';
import React from 'react'
import buildClient from '../api/build-client';

const Header = async () => {
  const client = await buildClient();
  const { data } = await client.get('/api/users/currentuser');

  const links = [
    { label: 'Sign Up', href: '/auth/signup', visible: !data.currentUser },
    { label: 'Sign In', href: '/auth/signin', visible: !data.currentUser },
    { label: 'Sign Out', href: '/auth/signout', visible: data.currentUser }
  ];

  return <div>
    <Link className="mr-8" href="/">Home</Link>
    <span>
      {links.map(link => link.visible &&
        <Link className="mr-8" key={link.href} href={link.href}>{link.label}</Link>)}
    </span>
  </div>
};
 
export { Header };