import { Dimensions } from 'react-native';

const { width: W, height: H } = Dimensions.get('window');

export const screenWidth = W;
export const screenHeight = H;
export const isSmallDevice = W < 375;
export const isTablet = W >= 768;

export const wp = (pct) => (W * pct) / 100;
export const hp = (pct) => (H * pct) / 100;
