const styles = StyleSheet.create({
  container: {
    width: 100,
    height: 30,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
    marginHorizontal: 10,
  },
  buttonsContainer: {
    marginLeft: 4,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    height: 30,
    borderColor: "darkgrey",
  },
  text: {
    marginRight: 4,
  },
  buttonTitle: {
    color: "black",
  },
});

// =============== Initial Version ================
const PaginationFooter = ({
  page, pageEnd, pageStart, total, onPrevPress, onNextPress, style,
}) => (
  <View style={[styles.container, style]}>
    <Text>{`${pageStart} - ${pageEnd} of ${total}`}</Text>
    <View style={styles.buttonsContainer}>
      <Button
        icon={<AntDesign name="left" size={12} color="black" />}
        onPress={onPrevPress}
        type="outline"
        buttonStyle={styles.button}
        disabledStyle={styles.button}
        disabledTitleStyle={styles.buttonTitle}
      />
      <Button
        disabled
        type="outline"
        title={`${page}`}
        buttonStyle={styles.button}
        disabledStyle={styles.button}
        disabledTitleStyle={styles.buttonTitle}
      />
      <Button
        icon={<AntDesign name="right" size={12} color="black" />}
        onPress={onNextPress}
        type="outline"
        buttonStyle={styles.button}
        disabledStyle={styles.button}
        disabledTitleStyle={styles.buttonTitle}
      />
    </View>
    <View />
  </View>
);

// ========= Partially applied components =========
const partialComponent = (Component, params) => rest => <Component {...params} {...rest} />;

const Icon = partialComponent(AntDesign, { size: 12, color: "black" });

const StyledButton = partialComponent(Button, {
  type: "outline",
  buttonStyle: styles.button,
  disabledStyle: styles.button,
  disabledTitleStyle: styles.buttonTitle,
});

const Footer = ({
  page, pageEnd, pageStart, total, onPrevPress, onNextPress, style,
}) => (
  <View style={[styles.container, style]}>
    <Text style={styles.text}>{`${pageStart} - ${pageEnd} of ${total}`}</Text>
    <View style={styles.buttonsContainer}>
      <StyledButton icon={<Icon name="left" />} onPress={onPrevPress} />
      <StyledButton disabled title={`${page}`} />
      <StyledButton icon={<Icon name="right" />} onPress={onNextPress} />
    </View>
    <View />
  </View>
);
