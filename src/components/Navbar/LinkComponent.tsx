import Link from "next/link";

interface LinkComponentType {
  href: string;
  title: string;
  notification?: boolean;
  userRole?: number;
  neededRole?: number;
}
export const LinkComponent = ({
  href,
  title,
  notification = false,
  userRole = 3, // default role
  neededRole = 3, // default role
}: LinkComponentType) => {
  return (
    <div className={`group -mb-1 ${userRole !== neededRole && "hidden"}`}>
      {notification && (
        <span className="absolute top-10 flex h-3 w-3">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-400 opacity-75"></span>
          <span className="relative inline-flex h-3 w-3 rounded-full bg-sky-500"></span>
        </span>
      )}
      <div className="flex h-[60%] items-center tracking-wider text-dark laptop:px-4">
        <Link href={href}>{title}</Link>
      </div>

      <span className="mt-1 block h-[2px] w-full max-w-0 bg-brand transition-all duration-500 group-hover:max-w-full"></span>
    </div>
  );
};
