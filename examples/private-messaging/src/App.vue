<template>
  <div id="app">
    <select-username
      v-if="!usernameAlreadySelected"
      @input="onUsernameSelection"
    />
    <chat v-else />
  </div>
</template>

<script>
import SelectUsername from "./components/SelectUsername";
import Chat from "./components/Chat";
import socket from "./socket";

export default {
  name: "App",
  components: {
    Chat,
    SelectUsername,
  },
  data() {
    return {
      usernameAlreadySelected: false,
    };
  },
  methods: {
    // called once we hit submit on the username form
    onUsernameSelection(username) {
      this.usernameAlreadySelected = true;
      /*
      we set the credentils that are sent when accessing a namespace. On the server side,
      we can access these credentials in the socket.handshake.auth object
      */
      socket.auth = { username };
      // manually connect the socket, can be also used to manually reconnect at disconnection
      socket.connect();
    },
  },
  created() {
    socket.on("connect_error", (err) => {
      /*
      this event is triggered by the middleware when no username is provided in
      next(new Error("invalid username")
      */
      if (err.message === "invalid username") {
        this.usernameAlreadySelected = false;
      }
    });
  },
  destroyed() {
    /*
    remove the connect_error handler when the component is destroyed so that the listeners
    registered by the App component are cleaned up
    */
    socket.off("connect_error");
  },
};
</script>

<style>
body {
  margin: 0;
}

@font-face {
  font-family: Lato;
  src: url("/fonts/Lato-Regular.ttf");
}

#app {
  font-family: Lato, Arial, sans-serif;
  font-size: 14px;
}
</style>
