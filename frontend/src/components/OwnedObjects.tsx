import { useCurrentAccount, useSuiClientQuery } from "@mysten/dapp-kit";

export const OwnedObjects = () => {
  const account = useCurrentAccount();
  const {
    data: response,
    isPending,
    error,
  } = useSuiClientQuery(
    "getOwnedObjects",
    {
      owner: account?.address as string,
      options: {
        showType: true,
        showOwner: true,
        showContent: true,
      },
    },
    { enabled: !!account },
  );

  if (!account) return "Cannot retrieve account";
  if (error) return <>Error: {error.message}</>;
  if (isPending || !response) return <div>Loading...</div>;

  debugger;

  return (
    <div className="flex flex-col my-4 space-y-4">
      {response.data.length === 0 ? (
        <p>No objects owned by connected wallet</p>
      ) : (
        <h2>Objects owned by connected Wallet</h2>
      )}
      <div>
        {response.data.map((objectRes) => (
          <div key={objectRes.data?.objectId}>
            <p>Object ID: {objectRes.data?.objectId}</p>
            <p></p>
          </div>
        ))}
      </div>
    </div>
  );
};
