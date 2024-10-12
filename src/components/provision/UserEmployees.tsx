import { api } from "~/utils/api";
import type { UserProvisionType } from "./types";
import { useRef } from "react";
import useEmblaCarousel from "embla-carousel-react";

interface UserEmployeesType {
  user: UserProvisionType;
}
export const UserEmployees = ({ user }: UserEmployeesType) => {
  const ref = useRef<HTMLDivElement>(null);
  const isVisible = ref.current?.checkVisibility() === false;

  const { data, isLoading } = api.userDataHandling.getUsers.useQuery(
    { userId: user.id },
    {
      enabled: isVisible,
    }
  );

  const [emblaRef] = useEmblaCarousel({ draggable: true });

  return (
    <div ref={ref} className="mt-2 flex w-full items-center justify-center">
      <div className="flex w-[90%] justify-between">
        {/* <div className="flex h-64 w-[30%] rounded-3xl bg-[#d6d6d6] p-6"></div>
        <div className="flex h-64 w-[30%] rounded-3xl bg-[#d6d6d6] p-6"></div>
        <div className="flex h-64 w-[30%] rounded-3xl bg-[#d6d6d6] p-6"></div> */}

        <div className="w-full overflow-hidden" ref={emblaRef}>
          <div className="flex w-full">
            <div className="min-w-0 flex-[0_0_33%]">Slide 1</div>
            <div className="min-w-0 flex-[0_0_33%]">Slide 2</div>
            <div className="min-w-0 flex-[0_0_33%]">Slide 3</div>
          </div>
        </div>
      </div>
    </div>
  );
};
