import React from 'react'

export default function LoginLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    return (
      <section className={"h-full"}>
      {children}
    </section>

    );
  }
  
