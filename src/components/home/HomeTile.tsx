import { useRouter } from "next/router";
import Image from "next/image";

interface HomeTileType {
  src: string;
  iconSrc: string;
  url: string;
  color: string;
  title: string;
  subTitle: string;
}
export function HomeTile({
  url,
  src,
  iconSrc,
  color,
  title,
  subTitle,
}: HomeTileType) {
  const router = useRouter();

  return (
    <div
      id="photovoltaic"
      className={`duration-100 hover:opacity-90 ${color}`}
      onClick={() => void router.push(url)}
    >
      <Image
        src={src}
        alt="Zdjęcie instalacjii"
        width={640}
        height={1080}
        className="h-3/4 w-full object-cover"
      />
      <div className="flex flex-col items-center font-orkneyLight text-sm text-white">
        <div className="absolute top-[350px] flex flex-col items-center font-orkneyBold text-2xl text-white">
          <Image
            src={iconSrc}
            alt="Logo"
            width={80}
            height={80}
            className="mb-1 h-14 w-14"
          />
          <p className="text-sm sm:text-lg md:text-2xl lg:text-3xl">{title}</p>
          <p className="sm:text-md text-xs  md:text-xl lg:text-2xl">
            {subTitle}
          </p>
        </div>
        <div className="absolute bottom-10">
          <Image
            src={"/home/icons/KlikDoKalkulacji.svg"}
            alt="Logo"
            width={80}
            height={80}
            className="ml-10 h-7 w-7"
          />
          <p>STWÓRZ OFERTĘ</p>
        </div>
      </div>
    </div>
  );
}
