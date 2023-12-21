import styled from '@emotion/styled';
import {
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
  TextField,
} from '@mui/material';
import useQRCode from '../../hooks/useQRCode';
import RestartAltIcon from '@mui/icons-material/RestartAlt';

const QRCodeStyles = () => {
  const { qrFgColor, qrBgColor, setQRFgColor, setQRBgColor } = useQRCode();

  const colorSamples = ['#7122D1', '#AE89F8', '#7b7b7b', '#000000', '#ffffff'];

  const onChangeQRFgColor = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQRFgColor(e.target.value);
  };

  const resetFgColor = () => {
    if (!confirm('점 색상을 초기화 하시겠습니까?')) return;
    setQRFgColor('#000000');
  };

  const onChangeQRBgColor = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQRBgColor(e.target.value);
  };

  const resetBgColor = () => {
    if (!confirm('배경 색상을 초기화 하시겠습니까?')) return;
    setQRBgColor('#ffffff');
  };

  return (
    <Stack spacing={3} sx={{ paddingTop: 2 }}>
      <div>
        <InputLabel>점 색상</InputLabel>
        <Stack spacing={1} direction="row" alignItems="center">
          <ColorPicker
            id="qr-fg-color"
            type="color"
            value={qrFgColor}
            onChange={onChangeQRFgColor}
          />
          <OutlinedInput
            sx={{ maxWidth: 160 }}
            id="qr-fg-color-value"
            type="text"
            size="small"
            value={qrFgColor}
            onChange={onChangeQRFgColor}
            endAdornment={
              <InputAdornment position="end">
                <IconButton edge="end" onClick={resetFgColor}>
                  <RestartAltIcon />
                </IconButton>
              </InputAdornment>
            }
          />
        </Stack>
        <Stack
          spacing={1}
          direction="row"
          alignItems="center"
          sx={{ paddingLeft: 0.5, paddingTop: 1 }}
        >
          {colorSamples.map((sample) => (
            <ColorSampleButton
              key={sample}
              backgroundColor={sample}
              onClick={() => {
                setQRFgColor(sample);
              }}
            />
          ))}
        </Stack>
      </div>

      <div>
        <InputLabel>배경 색상</InputLabel>
        <Stack spacing={1} direction="row" alignItems="center">
          <ColorPicker
            id="qr-bg-color"
            type="color"
            value={qrBgColor}
            onChange={onChangeQRBgColor}
          />
          <OutlinedInput
            sx={{ maxWidth: 160 }}
            id="qr-bg-color-value"
            type="text"
            size="small"
            value={qrBgColor}
            onChange={onChangeQRBgColor}
            endAdornment={
              <InputAdornment position="end">
                <IconButton edge="end" onClick={resetBgColor}>
                  <RestartAltIcon />
                </IconButton>
              </InputAdornment>
            }
          />
        </Stack>
        <Stack
          spacing={1}
          direction="row"
          alignItems="center"
          sx={{ paddingLeft: 0.5, paddingTop: 1 }}
        >
          {colorSamples.map((sample) => (
            <ColorSampleButton
              key={sample}
              backgroundColor={sample}
              onClick={() => {
                setQRBgColor(sample);
              }}
            />
          ))}
        </Stack>
      </div>
    </Stack>
  );
};

const ColorPicker = styled.input`
  width: 50px;
  height: 50px;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background-color: transparent;
  border: none;
  cursor: pointer;

  &::-webkit-color-swatch {
    border-radius: 4px;
    border: 2px solid #000000;
  }
`;

const ColorSampleButton = styled.button<{ backgroundColor: string }>`
  cursor: pointer;
  width: 42px;
  height: 40px;
  appearance: none;
  border-radius: 50%;
  border: 2px solid #000000;
  background-color: ${({ backgroundColor }) => backgroundColor};
`;

export default QRCodeStyles;
