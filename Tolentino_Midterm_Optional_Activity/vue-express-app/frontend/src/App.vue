<template>
  <div class="app">
    <h1>Vue + Express Demo</h1>
    <ul>
      <li v-for="item in items" :key="item.id">
        {{ item.name }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      items: [],
    };
  },
  mounted() {
    fetch("http://localhost:5000/api/items")
      .then((res) => res.json())
      .then((data) => {
        this.items = data;
      })
      .catch((err) => console.error("❌ Error fetching data:", err));
  },
};
</script>

<style>
.app {
  font-family: Arial, sans-serif;
  text-align: center;
  margin-top: 40px;
}

ul {
  list-style-type: none; /* 🔹 removes bullet points */
  padding: 0;
  margin: 0;
}

li {
  margin: 8px 0; /* adds spacing between items */
}
</style>
