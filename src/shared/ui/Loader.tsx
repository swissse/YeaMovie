import { ClipLoader } from 'react-spinners';

interface LoaderProps {
  size: number;
  color: string;
  cssOverride?: any;
}

export default function Loader({ size, color, cssOverride }: LoaderProps) {
  return <ClipLoader size={size} cssOverride={cssOverride} color={color} />;
}
