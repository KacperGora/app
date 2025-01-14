import React, { useState } from "react";
import { View, StyleSheet, Text, ScrollView } from "react-native";
import { Button, TextInput } from "react-native-paper";
import { useTranslation } from "react-i18next";
import api from "../../../helpers/api";
import TextInputWithCounter from "../../../components/TextInputWithCounter";
import { colors } from "../../../theme/theme";
import { customerFieldsConfig, initialCustomerFormValues } from "./utils";
import { Client, CustomerComponentProps } from "./type";
import { apiRoutes } from "@helpers/apiRoutes";

const CustomerForm: React.FC<CustomerComponentProps> = ({ onSubmit }) => {
  const { t } = useTranslation();
  const [clientForm, setClientForm] = useState<Client>(
    initialCustomerFormValues
  );
  const [error, setError] = useState("");

  const handleChange = (key: keyof Client) => (value: string) => {
    setClientForm((prev) => ({ ...prev, [key]: value }));
  };

  const onClientSave = async (client: Client) => {
    try {
      await api.post(apiRoutes.addClient, client);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setClientForm(initialCustomerFormValues);
    }
  };

  const handleSubmit = async () => {
    const { name: firstName, lastName, phoneNumber, notes } = clientForm;
    await onClientSave({ name: firstName, lastName, phoneNumber, notes });
    onSubmit();
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{t("client.addCustomer")}</Text>
      <View style={styles.formWrapper}>
        {customerFieldsConfig.map(
          ({ placeholder, value, key, keyboardType }) => (
            <TextInput
              key={key}
              mode="outlined"
              style={styles.input}
              placeholder={t(placeholder)}
              value={clientForm[value as keyof Client]}
              onChangeText={handleChange(key as keyof Client)}
              keyboardType={keyboardType || "default"}
            />
          )
        )}
        <TextInputWithCounter
          maxLength={500}
          onChangeText={handleChange("notes")}
          placeholder={t("form.notes")}
          value={clientForm.notes || ""}
          multiline
          style={[styles.textArea]}
        />

        <Button mode="elevated" onPress={handleSubmit} style={styles.button}>
          {t("form.save")}
        </Button>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flexGrow: 1,
    justifyContent: "center",
    backgroundColor: colors.background,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#333",
  },
  input: {
    backgroundColor: "#fff",
  },
  textArea: {
    height: 100,
  },
  button: {
    marginTop: 20,
    padding: 10,
    borderRadius: 8,
  },
  formWrapper: {
    gap: 16,
  },
});

export default CustomerForm;
