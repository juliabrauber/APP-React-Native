import React, { useState } from "react";
import { Button, Text, TextInput, View } from "react-native";
import ResultImc from "./ResultImc";

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
    <View>
      <View>
        <Text>Altura</Text>
        <TextInput
          onChangeText={(text) => setHeight(parseFloat(text))}
          value={height ? height.toString() : ""}
          placeholder="Ex: 1.75"
          keyboardType="numeric"
        />
        <Text>Peso</Text>
        <TextInput
          onChangeText={(text) => setWeight(parseFloat(text))}
          value={weight ? weight.toString() : ""}
          placeholder="Ex: 75.365"
          keyboardType="numeric"
        />
        <Button onPress={() => validationImc()} title={textButton} />
      </View>

      <ResultImc messageResultImc={messageImc} ResultImc={imc} />
    </View>
  );
}

