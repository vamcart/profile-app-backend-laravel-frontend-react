'use client';

import Link from 'next/link'

export default function Home() {
  return (
    <div>
	<ul>
	    <li><Link href="/register">Вход/Регистрация</Link></li>
	</ul>
    </div>
  );
}
