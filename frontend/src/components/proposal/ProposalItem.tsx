import { useSuiClientQuery } from "@mysten/dapp-kit";
import { FC } from "react";
import { CustomText } from "../Shared";
import { Proposal } from "@/types";
import { SuiObjectData } from "@mysten/sui/client";

type ProposalItemProps = {
  id: string;
};

export const ProposalItem: FC<ProposalItemProps> = ({ id }) => {
  const {
    data: dataResponse,
    error,
    isPending,
  } = useSuiClientQuery("getObject", {
    id,
    options: {
      showContent: true,
    },
  });

  if (isPending) return <CustomText centered text="Loading..."/>
  if (error) return <CustomText isError text={`Error: ${error.message}`}/>
  if (!dataResponse.data) return <CustomText text="Not Found..."/>

  const proposal = parseProposal(dataResponse.data);

  if(!proposal) return <CustomText text="No data found"/>

  return (
      <div className="p-4 border rounded-lg shadow-sm wg-white dark:bg-gray-800 hover:border-blue-500">
        <p className="text-xl font-semibold mb-2">Title: {proposal.title}</p>
        <p className="text-gray-700 dark:text-gray-300">{proposal.description}</p>
        <div className="flex items-center justify-between mt-4">
          <div className="flex space-x-4">
            <div className="flex items-center text-green-600">
              <span className="mr-1">👍</span>
              {proposal.votedYesCount}
            </div>
            <div className="flex items-center text-red-600">
              <span className="mr-1">👎</span>
              {proposal.votedNoCount}
            </div>
          </div>
          <div>
            <CustomText text={formatUnixTime(proposal.expiration)}/>
          </div>
        </div>
      </div>
  );
};

function parseProposal(data: SuiObjectData): Proposal | null {
  if (data.content?.dataType !== "moveObject") return null;

  const { voted_yes_count, voted_no_count, expiration, ...rest} = data.content.fields as any;

  return {
    ...rest,
    votedYesCount: Number(voted_yes_count),
    votedNoCount: Number(voted_yes_count),
    expiration: Number(expiration)
  }
}

function formatUnixTime(timestampSec: number) {
  return new Date(timestampSec * 1000).toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit"
  });
}