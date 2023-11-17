import { ChangeEvent, FC, KeyboardEvent } from 'react';
import { formatUnits } from 'viem';

interface IProps {
  value: string;
  onChange: (value: string) => void;
  userEthBalance?: {
    value: bigint;
  };
}
export const DonationInput: FC<IProps> = ({
  value,
  onChange,
  userEthBalance,
}) => {
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value.replace(/[^0-9.,]/g, '');
    onChange(newValue);
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    const allowedCharacters = /^[0-9.,]+$/;
    const isValidChar = allowedCharacters.test(e.key);
    if (!isValidChar) {
      e.preventDefault();
    }
  };

  return (
    <input
      type="text"
      placeholder="0.00"
      inputMode="decimal"
      autoComplete="off"
      autoCorrect="off"
      pattern="^[0-9]*[.,]?[0-9]*$"
      spellCheck="false"
      value={value}
      onChange={handleInputChange}
      onKeyPress={handleKeyPress}
      max={userEthBalance ? formatUnits(userEthBalance?.value, 18) : '0'}
      min="0"
      className="text-dark w-full rounded-2xl border bg-transparent p-2 dark:text-white"
    />
  );
};
