"use client";

import { UserType } from '@/api/user.types';
import Link from 'next/link';
import React from 'react'

const Header = ({ currentUser }: { currentUser: UserType}) => {
  const links = [
    { label: 'Sell Ticket', href: '/tickets/new', visible: currentUser },
    { label: 'My Orders', href: '/orders', visible: currentUser },
    { label: 'Sign Up', href: '/auth/signup', visible: !currentUser },
    { label: 'Sign In', href: '/auth/signin', visible: !currentUser },
    { label: 'Sign Out', href: '/auth/signout', visible: currentUser },
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