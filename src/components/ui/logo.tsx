import Image from "next/image";
import Link from "next/link";

const Logo = () => {
  return (
    <Link href="/" className="flex min-w-0 items-center gap-2">
      <Image
        src="/assets/logo.jpeg"
        alt="Onengs Empire Logo"
        width={40}
        height={40}
        className="h-10 w-10 shrink-0"
      />
      <span className="truncate font-serif text-xl tracking-tight text-stone-900">
        Onengs Empire
      </span>
    </Link>
  );
};

export default Logo;
