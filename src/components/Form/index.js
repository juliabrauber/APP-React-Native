import React, { useState } from "react";
import {FlatList, Pressable, Keyboard, Text, TextInput, View, TouchableOpacity, Vibration } from "react-native";
import ResultImc from "./ResultImc";
import styles from "./style";

export default function Form(prosp) {
  const [height, setHeight] = useState(null);
  const [weight, setWeight] = useState(null);
  const [messageImc, setMessageImc] = useState("Preencha o peso e altura");
  const [imc, setImc] = useState(null);
  const [textButton, setTextButton] = useState("Calcular");
  const [errorMessage, setErrorMessage] = useState(null);
  const [imcList, setImcList] = useState([]);

  function imcCalculator() {
    if (height && weight) {
      const heightInMeters = height / 100; // Convertendo altura para metros
      const totalImc = (weight / (heightInMeters * heightInMeters)).toFixed(2);
      setImcList((arr) => [...arr, { id: new Date().getTime(), imc: totalImc }]);
      setImc(totalImc);
    } else {
      setImc(null);
    }
  }

  function verificationImc() {
    if (imc == null) {
      Vibration.vibrate();
      setErrorMessage("campo obrigatório");
    }
  }

  function validationImc() {
    if (weight != null && height != null) {
      imcCalculator();
      setWeight(null);
      setHeight(null);
      setMessageImc("Seu Imc é igual:");
      setTextButton("Calcular novamente");
      setErrorMessage(null);
    } else {
      verificationImc();
      setImc(null);
      setTextButton("Calcular");
      setMessageImc("Preencha o peso e altura");
    }
  }

  return (
      <View style={styles.formContext}>
        {imc === null ? (
          <Pressable onPress={Keyboard.dismiss} style={styles.form}>
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
            <Text style={styles.formLabel}>Peso arredondado: </Text>
            <Text style={styles.errorMessage}>{errorMessage}</Text>
            <TextInput
              style={styles.input}
              onChangeText={(text) => setWeight(parseFloat(text))}
              value={weight ? weight.toString() : ""}
              placeholder="Ex: 75"
              keyboardType="numeric"
              returnKeyType="done"
            />
            <TouchableOpacity
              style={styles.buttonCalculator}
              onPress={() => validationImc()}
            >
              <Text style={styles.textButtonCalculator}>{textButton}</Text>
            </TouchableOpacity>
          </Pressable>
        ) : (
          <View style={styles.exhibitionResultImc}>
            <ResultImc messageResultImc={messageImc} ResultImc={imc} />
            <TouchableOpacity
              style={styles.buttonCalculator}
              onPress={() => validationImc()}
            >
              <Text style={styles.textButtonCalculator}>{textButton}</Text>
            </TouchableOpacity>
          </View>
        )}
        <FlatList
        style={styles.listImcs}
        data={imcList.reverse()}
        renderItem={({ item }) => (
          <Text style={styles.resultImcItem}>
            Resultado Imc = {item.imc}
          </Text>
        )}
        keyExtractor={(item) => item.id.toString()}/>
      </View>
  );
}
