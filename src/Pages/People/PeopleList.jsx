import { useQuery } from '@tanstack/react-query';
// import { react } from 'react';
import { Link, useSearchParams } from "react-router-dom";
import { getPageNoFromUrl } from "../../utils";

export function PeopleListPage() {
  // const people = useLoaderData();
  // const prevPage = getPageNoFromUrl(people.previous);
  // const nextPage = getPageNoFromUrl(people.next);

const [searchParams] = useSearchParams();
const pageNo = searchParams.get('page') || '1'; 
const { data, isLoading, isError, error } = useQuery({
  queryKey: ['people/list', pageNo],
  queryFn: async() => 
 fetch(`https://swapi.dev/api/people/?page=${pageNo}`) 
  .then((res) => res.json(),
  ),
})
const prevPage = getPageNoFromUrl(data?.previous);
const nextPage = getPageNoFromUrl(data?.next);

if (isLoading) {
  return (
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
  );
}
if (error) return "An error has occurred" + error.message



  return (
    <div>
      <h1>People List</h1>
      <input
      placeholder="Search..."
      
      />
   <div>
   {data?.results?.map((p) => {
        const id = p.url
          .replace("https://swapi.dev/api/people/", "")
          .replace("/", "");

        return (
          <p key={id}>
            <Link to={`/people/${id}`}> {p.name} </Link>
          </p>
        );
      })}

   </div>
  <br/>
  <div>
    {prevPage && <Link to={`/people?page=${prevPage}`}>Prev</Link>}
    <br/>
    {nextPage && <Link to={`/people?page=${nextPage}`}>Next</Link>}
  </div>
  
    </div>
  );
}
