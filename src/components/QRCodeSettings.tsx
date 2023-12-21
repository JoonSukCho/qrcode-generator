import React, { useEffect, useRef, useState } from 'react';
import {
  Button,
  Checkbox,
  CircularProgress,
  Divider,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  FormLabel,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Radio,
  RadioGroup,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import styled from '@emotion/styled';
import useQRCode from '../../hooks/useQRCode';
import { LOGO_TYPE, QR_LEVEL } from '../../types/qrCode';
import { ShortUrlResponse } from '../../types/shortUrl';
import axios from 'axios';

interface QRCodeSettingsProps {}

const QRCodeSettings = ({}: QRCodeSettingsProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

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
    setOriginUrl,
    setShortenUrl,
    setQRValue,
    setQRSize,
    setQRLevel,
    setQRLogo,
    setQRLogoSize,
    setQRLogoExcavate,
  } = useQRCode();

  const [selectedLogoType, setSelectedLogoType] = useState<LOGO_TYPE>('none');
  const [isLoadShortenUrl, setIsLoadShortenUrl] = useState(false);
  const [mustChangeShortenUrl, setMustChangeShortenUrl] = useState(false);

  // URL 입력 핸들러
  const onChangeURL = (e: React.ChangeEvent<HTMLInputElement>) => {
    // 단축 URL 생성 후, 원본 URL이 변경 된 경우
    if (shortenUrl) {
      setMustChangeShortenUrl(qrValue !== e.target.value);
    }

    setOriginUrl(e.target.value);
  };

  // QR Code 해상도 핸들러
  const onChangeQrSize = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQRSize(Number(e.target.value));
  };

  // 레벨 핸들러
  const onChangeLevel = (e: SelectChangeEvent) => {
    setQRLevel(e.target.value as QR_LEVEL);
  };

  // 로고 파일 업로드 핸들러
  const onChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFile = e.target.files[0];

      const objectUrl = window.webkitURL.createObjectURL(selectedFile);
      setQRLogo(objectUrl);
    }
  };

  // 로고 사이즈 핸들러
  const onChangeLogoSize = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQRLogoSize(Number(e.target.value));
  };

  // 로고 선택 핸들러
  const onChangeSelectedLogoType = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedValue = e.target.value as LOGO_TYPE;
    setSelectedLogoType(selectedValue);

    // 사용 안함
    if (selectedValue === 'none') {
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      setQRLogo('');
      setQRLogoSize(0);
    }

    if (selectedValue === 'kottonseed') {
      setQRLogo('/kottonseed_logo.png');
    }
  };

  //   로고 여백 핸들러
  const onChangeLogoExcavate = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQRLogoExcavate(e.target.checked);
  };

  const generateQRCode = () => {
    if (urlType === 'originUrl') {
      setQRValue(originUrl);
    }

    if (urlType === 'shortenUrl') {
      setQRValue(shortenUrl);
    }
  };

  // 단축 URL 생성
  const generateShortenUrl = async () => {
    setIsLoadShortenUrl(true);

    try {
      const res = await axios.get<ShortUrlResponse>('/api/short-url', {
        params: {
          originUrl: originUrl,
        },
      });

      const _shortenUrl = res.data.result.url;

      if (urlType === 'shortenUrl') {
        setQRValue(_shortenUrl);
      }

      setMustChangeShortenUrl(false);
      setShortenUrl(_shortenUrl);
    } catch (error) {
      alert('단축 URL 생성 실패. 유효하지 않거나 인증되지 않은 URL입니다.');
      console.log(error);
    } finally {
      setIsLoadShortenUrl(false);
    }
  };

  const onClickCopyToClipBoard = async () => {
    try {
      await navigator.clipboard.writeText(shortenUrl);
      alert('단축 URL이 복사되었습니다.');
    } catch (error) {
      alert('복사에 실패하였습니다.');
    }
  };

  // 해상도에 따른 로고 사이즈 조정
  useEffect(() => {
    if (qrLogo) {
      setQRLogoSize(Math.floor(qrSize * (20 / 100)));
    }
  }, [qrLogo]);

  return (
    <Stack spacing={2} sx={{ paddingTop: 2 }}>
      <Stack spacing={1}>
        <Stack>
          <InputLabel htmlFor="qr-url">URL 입력</InputLabel>
          <TextField
            id="qr-url"
            type="text"
            size="small"
            multiline
            maxRows={3}
            value={originUrl}
            onChange={onChangeURL}
            onBlur={generateQRCode}
          />
        </Stack>

        <Stack>
          <InputLabel htmlFor="shorten-url">단축 URL</InputLabel>
          <OutlinedInput
            id="shorten-url"
            type="text"
            size="small"
            value={shortenUrl}
            error={mustChangeShortenUrl}
            endAdornment={
              <InputAdornment position="end">
                <IconButton edge="end" onClick={onClickCopyToClipBoard}>
                  <ContentCopyIcon />
                </IconButton>
              </InputAdornment>
            }
          />
          {mustChangeShortenUrl && (
            <FormHelperText error>원본 URL이 변경되었습니다.</FormHelperText>
          )}
        </Stack>

        <Button
          onClick={generateShortenUrl}
          variant="contained"
          disabled={isLoadShortenUrl}
        >
          {isLoadShortenUrl ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            '단축 URL 생성하기'
          )}
        </Button>
      </Stack>

      <Divider />

      <Stack spacing={2}>
        <Stack spacing={1}>
          <Stack>
            <InputLabel
              htmlFor="qr-size"
              sx={{ display: 'flex', alignItems: 'center' }}
            >
              해상도
              <Typography variant="caption">(px)</Typography>
            </InputLabel>
            <TextField
              id="qr-size"
              type="number"
              size="small"
              value={qrSize}
              onChange={onChangeQrSize}
            />
          </Stack>
          <Stack>
            <InputLabel
              htmlFor="qr-level"
              sx={{ display: 'flex', alignItems: 'center' }}
            >
              레벨
              <Typography variant="caption">
                (QR코드 인식이 안되면, 레벨을 올리세요)
              </Typography>
            </InputLabel>
            <Select
              id="qr-level"
              size="small"
              value={qrLevel}
              onChange={onChangeLevel}
            >
              <MenuItem value="L">L (1)</MenuItem>
              <MenuItem value="M">M (2)</MenuItem>
              <MenuItem value="Q">Q (3)</MenuItem>
              <MenuItem value="H">H (4)</MenuItem>
            </Select>
          </Stack>

          <Stack>
            <FormControl>
              <FormLabel id="qr-logo">로고 사용</FormLabel>
              <RadioGroup name="qr-logo">
                <FormControlLabel
                  label="사용 안함"
                  value="none"
                  control={
                    <Radio
                      checked={selectedLogoType === 'none'}
                      onChange={onChangeSelectedLogoType}
                    />
                  }
                />
                <FormControlLabel
                  label="코튼시드 로고"
                  value="kottonseed"
                  control={
                    <Radio
                      checked={selectedLogoType === 'kottonseed'}
                      onChange={onChangeSelectedLogoType}
                    />
                  }
                />
                <FormControlLabel
                  label="파일"
                  value="file"
                  control={
                    <Radio
                      checked={selectedLogoType === 'file'}
                      onChange={onChangeSelectedLogoType}
                    />
                  }
                />
              </RadioGroup>
            </FormControl>

            {selectedLogoType === 'file' && (
              <Button
                id="qr-logo"
                component="label"
                variant="contained"
                startIcon={<FileUploadIcon />}
                sx={{ marginBottom: 0.5 }}
              >
                로고 파일 업로드
                <VisuallyHiddenInput
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  onChange={onChangeFile}
                />
              </Button>
            )}

            {qrLogo !== '' && (
              <>
                <InputLabel htmlFor="qr-logo-w" sx={{ paddingTop: 0.5 }}>
                  로고 사이즈
                  <Typography variant="caption">(px)</Typography>
                </InputLabel>
                <TextField
                  id="qr-logo-w"
                  type="number"
                  size="small"
                  value={qrLogoSize}
                  onChange={onChangeLogoSize}
                />
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={qrLogoExcavate}
                        onChange={onChangeLogoExcavate}
                      />
                    }
                    label="로고 여백"
                  />
                </FormGroup>
              </>
            )}
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

export default QRCodeSettings;
