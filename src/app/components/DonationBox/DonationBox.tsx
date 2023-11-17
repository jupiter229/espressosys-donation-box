'use client';

import { twclsx } from '@/utils';
import { ComponentProps, FC, useState, useEffect, use } from 'react';
import { FaDonate } from "react-icons/fa";
import {AnimatePresence, motion} from 'framer-motion';
import { useDonationContractConfig, useTotalDonations, useUserTotalDonations } from '@/hooks/contract';
import { formatUnits, formatEther, parseEther } from 'viem';
import { 
  useBalance, 
  useAccount, 
  useContractWrite, 
  usePrepareContractWrite, 
  useContractEvent 
} from 'wagmi'
import { DonationInput } from '../DonationInput';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface IProps extends ComponentProps<'section'> {}

export const DonationBox: FC<IProps> = ({ className, ...props }) => {
  const [value, setValue] = useState<string>("");
  const [usersTotal, setUersTotal] = useState<string>("");
  const [userDonationTotal, setUserDonationTotal] = useState<string>("");
  const [newDonation, setNewDonation] = useState<bigint>(BigInt(0));

  // Get user address and balance of connected chain
  const { address: userAddress } = useAccount();
  const { data: userEthBalance } = useBalance(
    {address: userAddress}
  );
  // Get donation contract address and abi
  const { address, abi } = useDonationContractConfig();

  // Get total donations deposited to the contract
  const { total } = useTotalDonations();

  useEffect(() => {
    if (total || newDonation) {
      setUersTotal(formatEther((total || BigInt(0)) + newDonation));
    }
  }, [total, newDonation]);

  // Get a specific user's total donations
  const getUserTotalDonations = useUserTotalDonations(address, userAddress);
  useEffect(() => {
    getUserTotalDonations().then((result) => {
      setUserDonationTotal(formatEther(result));
    });
  }, [getUserTotalDonations, newDonation]);

  // Listen for DonationTransferred event
  useContractEvent({
    address: address,
    abi: abi,
    eventName: 'DonationTransferred',
    listener(log) {
      console.log(log)
      const amount = log[0]?.args?.amount || BigInt(0);
      setNewDonation(amount)
    },
  })

  // Send donation to the contract
  const { config } = usePrepareContractWrite({
    address: address,
    abi: abi,
    functionName: 'donate',
    value: parseEther(value),
  })
  const { status, write } = useContractWrite(config)

  useEffect(() => {
    switch (status) {
      case 'error':
        toast.error('There was an error sending your donation. Please try again later.');
        break;
      case 'success':
        toast.success('🦄 Wow, Donation sent!');
        break;
      default:
        break;
    }
  }, [status]);
  return (
    <>
      <section className={twclsx('space-y-12', className)} {...props}>
        <h2 className="text-center text-3xl font-bold leading-loose">
          Donate now!
          <div className="text-5xl">
            <span className="font-light"> Save nature & save the world</span>
          </div>
        </h2>
        <AnimatePresence>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ rotate: 360, scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 20
            }}
          >
        
          <div className="flex flex-col rounded-lg border border-primary bg-base px-8 py-5">
            <div className="divider" />
            <div className="mx-auto flex w-full max-w-md flex-col items-center gap-8">
              <div className="flex w-full items-center justify-between font-bold">
                <h4 className="text-lg">Total Donation</h4>
                <p className="text-lg md:text-4xl text-primary">{usersTotal} ETH</p>
              </div>
              <div className="flex w-full items-center justify-between text-lg font-bold">
                <h4 className="font-bold">Your Donation</h4>
                <p className="text-lg md:text-4xl text-primary">{userDonationTotal} ETH</p>
              </div>
              <div className="flex w-full items-center justify-between gap-x-4 text-lg text-dark dark:text-white">
                <DonationInput
                  value={value}
                  onChange={(newValue) => setValue(newValue)}
                  userEthBalance={userEthBalance}
                />
                <button 
                  className="btn text-primary font-bold" 
                  onClick={() => setValue(userEthBalance ? formatUnits(userEthBalance?.value, 18) : "0")}
                >
                  MAX
                </button>

              </div>
              <button 
                disabled={!write} onClick={() => write?.()}
                className="btn btn-primary w-60">
                {status === 'loading' && 'Donating...'}
                {(status === 'idle' || status === 'error' || status === 'success') && 'Donate'}
              
                <FaDonate
                  className="transition-all duration-300"
                />
              </button>
            </div>
          </div>
        </motion.div>
        </AnimatePresence>
      </section>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        limit={1}
        theme="dark"
      />
    </>
  );
};
