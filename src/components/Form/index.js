import React, { useState } from "react";
import { Text, TextInput, View, TouchableOpacity } from "react-native";
import ResultImc from "./ResultImc";
import styles from "./style";

export default function Form() {
  const [height, setHeight] = useState(null);
  const [weight, setWeight] = useState(null);
  const [messageImc, setMessageImc] = useState("Preencha o peso e altura");
  const [imc, setImc] = useState(null);
  const [textButton, setTextButton] = useState("Calcular");

  function imcCalculator() {
    if (height && weight) {
      const heightInMeters = height / 100; // Convertendo altura para metros
      return setImc((weight / (heightInMeters * heightInMeters)).toFixed(2));
    } else {
      return setImc(null);
    }
  }

  function validationImc() {
    if (weight && height) {
      imcCalculator();
      setWeight(null);
      setHeight(null);
      setMessageImc("Seu Imc é igual:");
      setTextButton("Calcular novamente");
    } else {
      setImc(null);
      setTextButton("Calcular");
      setMessageImc("Preencha o peso e altura");
    }
  }

  return (
    <View style={styles.formContext}>
      <View style={styles.form}>
        <Text style={styles.formLabel}>Altura em cm</Text>
        <TextInput 
        style={styles.input}
          onChangeText={(text) => setHeight(parseFloat(text))}
          value={height ? height.toString() : ""}
          placeholder="Ex: 170"
          keyboardType="numeric"
        />
        <Text style={styles.formLabel}>Seu peso arrendodado </Text>
        <TextInput 
        style={styles.input}
          onChangeText={(text) => setWeight(parseFloat(text))}
          value={weight ? weight.toString() : ""}
          placeholder="Ex: 75"
          keyboardType="numeric"
        />
        
        <TouchableOpacity style={styles.buttonCalculator} onPress={() => validationImc()}>
          <Text style={styles.textButtonCalculator}>{textButton}</Text>
        </TouchableOpacity>


      </View>

      <ResultImc messageResultImc={messageImc} ResultImc={imc} />
    </View>
  );
}

