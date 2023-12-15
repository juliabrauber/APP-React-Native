import React from "react"
import { View, Text, TouchableOpacity, Share} from "react-native"
import styles from "./style"

export default function ResultImc(props){

    const onShare = async () => {
        const result = await Share.share({
          message: "Meu Imc atual é:" + props.ResultImc,
        });
      }
      
      return (
        <View style={styles.contextImc}>
          <View style={styles.boxShareButton}>
           <Text style={styles.Information}>{props.messageResultImc}</Text>
           <Text style={styles.numberImc}>{props.ResultImc}</Text>
              <TouchableOpacity onPress={onShare} style={styles.shared}>
              <Text style={styles.shareText}>Share</Text>
              </TouchableOpacity>
          </View>
        </View>
      );
}