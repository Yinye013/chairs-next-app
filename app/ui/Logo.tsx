import React from "react";
import Link from "next/link";

export default function Logo() {
  const title: string = "TheChair";

  return (
    <div>
      <Link href="/" className="logo cursor-pointer">
        {title} <span className="text-green-700">Shop.</span>
      </Link>
    </div>
  );
}
