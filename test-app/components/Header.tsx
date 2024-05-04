import NextLogo from "./NextLogo";
import SupabaseLogo from "./SupabaseLogo";

export default function Header() {
  return (
    <div className="flex flex-col gap-16 ">
      {/* <div className="flex gap-8 justify-center items-center">
        <a
          href="https://supabase.com/?utm_source=create-next-app&utm_medium=template&utm_term=nextjs"
          target="_blank"
          rel="noreferrer"
        >
          <SupabaseLogo />
        </a>
        <span className="border-l rotate-45 h-6" />
        <a href="https://nextjs.org/" target="_blank" rel="noreferrer">
          <NextLogo />
        </a>
      </div> */}

      <div className="flex flex-col gap-8 justify-center items-center mt-24">
        <p className="text-3xl lg:text-4xl !leading-tight mx-auto max-w-xl text-center font-bold">
          Take control of your health{" "}
          {/* <a
          href="https://supabase.com/?utm_source=create-next-app&utm_medium=template&utm_term=nextjs"
          target="_blank"
          className="font-bold hover:underline"
          rel="noreferrer"
        >
          Supabase
        </a>{" "}
        and{" "}
        <a
          href="https://nextjs.org/"
          target="_blank"
          className="font-bold hover:underline"
          rel="noreferrer"
        >
          Next.js
        </a> */}
        </p>
        <p className="max-w-md">Imagine knowing the specs of your body the same way you know the specs
          of your computer or your car.
        </p>
        <p className="max-w-md">Imagine everything you do that affects your health organized,
        and in one place.
        </p>
        

      </div>
      <p className="max-w-md ml-4">Imagine LifeMagic
        </p>

      <div className="w-full p-[1px] bg-gradient-to-r from-transparent via-foreground/10 to-transparent my-8" />
    </div>
  );
}
