import { useSuiClientQuery } from "@mysten/dapp-kit";
import { FC } from "react";
import { CustomText } from "../Shared";

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

  return (
    <div>
      <div className="p-4 border rounded-lg shadow-sm wg-white dark:bg-gray-800 hover:border-blue-500">
        <p className="text-xl font-semibold mb-2">Title: {id}</p>
        <p className="text-gray-700 dark:text-gray-300">Desc: What is your vote?</p>
      </div>
    </div>
  );
};
