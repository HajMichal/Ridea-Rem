import { api } from "~/utils/api";
import CardDescription from "../newsPageComponent/CardDescription";
import { urlify } from "../newsPageComponent/FindUrl";

export const LastPosts = () => {
  const { data: posts } = api.newsDataRouter.getLastPosts.useQuery();

  return (
    <div className="hide-scroll-bar absolute right-10 h-4/5 w-1/2 max-w-2xl overflow-y-scroll rounded-xl border bg-slate-100 bg-opacity-80 p-3 shadow-2xl lg:w-1/3">
      <h1 className=" text-center font-orkney text-2xl">AKTUALNOŚCI</h1>
      <div className="h-auto w-full bg-cover p-2">
        {posts?.map((post) => {
          return (
            <div
              key={post.id}
              className="my-4 h-auto w-full rounded-l-lg rounded-tr-lg bg-white p-2"
            >
              <h1 className="text-xl">{urlify(post.title)}</h1>
              {post.description !== "" && (
                <CardDescription
                  description={post.description}
                  title={post.title}
                  url={post.url}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
