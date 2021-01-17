import React from 'react';
import { View, Image, Text } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';

import heartOutLineIcon from '../../assets/images/icons/heart-outline.png'
import unfavoriteIcon from '../../assets/images/icons/unfavorite.png'
import whatsappIcon from '../../assets/images/icons/whatsapp.png'


import styles from './styles'

function TeacherItem() {
  return (  
    <View style={styles.container}>
      <View style={styles.profile}>
        <Image 
          style={styles.avatar}
          source={{ uri:'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Ei-user.svg/1200px-Ei-user.svg.png'}}
        />     
        <View style={styles.profileInfo}>
          <Text style={styles.name}>Luis Carlos</Text>
        <Text style={styles.subject}>Matematica</Text>
        </View>
      </View>
      <Text style={styles.bio}>
        xxxxxxx
        {'\n'}{'\n'}
        xxxxxxxxxx, xxxxxxxxxxxxxxxxxxxxx, xxxxxxxxx,xxxx
      </Text>
      
      <View style={styles.footer}>
        <Text style={styles.price}>
          Preço/hora {'   '}
          <Text style={styles.priceValue}>R$ 80,00</Text>
        </Text>
        <View style={styles.buttonsContainer}>
          <RectButton style={[styles.favoriteButton, styles.favorited]}>
            {/*<Image source={heartOutLineIcon}/>*/}
            <Image source={unfavoriteIcon}/>
          </RectButton>
          <RectButton style={styles.contactButton}>
            <Image source={whatsappIcon}/>
            <Text style={styles.contactButtonText}>Entrar em contato</Text>
          </RectButton>
        </View>
      </View>
    </View>    
  )
}

export default TeacherItem