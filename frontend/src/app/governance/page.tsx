'use client';

import { useNetworkVariable } from "@/config/networkConfig";
import { TESTNET_DASHBOARD_ID } from "@/constants";
import { useSuiClientQuery } from "@mysten/dapp-kit";

const PROPOSAL_COUNT = 7;

const ProposalItem = () => {
    return (
      <div>
        <div className="p-4 border rounded-lg shadow-sm wg-white dark:bg-gray-800 hover:border-blue-500">
          <p className="text-xl font-semibold mb-2">Title: Hello There</p>
          <p className="text-gray-700 dark:text-gray-300">Desc: What is your vote?</p>
        </div>
      </div>
    );
  }

  const ProposalView = () => {
    const dashboardId = useNetworkVariable("dashboardId");

    const { data: dataResponse, isPending, error } = useSuiClientQuery(
      "getObject", {
        id: dashboardId,
        options: {
          showContent: true
        }
      }
    );

    if (isPending) return <div className="text-center text-gray-500">Loading...</div>;
    if (error) return <div className="text-red-500">Error: { error.message }</div>;
    if (!dataResponse.data) return <div className="text-center text-gray-500">Not found...</div>;

    debugger

    return (
      <>
        <h1 className="text-4xl font-bold mb-8">New Proposals</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* {
            new Array(PROPOSAL_COUNT).fill(1).map((id) =>
              <ProposalItem key={id * Math.random()}/>
          )} */}
          {JSON.stringify(dataResponse)}
        </div>
      </>
    )
  }

  export default ProposalView;