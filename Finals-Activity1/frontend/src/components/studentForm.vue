<template>
  <section class="form-container">
    <h2>Student Form</h2>
    <form>
      <label>Student ID:</label>
      <input type="text" />

      <label>First Name:</label>
      <input type="text" />

      <label>Last Name:</label>
      <input type="text" />

      <label>Section:</label>
      <input type="text" />

      <button type="submit">Submit</button>
    </form>
  </section>
</template>

<script>
export default {
  name: "StudentForm",
};
</script>
