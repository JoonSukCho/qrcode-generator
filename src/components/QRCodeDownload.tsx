import {
  Button,
  Card,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Stack,
} from '@mui/material';
import { QRCodeCanvas } from 'qrcode.react';
import useQRCode from '../../hooks/useQRCode';
import { URL_TYPE } from '../../types/qrCode';

const QRCodeDownload = () => {
  const {
    originUrl,
    shortenUrl,
    urlType,
    qrValue,
    qrSize,
    qrLevel,
    qrLogo,
    qrLogoSize,
    qrLogoExcavate,
    qrFgColor,
    qrBgColor,
    setUrlType,
    setQRValue,
  } = useQRCode();

  const onClickDownload = () => {
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

  // URL 선택 핸들러
  const onChangeSelectedUrl = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedValue = e.target.value as URL_TYPE;
    setUrlType(selectedValue);

    if (selectedValue === 'originUrl') {
      setQRValue(originUrl);
    }

    if (selectedValue === 'shortenUrl') {
      setQRValue(shortenUrl);
    }
  };

  return (
    <Card variant="outlined" sx={{ position: 'sticky', top: 24, padding: 2 }}>
      <QRCodeCanvas
        id="qr-code-canvas"
        style={{
          width: '100%',
          height: '100%',
        }}
        value={qrValue}
        size={qrSize}
        level={qrLevel}
        bgColor={qrBgColor}
        fgColor={qrFgColor}
        includeMargin
        imageSettings={{
          src: qrLogo,
          width: qrLogoSize,
          height: qrLogoSize,
          x: undefined,
          y: undefined,
          excavate: qrLogoExcavate,
        }}
      />

      <Divider />

      <Stack spacing={1} sx={{ paddingTop: 2 }}>
        <FormControl>
          <FormLabel id="select-url-radio">URL 선택</FormLabel>
          <RadioGroup row name="select-url-radio">
            <FormControlLabel
              label="원본 URL"
              value="originUrl"
              control={
                <Radio
                  checked={urlType === 'originUrl'}
                  onChange={onChangeSelectedUrl}
                />
              }
            />
            <FormControlLabel
              label="단축 URL"
              value="shortenUrl"
              control={
                <Radio
                  disabled={shortenUrl === ''}
                  checked={urlType === 'shortenUrl'}
                  onChange={onChangeSelectedUrl}
                />
              }
            />
          </RadioGroup>
        </FormControl>
        <Button variant="contained" onClick={onClickDownload}>
          다운로드
        </Button>
      </Stack>
    </Card>
  );
};

export default QRCodeDownload;
