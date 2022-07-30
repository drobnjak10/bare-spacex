import { StackScreenProps } from "@react-navigation/stack";
import * as React from "react";
import {
  FlatList,
  SafeAreaView, StyleSheet
} from "react-native";
import Crew from "../components/Crew";
import ErrorModal from "../components/ErrorModal";
import { RootStackParamList } from "../CustomNavigation";
import { ICrew } from "../interfaces";

type Props = StackScreenProps<RootStackParamList, 'CrewMember'>;


function CrewMembers(props: Props) {
  const [data, setData] = React.useState<ICrew[]>([]);
  const [error, setError] = React.useState<boolean>(false);

  const fetchData = async () => {
    try {
      const response = await fetch("https://api.spacexdata.com/v4/crew");
      const data = await response.json();
      setData(data);
    } catch {
      setError(true)
    }
  };

  React.useEffect(() => {
    fetchData();
  }, []);

  if(error) {
    return <ErrorModal visible={true} error={'Api Server Not Working!'} />
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={data}
        renderItem={({ item }) => <Crew item={item} props={props} />}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  );
}

export default CrewMembers;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#ecf0f1",
    padding: 8,
  },
});
