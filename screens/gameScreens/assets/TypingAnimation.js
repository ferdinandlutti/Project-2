import React, { useEffect, useState } from "react";
import { StyleSheet, Text } from "react-native";

const TypingAnimation = ({ text, typingSpeed = 150 }) => {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      setDisplayedText((prev) => prev + text.charAt(index));
      index++;
      if (index > text.length) {
        clearInterval(timer);
      }
    }, typingSpeed);

    // Cleanup function to clear interval if the component unmounts
    return () => clearInterval(timer);
  }, [text, typingSpeed]);

  return <Text style={[styles.text]}>{displayedText}</Text>;
};
const styles = StyleSheet.create({
  text: {
    fontSize: 30,
    fontFamily: "Noteworthy-Light",
    color: "#FFFFFF",
    textAlign: "center",
    margin: 10,
  },
});
export default TypingAnimation;
