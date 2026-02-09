import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  TextInput,
  Pressable,
  ScrollView,
  Platform,
  Alert,
} from "react-native";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import * as Notifications from "expo-notifications";

// Configuração para o comportamento das notificações
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

interface AddModalProps {
  visible: boolean;
  onClose: () => void;
  onAdd: (item: any) => void;
  editingItem?: any;
}

export default function AddModal({
  visible,
  onClose,
  onAdd,
  editingItem,
}: AddModalProps) {
  // Estados dos inputs
  const [servico, setServico] = useState("");
  const [cliente, setCliente] = useState("");
  const [endereco, setEndereco] = useState("");
  const [valor, setValor] = useState("");
  const [metodoPagamento, setMetodoPagamento] = useState("");
  const [minutosAntes, setMinutosAntes] = useState("30");

  // Estados de Data e Hora
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [dateText, setDateText] = useState("Selecionar Data");

  const [time, setTime] = useState(new Date());
  const [showTime, setShowTime] = useState(false);
  const [timeText, setTimeText] = useState("14:30");

  // Handlers para o DateTimePicker
  const onDateChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    setShow(Platform.OS === "ios");
    if (selectedDate) {
      setDate(selectedDate);
      const day = selectedDate.getDate();
      const month = selectedDate.toLocaleString("pt-BR", { month: "short" });
      setDateText(`${day} ${month.replace(".", "")}`);
    }
  };

  const onTimeChange = (event: DateTimePickerEvent, selectedTime?: Date) => {
    setShowTime(Platform.OS === "ios");
    if (selectedTime) {
      setTime(selectedTime);
      const hours = selectedTime.getHours().toString().padStart(2, "0");
      const minutes = selectedTime.getMinutes().toString().padStart(2, "0");
      setTimeText(`${hours}:${minutes}`);
    }
  };

  useEffect(() => {
    if (editingItem && visible) {
      setServico(editingItem.servico);
      setCliente(editingItem.cliente);
      setEndereco(editingItem.endereco);
      setValor(editingItem.valor);
      setMetodoPagamento(editingItem.metodoPagamento);
      setDateText(editingItem.data);
      setTimeText(editingItem.hora);
      // Nota: Para data/hora exata no DateTimePicker, você precisaria salvar
      // o objeto Date original no item, mas aqui usamos os textos para simplificar.
    } else if (!visible) {
      limparCampos(); // Limpa ao fechar
    }
  }, [editingItem, visible]);

  // Função para salvar e agendar notificação
  const handleSave = async (status: string) => {
    if (!servico || !cliente || dateText === "Selecionar Data") {
      Alert.alert("Atenção", "Preencha o serviço, o cliente e a data.");
      return;
    }

    // 1. Calcula o horário exato do serviço
    const dataAgendada = new Date(date);
    dataAgendada.setHours(time.getHours());
    dataAgendada.setMinutes(time.getMinutes());
    dataAgendada.setSeconds(0);

    // 2. Calcula o horário da notificação (subtraindo os minutos)
    const dataNotificacao = new Date(dataAgendada.getTime());
    const antecedencia = parseInt(minutosAntes) || 0;
    dataNotificacao.setMinutes(dataNotificacao.getMinutes() - antecedencia);

    const agora = new Date();

    // 3. Agenda a notificação real se o horário for no futuro
    if (dataNotificacao > agora) {
      try {
        await Notifications.scheduleNotificationAsync({
          content: {
            title: `💈 Lembrete: ${cliente}`,
            body: `Corte de ${servico} às ${timeText}`,
            sound: true,
          },
          trigger: {
            type: Notifications.SchedulableTriggerInputTypes.DATE,
            date: dataNotificacao,
          },
        });
      } catch (error) {
        console.error("Erro ao agendar notificação:", error);
      }
    }

    // 4. Envia os dados para o App.tsx (Lista de cards)
    onAdd({
      id: editingItem ? editingItem.id : Math.random().toString(),
      servico,
      cliente,
      endereco,
      valor,
      metodoPagamento,
      lembrete: `Lembrete será enviado ${antecedencia} min antes`,
      data: dateText,
      hora: timeText,
      status: status,
    });

    onClose();
  };

  const limparCampos = () => {
    setServico("");
    setCliente("");
    setEndereco("");
    setValor("");
    setMetodoPagamento("");
    setDateText("Selecionar Data");
    setTimeText("14:30");
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <Pressable className="flex-1 justify-end bg-black/60" onPress={onClose}>
        <Pressable
          className="bg-slate-900 w-full h-[85%] rounded-t-[40px] p-8 border-t border-gray-700"
          onPress={(e) => e.stopPropagation()}
        >
          <View className="w-12 h-1.5 bg-gray-600 rounded-full self-center mb-8" />

          <ScrollView showsVerticalScrollIndicator={false}>
            <Text className="text-white text-2xl font-bold mb-6">
              {editingItem ? "Editar Agendamento" : "Novo Agendamento"}
            </Text>

            <Text className="text-gray-400 mb-2 font-semibold">Serviço</Text>
            <TextInput
              value={servico}
              onChangeText={setServico}
              placeholder="Ex: Fade + Barba"
              placeholderTextColor="#6b7280"
              className="bg-slate-800 text-white p-4 rounded-2xl mb-4 border border-gray-700"
            />

            <Text className="text-gray-400 mb-2 font-semibold">Cliente</Text>
            <TextInput
              value={cliente}
              onChangeText={setCliente}
              placeholder="Nome do cliente"
              placeholderTextColor="#6b7280"
              className="bg-slate-800 text-white p-4 rounded-2xl mb-4 border border-gray-700"
            />

            <Text className="text-gray-400 mb-2 font-semibold">Endereço</Text>
            <TextInput
              value={endereco}
              onChangeText={setEndereco}
              placeholder="Endereço (opcional)"
              placeholderTextColor="#6b7280"
              className="bg-slate-800 text-white p-4 rounded-2xl mb-4 border border-gray-700"
            />
            <Text className="text-gray-400 mb-2 font-semibold">
              Metodo de Pagamento
            </Text>
            <TextInput
              value={metodoPagamento}
              onChangeText={setMetodoPagamento}
              placeholder="Ex: Dinheiro, Cartão, Pix"
              placeholderTextColor="#6b7280"
              className="bg-slate-800 text-white p-4 rounded-2xl mb-4 border border-gray-700"
            />

            <View className="flex-row justify-between">
              <View className="w-[48%]">
                <Text className="text-gray-400 mb-2 font-semibold">Valor</Text>
                <TextInput
                  value={valor}
                  onChangeText={setValor}
                  keyboardType="numeric"
                  placeholder="R$ 0,00"
                  placeholderTextColor="#6b7280"
                  className="bg-slate-800 text-white p-4 rounded-2xl mb-4 border border-gray-700"
                />
              </View>
              <View className="w-[48%]">
                <Text className="text-gray-400 mb-2 font-semibold">
                  Antecedência (min)
                </Text>
                <TextInput
                  value={minutosAntes}
                  onChangeText={setMinutosAntes}
                  keyboardType="numeric"
                  className="bg-slate-800 text-white p-4 rounded-2xl mb-4 border border-blue-500/50"
                />
              </View>
            </View>

            <View className="flex-row justify-between">
              <View className="w-[48%]">
                <Text className="text-gray-400 mb-2 font-semibold">Data</Text>
                <TouchableOpacity
                  onPress={() => setShow(true)}
                  className="bg-slate-800 p-4 rounded-2xl mb-4 border border-gray-700"
                >
                  <Text
                    className={
                      dateText === "Selecionar Data"
                        ? "text-gray-500"
                        : "text-white"
                    }
                  >
                    {dateText}
                  </Text>
                </TouchableOpacity>
              </View>

              <View className="w-[48%]">
                <Text className="text-gray-400 mb-2 font-semibold">Hora</Text>
                <TouchableOpacity
                  onPress={() => setShowTime(true)}
                  className="bg-slate-800 p-4 rounded-2xl mb-4 border border-gray-700"
                >
                  <Text className="text-white">{timeText}</Text>
                </TouchableOpacity>
              </View>
            </View>

            {show && (
              <DateTimePicker
                value={date}
                mode="date"
                display={Platform.OS === "ios" ? "spinner" : "default"}
                onChange={onDateChange}
                locale="pt-BR"
              />
            )}
            {showTime && (
              <DateTimePicker
                value={time}
                mode="time"
                is24Hour={true}
                display={Platform.OS === "ios" ? "spinner" : "default"}
                onChange={onTimeChange}
              />
            )}

            <View className="flex-row w-full justify-between mt-6">
              <TouchableOpacity
                onPress={() => handleSave("Confirmado")}
                className="flex-1 bg-green-600 py-4 rounded-2xl items-center shadow-lg mr-2"
              >
                <Text className="text-white font-bold text-[10px] uppercase">
                  Confirmar
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => handleSave("Aguardando")}
                className="flex-[1.5] bg-yellow-600 py-4 rounded-2xl items-center shadow-lg"
              >
                <Text className="text-white font-bold text-[10px] uppercase text-center">
                  Aguardar Confirmação
                </Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              onPress={onClose}
              className="py-4 mt-4 items-center"
            >
              <Text className="text-gray-500 font-semibold">Cancelar</Text>
            </TouchableOpacity>
          </ScrollView>
        </Pressable>
      </Pressable>
    </Modal>
  );
}
