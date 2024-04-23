import Image from "next/image";

export default function ImageTile() {
  return (
    <div className="hidden h-screen items-center justify-center laptop:flex">
      <div className="z-20 flex h-[75%] w-full items-center rounded-l-[60px] bg-white shadow-sm xl:h-[85%] ">
        <Image
          src={"/login.png"}
          width={1170}
          height={780}
          alt="Instalacja fotowoltiaki"
          priority
          loading="eager"
          className="absolute right-0 h-auto  max-h-[730px] w-[60%] max-w-[1170px] rounded-l-[60px] xxl:max-h-[888px] xxl:max-w-[1582px]"
        ></Image>
      </div>
    </div>
  );
}
