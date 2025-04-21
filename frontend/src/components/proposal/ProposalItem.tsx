import { FC } from "react";

type ProposalItemProps = {
  id: string;
};

export const ProposalItem: FC<ProposalItemProps> = ({ id }) => {
  return (
    <div>
      <div className="p-4 border rounded-lg shadow-sm wg-white dark:bg-gray-800 hover:border-blue-500">
        <p className="text-xl font-semibold mb-2">Title: {id}</p>
        <p className="text-gray-700 dark:text-gray-300">
          Desc: What is your vote?
        </p>
      </div>
    </div>
  );
};
