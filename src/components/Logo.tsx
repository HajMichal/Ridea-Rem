import Image from "next/image";

interface LogoType {
  isTitle?: boolean;
  title: string;
  subTitle: string;
}
export default function Logo({ isTitle = false, title, subTitle }: LogoType) {
  return (
    <>
      <div className="flex w-full items-center justify-center ">
        <Image
          src={"/icons/newLogoGreen.svg"}
          alt="Logo"
          width={160}
          height={80}
          className="mb-10 h-[10vh] w-auto max-w-[300px]"
        />
      </div>
      {isTitle && (
        <div className="flex w-full flex-col items-center gap-3 p-10">
          <h1 className="font-orkneyBold font-extrabold text-[#383630] laptop:text-3xl xl:text-5xl">
            {title}
          </h1>
          <h3 className="text-xl">{subTitle}</h3>
        </div>
      )}
    </>
  );
}
