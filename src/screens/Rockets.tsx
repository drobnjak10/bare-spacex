import * as React from "react";
import { FlatList, SafeAreaView, StyleSheet } from "react-native";
import ErrorModal from "../components/ErrorModal";
import Rocket from "../components/Rocket";
import { IRocket } from "../interfaces";

function Rockets() {
  const [data, setData] = React.useState<IRocket[]>([]);
  const [error, setError] = React.useState<boolean>(false);

  const fetchData = async () => {
    try {
      const response = await fetch("https://api.spacexdata.com/v4/rockets");
      const data = await response.json();
      const newData = data.map((item: any) => {
        return {
          name: item.name,
          id: item.id,
          wikipedia: item.wikipedia,
          image: item.flickr_images[0],
        };
      });
      setData(newData);
    } catch {
      setError(true);
    }
  };

  React.useEffect(() => {
    fetchData();
  }, []);

  if (error) {
    return <ErrorModal visible={true} error={"Api Server Not Working!"} />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={data}
        renderItem={({ item }) => <Rocket item={item} />}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  );
}

export default Rockets;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#ecf0f1",
    padding: 8,
  },
});
