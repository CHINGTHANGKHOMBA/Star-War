import { useQuery } from '@tanstack/react-query';
import { Link, useSearchParams } from "react-router-dom";
import { getPageNoFromUrl } from "../../utils";

export function VehicleListPage() {
  // const people = useLoaderData();
  // const prevPage = getPageNoFromUrl(planets.previous);
  // const nextPage = getPageNoFromUrl(planets.next);

const [searchParams] = useSearchParams();
const pageNo = searchParams.get('page') || '1'; 
const { data, isLoading, isError, error } = useQuery({
  queryKey: ['planet/list', pageNo],
  queryFn: async() => 
 fetch(`https://swapi.dev/api/vehicles/?page=${pageNo}`) 
  .then((res) => res.json()),
});
const prevPage = getPageNoFromUrl(data?.previous);
const nextPage = getPageNoFromUrl(data?.next);

  return (
    <div>
      <h1>Vehicles List</h1>
      <div>
        {data?.results?.map((v) => {
          const id = v.url
            .replace("https://swapi.dev/api/vehicles/", "")
            .replace("/", "");

          return (
            <p key={id}>
              <Link to={`/vehicles/${id}`}>{v.name}</Link>
            </p>
          );
        })}
      </div>
      <br />
      <div>
        {prevPage && <Link to={`/vehicles?page=${prevPage}`}>Prev</Link>}
        <br />
        {nextPage && <Link to={`/vehicles?page=${nextPage}`}>Next</Link>}
      </div>
    </div>
  );
}
