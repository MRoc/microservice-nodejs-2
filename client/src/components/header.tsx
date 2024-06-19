"use client";

import Link from 'next/link';
import React from 'react'

const Header = async ({ currentUser }: { currentUser: { id: string }}) => {
  const links = [
    { label: 'Sign Up', href: '/auth/signup', visible: !currentUser },
    { label: 'Sign In', href: '/auth/signin', visible: !currentUser },
    { label: 'Sign Out', href: '/auth/signout', visible: currentUser }
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