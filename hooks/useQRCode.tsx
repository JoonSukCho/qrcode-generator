import { QRCodeContext } from '@/components/Provider/QRcodeProvider';
import React, { useContext } from 'react';

const useQRCode = () => {
  const context = useContext(QRCodeContext);

  if (!context) {
    throw new Error('useQRCode must be used within a QRCodeProvider');
  }

  return context;
};

export default useQRCode;
