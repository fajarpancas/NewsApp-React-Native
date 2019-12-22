import { Dimensions } from 'react-native';

export default (scaleWidth) => {
  const { width } = Dimensions.get('window');
  const DESIGN_WIDTH = 375;
  return (scaleWidth * width) / DESIGN_WIDTH
}