import { ClipLoader } from 'react-spinners';

interface LoaderProps {
  size: number;
  color: string;
}

export default function Loader({ size, color }: LoaderProps) {
  return (
    <ClipLoader size={size} cssOverride={{ position: 'absolute', bottom: '50%' }} color={color} />
  );
}
