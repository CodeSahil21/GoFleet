import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="h-screen flex flex-col justify-between w-full bg-red-500 pt-8 bg-center bg-cover bg-[url('https://images.unsplash.com/photo-1611965008308-f117c8ca80fd?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')]"
    >
      <Image
        className="w-16 ml-4"
        src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
        alt="Uber Logo"
        width={800}
        height={800}
      />
      <div className="bg-white py-4  pb-7 px-4 ">
        <h2 className="text-3xl font-bold ">Get Started with Uber</h2>
        <Link href="/login"className="flex items-center justify-center w-full bg-black text-white py-3 rounded mt-5">Continue</Link>
      </div>
    </div>
  );
}
