import { DonationBox } from "./components";
export const Page = () => {
  return (
    <>
      <div className="mx-auto my-8 md:my-24 pb-8 flex w-full max-w-4xl flex-col items-stretch gap-44 px-10">
        <DonationBox className="w-full" />
      </div>
    </>
  );
};

export default Page;
