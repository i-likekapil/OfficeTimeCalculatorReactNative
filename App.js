import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button, } from 'react-native';
import React from "react";
import { Alert } from 'react-native-web';

export default function App() {
  const [start, onChangeStart] = React.useState("");
  const [end, onChangeEnd] = React.useState("");
  const [diff, onChangeDiff] = React.useState("");


  function toSeconds(hours, minutes) {
    var seconds = 0; end
    if ((hours >= 0 && hours < 24) && (minutes >= 0 && minutes < 60)) {
      seconds += (parseInt(hours) * 3600) + (parseInt(minutes) * 60);
      return seconds
    }
    else {
      return false;
    }

  }

  function timed() {
    var time1 = end;
    var time2 = start;
    if (time1.match(/^[0-9:0-9]{5}$/g) && time2.match(/^[0-9:0-9]{5}$/g)) {
      const h1 = time1.substring(0, 2);
      const m1 = time1.substring(3);
      const h2 = time2.substring(0, 2);
      const m2 = time2.substring(3);
      if ((h1 > 0 && h1 < 25) && (h2 > 0 && h2 < 25) && (m1 > 0 && m1 < 60) && (m2 > 0 && m2 < 60)) {
        var time1Seconds = toSeconds(time1.substr(0, 2), time1.substr(3));
        var time2Seconds = toSeconds(time2.substr(0, 2), time2.substr(3));

        if (!time1Seconds || !time2Seconds) {
          notifyMessage("Kya kr rha h tu time he galat h")
          return false;
        }

        var difference = time1Seconds - time2Seconds;
        if (difference < 0) {
          difference = Math.abs(difference);
        }
        var hours = parseInt(difference / 3600)
        hours = hours < 10 ? "0" + hours : hours;
        var minutes = parseInt((difference / 3600) % 1 * 60)
        minutes = minutes < 10 ? "0" + minutes : minutes;
        console.log(hours + ":" + minutes)
        onChangeDiff(hours + ":" + minutes)
      } else {
        notifyMessage("time ke aukaat se bhr h")
        console.log("time ke aukaat se bhr h")
        onChangeDiff("")
      }
    } else {
      notifyMessage("bhai tera time he shi nhi h")
      console.log("bhai tera time he shi nhi h")
      onChangeDiff("")
    }
  }
  function notifyMessage(msg) {
    Alert(msg)
  }
  return (
    <View style={styles.container}>
      <View style={styles.container}>
        <Text style={{ fontSize: 23 }}>Time Difference Calculator</Text>
        <TextInput
          style={styles.input}
          onChangeText={onChangeStart}
          value={start}
          placeholder="start time in HH:MM"
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          onChangeText={onChangeEnd}
          value={end}
          placeholder="end time in HH:MM"
          keyboardType="numeric"
        />
        <Text> </Text>
        <Text style={styles.ans}>{diff}</Text>
        <Text> </Text>
        <Button
          onPress={timed}
          title="Calculate"
          color="#841584"
        />
        <StatusBar style="auto" />
      </View>
      <View>
        <Text style={styles.bottomText}>Designed by Kapil, in Cavisson</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e5efc1',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -100
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    fontSize: 20,
    backgroundColor: '#fff',
  },
  ans: {
    fontSize: 25,
  },
  bottomText: {
    justifyContent: 'flex-end',
    alignItems: 'baseline',
  }
});
