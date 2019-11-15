import React from 'react';
import { TouchableOpacity, Text } from 'react-native'
import CenterSpinner from '../Util/CenterSpinner';

const LoadNewerButton = ({ show, styles, isPublic, ...props }) => {

  const [buttonText, setButtonText] = React.useState('New todos have arrived');
  const [loading, setLoading] = React.useState(false);

  if (!show) {
    return null;
  }

  return (
    <TouchableOpacity
      style={styles.banner}
      disabled={loading}
    > 
      {
        loading ?
        <CenterSpinner /> :
        <Text style={styles.buttonText}>
          {buttonText}
        </Text>
      }
    </TouchableOpacity> 
  )
}

export default LoadNewerButton;