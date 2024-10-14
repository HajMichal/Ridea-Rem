import { api } from "~/utils/api";
import type { FeesNames, UserProvisionType } from "./types";
import { useEffect, useRef, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";
import { roleNameMapping } from "./UserCard";
import { ProvisionTableRow } from "./ProvisionTableRow";
import { avivableProvision } from "./CardBody";
import { Loading } from "../Loading";
import { useIntersection } from "~/hooks/useIntersection";
interface UserEmployeesType {
  user: UserProvisionType;
}

export const UserEmployees = ({ user }: UserEmployeesType) => {
  const ref = useRef<HTMLDivElement>(null);
  const isVisible = useIntersection(ref, "0px");

  const { data, isLoading, refetch } = api.userDataHandling.getUsers.useQuery(
    { userId: user.id },
    {
      enabled: isVisible,
    }
  );
  const isOverTwoUsers = data && data.length > 2;

  useEffect(() => {
    if (isVisible) void refetch();
  }, [isVisible]);
  const [emblaRef, emblaApi] = useEmblaCarousel({
    draggable: true,
    startIndex: 1,
  });

  return (
    <div
      ref={ref}
      className={`mb-10 mt-2 flex w-full items-center justify-center ${
        data?.length !== 0 && data !== undefined && "h-[270.38px]"
      } ${isOverTwoUsers && "justify-between"}`}
    >
      {!isLoading && (
        <>
          <button onClick={() => emblaApi?.scrollPrev()}>
            {isOverTwoUsers && (
              <SlArrowLeft size={"40px"} className="text-dark" />
            )}
          </button>
          <div className="flex w-[90%] justify-between">
            <div className="w-full overflow-hidden" ref={emblaRef}>
              <div className="flex w-full max-w-[600px] gap-10 xl:max-w-[960px]">
                {data?.map((user, index) => {
                  return (
                    <div
                      key={index}
                      className={`flex min-w-0 flex-[0_0_45%] flex-col items-center justify-center rounded-2xl bg-[#d6d6d6] py-5 xl:flex-[0_0_33%]`}
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
          <button onClick={() => emblaApi?.scrollNext()}>
            {isOverTwoUsers && (
              <SlArrowRight size={"40px"} className="text-dark" />
            )}
          </button>
        </>
      )}
    </div>
  );
};
