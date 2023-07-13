import { Typography } from '@mui/material';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/700.css';

interface PropsInfo {
  name: string;
  data: string | number;
}

function InfoText({ name, data }: PropsInfo) {
  return (
    <div>
      <Typography
        sx={{
          textTransform: 'uppercase',
          mb: 1,
          fontFamily: 'Roboto',
          fontWeight: 500,
        }}
        variant="inherit"
        component="p"
      >
        <b>{name}</b>
      </Typography>
      <Typography component="span" sx={{ fontFamily: 'Roboto', fontSize: 15 }}>
        {' '}
        {data}
      </Typography>
    </div>
  );
}

export default InfoText;
