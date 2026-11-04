import { Outlet } from "react-router";
import { View } from "onyx-ui";

// import styles from './App.module.css'

function App() {
  return (
    <View flex id="window" style={{ minWidth: 0, minHeight: 0 }}>
      <View id="overlay" absolute style={{ zIndex: 1000, inset: 0, pointerEvents: "none" }} />
      <View flex as="main" style={{ minWidth: 0, minHeight: 0 }}>
        <Outlet />
      </View>
    </View>
  );
}

export default App;
