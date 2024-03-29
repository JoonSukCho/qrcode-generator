import Head from 'next/head';
import { useState } from 'react';
import { Box, Card, Container, Grid, Stack, Tab, Tabs } from '@mui/material';
import { QRCodeProvider } from '@/components/Provider/QRcodeProvider';
import QRCodeDownload from '@/components/QRCodeDownload';
import QRCodeSettings from '@/components/QRCodeSettings';
import QRCodeStyles from '@/components/QRCodeStyles';

export default function Home() {
  const [currentTab, setCurrentTab] = useState(0);

  const onChangeTab = (e: React.SyntheticEvent, newValue: number) => {
    setCurrentTab(newValue);
  };

  return (
    <>
      <Head>
        <title>QR Code Generator</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <QRCodeProvider>
        <Box
          sx={{
            backgroundColor: '#f3f7fa',
          }}
        >
          <Container
            maxWidth="md"
            sx={{
              minHeight: '100vh',
              padding: 4,
            }}
          >
            <Grid
              container
              columnSpacing={2}
              direction={{ xs: 'column', sm: 'row' }}
            >
              <Grid item xs={7}>
                <QRCodeDownload />
              </Grid>

              <Grid item xs={5}>
                <Card
                  variant="outlined"
                  sx={{
                    padding: 2,
                    paddingTop: 1,
                  }}
                >
                  <Tabs
                    value={currentTab}
                    onChange={onChangeTab}
                    sx={{ paddingTop: 0 }}
                  >
                    <Tab label="설정" />
                    <Tab label="스타일" />
                  </Tabs>

                  {/* 설정 탭 */}
                  {currentTab === 0 && <QRCodeSettings />}

                  {/* 스타일 탭 */}
                  {currentTab === 1 && <QRCodeStyles />}
                </Card>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </QRCodeProvider>
    </>
  );
}
