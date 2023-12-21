import { Dispatch, SetStateAction, createContext, useState } from 'react';
import { QR_LEVEL, URL_TYPE } from '../../../types/qrCode';

export const QRCodeContext = createContext<
  | {
      originUrl: string;
      shortenUrl: string;
      urlType: URL_TYPE;
      qrValue: string;
      qrSize: number;
      qrLevel: QR_LEVEL;
      qrLogo: string;
      qrLogoSize: number;
      setUrlType: Dispatch<SetStateAction<URL_TYPE>>;
      setOriginUrl: Dispatch<SetStateAction<string>>;
      setShortenUrl: Dispatch<SetStateAction<string>>;
      setQRValue: Dispatch<SetStateAction<string>>;
      setQRSize: Dispatch<SetStateAction<number>>;
      setQRLevel: Dispatch<SetStateAction<QR_LEVEL>>;
      setQRLogo: Dispatch<SetStateAction<string>>;
      setQRLogoSize: Dispatch<SetStateAction<number>>;
    }
  | undefined
>(undefined);

export const QRCodeProvider = ({ children }: { children: React.ReactNode }) => {
  const [originUrl, setOriginUrl] = useState('https://');
  const [shortenUrl, setShortenUrl] = useState('');
  const [urlType, setUrlType] = useState<URL_TYPE>('originUrl');
  const [qrValue, setQRValue] = useState('https://');
  const [qrSize, setQRSize] = useState<number>(500);
  const [qrLevel, setQRLevel] = useState<QR_LEVEL>('Q');
  const [qrLogo, setQRLogo] = useState('');
  const [qrLogoSize, setQRLogoSize] = useState(0);

  return (
    <QRCodeContext.Provider
      value={{
        originUrl,
        shortenUrl,
        urlType,
        qrValue,
        qrSize,
        qrLevel,
        qrLogo,
        qrLogoSize,
        setOriginUrl,
        setShortenUrl,
        setUrlType,
        setQRValue,
        setQRSize,
        setQRLevel,
        setQRLogo,
        setQRLogoSize,
      }}
    >
      {children}
    </QRCodeContext.Provider>
  );
};
