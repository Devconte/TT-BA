import { Typography } from '@mui/material';

interface PropsInfo {
  name: string;
  data: string | number;
}

function InfoText({ name, data }: PropsInfo) {
  return (
    <div>
      <Typography
        sx={{ textTransform: 'uppercase', mb: 1.5 }}
        variant="inherit"
        component="p"
      >
        <b>{name}</b>
      </Typography>
      <span> {data}</span>
    </div>
  );
}

export default InfoText;
