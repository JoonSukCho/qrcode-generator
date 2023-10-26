import Head from 'next/head';
import { Inter } from 'next/font/google';
import styles from '@/styles/Home.module.css';
import { QRCodeCanvas } from 'qrcode.react';
import { useEffect, useRef, useState } from 'react';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [inputValue, setInputValue] = useState('https://');
  const [qrValue, setQRValue] = useState('https://');
  const [qrSize, setQRSize] = useState<number>(300);
  const [qrLevel, setQRLevel] = useState('M');
  const [qrLogo, setQRLogo] = useState('');
  const [qrLogoSize, setQRLogoSize] = useState(64);
  const [useKottonseedLogo, setUseKottonseedLogo] = useState(false);

  const downloadQR = () => {
    generateQRCode();

    setTimeout(() => {
      const canvasElement = document.getElementById(
        'qr-code-canvas'
      ) as HTMLCanvasElement;

      if (canvasElement) {
        const pngUrl = canvasElement
          .toDataURL('image/png')
          .replace('image/png', 'image/octet-stream');
        let downloadLink = document.createElement('a');
        downloadLink.href = pngUrl;
        downloadLink.download = 'qr_code.png';
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
      }
    }, 300);
  };

  const onChangeQrSize = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQRSize(Number(e.target.value));
  };

  const onChangeURL = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const onChangeLevel = (e: React.ChangeEvent<HTMLSelectElement>) => {
    console.log(e.target.value);
    setQRLevel(e.target.value);
  };

  const onChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFile = e.target.files[0];

      const objectUrl = window.webkitURL.createObjectURL(selectedFile);
      setQRLogo(objectUrl);
      setUseKottonseedLogo(false);
    }
  };

  const onChangeLogoSize = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQRLogoSize(Number(e.target.value));
  };

  const onChangeUseKottonseedLogo = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setUseKottonseedLogo(e.target.checked);
    setQRLogo(e.target.checked ? '/kottonseed_logo.png' : '');
  };

  const initLogo = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
      setQRLogo('');
      setQRLogoSize(64);
      setUseKottonseedLogo(false);
    }
  };

  const generateQRCode = () => {
    setQRValue(inputValue);
  };

  return (
    <>
      <Head>
        <title>QR Code Generator</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`${styles.main} ${inter.className}`}>
        <QRCodeCanvas
          id="qr-code-canvas"
          value={qrValue}
          size={qrSize}
          level={qrLevel}
          includeMargin
          imageSettings={{
            src: qrLogo,
            width: qrLogoSize,
            height: qrLogoSize,
            x: undefined,
            y: undefined,
            excavate: true,
          }}
        />
        <div className={styles.qrInformation}>
          <div className={styles.inputWrapper}>
            <label htmlFor="qr-size">QRCode Size (px)</label>
            <input
              id="qr-size"
              className={styles.qrInput}
              type="number"
              value={qrSize}
              onChange={onChangeQrSize}
            />

            <label htmlFor="qr-url" className={styles.mt_8}>
              URL
            </label>
            <input
              id="qr-url"
              className={styles.qrInput}
              type="text"
              value={inputValue}
              onChange={onChangeURL}
            />

            <label htmlFor="qr-level" className={styles.mt_8}>
              Level
              <p className={styles.sub}>
                (QR코드 인식이 잘 안되면, 레벨을 올려보세요)
              </p>
            </label>
            <select
              id="qr-level"
              className={styles.qrInput}
              value={qrLevel}
              onChange={onChangeLevel}
            >
              <option value="L">L (1)</option>
              <option value="M">M (2)</option>
              <option value="Q">Q (3)</option>
              <option value="H">H (4)</option>
            </select>

            <label htmlFor="qr-logo" className={styles.mt_8}>
              Logo
            </label>
            <input
              id="qr-logo"
              type="file"
              ref={fileInputRef}
              onChange={onChangeFile}
            />

            <div className={styles.use_kottonseed}>
              <label htmlFor="kottonseed-logo">Use KottonSeed Logo</label>
              <input
                id="kottonseed-logo"
                type="checkbox"
                className={styles.input_checkbox}
                checked={useKottonseedLogo}
                onChange={onChangeUseKottonseedLogo}
              />
            </div>

            {qrLogo !== '' && (
              <>
                <label htmlFor="qr-logo-w" className={styles.mt_8}>
                  Logo Size (px)
                </label>
                <input
                  id="qr-logo-w"
                  className={styles.qrInput}
                  type="number"
                  min={0}
                  value={qrLogoSize}
                  onChange={onChangeLogoSize}
                />
                <button className={styles.button} onClick={initLogo}>
                  로고 초기화
                </button>
              </>
            )}
          </div>

          <div className={styles.buttonContainer}>
            <button className={styles.button} onClick={generateQRCode}>
              생성하기
            </button>
            <a className={styles.button} onClick={downloadQR}>
              이미지 다운로드
            </a>
          </div>
        </div>
      </main>
    </>
  );
}
