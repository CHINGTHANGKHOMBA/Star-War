import { useQuery } from '@tanstack/react-query';
// import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";  //useLoaderData

export function PeopleDetailsPage() {
  // const data = useLoaderData();
  const { id = '1' } = useParams();
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['people/details, id'],
    queryFn: async() => 
    fetch(`https://swapi.dev/api/people/${id}`)
    .then((res) => res.json(),
    ),
  })

  if (isLoading) return 'Loading...'

  if (error) return 'An error has occurred: ' + error.message

  if (!data) {
    return null;
  }

  return (
    <div>
      <h1>People Details</h1>
      <h4> {data.name} </h4>
      <p>Height: {data.height} </p>
      <p>Hair_color: {data.hair_color} </p>
      <p>Birth_year: {data.birth_year} </p>
    </div>
  );
}
