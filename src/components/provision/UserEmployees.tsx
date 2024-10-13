import { api } from "~/utils/api";
import type { FeesNames, UserProvisionType } from "./types";
import { useRef } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";
import { roleNameMapping } from "./UserCard";
import { ProvisionTableRow } from "./ProvisionTableRow";
import { avivableProvision } from "./CardBody";
import { Loading } from "../Loading";
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

  const [emblaRef, emblaApi] = useEmblaCarousel({ draggable: true });

  return (
    <div
      ref={ref}
      className="mb-10 mt-2 flex w-full items-center justify-between"
    >
      <>
        {data && data.length > 2 && (
          <button onClick={() => emblaApi?.scrollPrev()}>
            <SlArrowLeft size={"40px"} className="text-dark" />
          </button>
        )}
        <div className="w-[90%] flex justify-between">
          <div className="w-full overflow-hidden" ref={emblaRef}>
            <div className="flex w-full gap-10">
              {data?.map((user, index) => {
                return (
                  <div
                    key={index}
                    className="flex-[0_0_33%] bg-[#d6d6d6] flex min-w-0 flex-col items-center justify-center rounded-2xl py-5"
                  >
                    <h3 className="font-orkneyBold">
                      {roleNameMapping[user.role]}
                    </h3>
                    <h2 className="text-2xl">{user.name}</h2>
                    <div>
                      {Object.keys(avivableProvision).map((provision) => {
                        return (
                          <div key={provision} className="flex gap-2">
                            <h3>{avivableProvision[provision]}:</h3>
                            <h3 className="font-semibold">
                              {user[provision as FeesNames]}
                            </h3>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        {data && data.length > 2 && (
          <button onClick={() => emblaApi?.scrollNext()}>
            <SlArrowRight size={"40px"} className="text-dark" />
          </button>
        )}
      </>
    </div>
  );
};
