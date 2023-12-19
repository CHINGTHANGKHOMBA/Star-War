import { useQuery } from "@tanstack/react-query";
import { Link, useSearchParams } from "react-router-dom";
import { getPageNoFromUrl } from "../../utils";

export function PlanetListPage() {
  // const people = useLoaderData();
  // const prevPage = getPageNoFromUrl(planets.previous);
  // const nextPage = getPageNoFromUrl(planets.next);

  const [searchParam, setSearchParam] = useSearchParams();
  const pageNo = searchParam.get("page") || "1";
  const search = searchParam.get('search') || '';
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["planet/list", search, pageNo],
    queryFn: async () =>
      fetch(
        `https://swapi.dev/api/planets/?page=${pageNo}&search=${search}`
      ).then((res) => res.json()),
  });
  const prevPage = getPageNoFromUrl(data?.previous);
  const nextPage = getPageNoFromUrl(data?.next);

  if (error) return "An error has occurred" + error.message;

  return (
    <div>
      <h1>Planet List</h1>
      <input
        placeholder="Search..."
        value={search}
        onChange={e => {
          const sp = new URLSearchParams(searchParam);
          sp.set("page", 1);
          sp.set("search", e.target.value);
          setSearchParam(sp);
        }}
      />
        {isLoading ? (
        <div
          style={{
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <span className="loader"></span>
        </div>
      ) : (
        <>
      <div>
        {data?.results?.map((p) => {
          const id = p.url
            .replace("https://swapi.dev/api/planets/", "")
            .replace("/", "");

          return (
            <p key={id}>
              <Link to={`/planets/${id}`}>{p.name}</Link>
            </p>
          );
        })}
      </div>
      <br />
      <div>
        {prevPage && <Link to={`/planets?page=${prevPage}&search=${search}`}>Prev</Link>}
        <br />

        {nextPage && <Link to={`/planets?page=${nextPage}&search=${search}`}>Next</Link>}
      </div>
      </>
      )}
    </div>
  );
}
