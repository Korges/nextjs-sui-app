"use client";

import { useNetworkVariable } from "@/config/networkConfig";
import { TESTNET_DASHBOARD_ID } from "@/constants";
import { useSuiClientQuery } from "@mysten/dapp-kit";
import { SuiObjectData } from "@mysten/sui/client";

const ProposalView = () => {
  const dashboardId = useNetworkVariable("dashboardId");

  const {
    data: dataResponse,
    isPending,
    error,
  } = useSuiClientQuery("getObject", {
    id: dashboardId,
    options: {
      showContent: true,
    },
  });

  if (isPending)
    return <div className="text-center text-gray-500">Loading...</div>;
  if (error) return <div className="text-red-500">Error: {error.message}</div>;
  if (!dataResponse.data)
    return <div className="text-center text-gray-500">Not found...</div>;

  return (
    <>
      <h1 className="text-4xl font-bold mb-8">New Proposals</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {getDashboardFields(dataResponse.data)?.proposals_ids.map((id) => (
          <ProposalItem key={id} id={id} />
        ))}
      </div>
    </>
  );
};

type SuiID = {
  id: string;
};

function getDashboardFields(data: SuiObjectData) {
  if (data.content?.dataType !== "moveObject") return null;

  return data.content.fields as {
    id: SuiID;
    proposals_ids: string[];
  };
}

export default ProposalView;
