<template>
  <div id="app">
    <header>
      <h1>Student & Admin Portal</h1>
      <nav>
        <router-link to="/">Home</router-link>
        <router-link to="/student">Student Form</router-link>
        <router-link to="/admin">Admin Form</router-link>
      </nav>
    </header>

    <main>
      <!-- Render selected page -->
      <router-view />
    </main>

    <footer>
      <p>© 2025 Portal System</p>
    </footer>
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>
