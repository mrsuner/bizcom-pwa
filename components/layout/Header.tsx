import Image from "next/image";

export function Header() {
  return (
    <header className="px-4 pt-4 pb-2">
      <div className="flex items-center">
        <Image
          src="/logo.png"
          alt="BizCom Management Services"
          width={180}
          height={48}
          priority
        />
      </div>
    </header>
  );
}
