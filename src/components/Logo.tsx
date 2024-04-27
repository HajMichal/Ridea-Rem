import Image from "next/image";

interface LogoType {
  isTitle?: boolean;
  title: string;
  subTitle: string;
  className: string;
}
export default function Logo({
  isTitle = false,
  title,
  subTitle,
  className,
}: LogoType) {
  return (
    <>
      <div className="flex w-full items-center justify-center ">
        <Image
          src={"/icons/newLogoGreen.svg"}
          alt="Logo"
          width={160}
          height={80}
          className={className}
        />
      </div>
      {isTitle && (
        <div className="flex w-full flex-col items-center gap-3 p-10">
          <h1 className="font-orkneyBold font-extrabold text-[#383630] laptop:text-xl xl:text-5xl">
            {title}
          </h1>
          <h3 className="text-xl">{subTitle}</h3>
        </div>
      )}
    </>
  );
}
