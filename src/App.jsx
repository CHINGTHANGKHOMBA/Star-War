import {
  RouterProvider,
  createBrowserRouter,
  Link,
  Outlet,
} from "react-router-dom";
import { PlanetListPage } from "./Pages/Planets/PlanetList";
import { PlanetDetailsPage } from "./Pages/Planets/PlanetDetails";
import { PeopleListPage } from "./Pages/People/PeopleList";
import { PeopleDetailsPage } from "./Pages/People/PeopleDetails";
import { VehicleListPage } from "./Pages/Vehicles/VehicleList";
import { VehicleDetailsPage } from "./Pages/Vehicles/VehicleDetails";
import { RootPage } from "./Pages/RootPage";
import { getPageNoFromUrl } from "./utils";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';


const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0
    }
  }
})





const router = createBrowserRouter([
  {
    path: "/",
    element: <RootPage />,
    children: [
      {
        path: "planets",
        element: <Outlet />,
        children: [
          {
            index: true,
            element: <PlanetListPage />,
       
          },
          {
            path: ":id",
            element: <PlanetDetailsPage />,
         
          },
        ],
      },
    ],
  },
  {
    path: "/",
    element: <RootPage />,
    children: [
      {
        path: "people",
        element: <Outlet />,
        children: [
          {
            index: true,
            element: <PeopleListPage />,
          
          },
          {
            path: ":id",
            element: <PeopleDetailsPage />,
           
          },
        ],
      },
    ],
  },
  {
    path: "/",
    element: <RootPage />,
    children: [
      {
        path: "vehicles",
        element: <Outlet />,
        children: [
          {
            index: true,
            element: <VehicleListPage />,
           
          },
          {
            path: ":id",
            element: <VehicleDetailsPage />,
    
          },
        ],
      },
    ],
  },
]);

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
    <RouterProvider router={router} />
  </QueryClientProvider>

  );
  
  
}

// function ResourseList() {
//   return (
//     <ul>
//       <li>
//         <Link to="/planets">Planets</Link>
//       </li>
//       <li>
//         <Link to="/people">Peoples</Link>
//       </li>
//       <li>
//         <Link to="/vehicles">Vehicles</Link>
//       </li>
//     </ul>
//   );
// }




function planetListLoader(opts) {
  const pageNo = getPageNoFromUrl(opts.request.url)|| 1;
  return fetch(`https://swapi.dev/api/planets/?page=${pageNo}`).then((res) => res.json());
}
function planetIdLoader({ params }) {
  return fetch(`https://swapi.dev/api/planets/${params.id}/`).then((res) =>
    res.json()
  );
}

function peopleListLoader(opts) {
  const pageNo = getPageNoFromUrl(opts.request.url) || 1;
  return fetch(`https://swapi.dev/api/people/?page=${pageNo}`).then((res) => res.json());
}

function peopleIdLoader({ params }) {
  return fetch(`https://swapi.dev/api/people/${params.id}/`).then((res) =>
    res.json()
  );
}

function vehicleListLoader(opts) {
  const pageNo = getPageNoFromUrl(opts.request.url) || 1;
  return fetch(`https://swapi.dev/api/vehicles/?page=${pageNo}`).then((res) => res.json());
}
function vehicleIdLoader({ params }) {
  return fetch(`https://swapi.dev/api/vehicles/${params.id}/`).then((res) =>
    res.json()
  );
}
