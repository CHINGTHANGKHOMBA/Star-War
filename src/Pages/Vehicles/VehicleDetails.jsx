import { useEffect, useState } from 'react';
import { useParams, useLoaderData } from 'react-router-dom';

export function VehicleDetailsPage() {

const data = useLoaderData();


if (!data) {
    return null;
}


    return(
        <div>
            <h3> {data.name} </h3>
            <p>Model: {data.model} </p>
            <p>Manufacturer: {data.manufacturer} </p>
            <p>cost_in_credits: {data.cost_in_credits} </p>
            <p>Crew: {data.crew} </p>
        </div>
    );
}