import { useEffect, useState } from "react";
// import { FormattedDatetime } from "./Datetime";

interface Props {
  repoName: string | undefined;
  username: string | undefined;
}

interface GithubRepoData {
  stargazers_count: number;
  created_at: string;
  updated_at: string;
  forks_count: number;
}

export default function ProjectStats({ repoName, username }: Props) {
  const [modDatetime, setLastUpdatedDate] = useState<Date | undefined>();
  const [pubDatetime, setPubDatetime] = useState<Date | undefined>();
  const [data, setData] = useState<GithubRepoData | undefined>();

  useEffect(() => {
    console.log("NetworkCall start");
    if (!repoName || !username) return;

    fetch(`https://api.github.com/repos/${username}/${repoName}`)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Something went wrong');
      })
      .then(data => {
        setLastUpdatedDate(new Date(data.updated_at));
        setPubDatetime(new Date(data.created_at));
        setData(data);
      })
      .catch((e) => {
        console.log(repoName, username, e)
      });
  }, []);

  const size = "sm";
  return (
    <div className={`flex items-center space-x-2 opacity-80`.trim()}>
      {pubDatetime && modDatetime && (
        <>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`${
              size === "sm" ? "scale-90" : "scale-100"
            } inline-block h-6 w-6 min-w-[1.375rem] fill-skin-base`}
            aria-hidden="true"
          >
            <path d="M7 11h2v2H7zm0 4h2v2H7zm4-4h2v2h-2zm0 4h2v2h-2zm4-4h2v2h-2zm0 4h2v2h-2z"></path>
            <path d="M5 22h14c1.103 0 2-.897 2-2V6c0-1.103-.897-2-2-2h-2V2h-2v2H9V2H7v2H5c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2zM19 8l.001 12H5V8h14z"></path>
          </svg>
          {modDatetime ? (
            <span
              className={`italic ${size === "sm" ? "text-sm" : "text-base"}`}
            >
              Updated:
            </span>
          ) : (
            pubDatetime && <span className="sr-only">Published:</span>
          )}
          {pubDatetime && modDatetime && (
            <span
              className={`italic ${size === "sm" ? "text-sm" : "text-base"}`}
            >
              {/* <FormattedDatetime
                pubDatetime={pubDatetime}
                modDatetime={modDatetime}
              /> */}
            </span>
          )}
        </>
      )}
      <StarsCount starCount={data?.stargazers_count ?? 0} />

      <ForkCount forks_count={data?.forks_count ?? 0} />
    </div>
  );
}

const StarsCount = ({ starCount }: { starCount: number | undefined }) => {
  return !starCount ? (
    ""
  ) : (
    <>
      <span aria-hidden="true"> | </span>

      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="1"
        style={{ height: 16, width: 16 }}
        stroke-linecap="round"
        stroke-linejoin="round"
        class="icon icon-tabler icons-tabler-outline icon-tabler-star"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z" />
      </svg>

      <span className="text-base italic">{starCount}</span>
    </>
  );
};

const ForkCount = ({ forks_count }: { forks_count: number | undefined }) => {
  return !forks_count ? (
    ""
  ) : (
    <>
      <span aria-hidden="true"> | </span>

      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        style={{ height: 16, width: 16 }}
        stroke-width="1"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="icon icon-tabler icons-tabler-outline icon-tabler-grill-fork"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M5 5l11.5 11.5" />
        <path d="M19.347 16.575l1.08 1.079a1.96 1.96 0 0 1 -2.773 2.772l-1.08 -1.079a1.96 1.96 0 0 1 2.773 -2.772z" />
        <path d="M3 7l3.05 3.15a2.9 2.9 0 0 0 4.1 -4.1l-3.15 -3.05" />
      </svg>

      <span className="text-base italic">{forks_count}</span>
    </>
  );
};
