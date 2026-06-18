"use client";

import Link from "next/link";
import { useIntro } from "./IntroProvider";

/**
 * Returns to the home page without replaying the hero intro — it marks the hero
 * as already entered before navigating, so you land on the open page.
 */
export function BackHomeLink({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  const { setEntered } = useIntro();
  return (
    <Link href="/" onClick={() => setEntered(true)} className={className}>
      {children}
    </Link>
  );
}
