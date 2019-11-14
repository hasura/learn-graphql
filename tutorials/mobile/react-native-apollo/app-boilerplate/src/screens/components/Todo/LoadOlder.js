import React from 'react';
import { TouchableOpacity, Text } from 'react-native'
import CenterSpinner from '../Util/CenterSpinner';

const LoadOlderButton = ({ styles }) => {
  const [buttonText, setButtonText] = React.useState('Load more todos');
  const [loading, setLoading] = React.useState(false);
  const [disabled, setDisabled] = React.useState(false);

  return (
    <TouchableOpacity
      style={styles.pagination}
      disabled={disabled}
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

export default LoadOlderButton;