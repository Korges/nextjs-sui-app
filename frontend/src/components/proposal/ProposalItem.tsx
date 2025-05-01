import { useSuiClientQuery } from "@mysten/dapp-kit";
import { FC, useState } from "react";
import { CustomText } from "../Shared";
import { Proposal } from "@/types";
import { SuiObjectData } from "@mysten/sui/client";
import { VoteModal } from "./VoteModal";

interface ProposalItemProps {
  id: string;
};

export const ProposalItem: FC<ProposalItemProps> = ({ id }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
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

  const expiration = proposal.expiration;
  const isExpired = isUnixTimeExpired(expiration);


  return (
    <>
      <div
        onClick={() => !isExpired && setIsModalOpen(true)}
        className={`${isExpired ? "cursor-not-allowed border-gray-600" : "hover:border-blue-500"}
          p-4 border rounded-lg shadow-sm bg-white dark:bg-gray-800  transition-colors cursor-pointer`}
      >
        <p className={`${isExpired ? "text-gray-500" : "text-gray-700"} text-xl font-semibold mb-2"`}>Title: {proposal.title}</p>
        <p className={`${isExpired ? "text-gray-500" : "text-gray-700"} dark:text-gray-300}`}>{proposal.description}</p>
        <div className="flex items-center justify-between mt-4">
          <div className="flex space-x-4">
            <div className={`${isExpired ? "text-green-900" : "text-green-600"} flex items-center `}>
              <span className="mr-1">👍</span>
              {proposal.votedYesCount}
            </div>
            <div className={`${isExpired ? "text-red-900" : "text-red-600"} flex items-center `}>
              <span className="mr-1">👎</span>
              {proposal.votedNoCount}
            </div>
          </div>
          <div>
            <CustomText text={formatUnixTime(expiration)}/>
            <p className={`${isExpired ? "text-gray-600" : "text-gray-300"}`}>{formatUnixTime(expiration)}</p>
          </div>
        </div>
      </div>
      <VoteModal
        proposal={proposal}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onVote={(votedYes: boolean) => console.log(votedYes)}
      />
    </>
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

function isUnixTimeExpired(unixTimeSec: number) {
  return new Date(unixTimeSec * 1000) < new Date();

}

function formatUnixTime(timestampSec: number) {
  if (isUnixTimeExpired(timestampSec)) {
    return "Expired";
  }
  return new Date(timestampSec * 1000).toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit"
  });
}