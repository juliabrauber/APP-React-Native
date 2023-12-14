import React, { useState } from "react";
import { Pressable, Keyboard, Text, TextInput, View, TouchableOpacity, Vibration } from "react-native";
import ResultImc from "./ResultImc";
import styles from "./style";

export default function Form() {
  const [height, setHeight] = useState(null);
  const [weight, setWeight] = useState(null);
  const [messageImc, setMessageImc] = useState("Preencha o peso e altura");
  const [imc, setImc] = useState(null);
  const [textButton, setTextButton] = useState("Calcular");
  const [errorMessage, setErrorMessage] = useState(null);

  function imcCalculator() {
    if (height && weight) {
      const heightInMeters = height / 100; // Convertendo altura para metros
      return setImc((weight / (heightInMeters * heightInMeters)).toFixed(2));
    } else {
      return setImc(null);
    }
  }

   function verificationImc(){
    if(imc == null){
      Vibration.vibrate();
      setErrorMessage("campo obrigatório");
    }
   }

  function validationImc() {
    if (weight != null && height != null ){
      imcCalculator();
      setWeight(null);
      setHeight(null);
      setMessageImc("Seu Imc é igual:");
      setTextButton("Calcular novamente");
      setErrorMessage(null);
    } 
    else {
      verificationImc();
      setImc(null);
      setTextButton("Calcular");
      setMessageImc("Preencha o peso e altura");
    }
  }

  return (
    <Pressable onPress={Keyboard.dismiss} style={styles.formContext}>
      <View style={styles.form}>

        <Text style={styles.formLabel}>Altura em cm:</Text>
        <Text style={styles.errorMessage}>{errorMessage}</Text>
        <TextInput 
        style={styles.input}
          onChangeText={(text) => setHeight(parseFloat(text))}
          value={height ? height.toString() : ""}
          placeholder="Ex: 170"
          keyboardType="numeric"
          returnKeyType="done"
        />

        <Text style={styles.formLabel}>Peso arrendodado: </Text>
        <Text style={styles.errorMessage}>{errorMessage}</Text>
        <TextInput 
        style={styles.input}
          onChangeText={(text) => setWeight(parseFloat(text))}
          value={weight ? weight.toString() : ""}
          placeholder="Ex: 75"
          keyboardType="numeric"
          returnKeyType="done"
        />
        
        <TouchableOpacity style={styles.buttonCalculator} onPress={() => validationImc()}>
          <Text style={styles.textButtonCalculator}>{textButton}</Text>
        </TouchableOpacity>


      </View>

      <ResultImc messageResultImc={messageImc} ResultImc={imc} />
    </Pressable>
  );
}

