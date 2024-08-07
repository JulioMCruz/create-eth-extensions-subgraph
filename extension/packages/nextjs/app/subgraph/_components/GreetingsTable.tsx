"use client";

import { useEffect, useState } from "react";
import { Address } from "~~/components/scaffold-eth";
import { GetGreetingsDocument,execute } from "~~/.graphclient";

const GreetingsTable = () => {

  const [greetingsData, setGreetingsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError]: any = useState(null);


  useEffect(() => {
    const getData = async () => {
      try {
        const { data: result } = await execute(GetGreetingsDocument, {});
        setGreetingsData(result);
        console.log(result);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, []);

  // Subgraph maybe not yet configured
  if (error) {
    return <></>;
  }

  return (
    <div className="flex justify-center items-center mt-10">
      <div className="overflow-x-auto shadow-2xl rounded-xl">
        <table className="table bg-base-100 table-zebra">
          <thead>
            <tr className="rounded-xl">
              <th className="bg-primary"></th>
              <th className="bg-primary">Sender</th>
              <th className="bg-primary">Greetings</th>
            </tr>
          </thead>
          <tbody>
          {(greetingsData as any)?.greetings?.map((greeting: any, index: number) => {
              return (
                <tr key={greeting.id}>
                  <th>{index + 1}</th>
                  <td>
                    <Address address={greeting?.sender?.address} />
                  </td>
                  <td>{greeting.greeting}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default GreetingsTable;
